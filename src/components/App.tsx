import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { StyleSheet } from '@react-pdf/renderer';
import { BookingForm } from "./BookingForm";
import { PDFForm } from "./PDFForm";
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
    <div className="App relative"><div className="bg-white">
      <div className=" w-full flex justify-center ">
        <img src={coa} alt="MOH" style={styles.image} />
      </div>
      <div className=" w-full flex justify-center ">
        <h1 className="text-xl py-4 mt-24 mb-1 flex font-bold justify-center text-black uppercase ">
          Ministry Of Health Uganda
        </h1>
      </div>
      <div className=" px-32 my-2 text-xl justify-center  px-32">
        <h1 className="text-xl py-2 flex bg-yellow-600 font-bold justify-center text-white uppercase">
          Vaccination Self Registration Form
        </h1>
      </div></div>
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
