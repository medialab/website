import React from 'react';
import Router from './Router';

export default function Application({alreadyAuthenticated}) {
  return <Router key="router" alreadyAuthenticated={alreadyAuthenticated} />;
}
