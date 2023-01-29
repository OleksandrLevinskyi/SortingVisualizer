import {SortStrategy} from "../SortStrategy";
import {pause} from "../../utils";
import {Context} from "../../Context";

class InsertionSort implements SortStrategy {
    async sort(arr: Array<number>): Promise<Array<number>> {
        arr[0].classList = 'sorted';

        for (let i = 1; i < arr.length; i++) {
            await pause(speed);
            arr[i].classList = 'next'; // make next

            for (let j = i - 1; j >= 0; j--) {
                await pause(speed);
                arr[j].classList = 'curr'; // make current

                if (getRectValue(arr[j]) > getRectValue(arr[j + 1])) {
                    await swap(arr, j, j + 1);
                    // arr[j].classList = 'next';
                    // arr[j + 1].classList = 'curr';
                    await pause(speed);
                    arr[j + 1].classList = 'sorted';
                    if (j === 0) {
                        // await pause(speed);
                        arr[j].classList = 'sorted'; // make sorted
                    }
                } else {
                    await pause(speed);
                    arr[j].classList = 'sorted'; // make sorted
                    arr[j + 1].classList = 'sorted'; // make sorted
                    break;
                }

                comparisons++;
                updateNumbers();
            }
        }

        await pause(speed);
        arr.forEach(r => r.classList = '');

        return arr;
    }
}