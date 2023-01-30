import {ISortStrategy} from "../ISortStrategy";
import {getRectValue, pause} from "../../utils/utils";
import {Context} from "../../Context";
import {swap} from "../../utils/sort_utils";
import {updateNumbers} from "../../utils/panel_utils";

class HeapSort implements ISortStrategy {
    async sort(arr: Array<any>): Promise<void> {
        const context: Context = Context.getContext();
        let n = arr.length;
        let a = Math.floor(n / 2) - 1; // idx of the first element with children
        let bound = 1;
        let currClass = 'edge';

        for (let i = 0; i < arr.length; i++) {
            arr[i].classList = currClass;
            if (i + 1 == bound) {
                bound *= 2;
                currClass = currClass == '' ? 'edge' : '';
            }
        }

        // build heap
        for (let i = a; i >= 0; i--) {
            await this.heapify(arr, n, i);
        }

        // extract elements from heap
        for (let i = n - 1; i > 0; i--) {
            await swap(arr, 0, i, false);
            arr[i].classList = 'sorted';

            updateNumbers();

            await this.heapify(arr, i, 0);
        }

        arr[0].classList = 'sorted';
        await pause(context.speed);
        arr.forEach(r => r.classList = '');
    }

    async heapify(arr: Array<any>, n: number, rootIdx: number): Promise<void> {
        const context: Context = Context.getContext();
        let maxIdx = rootIdx; // make max as a root
        let leftIdx = 2 * rootIdx + 1;
        let rightIdx = 2 * rootIdx + 2;

        // if left child is larger than root
        if (leftIdx < n && getRectValue(arr[leftIdx]) > getRectValue(arr[maxIdx])) {
            maxIdx = leftIdx;
        }

        if (rightIdx < n && getRectValue(arr[rightIdx]) > getRectValue(arr[maxIdx])) {
            maxIdx = rightIdx;
        }

        context.comparisons += 2

        if (maxIdx != rootIdx) {
            arr[maxIdx].classList.add('curr');
            arr[rootIdx].classList.add('curr');
            await swap(arr, rootIdx, maxIdx, false);
            arr[maxIdx].classList.remove('curr');
            arr[rootIdx].classList.remove('curr');

            await this.heapify(arr, n, maxIdx); // heapify the whole subtree
        }

        updateNumbers();
    }
}
