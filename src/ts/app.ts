import {
    changeBarCount,
    generateCustomArray,
    generateRandomArray,
    hideText,
    inputBarCount,
    showText, sort
} from "./utils/panel_utils";
import {Context} from "./Context";
import {changeClassList} from "./utils/utils";
import {MAX_BAR_COUNT, MAX_BAR_COUNT_WITH_TEXT} from "./constants";

document.addEventListener('DOMContentLoaded', () => loadApp());

export const loadApp = () => {
    const context: Context = Context.getContext();

    document.getElementById('bar_count')!.innerText = String(context.barCount);
    document.getElementById('animation_delay')!.innerText = String(context.speed);
    context.svg.setAttribute('height', String(context.height));

    generateRandomArray();
    addEventHandlers();
}

function addEventHandlers() {
    const context: Context = Context.getContext();

    document.getElementById('mode_day')?.addEventListener('click', () => {
        changeClassList(document.querySelector('body')!);
        changeClassList(document.getElementById('values')!);
    });

    document.getElementById('mode_night')?.addEventListener('click', () => {
        changeClassList(document.querySelector('body')!, ['night_mode']);
        changeClassList(document.getElementById('values')!, ['night_mode']);
    });

    document.getElementById('text_true')!.addEventListener('click', () => {
        context.textModeEnabled = true;
        document.getElementById('count')!.setAttribute('max', String(MAX_BAR_COUNT_WITH_TEXT));

        if (context.barCount > MAX_BAR_COUNT_WITH_TEXT) {
            context.barCount = MAX_BAR_COUNT_WITH_TEXT;
            document.getElementById('count')!.setAttribute('value', String(MAX_BAR_COUNT_WITH_TEXT));

            inputBarCount();
            changeBarCount();
        } else {
            showText();
        }
    });

    document.getElementById('text_false')!.addEventListener('click', () => {
        context.textModeEnabled = false;
        document.getElementById('count')!.setAttribute('max', String(MAX_BAR_COUNT));

        hideText();
    });

    document.getElementById('delay')!.addEventListener("input", () => {
        context.speed = parseInt((document.getElementById('delay') as HTMLSelectElement)!.value);
        document.getElementById('animation_delay')!.innerText = String(context.speed);
    });

    document.getElementById('count')!.addEventListener("input", inputBarCount);

    document.getElementById('count')!.addEventListener("change", changeBarCount);

    document.getElementById('apply')!.addEventListener('click', generateCustomArray);
    document.getElementById('generate')!.addEventListener('click', generateRandomArray);
    document.getElementById('sort')!.addEventListener('click', sort);
}