document.addEventListener('DOMContentLoaded', () => {
    let currArr, sortFinished, svg, width, height,
        speed, currObstacle,
        comparisons, arrayAccesses, descriptions;

    sortFinished = false;
    svg = document.querySelector('svg');
    width = parseInt(window.getComputedStyle(svg).getPropertyValue('width'));
    height = window.innerHeight * .7;
    barCount = parseInt(document.getElementById('bar_count').value);
    barWidth = width / barCount;
    speed = parseInt(document.getElementById('delay').value);
    comparisons = 0;
    arrayAccesses = 0;
    descriptions = {
        'bubble_sort': "",
        'selection_sort': "",
        'insertion_sort': "",
        'radix_sort': "",
        'merge_sort': "",
        'quick_sort': "",
        'heap_sort': ""
    }


    document.getElementById('bar_count').innerText = barCount;
    document.getElementById('animation_delay').innerText = speed;
    svg.setAttribute('height', rowCount * barWidth);

    document.getElementById('mode_day')
        .addEventListener('click', () => {
            document.querySelector('body').classList = '';
        });

    document.getElementById('mode_night')
        .addEventListener('click', () => {
            document.querySelector('body').classList = 'night_mode';
        });

    document.getElementById('delay')
        .addEventListener("input", () => {
            speed = parseInt(document.getElementById('delay').value);
            document.getElementById('animation_delay').innerText = speed;
        });

    document.getElementById('dimension')
        .addEventListener("input", () => {
            barCount = parseInt(document.getElementById('dimension').value);
            document.getElementById('bar_count').innerText = barCount;
        });

    document.getElementById('dimension')
        .addEventListener("change", () => {
            let defs = document.querySelector('defs');
            svg.innerHTML = `<defs>${defs.innerHTML}</defs>`;
            barWidth = width / barCount;
            tempCount = Math.floor(height / barWidth);
            rowCount = tempCount % 2 == 1 ? tempCount : tempCount - 1;
            svg.setAttribute('height', rowCount * barWidth);
            drawGrid();
        });

    function pause(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function getSelectedRadioValue(name) {
        var buttons = document.getElementsByName(name);

        for (let b of buttons) {
            if (b.checked) return b.value;
        }

        return undefined;
    }

    function updateDisplayData(algorithmName = null, desc = null) {
        if (algorithmName != null) document.getElementById('description').innerHTML = descriptions[algorithmName];
        else document.getElementById('description').innerHTML = desc;

        document.getElementById('comparisons').innerHTML = comparisons > 0 ? `${comparisons}` : `N/A`;

        document.getElementById('array_accesses').innerHTML = arrayAccesses > 0 ? `${arrayAccesses}` : `N/A`;
    }
});