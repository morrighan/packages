// Node.js built-in APIs.
import path from 'path'

export default function findClosestRoot(
	mentionedFile: string,
	rootDirs: string[],
	configuredDirectory: string,
): string | null {
	for (const candidate of rootDirs) {
		const candidatePath = path.resolve(configuredDirectory, candidate)
		const isMatch = mentionedFile.startsWith(candidatePath)

		if (isMatch) return candidatePath
	}

	return null
}
