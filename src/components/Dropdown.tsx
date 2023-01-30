import type {Component} from 'solid-js';

const Dropdown: Component = () => {
    return (
            <div class="btn-group w-100" role="group" aria-label="algorithms">
                <select class="w-75" name="sort" id="sort">
                    <option value="bubble_sort">Bubble Sort</option>
                    <option value="selection_sort">Selection Sort</option>
                    <option value="insertion_sort">Insertion Sort</option>
                    <option value="radix_sort">Radix Sort</option>
                    <option value="merge_sort">Merge Sort</option>
                    <option value="quick_sort">Quick Sort</option>
                    <option value="heap_sort">Heap Sort</option>
                </select>
                <button type="button" class="btn btn-primary" id="sort">Launch Algorithm</button>
            </div>
    );
};

export default Dropdown;
