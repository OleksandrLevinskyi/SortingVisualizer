import type {Component} from 'solid-js';
import Field from "./Field";
import Dropdown from "./Dropdown";
import TextTypeSelector from "./TextTypeSelector";
import ColorModeSwitch from "./ColorModeSwitch";
import Tutorial from "./Tutorial";

const ControlPanel: Component = () => {
    return (
        <div class="container-fluid">
            <Field/>
            <TextTypeSelector/>
            <div class="row">
                <Dropdown/>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-5">

                            <div class="row">
                                <div class="col-md-6 left_padded">
                                    <p class="heading">Mode</p>
                                </div>
                                <div class="col-md-6 not_padded">
                                    <ul>
                                        <li>
                                            <div class="form-check">
                                                <input class="form-check-input special" type="radio" name="mode"
                                                       id="mode_day" value="day" checked/>
                                                <label class="special" for="mode_day"><img
                                                    src="images/sun.png"/></label>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="form-check">
                                                <input class="form-check-input special" type="radio" name="mode"
                                                       id="mode_night" value="night"/>
                                                <label class="special" for="mode_night"><img
                                                    src="images/moon.png"/></label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 not_padded">
                            <button type="button" class="btn btn-primary btn-block align-middle"
                                    id="generate">Generate<br/>New<br/>Array
                            </button>
                        </div>
                        <div class="col-md-5 left_padded">
                            <p class="heading">Bar Count <span class="data">(<span id="count"></span>
                                bars)</span></p>
                            <input type="range" min="10" max="45" step="1" id="bar_count"/>

                            <p class="heading">Animation Delay <span class="data">(<span id="animation_delay"></span>
                                ms)</span></p>
                            <input type="range" min="5" max="500" step="5" id="delay"/>
                        </div>
                    </div>

                    <hr/>

                    <p class="text-center not_padded" id="description"><b>Choose Algorithm To Animate</b></p>
                    <div class="row">
                        <div class="col-md-6">
                            <p class="text-center not_padded">
                                <u>Comparisons: <span id="comparisons">N/A</span></u>
                            </p>
                        </div>
                        <div class="col-md-6">
                            <p class="text-center not_padded">
                                <u>Array Manipulations: <span id="array_manipulations">N/A</span></u> <span
                                class="data">(swap/change values)</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <p class="heading text-center">Create Custom Array</p>
                    <div class="row">
                        <div class="col-md-12 left_padded">
                            <input type="text" id="values" placeholder="Enter space separated integers"/>
                            <div id="errors"></div>
                        </div>
                        <button type="button" class="btn btn-primary" id="apply">Apply</button>
                    </div>
                </div>
                <div class="col-md-1 d-flex flex-column justify-content-center align-items-end">
                    <ColorModeSwitch/>

                    <Tutorial/>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <hr/>
                    <p class="text-center">&copy; 2021 Oleksandr Levinskyi - Sorting Visualizer</p>
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;
