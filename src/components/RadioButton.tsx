import type {Component} from 'solid-js';
import {TEXT_CAPTION} from "../ts/types";

type RadioButtonProps = {
    type: TEXT_CAPTION,
    isChecked: boolean,
}

const RadioButton: Component<RadioButtonProps> = ({type, isChecked}) => {
    return (
        <>
            <input type="radio" class="btn-check w-50" name="text"
                   id={`text_${type}`} value={type} autocomplete="off" checked={isChecked}/>
            <label
                class="btn btn-outline-primary d-inline-flex align-items-center justify-content-start p-0 ps-1 pe-1"
                for={`text_${type}`}>
                <img class="sized-icon me-1"
                     src={`/images/text_${type}.png`}
                     alt={type}/> {type == TEXT_CAPTION.NONE ? "no text" : "text"}
            </label>
        </>
    );
};

export default RadioButton;
