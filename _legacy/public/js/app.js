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
});