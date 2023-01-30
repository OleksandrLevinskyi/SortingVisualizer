export async function sort() {
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

export function findMaxVal(arr) {
    let max = -Infinity;
    for (let elem of arr) {
        max = Math.max(max, elem);
    }
    return max;
}

export function generateCustomArray() {
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

export function generateRandomArray() {
    let vals = createRandomArray();
    draw(vals);

    comparisons = 0;
    arrayAccesses = 0;
}

export function draw(arr) {
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

export function enableControls(enabled) {
    document.getElementsByName('sort').forEach(e => e.disabled = !enabled);
    document.getElementsByName('text').forEach(e => e.disabled = !enabled);

    document.getElementById('sort').disabled = !enabled;
    document.getElementById('bar_count').disabled = !enabled;
    document.getElementById('generate').disabled = !enabled;
    document.getElementById('apply').disabled = !enabled;
}

export function updateDisplayData(algorithmName = null, desc = null) {
    if (algorithmName != null) document.getElementById('description').innerHTML = descriptions[algorithmName];
    else document.getElementById('description').innerHTML = desc;
}

export function updateNumbers() {
    document.getElementById('comparisons').innerHTML = comparisons > 0 ? `${comparisons}` : `N/A`;

    document.getElementById('array_manipulations').innerHTML = arrayAccesses > 0 ? `${arrayAccesses}` : `N/A`;
}

export function hideText() {
    let textElem = document.getElementsByTagName('text');
    for (let t of textElem) {
        t.classList = 'hidden';
    }
}

export function showText() {
    let textElem = document.getElementsByTagName('text');
    for (let t of textElem) {
        t.classList = '';
    }
}

export function inputBarCount() {
    barCount = parseInt(document.getElementById('bar_count').value);
    document.getElementById('count').innerText = barCount;
}

export function changeBarCount() {
    let vals = createRandomArray();
    barWidth = (width + barPadding) / barCount - barPadding;
    draw(vals);

    textModeEnabled ? showText() : hideText();
}