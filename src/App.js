import logo from './logo.svg';
import './App.css';
import TabsComp from './components/tabs/tabsComp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/home';
import PrivateRoutes from './components/privateRoute/privateRoutes';
import VerifyEmail from './components/pages/verifyEmail';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/createAccount' element={<TabsComp />} />
          <Route path='/' element={<PrivateRoutes Component={Home} />} />
          <Route path='/' element={<PrivateRoutes Component={Home} />} />
          <Route path='/verify/:id' element={<VerifyEmail />} />
          <Route path='*' element={<h1>No record found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
