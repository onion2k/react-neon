import React from 'react';
import { render} from 'react-dom';

import Particles from './tiles/Particles';
import Light from './tiles/Light';
import Torch from './tiles/Torch';
import Bokeh from './tiles/Bokeh';
import Fuzz from './tiles/Fuzz';
import Neon from './tiles/Neon';
import Snow from './tiles/Snow';
import Sparks from './tiles/Sparks';
import Shader from './tiles/Shader';
import Shader2 from './tiles/Shader2';

import "./index.css";

const App = () => (
    <React.Fragment>
        <Particles mixmode="multiply" />
        <Light />
        <Snow />
        <Torch />
        <Bokeh />
        <Neon />
        <Sparks />
        <Shader />
        <Fuzz />
    </React.Fragment>
);

render(<App />, document.getElementById("root"));