import type {Component} from 'solid-js';
import ControlPanel from "./ControlPanel";
import Field from "./Field";

const App: Component = () => {
    return (
        <div class="container-fluid mb-1">
            <Field/>

            <ControlPanel/>
        </div>
    );
};

export default App;
