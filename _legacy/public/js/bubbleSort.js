async function bubbleSort(arr) {
    let swapped = false;

    for (let i = arr.length; i > 1; i--) {
        swapped = false;
        for (let j = 1; j < i; j++) {
            await pause(speed);
            arr[j - 1].classList = 'curr';
            arr[j].classList = 'curr';
            if (getRectValue(arr[j - 1]) > getRectValue(arr[j])) {
                await swap(arr, j - 1, j);
                swapped = true;
            }
            await pause(speed);
            arr[j - 1].classList = '';

            comparisons++;
            updateNumbers();
        }
        arr[i - 1].classList = 'sorted';
        if (!swapped) break;
    }

    arr.forEach(r => r.classList = 'sorted');
    await pause(speed);
    arr.forEach(r => r.classList = '');

    return arr;
}

module.exports = bubbleSort;