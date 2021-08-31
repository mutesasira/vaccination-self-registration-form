import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { StyleSheet } from '@react-pdf/renderer';
import { BookingForm } from "./BookingForm";
import { PDFForm } from "./PDFForm";
import { LandingPage } from "./LandingPage";
import { Stepper } from "./Stepper";
import coa from "../coa.png";

const styles = StyleSheet.create({
  image: {
    width: 100,
    marginTop: 2,
    position: 'absolute',
    height: 100,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },

});


function App() {
  return (
      <div className="App ">
          <div className=" flex justify-center block">
            <img src={coa} alt="MOH" style={styles.image} />
          </div>
          <div className="flex justify-center block">
            <h1 className="text-xl py-4 mt-24 mb-1 flex font-bold text-center text-black uppercase block">
              Ministry Of Health Uganda
            </h1>
          </div>
          <div className="flex justify-center mx-4 items-center bg-yellow-600 ">
            <h1 className="text-xl py-2 text-white uppercase block text-center">
              Vaccination Self Registration Form
            </h1>
          </div>
        <Router>
          <Switch>
            <Route path="/" exact>
              <LandingPage />
            </Route>
            <Route path="/booking" exact>
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
