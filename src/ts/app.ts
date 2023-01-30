import {generateRandomArray} from "./utils/panel_utils";
import {Context} from "./Context";

document.addEventListener('DOMContentLoaded', () => loadApp());

export const loadApp = () => {
    const context: Context = Context.getContext();

    document.getElementById('count')!.innerText = String(context.barCount);
    document.getElementById('animation_delay')!.innerText = String(context.speed);
    context.svg.attr('height', context.height);

    generateRandomArray();
    addEventHandlers();
}

function addEventHandlers() {
    const context: Context = Context.getContext();

    document.getElementById('mode_day')?.addEventListener('click', () => {
        document.querySelector('body')!.classList = '';
        document.querySelector('#values').classList = '';
    });

    document.getElementById('mode_night').addEventListener('click', () => {
        document.querySelector('body').classList = 'night_mode';
        document.querySelector('#values').classList = 'night_mode';
    });

    document.getElementById('text_true').addEventListener('click', () => {
        textModeEnabled = true;
        document.getElementById('bar_count').setAttribute('max', MAX_BAR_COUNT_TEXT);
        if (barCount > MAX_BAR_COUNT_TEXT) {
            barCount = MAX_BAR_COUNT_TEXT;
            document.getElementById('bar_count').setAttribute('value', MAX_BAR_COUNT_TEXT);
            inputBarCount();
            changeBarCount();
        } else {
            showText();
        }
    });

    document.getElementById('text_false').addEventListener('click', () => {
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

    document.getElementById('apply').addEventListener('click', generateCustomArray);
    document.getElementById('generate').addEventListener('click', generateRandomArray);
    document.getElementById('sort').addEventListener('click', sort);
}