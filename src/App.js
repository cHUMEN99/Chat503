import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import { useState } from 'react';
import Modal from './components/Modal';
import Userinfo from './pages/Userinfo';

function App() {
  const [isLogined, setLogined] = useState(false);
  const [useremail,setUserEmail]=useState('');
  


  return (
    <Router>
      <div className="App">
      <h1 className="text-3xl font-bold underline bg-yellow-50">
      Hello world!
    </h1>
      
        <Routes>
          {!isLogined ? (
            <>
              <Route path="/" element={<Login setLogined={setLogined} setUserEmail={setUserEmail}/>} />
              <Route path="/register" element={<Register setLogined={setLogined} setUserEmail={setUserEmail} />} />
              <Route path="/user/:id" element={<Userinfo  />} />
              
            </>
          ) : (
            <Route  path="/chat" element={<Chat useremail={useremail} />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
