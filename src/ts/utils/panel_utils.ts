import {Context} from "../Context";
import {createCustomArray, createRandomArray, getSelectedRadioValue, pause} from "./utils";
import {DESCRIPTIONS, SORT_TYPES, TOP_PADDING} from "../constants";
import * as d3 from "d3";

export async function sort() {
    const context: Context = Context.getContext();

    context.currArr = Array.from(document.getElementsByTagName('rect'));
    let sortType = getSelectedRadioValue("sort");

    context.comparisons = 0;
    context.arrayAccesses = 0;

    updateDisplayData(sortType);
    updateNumbers();

    enableControls(false);

    await SORT_TYPES[sortType].sort(context.currArr);

    if (sortType === 'merge_sort') {
        context.currArr.forEach((r: any) => r.classList = 'sorted');
        await pause(context.speed);
        context.currArr.forEach((r: any) => r.classList = '');
    }

    updateNumbers();
    enableControls(true);
}

export function findMaxVal(arr: Array<number>): number {
    let max: number = -Infinity;

    for (let elem of arr) {
        max = Math.max(max, elem);
    }

    return max;
}

export function generateCustomArray() {
    const context: Context = Context.getContext();
    let values = d3.select('#values').property('value').trim();
    let nums = values.split(' ');
    let error = false;

    document.getElementById('errors')!.innerText = '';

    if (nums.length < 10 || nums.length > 50 || nums[0] === '') {
        document.getElementById('errors')!.innerText = 'Number of elements must be from 10 to 50';
        return;
    }

    for (let num of nums) {
        if (isNaN(num) || num == '' || num % 1 !== 0 || num < 0) {
            error = true;
            break;
        }
    }

    if (error) {
        document.getElementById('errors')!.innerText = 'Check values for correctness';
    } else {
        let vals = createCustomArray(nums);

        context.barCount = vals.length;
        document.getElementById('count')!.setAttribute('value', String(context.barCount));
        inputBarCount();
        context.barWidth = (context.width + context.barPadding) / context.barCount - context.barPadding;
        draw(vals);

        context.comparisons = 0;
        context.arrayAccesses = 0;

        (document.getElementById('values') as HTMLInputElement)!.value = '';
    }
}

export function generateRandomArray() {
    const context: Context = Context.getContext();
    let vals = createRandomArray();
    draw(vals);

    context.comparisons = 0;
    context.arrayAccesses = 0;
}

export function draw(arr: Array<number>): void {
    const context: Context = Context.getContext();
    context.maxVal = findMaxVal(arr);
    context.svg = d3.select('svg');

    context.yScale = d3.scaleLinear()
        .domain([0, context.maxVal])
        .range([0, context.height - TOP_PADDING]);

    // UPDATE selection
    let updateSelection = context.svg.selectAll('.bar')
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
        .attr('width', context.barWidth)
        .attr('height', (d: any) => context.yScale(d))
        .attr('x', (d: any, i: any) => (context.barWidth + context.barPadding) * i)
        .attr('y', (d: any) => context.height - context.yScale(d))
        .attr('val', (d: any) => d);

    enterSelection.merge(updateSelection)
        .select('text')
        .text((d: any) => d)
        .attr('x', (d: any, i: any) => (context.barWidth + context.barPadding) * i + context.barWidth / 2)
        .attr('y', (d: any) => context.height - 10)
        .attr('text-anchor', 'middle');
}

export function enableControls(enabled: boolean): void {
    document.getElementsByName('sort').forEach((e: any) => e.disabled = !enabled);
    document.getElementsByName('text').forEach((e: any) => e.disabled = !enabled);

    (document.getElementById('sort') as HTMLSelectElement)!.disabled = !enabled;
    (document.getElementById('count') as HTMLSelectElement)!.disabled = !enabled;
    (document.getElementById('generate') as HTMLSelectElement)!.disabled = !enabled;
    (document.getElementById('apply') as HTMLSelectElement)!.disabled = !enabled;
}

export function updateDisplayData(algorithmName: string | null = null, desc = '') {
    if (algorithmName != null) {
        document.getElementById('description')!.innerHTML = DESCRIPTIONS[algorithmName];
    } else {
        document.getElementById('description')!.innerHTML = desc;
    }
}

export function updateNumbers() {
    const context: Context = Context.getContext();

    document.getElementById('comparisons')!.innerHTML = context.comparisons > 0 ? `${context.comparisons}` : `N/A`;
    document.getElementById('array_manipulations')!.innerHTML = context.arrayAccesses > 0 ? `${context.arrayAccesses}` : `N/A`;
}

export function hideText() {
    const textElem: any = document.getElementsByTagName('text');

    for (let t of textElem) {
        t.classList = 'hidden';
    }
}

export function showText() {
    const textElem: any = document.getElementsByTagName('text');

    for (let t of textElem) {
        t.classList = '';
    }
}

export function inputBarCount() {
    const context: Context = Context.getContext();

    context.barCount = parseInt((document.getElementById('count') as HTMLSelectElement)!.value);
    document.getElementById('bar_count')!.innerText = String(context.barCount);
}

export function changeBarCount() {
    const context: Context = Context.getContext();
    const values: Array<number> = createRandomArray();

    context.barWidth = (context.width + context.barPadding) / context.barCount - context.barPadding;
    draw(values);

    context.textModeEnabled ? showText() : hideText();
}