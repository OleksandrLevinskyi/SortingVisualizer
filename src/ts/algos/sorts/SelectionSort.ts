import {SortStrategy} from "../SortStrategy";
import {pause} from "../../utils";
import {Context} from "../../Context";

class SelectionSort implements SortStrategy {
    async sort(arr: Array<number>): Promise<Array<number>> {
        let minIdx = 0,
            prev = null;


        for (let i = 0; i < arr.length - 1; i++) {
            await pause(speed);
            minIdx = i;
            arr[minIdx].classList = 'min'; // track min

            for (let j = i + 1; j < arr.length; j++) {
                await pause(speed);
                if (prev != null) resetColorSelectionSort(prev, currArr, minIdx);
                arr[j].classList = 'curr'; // make current

                if (getRectValue(arr[j]) < getRectValue(arr[minIdx])) {
                    await pause(speed);
                    arr[minIdx].classList = '';
                    minIdx = j;
                    arr[minIdx].classList = 'min'; // track min
                }

                prev = arr[j];

                comparisons++;
                updateNumbers();
            }

            await pause(speed);
            if (prev != null) resetColorSelectionSort(prev, currArr, minIdx);

            if (i != minIdx) {
                arr[i].classList = 'min';
                await swap(arr, i, minIdx);
                arr[i].classList = '';
                arr[minIdx].classList = '';

                updateNumbers();
            }

            arr[i].classList = 'sorted'; // make sorted
        }

        arr[arr.length - 1].classList = 'sorted';
        await pause(speed);
        arr.forEach(r => r.classList = '');

        return arr;
    }

    resetColorSelectionSort(rect, currArr, minIdx) {
        if (rect == currArr[minIdx]) {
            rect.classList = 'min';
        } else {
            rect.classList = '';
        }
    }
}
