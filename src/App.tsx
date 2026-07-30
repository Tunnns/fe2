import { Toaster } from "react-hot-toast";
import { Link, Route, Routes } from "react-router-dom";
import "antd/dist/reset.css";
import Lab1 from "./lab/1";
import Lab2 from "./lab/2";
import Lab3 from './lab/3';
import Lab4 from './lab/4'
import Lab5 from './lab/5'
import Update from './lab/update'
import Login from './lab/login'
import { UserContext } from "./context/usercontext";
import { useContext } from "react";

function App() {

  const {user} = useContext(UserContext);

  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="#" className="text-xl font-semibold">
            <strong>WEB2091 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200">
              Trang chủ lap2
            </Link>
            <Link to="/lab1" className="hover:text-gray-200">
              lab1
            </Link>
            <Link to="/lab3" className="hover:text-gray-200">
              lab3
            </Link>
            <Link to="/lab4" className="hover:text-gray-200">
              lab4
            </Link>
            <Link to="/lab5" className="hover:text-gray-200">
              lab5
            </Link>
            <Link to="/lab6" className="hover:text-gray-200">
              lab6
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6" >
            <Link to="/login" className="hover:text-gray-200">
              Đăng nhập
            </Link>
            <Link to="/register" className="hover:text-gray-200">
              Đăng ký
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB2091</h1>
        {/* <Lab1 /> */}
        {/* <Lab2 /> */}
      </div>


      <Routes>
        <Route path="/lab1" element={<Lab1 />} />
        <Route path="/" element={<Lab2 />} />
        <Route path="/lab3" element={<Lab3 />} />
        <Route path="/lab4" element={<Lab4 />} />
        <Route path="/lab5" element={<Lab5 />} />
        <Route path="/update" element={<Update />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
