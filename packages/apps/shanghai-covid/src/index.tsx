import React from 'react';
import ReactDOM from 'react-dom';

import App from './pages/App';

setTimeout(() => {
  // eslint-disable-next-line import/no-named-as-default-member
  ReactDOM.render(<App />, document.getElementById('root'));
}, 1000);
