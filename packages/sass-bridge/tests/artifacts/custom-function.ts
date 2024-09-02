import type { BridgedFunction } from '../../types';
import { sassFunction } from '../../releases/esm.js'; // eslint-disable-line import/extensions

@sassFunction('custom-function($a, $b)')
export default class CustomFunction implements BridgedFunction {
    #a: string;

    #b: string;

    public constructor(A: string, B: string) {
        this.#a = A;
        this.#b = B;
    }

    public async execute() {
        return this.#a.toLowerCase() + this.#b.toUpperCase();
    }
}
