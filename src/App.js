import './App.css';
import Home from './component/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Customer from './component/loginpages/Customer';
import Expert from './component/loginpages/Expert';
import Newuser from './component/registerpages/Newuser';
import Newexpert from './component/registerpages/Newexpert';
import Custlanding from './component/landingpage/Custlanding';
import Expertlanding from './component/landingpage/Expertlanding';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/customerlogin' element={<Customer/>}/>
          <Route path='/expertlogin' element={<Expert/>}/>
          <Route path='/newuser' element={<Newuser/>}/>
          <Route path='/newexpert' element={<Newexpert/>}/>
          <Route path='/custlanding' element={<Custlanding/>}/>
          <Route path='/expertland' element={<Expertlanding/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
