import {ISortStrategy} from "../ISortStrategy";
import {getRectValue, pause} from "../../utils/utils";
import {Context} from "../../Context";
import {updateNumbers} from "../../utils/panel_utils";

class MergeSort implements ISortStrategy {
    async sort(arr: Array<any>, startIdx = 0): Promise<Array<any>> {
        const context: Context = Context.getContext();
        let middle = Math.floor(arr.length / 2);

        if (middle == 0) {
            return arr;
        }

        let left = await this.sort(arr.slice(0, middle), startIdx);
        let right = await this.sort(arr.slice(middle), startIdx + middle);

        return await this.merge(left, right, startIdx);
    }

    async merge(arr1: Array<any>, arr2: Array<any>, startIdx: number): Promise<Array<any>> {
        const context: Context = Context.getContext();

        let arr: Array<any> = [];
        let vals: Array<number> = [];
        let prev: any = null;
        let i: number = 0;
        let j: number = 0;
        let middleIdx: number = startIdx + arr1.length;
        let endIdx: number = startIdx + arr1.length + arr2.length - 1;

        await pause(context.speed);
        context.currArr[startIdx].classList = 'sorted'; // select the current one
        context.currArr[middleIdx].classList = 'curr'; // select the current one
        context.currArr[endIdx].classList = 'sorted'; // select the current one

        while (i < arr1.length && j < arr2.length) {
            await pause(context.speed);
            if (prev != null) this.resetColorMergeSort(prev, context.currArr, startIdx, endIdx, middleIdx); // de-select old one
            if (getRectValue(arr1[i]) <= getRectValue(arr2[j])) {
                arr1[i].classList = 'next'; // select the current one
                arr.push(arr1[i]);

                prev = arr1[i];
                i++;
            } else {
                arr2[j].classList = 'next'; // select the current one
                arr.push(arr2[j]);

                prev = arr2[j];
                j++;
            }

            context.comparisons++;
            updateNumbers();
        }

        while (i < arr1.length) {
            await pause(context.speed);
            if (prev != null) {
                this.resetColorMergeSort(prev, context.currArr, startIdx, endIdx, middleIdx); // de-select old one
            }
            arr1[i].classList = 'next'; // select the current one
            arr.push(arr1[i]);

            prev = arr1[i];
            i++;
        }

        while (j < arr2.length) {
            await pause(context.speed);
            if (prev != null) this.resetColorMergeSort(prev, context.currArr, startIdx, endIdx, middleIdx); // de-select old one
            // arr2[j == 0 ? j : j - 1].classList = ''; // de-select old one
            arr2[j].classList = 'next'; // select the current one
            arr.push(arr2[j]);

            prev = arr2[j];
            j++;
        }

        arr.forEach(e => vals.push(getRectValue(e)));

        for (let a = startIdx; a < arr.length + startIdx; a++) {
            await pause(context.speed);
            let idx = a - startIdx;

            if (prev != null) this.resetColorMergeSort(prev, context.currArr, startIdx, endIdx, middleIdx); // de-select old one

            let newHeight = context.yScale(vals[idx]);
            context.currArr[a].setAttribute('height', newHeight);
            context.currArr[a].setAttribute('y', context.height - newHeight);
            context.currArr[a].setAttribute('val', vals[idx]);
            context.currArr[a].parentNode.querySelector('text').innerHTML = vals[idx];
            arr[idx] = context.currArr[a];
            context.currArr[a].classList = 'next'; // select the current one

            prev = context.currArr[a];

            context.arrayAccesses++;
            updateNumbers();
        }

        await pause(context.speed);
        context.currArr[startIdx].classList = ''; // select the current one
        context.currArr[middleIdx].classList = ''; // select the current one
        context.currArr[endIdx].classList = ''; // select the current one

        return arr;
    }

    resetColorMergeSort(rect: any, currArr: Array<any>, startIdx: number, endIdx: number, middleIdx: number): void {
        if (rect == currArr[startIdx] || rect == currArr[endIdx]) {
            rect.classList = 'sorted';
        } else if (rect == currArr[middleIdx]) {
            rect.classList = 'curr';
        } else {
            rect.classList = '';
        }
    }
}
