import {ISortStrategy} from "../ISortStrategy";
import {getRectValue, pause} from "../../utils/utils";
import {Context} from "../../Context";
import {swap} from "../../utils/sort_utils";
import {updateNumbers} from "../../utils/panel_utils";

class QuickSort implements ISortStrategy {
    async sort(arr: Array<any>, start = 0, end = arr.length - 1): Promise<any> {
        const context: Context = Context.getContext();

        if (start >= end) {
            return arr;
        }

        let pivotIdx = await this.placePivot(arr, start, end);

        await this.sort(arr, start, pivotIdx - 1);
        await this.sort(arr, pivotIdx + 1, end);

        if (start == 0 && end == arr.length - 1) {
            arr.forEach(r => r.classList = 'sorted');
            await pause(context.speed);
            arr.forEach(r => r.classList = '');
        }
    }

    async placePivot(arr: Array<any>, start: number = 0, end: number = arr.length - 1): Promise<number> {
        const context: Context = Context.getContext();
        let pivotIdx: number = start;
        let prev: any;

        arr[start].classList.add('edge');
        arr[end].classList.add('edge');

        for (let i = start + 1; i <= end; i++) {
            await pause(context.speed);

            arr[i].classList.add('curr');
            if (prev != null) {
                prev.classList.remove('curr');
            }

            prev = arr[i];

            if (getRectValue(arr[start]) > getRectValue(arr[i])) {
                pivotIdx++;
                await swap(arr, pivotIdx, i, false);
            }

            context.comparisons++;
            updateNumbers();
        }

        await pause(context.speed);
        arr[start].classList.remove('edge');
        arr[end].classList.remove('edge');
        arr[end].classList.remove('curr');

        await pause(context.speed);
        arr[start].classList.add('pivot');
        arr[pivotIdx].classList.add('pivot');
        await swap(arr, start, pivotIdx, false);

        await pause(context.speed);
        arr[start].classList.remove('pivot');
        arr[pivotIdx].classList = 'sorted';

        return pivotIdx;
    }
}
