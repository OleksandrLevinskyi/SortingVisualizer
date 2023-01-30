import type {Component} from 'solid-js';

type RangeSelectorProps = {
    id: string,
    title: string,
    statId: string,
    unit: string,
    min: number,
    max: number,
    step: number,
}

const RangeSelector: Component<RangeSelectorProps> = ({id, title, statId, unit, min, max, step}) => {
    return (
        <div>
            <label class="heading" for={id}>
                {title}
                <span class="fw-lighter fs-sm"> (<span id={statId}/> {unit})</span>
            </label>

            <input type="range" class="form-range w-100" min={min} max={max} step={step} id={id}/>
        </div>
    );
};

export default RangeSelector;
