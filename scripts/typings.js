// Node.js built-in APIs.
import { copyFile, rm as remove } from 'fs/promises'
import path from 'path'
import process from 'process'
import { Worker, isMainThread, workerData } from 'worker_threads'

// Third-party modules.
import { execa } from 'execa'
import { globSync as glob } from 'glob'
import { oraPromise as ora } from 'ora'
import { Extractor, ExtractorConfig } from '@microsoft/api-extractor'

async function generateDeclarations(projectFolder = workerData) {
	await execa({ cwd: projectFolder })`tsc --project sources --outDir types`
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

async function cloneFileForCommonJS(projectFolder = workerData) {
	const original = path.resolve(projectFolder, 'dists/index.d.ts')
	const destination = original.replace(/\.d\.ts$/, '.d.cts')

	await copyFile(original, destination)
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
		await mergeAllDeclarations()
		await cloneFileForCommonJS()
		await removeTemporaryFiles()
	}
}

if (import.meta.filename === process.argv[1]) {
	await main()
}
