import React from 'react';
import {
  HashRouter as Router,
  Route,
} from "react-router-dom";

import { BookingForm } from './BookingForm';

function App() {
  return (
    <div className="App">
      <Router>
          <Route>
            <BookingForm />
          </Route>
      </Router>
    </div>
  );
}

export default App;

