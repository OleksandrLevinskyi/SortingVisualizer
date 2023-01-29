import {SortStrategy} from "../SortStrategy";
import {pause} from "../../utils";
import {Context} from "../../Context";

class HeapSort implements SortStrategy {
    async sort(arr: Array<number>): Promise<Array<number>> {
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
            await heapify(arr, n, i);
        }

        // extract elements from heap
        for (let i = n - 1; i > 0; i--) {
            await swap(arr, 0, i, false);
            arr[i].classList = 'sorted';

            updateNumbers();

            await heapify(arr, i, 0);
        }

        arr[0].classList = 'sorted';
        await pause(speed);
        arr.forEach(r => r.classList = '');
    }

    // i - root idx
    async heapify(arr, n, i) {
        let maxIdx = i; // make max as a root
        let leftIdx = 2 * i + 1;
        let rightIdx = 2 * i + 2;

        // If left child is larger than root
        if (leftIdx < n && getRectValue(arr[leftIdx]) > getRectValue(arr[maxIdx])) {
            maxIdx = leftIdx;
        }

        if (rightIdx < n && getRectValue(arr[rightIdx]) > getRectValue(arr[maxIdx])) {
            maxIdx = rightIdx;
        }

        comparisons += 2

        if (maxIdx != i) {
            arr[maxIdx].classList.add('curr');
            arr[i].classList.add('curr');
            await swap(arr, i, maxIdx, false);
            arr[maxIdx].classList.remove('curr');
            arr[i].classList.remove('curr');

            await heapify(arr, n, maxIdx); // heapify the whole subtree
        }

        updateNumbers();
    }
}
