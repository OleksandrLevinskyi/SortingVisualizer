import {Descriptions} from "./types";

export const MAX_BAR_COUNT = 200;
export const MAX_BAR_COUNT_WITH_TEXT = 45;
export const MAX_BAR_VALUE = 1000;
export const TOP_PADDING = 20;

export const DESCRIPTIONS: Descriptions = {
    'bubble_sort': "<b>Bubble Sort</b> 'bubbles up' max values on top <br> Time: <i>O(n<sup>2</sup>)</i>; Space: <i>O(1)</i>",
    'selection_sort': "<b>Selection Sort</b> sifts down min values <br> Time: <i>O(n<sup>2</sup>)</i>; Space: <i>O(1)</i>",
    'insertion_sort': "<b>Insertion Sort</b> inserts elements on their spot one by one in the left sorted part <br> Time: <i>O(n<sup>2</sup>)</i>; Space: <i>O(1)</i>",
    'radix_sort': "<b>Radix Sort</b> distributes values in buckets based on their radix; no comparisons <br> Time: <i>O(nk)</i>; Space: <i>O(n + k)</i><span class='data'>, where n - arr length; k - max num of digits</span>",
    'merge_sort': "<b>Merge Sort</b> splits array into 1-element sub-arrays, then merges them together <br> Time: <i>O(nlogn)</i>; Space: <i>O(n)</i>",
    'quick_sort': "<b>Quick Sort</b> selects and places the 'pivots' in correct spots <br> Time: <i>O(n<sup>2</sup>)</i>; Space: <i>O(1)</i>",
    'heap_sort': "<b>Heap Sort</b> exploits max heap <br> Time: <i>O(nlogn)</i>; Space: <i>O(1)</i>"
}