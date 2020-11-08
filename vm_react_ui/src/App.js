import React, { Fragment } from 'react';
import AppHeader from './components/AppHeader';
import Home from './Pages/Home/HomeContainer';
import AppFooter from './components/AppFooter';


function App() {
  return (
      <Fragment>
        <AppHeader />
        <Home />
        <AppFooter />
      </Fragment>
)
}

export default App;
