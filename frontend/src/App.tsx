import {Route, Routes} from 'react-router-dom';
import Register from "./components/auth/Register.tsx";
import Login from "./components/auth/Login.tsx";
import MainLayout from "./MainLayout.tsx";


function App() {

  return (
    <>
        <Routes>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="*" element={<MainLayout/>}></Route>
        </Routes>
    </>
  )
}

export default App
