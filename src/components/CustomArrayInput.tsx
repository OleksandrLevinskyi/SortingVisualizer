import type {Component} from 'solid-js';

const CustomArrayInput: Component = () => {
    return (
        <div class="col-md-4 d-flex flex-column justify-content-center">
            <div class="btn-group w-100" role="group" aria-label="custom array">
                <input type="text" id="values" placeholder="Enter space separated integers"/>
                <button type="button" class="btn btn-primary" id="apply">Create Custom Array</button>
            </div>
            <div id="errors"></div>
        </div>
    );
};

export default CustomArrayInput;
