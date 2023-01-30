export interface ISortStrategy {
    sort(arr: Array<any>): Promise<Array<any>>;
}