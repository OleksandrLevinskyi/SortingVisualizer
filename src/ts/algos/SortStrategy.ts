export abstract class SortStrategy {
    abstract sort(arr: Array<number>): Promise<Array<number>>;
}