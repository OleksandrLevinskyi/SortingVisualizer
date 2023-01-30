import type {Component} from 'solid-js';
import RadioButton from "./RadioButton";
import {TEXT_CAPTION} from "../ts/types";

const TextTypeSelector: Component = () => {
    return (
        <div class="btn-group-vertical w-auto" role="group" aria-label="obstacle type group">
            <RadioButton type={TEXT_CAPTION.NONE} isChecked={true}/>
            <RadioButton type={TEXT_CAPTION.PRESENT} isChecked={false}/>
        </div>
    );
};

export default TextTypeSelector;
