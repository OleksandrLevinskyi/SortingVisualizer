async function quickSort(arr, start = 0, end = arr.length - 1) {
    if (start >= end) return arr;

    let pivotIdx = await placePivot(arr, start, end);
    await quickSort(arr, start, pivotIdx - 1);
    await quickSort(arr, pivotIdx + 1, end);

    if (start == 0 && end == arr.length - 1) {
        arr.forEach(r => r.classList = 'sorted');
        await pause(speed);
        arr.forEach(r => r.classList = '');
    }
}

async function placePivot(arr, start = 0, end = arr.length - 1) {
    arr[start].classList.add('edge');
    arr[end].classList.add('edge');

    let pivotIdx = start, prev;
    for (let i = start + 1; i <= end; i++) {
        await pause(speed);
        arr[i].classList.add('curr');
        if (prev != null) prev.classList.remove('curr');
        prev = arr[i];
        if (getRectValue(arr[start]) > getRectValue(arr[i])) {
            pivotIdx++;
            // await pause(speed);
            // arr[i].classList.add('pivot');
            // arr[pivotIdx].classList.remove('pivot');
            await swap(arr, pivotIdx, i, false);
        }

        comparisons++;
        updateNumbers();
    }
    await pause(speed);
    arr[start].classList.remove('edge');
    arr[end].classList.remove('edge');
    arr[end].classList.remove('curr');

    await pause(speed);
    arr[start].classList.add('pivot');
    arr[pivotIdx].classList.add('pivot');
    await swap(arr, start, pivotIdx, false);

    await pause(speed);
    arr[start].classList.remove('pivot');
    arr[pivotIdx].classList = 'sorted';
    return pivotIdx;
}

module.exports = quickSort;