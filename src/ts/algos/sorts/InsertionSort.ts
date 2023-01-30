import {ISortStrategy} from "../ISortStrategy";
import {getRectValue, pause} from "../../utils/utils";
import {Context} from "../../Context";
import {swap} from "../../utils/sort_utils";
import {updateNumbers} from "../../utils/panel_utils";

class InsertionSort implements ISortStrategy {
    async sort(arr: Array<any>): Promise<Array<any>> {
        const context: Context = Context.getContext();

        arr[0].classList = 'sorted';

        for (let i = 1; i < arr.length; i++) {
            await pause(context.speed);
            arr[i].classList = 'next'; // make next

            for (let j = i - 1; j >= 0; j--) {
                await pause(context.speed);
                arr[j].classList = 'curr'; // make current

                if (getRectValue(arr[j]) > getRectValue(arr[j + 1])) {
                    await swap(arr, j, j + 1);
                    await pause(context.speed);

                    arr[j + 1].classList = 'sorted';

                    if (j === 0) {
                        arr[j].classList = 'sorted';
                    }
                } else {
                    await pause(context.speed);

                    arr[j].classList = 'sorted';
                    arr[j + 1].classList = 'sorted';

                    break;
                }

                context.comparisons++;
                updateNumbers();
            }
        }

        await pause(context.speed);
        arr.forEach(r => r.classList = '');

        return arr;
    }
}