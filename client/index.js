import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { store } from './app/store';

import SavedTrips from './components/savedTrips.jsx';
import Settings from './components/settings.jsx';
import Map from './components/map.jsx';
import LoginForm from './components/LoginForm.jsx';
import SignUpForm from './components/SignUpForm.jsx';
import WaypointContainer from './components/WaypointContainer.jsx';

const App = () => {
  console.log('app started');
  return (
    <div styles={styles.background}>
      <Router>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route path='/signup' element={<SignUpForm />} />
          <Route
            path='/mainPage'
            //This is the main home page route
            //Might be worth having this as its own component?
            element={
              <div style={styles.body}>
                <SavedTrips />

                <div style={styles.settingMap}>
                  <Settings />
                  <Map />
                </div>

                <div style={styles.waypoint}>
                  <WaypointContainer />
                </div>
              </div>
            }
          />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </div>
  );
};

//Styling
//Create seperate css or sass file
const styles = {
  body: {
    display: 'flex',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  settingMap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '50px',
  },
  waypoint: {
    marginTop: '35px',
  },
};

const root = createRoot(document.getElementById('app'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
