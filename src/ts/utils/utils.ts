import {Context} from "../Context";
import {MAX_BAR_VALUE} from "../constants";

export function pause(ms: number): Promise<number> {
    return new Promise<number>((resolve: any) => setTimeout(resolve, ms));
}

export function getRectValue(rect: any): number {
    return parseInt(rect.getAttribute('val'))
}

export function getSelectedRadioValue(name: string): string | undefined {
    const buttons: any = document.getElementsByName(name);

    for (let b of buttons) {
        if (b.checked) return b.value;
    }

    return undefined;
}

export function createCustomArray(arr: Array<any>): Array<any> {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = parseInt(arr[i]);
    }

    return arr;
}

export function createRandomArray(arr:Array<any>):Array<any> {
    const context: Context = Context.getContext();
    const newArr = new Array(context.barCount);

    for (let i = 0; i < newArr.length; i++) {
        newArr[i] = Math.round(Math.random() * MAX_BAR_VALUE);
    }

    return newArr;
}

export const changeClassList = (element: Element, classesToAdd: string[] = []) => {
    element.classList.remove(
        'night_mode',
        'curr',
        'edge',
        'middle',
        'sorted',
        'pivot',
        'min',
        'next',
        'hidden'
    );

    element.classList.add(...classesToAdd);
}