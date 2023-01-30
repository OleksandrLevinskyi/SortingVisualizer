import {ISortStrategy} from "../ISortStrategy";
import {getRectValue, pause} from "../../utils/utils";
import {Context} from "../../Context";
import {updateNumbers} from "../../utils/panel_utils";

class RadixSort implements ISortStrategy {
    async sort(arr: Array<any>): Promise<Array<any>> {
        const context: Context = Context.getContext();
        let vals: Array<number>;
        let max: number;
        let prev: any;
        let idxs: Array<number>;

        vals = [];
        arr.forEach(r => vals.push(getRectValue(r)));

        max = this.maxDigitCount(vals);
        prev = null;

        for (let i = 0; i < max; i++) {
            let buckets: Array<any> = Array.from({length: 10}, () => []);
            for (let j = 0; j < arr.length; j++) {
                let num = getRectValue(arr[j]);
                buckets[this.getDigit(num, i)].push(arr[j]);

                await pause(context.speed);
                if (prev != null) {
                    prev.classList = '';
                }
                arr[j].classList = 'curr';

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
                await pause(context.speed);
                if (prev != null) prev.classList.remove('curr');

                let newHeight = context.yScale(vals[a]);
                context.currArr[a].setAttribute('height', newHeight);
                context.currArr[a].setAttribute('y', context.height - newHeight);
                context.currArr[a].setAttribute('val', vals[a]);
                context.currArr[a].parentNode.querySelector('text').innerHTML = vals[a];
                context.currArr[a].classList.add('curr'); // select the current one
                if (idxs.includes(a)) context.currArr[a].classList.add('edge'); // includes(a) is always O(1) since idxs.length max value is 10

                arr[a] = context.currArr[a];

                prev = context.currArr[a];

                context.arrayAccesses++;
                updateNumbers();
            }
        }

        arr.forEach(r => r.classList = 'sorted');
        await pause(context.speed);
        arr.forEach(r => r.classList = '');

        return arr;
    }

    getDigit(num: number, place: number): number {
        let mod = 10 ** place;
        return Math.floor(Math.abs(num) / mod) % 10;
    }

    digitCount(num: number): number {
        return Math.abs(num).toString().length;
    }

    maxDigitCount(nums: Array<number>): number {
        let max = 0;
        for (let i = 0; i < nums.length; i++) {
            max = Math.max(max, this.digitCount(nums[i]));
        }
        return max;
    }
}
