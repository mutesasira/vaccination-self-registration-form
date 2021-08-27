import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { BookingForm } from "./BookingForm";
import { PDFForm } from "./PDFForm";

function App() {
  return (
    <div className="App">
      <div className="bg-blue-600 w-full">
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
