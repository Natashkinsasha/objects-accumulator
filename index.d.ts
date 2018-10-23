export default class Accumulator<T> {

    constructor(options?: IOptions);

    setOptions(options: IOptions): Accumulator<T>;

    getOptions(): IOptions;

    add(...object: T[]): IInfo;

    subscribe(subscriber: (objects: T[]) => void): Array<(objects: T[]) => void>

}

interface IOptions {
    count: number;
    time?: number;
}

interface IInfo {
    count: number;
}


