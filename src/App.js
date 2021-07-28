import "./App.css";
import WeatherApp from "./components/Weather/WeatherMain";

function App() {

  const ifConnetcted = window.navigator.onLine;

  return (<>
        <div className={ifConnetcted ? "connect" : "notConneted"}></div>
    <WeatherApp />
  </>
  );
}

export default App;
