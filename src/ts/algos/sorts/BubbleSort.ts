import {ISortStrategy} from "../ISortStrategy";
import {changeClassList, getRectValue, pause} from "../../utils/utils";
import {Context} from "../../Context";
import {updateNumbers} from "../../utils/panel_utils";

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
                    await this.swap(arr, j - 1, j);
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

    async swap(arr: Array<any>, i: number, j: number, swapClassLists = true) {
        const context: Context = Context.getContext();

        context.arrayAccesses += 2;

        await pause(context.speed);

        const tempVal = getRectValue(arr[i]);
        arr[i].setAttribute('val', getRectValue(arr[j]));
        arr[j].setAttribute('val', tempVal);

        const tempY = arr[i].getAttribute('y');
        arr[i].setAttribute('y', arr[j].getAttribute('y'));
        arr[j].setAttribute('y', tempY);

        const tempHeight = arr[i].getAttribute('height');
        arr[i].setAttribute('height', arr[j].getAttribute('height'));
        arr[j].setAttribute('height', tempHeight);

        if (swapClassLists) {
            let classList1 = '';
            let classList2 = '';

            arr[i].classList.forEach((e: string) => classList1 += e);
            arr[j].classList.forEach((e: string) => classList2 += e);

            arr[i].classList = classList2
            arr[j].classList = classList1;
        }

        if (context.textModeEnabled) {
            const text1 = arr[i].parentNode.querySelector('text');
            const text2 = arr[j].parentNode.querySelector('text');
            const tempText = text1.innerHTML;

            text1.innerHTML = text2.innerHTML;
            text2.innerHTML = tempText;
        }
    }
}