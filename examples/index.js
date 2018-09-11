import React from 'react';
import { render} from 'react-dom';
import Particles from './Particles';

import "./index.css";

const App = () => (
    <React.Fragment>
        <Particles />
        <Particles />
    </React.Fragment>
);

render(<App />, document.getElementById("root"));