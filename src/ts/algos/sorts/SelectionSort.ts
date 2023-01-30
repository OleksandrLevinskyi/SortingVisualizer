import {ISortStrategy} from "../ISortStrategy";
import {getRectValue, pause} from "../../utils/utils";
import {Context} from "../../Context";
import {updateNumbers} from "../../utils/panel_utils";
import {swap} from "../../utils/sort_utils";

export class SelectionSort implements ISortStrategy {
    async sort(arr: Array<any>): Promise<Array<any>> {
        const context: Context = Context.getContext();
        let minIdx: number = 0
        let prev: any = null;

        for (let i = 0; i < arr.length - 1; i++) {
            await pause(context.speed);
            minIdx = i;
            arr[minIdx].classList = 'min'; // track min

            for (let j = i + 1; j < arr.length; j++) {
                await pause(context.speed);
                if (prev != null) this.resetColorSelectionSort(prev, context.currArr, minIdx);
                arr[j].classList = 'curr'; // make current

                if (getRectValue(arr[j]) < getRectValue(arr[minIdx])) {
                    await pause(context.speed);
                    arr[minIdx].classList = '';
                    minIdx = j;
                    arr[minIdx].classList = 'min'; // track min
                }

                prev = arr[j];

                context.comparisons++;
                updateNumbers();
            }

            await pause(context.speed);
            if (prev != null) this.resetColorSelectionSort(prev, context.currArr, minIdx);

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
        await pause(context.speed);
        arr.forEach(r => r.classList = '');

        return arr;
    }

    resetColorSelectionSort(rect: any, currArr: Array<any>, minIdx: number): void {
        if (rect == currArr[minIdx]) {
            rect.classList = 'min';
        } else {
            rect.classList = '';
        }
    }
}
