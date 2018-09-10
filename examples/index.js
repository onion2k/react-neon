import React from 'react';
import { render} from 'react-dom';
import Square from './Square';

const App = () => (<Square /> );

render(<App />, document.getElementById("root"));