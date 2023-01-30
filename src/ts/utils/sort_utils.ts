import {Context} from "../Context";
import {getRectValue, pause} from "./utils";

export async function swap(arr: Array<any>, i: number, j: number, swapClassLists = true) {
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