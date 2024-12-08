// Node.js built-in APIs.
import { copyFile } from 'fs/promises';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

// Third-party modules.
import Bluebird from 'bluebird';
import { glob } from 'glob';

export default async function main() {
    const rootPath = path.resolve(import.meta.dirname, '..');
    const pattern = path.resolve(rootPath, 'packages/*/dists/**/*.d.ts');

    await Bluebird.resolve(glob(pattern))
        .map(filename => [ filename, filename.replace(/\.d\.ts$/, '.d.cts') ])
        .map(([ original, destination ]) => copyFile(original, destination));
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
    main();
}
