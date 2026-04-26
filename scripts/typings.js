// Node.js built-in APIs.
import { globSync as glob } from 'fs'
import { rm as remove } from 'fs/promises'
import path from 'path'
import process from 'process'
import { Worker, isMainThread, workerData } from 'worker_threads'

// Third-party modules.
import { execa } from 'execa'
import { oraPromise as ora } from 'ora'
import { Extractor, ExtractorConfig } from '@microsoft/api-extractor'

async function generateDeclarations(projectFolder = workerData) {
	const $ = execa({ cwd: projectFolder })
	const outDir = path.basename(projectFolder) === 'cryptography' ? 'dists' : 'types'

	await $`tsc --project sources --outDir ${outDir}`
	await $`tsc-alias --outDir ${outDir}`
}

async function mergeAllDeclarations(projectFolder = workerData) {
	const files = [ 'package.json', 'tsconfig.json', 'types/index.d.ts', 'dists/index.d.ts' ]
		.map(filename => path.resolve(projectFolder, filename))

	const [ packageJsonFullPath, tsconfigFilePath, mainEntryPointFilePath, untrimmedFilePath ] = files

	const extractorConfig = ExtractorConfig.prepare({
		configObject: {
			projectFolder,
			mainEntryPointFilePath,
			compiler: { tsconfigFilePath },
			dtsRollup: { enabled: true, untrimmedFilePath },
		},

		packageJsonFullPath,
	})

	Extractor.invoke(extractorConfig, {
		localBuild: true,
		messageCallback: message => Object.assign(message, { logLevel: 'none' }),
	})
}

async function removeTemporaryFiles(projectFolder = workerData) {
	const typesDirectory = path.resolve(projectFolder, 'types')

	await remove(typesDirectory, { recursive: true, force: true })
}

export default async function main() {
	if (isMainThread) {
		const pattern = path.resolve(import.meta.dirname, '../packages/*')

		const tasks = glob(pattern)
			.filter(projectFolder => (
				!/^(es|style)lint-config$/.test(path.basename(projectFolder))
			))
			.map(projectFolder => new Promise((resolve, reject) => {
				const worker = new Worker(import.meta.filename, { workerData: projectFolder })

				worker.on('exit', exitCode => {
					if (exitCode === 0) {
						resolve()
					} else {
						reject(new Error('Unknown error occurred'))
					}
				})
			}))

		await ora(Promise.all(tasks), 'Generating type declarations ...')
	} else {
		await generateDeclarations()

		if (path.basename(workerData) === 'cryptography') return

		await mergeAllDeclarations()
		await removeTemporaryFiles()
	}
}

if (import.meta.filename === process.argv[1]) {
	await main()
}
