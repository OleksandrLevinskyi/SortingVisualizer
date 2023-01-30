import {ISortStrategy} from "../ISortStrategy";
import {changeClassList, getRectValue, pause} from "../../utils/utils";
import {Context} from "../../Context";
import {updateNumbers} from "../../utils/panel_utils";
import {swap} from "../../utils/sort_utils";

class BubbleSort implements ISortStrategy {
    async sort(arr: Array<any>): Promise<Array<any>> {
        const context: Context = Context.getContext();
        let swapped = false;

        for (let i = arr.length; i > 1; i--) {
            swapped = false;
            for (let j = 1; j < i; j++) {
                await pause(context.speed);

                changeClassList(arr[j - 1], ['curr']);
                changeClassList(arr[j], ['curr']);

                if (getRectValue(arr[j - 1]) > getRectValue(arr[j])) {
                    await swap(arr, j - 1, j);
                    swapped = true;
                }

                await pause(context.speed);
                changeClassList(arr[j - 1]);

                context.comparisons++;
                updateNumbers();
            }

            changeClassList(arr[i - 1], ['sorted']);

            if (!swapped) {
                break;
            }
        }

        arr.forEach(r => changeClassList(r, ['sorted']));
        await pause(context.speed);
        arr.forEach(r => changeClassList(r));

        return arr;
    }
}