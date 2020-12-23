import React, {useState} from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom';
// import {SeverityLevel} from '@microsoft/applicationinsights-web';
import './App.css';
// import { getAppInsights } from './TelemetryService';
// import TelemetryProvider from './telemetry-provider';
import { trackException, trackTrace, trackEvent, throwError, ajaxRequest, fetchRequest } from './reuseableAnalyticFunctions';

import ThemeContext from './ThemeContext';
import ThemeToggler from './ThemeToggler';
import Main from './MainWithFunction';

import {AppInsightsContextProvider, useAppInsightsContext} from './AppInsightsContext';
import useCustomEvent from './useCustomEvent';

const Home = () => (
    <div>
        <h2>Home Page</h2>
    </div>
);

const About = () => (
    <div>
        <h2>About Page</h2>
    </div>
);

const Header = () => (
    <>
    <ThemeToggler />
    <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/about">About</Link>
        </li>
    </ul>
    </>
);

const App = () => {
    // let appInsights = getAppInsights();

    const themeHook = useState("light");

    const reactPlugin = useAppInsightsContext()
    const trackAddedToCart = useCustomEvent(reactPlugin, 'Added to Cart', {})

    return (
      <BrowserRouter>
        <ThemeContext.Provider value={themeHook}>
            <AppInsightsContextProvider>
            {/* <TelemetryProvider instrumentationKey="INSTRUMENTATION_KEY" after={() => { appInsights = getAppInsights() }}> */}
            <div >
                <Header />
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
            </div>
            <Main />
            <button onClick={() => trackAddedToCart({a: 'a', b: 'b'})}>Track Added to Cart</button>
            <div className="App">
                {/* <button onClick={() => trackException(appInsights)}>Track Exception</button>
                <button onClick={() => trackEvent(appInsights)}>Track Event</button>
                <button onClick={() => trackTrace(appInsights)}>Track Trace</button> */}
                <button onClick={throwError}>Autocollect an Error</button>
                <button onClick={ajaxRequest}>Autocollect a Dependency (XMLHttpRequest)</button>
                <button onClick={fetchRequest}>Autocollect a dependency (Fetch)</button>
            </div>

            {/* </TelemetryProvider> */}
            </AppInsightsContextProvider>
        </ThemeContext.Provider>
      </BrowserRouter>
    );
};

export default App;
