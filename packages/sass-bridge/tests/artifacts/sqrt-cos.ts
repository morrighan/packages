import type { BridgedFunction } from '../../types';
import { sassFunction } from '../../releases/esm.js'; // eslint-disable-line import/extensions

@sassFunction('sqrt-cos($x)')
export default class SquareRootCosine implements BridgedFunction {
    #x: number;

    public constructor(X: number) {
        this.#x = X;
    }

    public async execute() {
        return Math.sqrt(Math.cos(this.#x));
    }
}
