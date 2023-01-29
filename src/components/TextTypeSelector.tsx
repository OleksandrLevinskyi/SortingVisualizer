import type {Component} from 'solid-js';
import RadioButton from "./RadioButton";
import {TEXT_CAPTION} from "../ts/types";

const TextTypeSelector: Component = () => {
    return (
        <div class="col-md-1 d-flex justify-content-center">
            <div class="btn-group-vertical w-auto content" role="group" aria-label="obstacle type group">
                <RadioButton type={TEXT_CAPTION.NONE} isChecked={true}/>
                <RadioButton type={TEXT_CAPTION.PRESENT} isChecked={false}/>
            </div>
        </div>
    );
};

export default TextTypeSelector;
