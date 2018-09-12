import React from 'react';
import { render} from 'react-dom';
import Particles from './tiles/Particles';
import Light from './tiles/Light';
import Heatmap from './tiles/Heatmap';
import Torch from './tiles/Torch';

import "./index.css";

const App = () => (
    <React.Fragment>
        <Particles />
        <Light />
        <Heatmap />
        <Torch />
    </React.Fragment>
);

render(<App />, document.getElementById("root"));