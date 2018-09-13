import React from 'react';
import { render} from 'react-dom';

import Particles from './tiles/Particles';
import Light from './tiles/Light';
import Heatmap from './tiles/Heatmap';
import Torch from './tiles/Torch';
import Bokeh from './tiles/Bokeh';
import Crystal from './tiles/Crystal';
import Neon from './tiles/Neon';
import Shadows from './tiles/Shadows';
import Snow from './tiles/Snow';
import Sparks from './tiles/Sparks';

import "./index.css";

const App = () => (
    <React.Fragment>
        <Particles />
        <Light />
        <Heatmap />
        <Torch />
        <Bokeh />
        <Shadows />
        <Crystal />
        <Snow />
        <Sparks />
    </React.Fragment>
);

render(<App />, document.getElementById("root"));