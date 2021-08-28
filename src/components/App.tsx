import { HashRouter as Router, Route, Switch } from "react-router-dom";
//import { Document, Page, StyleSheet, Text, View, Image } from '@react-pdf/renderer';
import { BookingForm } from "./BookingForm";
import { PDFForm } from "./PDFForm";
import {Stepper} from "./Stepper";
//import coa from "../coa.png";

// const styles = StyleSheet.create({
//   image: {
//     width: 50,
//     height: 50,
//   },
  
// });


function App() {
  return (
    <div className="App">
      <div className="bg-blue-900 w-full">
      <h1 className="text-3xl py-4 flex font-bold justify-center text-white uppercase">    
          MINISTRY OF HEALTH UGANDA
        </h1>
      </div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <BookingForm />
          </Route>
          <Route path="/pdf">
            <PDFForm />
          </Route>
          <Route path="/stepper">
            <Stepper />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
