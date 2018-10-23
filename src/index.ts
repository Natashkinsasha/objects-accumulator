import Timeout = NodeJS.Timeout;

interface IOptions {
    count: number;
    time?: number;
}

interface IInfo {
    count: number;
}


export default class Accumulator<T> {

    private options: IOptions;
    private objects: T[];
    private subscribers: Array<(objects: T[]) => void>;
    private timer: Timeout;

    constructor(options?: IOptions) {
        this.subscribers = [];
        this.objects = [];
        this.options = {...options, count: 10};
    }

    public setOptions = (options: IOptions): Accumulator<T> => {
        this.options = options;
        return this;
    }

    public getOptions = (): IOptions => {
        return this.options;
    }

    public add = (...objects: T[]): IInfo => {
        if (this.options.time && this.objects.length === 0 && !this.timer) {
            this.timer = setTimeout(() => {
                const tmpObjects = [...this.objects];
                this.objects = [];
                this.subscribers.forEach((subscriber) => {
                    subscriber(tmpObjects);
                });
            }, this.options.time);
        }
        this.objects.push(...objects);
        if (this.options.count <= this.objects.length) {
            this.timer && clearTimeout(this.timer);
            const objects = [...this.objects];
            this.objects = [];
            this.subscribers.forEach((subscriber) => {
                subscriber(objects);
            });
            return {count: this.objects.length};
        }
        return {count: this.objects.length};
    }

    public subscribe = (subscriber: (objects: T[]) => void) => {
        this.subscribers.push(subscriber);
        return this.subscribers;
    }


}


