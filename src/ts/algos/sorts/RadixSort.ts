import {ISortStrategy} from "../ISortStrategy";
import {pause} from "../../utils/utils";
import {Context} from "../../Context";

class RadixSort implements ISortStrategy {
    async sort(arr: Array<number>): Promise<Array<number>> {
        let vals, max, prev, idxs;

        vals = [];
        arr.forEach(r => vals.push(getRectValue(r)));

        max = maxDigitCount(vals);
        prev = null;

        for (let i = 0; i < max; i++) {
            let buckets = Array.from({length: 10}, () => []);
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

    getDigit(num, place) {
        let mod = 10 ** place;
        return Math.floor(Math.abs(num) / mod) % 10;
    }

    digitCount(num) {
        return Math.abs(num).toString().length;
    }

    maxDigitCount(nums) {
        let max = 0;
        for (let i = 0; i < nums.length; i++) {
            max = Math.max(max, digitCount(nums[i]));
        }
        return max;
    }
}
