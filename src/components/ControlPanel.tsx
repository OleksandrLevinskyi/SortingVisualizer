import type {Component} from 'solid-js';
import Dropdown from "./Dropdown";
import TextTypeSelector from "./TextTypeSelector";
import ColorModeSwitch from "./ColorModeSwitch";
import Tutorial from "./Tutorial";
import RangeSelector from "./RangeSelector";
import CustomArrayInput from "./CustomArrayInput";

const ControlPanel: Component = () => {
    return (
        <div class="container-fluid">
            <Dropdown/>
            <TextTypeSelector/>
            <button type="button" class="btn btn-primary btn-block align-middle"
                    id="generate">Generate<br/>New<br/>Array
            </button>

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
            <CustomArrayInput/>

            <div class="col-md-1 d-flex flex-column justify-content-center align-items-end">
                <ColorModeSwitch/>

                <Tutorial/>
            </div>
        </div>
    );
};

export default ControlPanel;
