export function pause(ms: number) {
    return new Promise<number>((resolve: any) => setTimeout(resolve, ms));
}

export function getRectValue(rect) {
    return parseInt(rect.getAttribute('val'))
}

export function getSelectedRadioValue(name) {
    var buttons = document.getElementsByName(name);

    for (let b of buttons) {
        if (b.checked) return b.value;
    }

    return undefined;
}

export function createCustomArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = parseInt(arr[i]);
    }
    return arr;
}

// construct a random array
export function createRandomArray(arr) {
    // let numBars = Math.round(Math.random() * 500) + 50; // from 5 to 15
    let numBars = barCount;
    let newArr = new Array(numBars);
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