import React from 'react';
import { render} from 'react-dom';
import Particles from './Particles';
import Light from './Light';

import "./index.css";

const App = () => (
    <React.Fragment>
        <Particles />
        <Light />
    </React.Fragment>
);

render(<App />, document.getElementById("root"));