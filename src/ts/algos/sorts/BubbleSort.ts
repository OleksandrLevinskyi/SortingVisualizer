import {SortStrategy} from "../SortStrategy";
import {pause} from "../../utils";
import {Context} from "../../Context";

class BubbleSort implements SortStrategy {
    async sort(arr: Array<number>): Promise<Array<number>> {
        const context = Context.getContext();
        let swapped = false;

        for (let i = arr.length; i > 1; i--) {
            swapped = false;
            for (let j = 1; j < i; j++) {
                await pause(context.speed);
                arr[j - 1].classList = 'curr';
                arr[j].classList = 'curr';
                if (getRectValue(arr[j - 1]) > getRectValue(arr[j])) {
                    await swap(arr, j - 1, j);
                    swapped = true;
                }
                await pause(context.speed);
                arr[j - 1].classList = '';

                context.comparisons++;
                updateNumbers();
            }
            arr[i - 1].classList = 'sorted';
            if (!swapped) break;
        }

        arr.forEach(r => r.classList = 'sorted');
        await pause(context.speed);
        arr.forEach(r => r.classList = '');

        return arr;
    }

    async swap(arr: Array<number>, i: number, j: number, swapClassLists = true) {
        const context = Context.getContext();

        context.arrayAccesses += 2;

        await pause(context.speed);

        let tempVal = getRectValue(arr[i]);
        arr[i].setAttribute('val', getRectValue(arr[j]));
        arr[j].setAttribute('val', tempVal);

        let tempY = arr[i].getAttribute('y');
        arr[i].setAttribute('y', arr[j].getAttribute('y'));
        arr[j].setAttribute('y', tempY);

        let tempHeight = arr[i].getAttribute('height');
        arr[i].setAttribute('height', arr[j].getAttribute('height'));
        arr[j].setAttribute('height', tempHeight);

        if (swapClassLists) {
            let classList1 = "", classList2 = "";
            arr[i].classList.forEach(e => classList1 += e);
            arr[j].classList.forEach(e => classList2 += e);
            arr[i].classList = classList2
            arr[j].classList = classList1;
        }

        if (context.textModeEnabled) {
            let text1 = arr[i].parentNode.querySelector('text');
            let text2 = arr[j].parentNode.querySelector('text');
            let tempText = text1.innerHTML;
            text1.innerHTML = text2.innerHTML;
            text2.innerHTML = tempText;
        }
    }
}