document.addEventListener('DOMContentLoaded', () => {
    const MAX_BAR_COUNT = 200,
        MAX_BAR_COUNT_TEXT = 45,
        MAX_BAR_VALUE = 1000,
        TOP_PADDING = 20;

    let currArr, sortFinished, textModeEnabled, svg, width, height,
        speed, comparisons, arrayAccesses, descriptions,
        barCount, barPadding, barWidth, maxVal, yScale;

    sortFinished = false;
    textModeEnabled = true;
    svg = document.querySelector('svg');
    width = parseInt(window.getComputedStyle(svg).getPropertyValue('width'));
    height = window.innerHeight * .7;
    barCount = parseInt(document.getElementById('bar_count').value);
    // barWidth = width / barCount;
    barPadding = 1;
    barWidth = (width + barPadding) / barCount - barPadding;
    speed = parseInt(document.getElementById('delay').value);
    comparisons = 0;
    arrayAccesses = 0;
    descriptions = {
        'bubble_sort': "<b>Bubble Sort</b> 'bubbles up' max values on top <br> Time: <i>O(n<sup>2</sup>)</i>; Space: <i>O(1)</i>",
        'selection_sort': "<b>Selection Sort</b> sifts down min values <br> Time: <i>O(n<sup>2</sup>)</i>; Space: <i>O(1)</i>",
        'insertion_sort': "<b>Insertion Sort</b> inserts elements on their spot one by one in the left sorted part <br> Time: <i>O(n<sup>2</sup>)</i>; Space: <i>O(1)</i>",
        'radix_sort': "<b>Radix Sort</b> distributes values in buckets based on their radix; no comparisons <br> Time: <i>O(nk)</i>; Space: <i>O(n + k)</i><span class='data'>, where n - arr length; k - max num of digits</span>",
        'merge_sort': "<b>Merge Sort</b> splits array into 1-element sub-arrays, then merges them together <br> Time: <i>O(nlogn)</i>; Space: <i>O(n)</i>",
        'quick_sort': "<b>Quick Sort</b> selects and places the 'pivots' in correct spots <br> Time: <i>O(n<sup>2</sup>)</i>; Space: <i>O(1)</i>",
        'heap_sort': "<b>Heap Sort</b> exploits max heap <br> Time: <i>O(nlogn)</i>; Space: <i>O(1)</i>"
    }

    // PRELOADED ARRAY ==============================================
    svg = d3.select('svg');

    generateRandomArray();

    // EVENT HANDLERS ============================================================
    document.getElementById('count').innerText = barCount;
    document.getElementById('animation_delay').innerText = speed;
    svg.attr('height', height);

    d3.select('#mode_day').on('click', () => {
        document.querySelector('body').classList = '';
        document.querySelector('#values').classList = '';
    });

    d3.select('#mode_night').on('click', () => {
        document.querySelector('body').classList = 'night_mode';
        document.querySelector('#values').classList = 'night_mode';
    });



    d3.select('#text_true').on('click', () => {
        textModeEnabled = true;
        document.getElementById('bar_count').setAttribute('max', MAX_BAR_COUNT_TEXT);
        if (barCount > MAX_BAR_COUNT_TEXT) {
            barCount = MAX_BAR_COUNT_TEXT;
            document.getElementById('bar_count').setAttribute('value', MAX_BAR_COUNT_TEXT);
            inputBarCount();
            changeBarCount();
        }
        else {
            showText();
        }
    });

    d3.select('#text_false').on('click', () => {
        textModeEnabled = false;
        document.getElementById('bar_count').setAttribute('max', MAX_BAR_COUNT);

        hideText();
    });



    document.getElementById('delay').addEventListener("input", () => {
        speed = parseInt(document.getElementById('delay').value);
        document.getElementById('animation_delay').innerText = speed;
    });

    document.getElementById('bar_count').addEventListener("input", inputBarCount);

    document.getElementById('bar_count').addEventListener("change", changeBarCount);

    function inputBarCount() {
        barCount = parseInt(document.getElementById('bar_count').value);
        document.getElementById('count').innerText = barCount;
    }

    function changeBarCount() {
        let vals = createRandomArray();
        barWidth = (width + barPadding) / barCount - barPadding;
        draw(vals);

        textModeEnabled ? showText() : hideText();
    }

    // generate a new CUSTOM array
    document.getElementById('apply')
        .addEventListener('click', generateCustomArray);

    // generate a new RANDOM array
    document.getElementById('generate')
        .addEventListener('click', generateRandomArray);

    // sort button
    document.getElementById('sort')
        .addEventListener('click', sort);

    document.getElementsByName('sort').forEach(e => e.addEventListener('click', generateRandomArray));


    function hideText() {
        let textElem = document.getElementsByTagName('text');
        for (let t of textElem) {
            t.classList = 'hidden';
        }
    }

    function showText() {
        let textElem = document.getElementsByTagName('text');
        for (let t of textElem) {
            t.classList = '';
        }
    }

    // construct array of object from array of integers
    function createCustomArray(arr) {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = parseInt(arr[i]);
        }
        return arr;
    }

    function enableControls(enabled) {
        document.getElementsByName('sort').forEach(e => e.disabled = !enabled);
        document.getElementsByName('text').forEach(e => e.disabled = !enabled);

        document.getElementById('sort').disabled = !enabled;
        document.getElementById('bar_count').disabled = !enabled;
        document.getElementById('generate').disabled = !enabled;
        document.getElementById('apply').disabled = !enabled;
    }

    function updateDisplayData(algorithmName = null, desc = null) {
        if (algorithmName != null) document.getElementById('description').innerHTML = descriptions[algorithmName];
        else document.getElementById('description').innerHTML = desc;
    }

    function updateNumbers() {
        document.getElementById('comparisons').innerHTML = comparisons > 0 ? `${comparisons}` : `N/A`;

        document.getElementById('array_manipulations').innerHTML = arrayAccesses > 0 ? `${arrayAccesses}` : `N/A`;
    }

    // construct a random array
    function createRandomArray(arr) {
        // let numBars = Math.round(Math.random() * 500) + 50; // from 5 to 15
        let numBars = barCount;
        let newArr = new Array(numBars);
        for (let i = 0; i < newArr.length; i++) {
            newArr[i] = Math.round(Math.random() * MAX_BAR_VALUE);
        }
        return newArr;
    }


    // UTILITY METHODS ============================================================
    async function sort() {
        currArr = Array.from(document.getElementsByTagName('rect'));
        // drop-down
        let sortType = getSelectedRadioValue("sort");

        comparisons = 0;
        arrayAccesses = 0;

        updateDisplayData(sortType);
        updateNumbers();

        enableControls(false);

        if (sortType === 'bubble_sort') {
            await bubbleSort(currArr);
        } else if (sortType === 'selection_sort') {
            await selectionSort(currArr);
        } else if (sortType === 'insertion_sort') {
            await insertionSort(currArr);
        } else if (sortType === 'merge_sort') {
            await mergeSort(currArr);
            currArr.forEach(r => r.classList = 'sorted');
            await pause(speed);
            currArr.forEach(r => r.classList = '');
        } else if (sortType === 'quick_sort') {
            await quickSort(currArr);
        } else if (sortType === 'radix_sort') {
            await radixSort(currArr);
        } else if (sortType === 'heap_sort') {
            await heapSort(currArr);
        }

        updateNumbers();
        enableControls(true);
    }

    function findMaxVal(arr) {
        let max = -Infinity;
        for (let elem of arr) {
            max = Math.max(max, elem);
        }
        return max;
    }

    function generateCustomArray() {
        let values = d3.select('#values').property('value').trim();
        let nums = values.split(' ');
        let error = false;

        document.getElementById('errors').innerText = '';

        if (nums.length < 10 || nums.length > 50 || nums[0] === '') {
            document.getElementById('errors').innerText = 'Number of elements must be from 10 to 50';
            return;
        }

        for (let num of nums) {
            if (isNaN(num) || num == '' || num % 1 !== 0 || num < 0) {
                error = true;
                break;
            }
        }

        if (error) {
            document.getElementById('errors').innerText = 'Check values for correctness';
        } else {
            let vals = createCustomArray(nums);

            barCount = vals.length;
            document.getElementById('bar_count').setAttribute('value', barCount);
            inputBarCount();
            barWidth = (width + barPadding) / barCount - barPadding;
            draw(vals);

            comparisons = 0;
            arrayAccesses = 0;

            document.getElementById('values').value = '';
        }
    }

    function generateRandomArray() {
        let vals = createRandomArray();
        draw(vals);

        comparisons = 0;
        arrayAccesses = 0;
    }

    function draw(arr) {
        maxVal = findMaxVal(arr);

        yScale = d3.scaleLinear()
            .domain([0, maxVal])
            .range([0, height - TOP_PADDING]);

        // UPDATE selection
        let updateSelection = svg.selectAll('.bar')
            .data(arr);

        // EXIT selection
        updateSelection.exit()
            .remove();

        // ENTER selection
        let enterSelection = updateSelection
            .enter()
            .append('g')
            .classed('bar', true);

        enterSelection.append('rect');
        enterSelection.append('text');

        enterSelection.merge(updateSelection)
            .select('rect')
            .attr('width', barWidth)
            .attr('height', d => yScale(d))
            .attr('x', (d, i) => (barWidth + barPadding) * i)
            .attr('y', d => height - yScale(d))
            .attr('val', d => d);

        enterSelection.merge(updateSelection)
            .select('text')
            .text(d => d)
            .attr('x', (d, i) => (barWidth + barPadding) * i + barWidth / 2)
            .attr('y', d => height - 10)
            .attr('text-anchor', 'middle');
    }



    function pause(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function getRectValue(rect) {
        return parseInt(rect.getAttribute('val'))
    }

    function getSelectedRadioValue(name) {
        var buttons = document.getElementsByName(name);

        for (let b of buttons) {
            if (b.checked) return b.value;
        }

        return undefined;
    }





    // SORTING ALGORITHMS ========================================================================================================================================================================================================================== 
    // BUBBLE SORT =============================================================================================================
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

    async function swap(arr, i, j, swapClassLists = true) {
        arrayAccesses += 2;

        await pause(speed);

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

        if (textModeEnabled) {
            let text1 = arr[i].parentNode.querySelector('text');
            let text2 = arr[j].parentNode.querySelector('text');
            let tempText = text1.innerHTML;
            text1.innerHTML = text2.innerHTML;
            text2.innerHTML = tempText;
        }
    }





    // SELECTION SORT ==========================================================================================================
    async function selectionSort(arr) {
        let minIdx = 0,
            prev = null;


        for (let i = 0; i < arr.length - 1; i++) {
            await pause(speed);
            minIdx = i;
            arr[minIdx].classList = 'min'; // track min

            for (let j = i + 1; j < arr.length; j++) {
                await pause(speed);
                if (prev != null) resetColorSelectionSort(prev, currArr, minIdx);
                arr[j].classList = 'curr'; // make current

                if (getRectValue(arr[j]) < getRectValue(arr[minIdx])) {
                    await pause(speed);
                    arr[minIdx].classList = '';
                    minIdx = j;
                    arr[minIdx].classList = 'min'; // track min
                }

                prev = arr[j];

                comparisons++;
                updateNumbers();
            }

            await pause(speed);
            if (prev != null) resetColorSelectionSort(prev, currArr, minIdx);

            if (i != minIdx) {
                arr[i].classList = 'min';
                await swap(arr, i, minIdx);
                arr[i].classList = '';
                arr[minIdx].classList = '';

                updateNumbers();
            }

            arr[i].classList = 'sorted'; // make sorted
        }

        arr[arr.length - 1].classList = 'sorted';
        await pause(speed);
        arr.forEach(r => r.classList = '');

        return arr;
    }

    function resetColorSelectionSort(rect, currArr, minIdx) {
        if (rect == currArr[minIdx]) {
            rect.classList = 'min';
        }
        else {
            rect.classList = '';
        }
    }





    // INSERTION SORT ==========================================================================================================
    async function insertionSort(arr) {
        arr[0].classList = 'sorted';

        for (let i = 1; i < arr.length; i++) {
            await pause(speed);
            arr[i].classList = 'next'; // make next

            for (let j = i - 1; j >= 0; j--) {
                await pause(speed);
                arr[j].classList = 'curr'; // make current

                if (getRectValue(arr[j]) > getRectValue(arr[j + 1])) {
                    await swap(arr, j, j + 1);
                    // arr[j].classList = 'next';
                    // arr[j + 1].classList = 'curr';
                    await pause(speed);
                    arr[j + 1].classList = 'sorted';
                    if (j === 0) {
                        // await pause(speed);
                        arr[j].classList = 'sorted'; // make sorted
                    }
                } else {
                    await pause(speed);
                    arr[j].classList = 'sorted'; // make sorted
                    arr[j + 1].classList = 'sorted'; // make sorted
                    break;
                }

                comparisons++;
                updateNumbers();
            }
        }

        await pause(speed);
        arr.forEach(r => r.classList = '');

        return arr;
    }





    // MERGE SORT ==============================================================================================================
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





    // QUICK SORT ==============================================================================================================
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





    // RADIX SORT ==============================================================================================================
    async function radixSort(arr) {
        let vals, max, prev, idxs;

        vals = [];
        arr.forEach(r => vals.push(getRectValue(r)));

        max = maxDigitCount(vals);
        prev = null;

        for (let i = 0; i < max; i++) {
            let buckets = Array.from({ length: 10 }, () => []);
            for (let j = 0; j < arr.length; j++) {
                let num = getRectValue(arr[j]);
                buckets[getDigit(num, i)].push(arr[j]);

                await pause(speed);
                if (prev != null) prev.classList = '';
                arr[j].classList = 'curr'; // select the current one

                prev = arr[j];
            }

            idxs = [];
            buckets.forEach(e => {
                if (e.length > 0) {
                    idxs.length == 0 ? idxs.push(e.length - 1) : idxs.push(idxs[idxs.length - 1] + e.length);
                }
            });

            arr = [].concat(...buckets);

            vals = [];
            arr.forEach(e => vals.push(getRectValue(e)));

            for (let a = 0; a < arr.length; a++) {
                await pause(speed);
                if (prev != null) prev.classList.remove('curr');

                let newHeight = yScale(vals[a]);
                currArr[a].setAttribute('height', newHeight);
                currArr[a].setAttribute('y', height - newHeight);
                currArr[a].setAttribute('val', vals[a]);
                currArr[a].parentNode.querySelector('text').innerHTML = vals[a];
                currArr[a].classList.add('curr'); // select the current one
                if (idxs.includes(a)) currArr[a].classList.add('edge'); // includes(a) is always O(1) since idxs.length max value is 10

                arr[a] = currArr[a];

                prev = currArr[a];

                arrayAccesses++;
                updateNumbers();
            }
        }

        arr.forEach(r => r.classList = 'sorted');
        await pause(speed);
        arr.forEach(r => r.classList = '');

        return arr;
    }

    function getDigit(num, place) {
        let mod = 10 ** place;
        return Math.floor(Math.abs(num) / mod) % 10;
    }

    function digitCount(num) {
        return Math.abs(num).toString().length;
    }

    function maxDigitCount(nums) {
        let max = 0;
        for (let i = 0; i < nums.length; i++) {
            max = Math.max(max, digitCount(nums[i]));
        }
        return max;
    }





    // HEAP SORT ===============================================================================================================
    async function heapSort(arr) {
        let n = arr.length;
        let a = Math.floor(n / 2) - 1; // idx of the first element with children
        let bound = 1;
        let currClass = 'edge';

        for (let i = 0; i < arr.length; i++) {
            arr[i].classList = currClass;
            if (i + 1 == bound) {
                bound *= 2;
                currClass = currClass == '' ? 'edge' : '';
            }
        }

        // build heap
        for (let i = a; i >= 0; i--) {
            await heapify(arr, n, i);
        }

        // extract elements from heap
        for (let i = n - 1; i > 0; i--) {
            await swap(arr, 0, i, false);
            arr[i].classList = 'sorted';

            updateNumbers();

            await heapify(arr, i, 0);
        }

        arr[0].classList = 'sorted';
        await pause(speed);
        arr.forEach(r => r.classList = '');
    }

    // i - root idx
    async function heapify(arr, n, i) {
        let maxIdx = i; // make max as a root
        let leftIdx = 2 * i + 1;
        let rightIdx = 2 * i + 2;

        // If left child is larger than root
        if (leftIdx < n && getRectValue(arr[leftIdx]) > getRectValue(arr[maxIdx])) {
            maxIdx = leftIdx;
        }

        if (rightIdx < n && getRectValue(arr[rightIdx]) > getRectValue(arr[maxIdx])) {
            maxIdx = rightIdx;
        }

        comparisons += 2

        if (maxIdx != i) {
            arr[maxIdx].classList.add('curr');
            arr[i].classList.add('curr');
            await swap(arr, i, maxIdx, false);
            arr[maxIdx].classList.remove('curr');
            arr[i].classList.remove('curr');

            await heapify(arr, n, maxIdx); // heapify the whole subtree
        }

        updateNumbers();
    }
});