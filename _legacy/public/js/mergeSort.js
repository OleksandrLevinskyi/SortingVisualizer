async function mergeSort(arr, startIdx = 0) {
    let middle = Math.floor(arr.length / 2);
    if (middle == 0) return arr;

    let left = await mergeSort(arr.slice(0, middle), startIdx);
    let right = await mergeSort(arr.slice(middle), startIdx + middle);

    return await merge(left, right, startIdx);
}

async function merge(arr1, arr2, startIdx) {
    let arr = [], vals = [],
        prev = null,
        i = 0, j = 0,
        middleIdx = startIdx + arr1.length,
        endIdx = startIdx + arr1.length + arr2.length - 1;

    await pause(speed);
    currArr[startIdx].classList = 'sorted'; // select the current one
    currArr[middleIdx].classList = 'curr'; // select the current one
    currArr[endIdx].classList = 'sorted'; // select the current one


    while (i < arr1.length && j < arr2.length) {
        await pause(speed);
        if (prev != null) resetColorMergeSort(prev, currArr, startIdx, endIdx, middleIdx); // de-select old one
        if (getRectValue(arr1[i]) <= getRectValue(arr2[j])) {
            arr1[i].classList = 'next'; // select the current one
            arr.push(arr1[i]);

            prev = arr1[i];
            i++;
        }
        else {
            arr2[j].classList = 'next'; // select the current one
            arr.push(arr2[j]);

            prev = arr2[j];
            j++;
        }

        comparisons++;
        updateNumbers();
    }

    while (i < arr1.length) {
        await pause(speed);
        if (prev != null) resetColorMergeSort(prev, currArr, startIdx, endIdx, middleIdx); // de-select old one
        // arr1[i == 0 ? i : i - 1].classList = ''; // de-select old one
        arr1[i].classList = 'next'; // select the current one
        arr.push(arr1[i]);

        prev = arr1[i];
        i++;
    }

    while (j < arr2.length) {
        await pause(speed);
        if (prev != null) resetColorMergeSort(prev, currArr, startIdx, endIdx, middleIdx); // de-select old one
        // arr2[j == 0 ? j : j - 1].classList = ''; // de-select old one
        arr2[j].classList = 'next'; // select the current one
        arr.push(arr2[j]);

        prev = arr2[j];
        j++;
    }

    arr.forEach(e => vals.push(getRectValue(e)));

    for (let a = startIdx; a < arr.length + startIdx; a++) {
        await pause(speed);
        let idx = a - startIdx;

        if (prev != null) resetColorMergeSort(prev, currArr, startIdx, endIdx, middleIdx); // de-select old one

        let newHeight = yScale(vals[idx]);
        currArr[a].setAttribute('height', newHeight);
        currArr[a].setAttribute('y', height - newHeight);
        currArr[a].setAttribute('val', vals[idx]);
        currArr[a].parentNode.querySelector('text').innerHTML = vals[idx];
        arr[idx] = currArr[a];
        currArr[a].classList = 'next'; // select the current one

        prev = currArr[a];

        arrayAccesses++;
        updateNumbers();
    }

    await pause(speed);
    currArr[startIdx].classList = ''; // select the current one
    currArr[middleIdx].classList = ''; // select the current one
    currArr[endIdx].classList = ''; // select the current one


    return arr;
}

function resetColorMergeSort(rect, currArr, startIdx, endIdx, middleIdx) {
    if (rect == currArr[startIdx] || rect == currArr[endIdx]) {
        rect.classList = 'sorted';
    }
    else if (rect == currArr[middleIdx]) {
        rect.classList = 'curr';
    }
    else {
        rect.classList = '';
    }
}

module.exports = mergeSort;