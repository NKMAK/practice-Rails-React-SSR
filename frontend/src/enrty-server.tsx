import { renderToString } from 'react-dom/server';
import React from 'react';
import SSRtest from './components/toSSRtest';

export function render() {
  return renderToString(React.createElement(SSRtest));
}
