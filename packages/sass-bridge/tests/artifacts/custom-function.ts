import { type BridgedFunction, sassFunction } from '@cichol/sass-bridge';

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
