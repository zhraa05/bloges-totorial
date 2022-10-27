
import './App.css';
import './style.scss'
import './meadiaquery.css'
import Home from './pages/Home';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Datail from './pages/Datail'
import Addeditblog from './pages/Addeditblog'
import About from './pages/About'
import Nofound from './pages/Nofound'
import Header from './components/Header';
import { useEffect, useState } from 'react';
import Auth from './pages/Auth';
import { auth } from './firbase';
import { signOut } from 'firebase/auth';

function App() {
  const [active, setActive] = useState("home")
  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);
  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null)
      setActive('login')
      navigate("/auth");
    })
  }
  return (
    <div className="App">
      <Header
        setActive={setActive}
        active={active}
        user={user}
        handleLogout={handleLogout}
      />
      <ToastContainer position='top-center' />
      <Routes>
        <Route path='/' element={<Home setActive={setActive} user={user} />} />
        <Route path="/detail/:id" element={<Datail setActive={setActive} />} />
        <Route path="/create" element={user?.uid ? <Addeditblog user={user} setActive={setActive}
        /> :
          <Navigate to="/" />} />
        <Route path="/update/:id" element={user?.uid ? <Addeditblog user={user}
          setActive={setActive} /> : <Navigate to="/" />
        }
        />
        <Route path='/about' element={<About />} />
        <Route path='/auth' element={<Auth setActive={setActive} setUser={setUser} />} />
        <Route path='*' element={<Nofound />} />
      </Routes>
    </div>
  );
}

export default App;
