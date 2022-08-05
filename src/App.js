import './App.css';
import Header from './compnents/Header';
import Home from './pages/Home';
import {Route, Routes} from "react-router-dom";
import Commute from "./pages/Commute";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/commute' element={<Commute />} />
        <Route path='*' element={<ErrorPage />}/>
      </Routes>
    </div>
  );
}

export default App;
