import type {Component} from 'solid-js';
import Dropdown from "./Dropdown";
import TextTypeSelector from "./TextTypeSelector";
import ColorModeSwitch from "./ColorModeSwitch";
import Tutorial from "./Tutorial";
import RangeSelector from "./RangeSelector";
import CustomArrayInput from "./CustomArrayInput";

const ControlPanel: Component = () => {
    return (
        <div id="control-panel" class="row pb-3">
            <div class="col-md-1 d-flex justify-content-center pe-0">
                <TextTypeSelector/>
            </div>

            <div class="col-md-4">
                <RangeSelector id={'count'}
                               title={'Bar Count'}
                               statId={'bar_count'}
                               unit={'bars'}
                               min={15}
                               max={45}
                               step={1}/>

                <RangeSelector id={'delay'}
                               title={'Animation Delay'}
                               statId={'animation_delay'}
                               unit={'ms'}
                               min={5}
                               max={500}
                               step={5}/>
            </div>

            <div class="col-md-2">
                <button type="button" class="btn btn-primary btn-block align-middle h-100 w-100" id="generate">
                    Generate<br/>New<br/>Array
                </button>
            </div>

            <div class="col-md-4 pe-0 d-flex flex-column py-2 justify-content-between">
                    <Dropdown/>
                    <CustomArrayInput/>
            </div>

            <div class="col-md-1 d-flex flex-column justify-content-center align-items-end pe-3">
                <ColorModeSwitch/>

                <Tutorial/>
            </div>
        </div>
    );
};

export default ControlPanel;
