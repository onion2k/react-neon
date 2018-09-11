import React from 'react';
import { render} from 'react-dom';
import Particles from './tiles/Particles';
import Light from './tiles/Light';

import "./index.css";

const App = () => (
    <React.Fragment>
        <Particles />
        <Light />
    </React.Fragment>
);

render(<App />, document.getElementById("root"));