import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Bg from './cpmponent/bg';
import Navbar from './cpmponent/navbar';
import Home from './cpmponent/home';
import Summer from './cpmponent/summer';
import Rain from './cpmponent/rain';
import Winter from './cpmponent/winter';
import Login from './cpmponent/login';
import Chatbot from './cpmponent/chatbot';
import AdminDashboard from './cpmponent/dashbord';
import { AuthProvider } from './context/authprovider'; // Import AuthProvider
import CreateCard from "./cpmponent/createCard";
import UpdateCard from "./cpmponent/updateCard";
import DeleteCard from "./cpmponent/deleteCard";
import Register from "./cpmponent/ragister";
import Cursor from "./dashbord/cursor"

function Layout({ children }) {
  const location = useLocation();
  const hideNavbarRoutes = ['/login','/register','/'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="relative flex flex-col min-h-screen">
      {!shouldHideNavbar && (
        <div className="absolute top-5 w-full py-5 flex justify-center text-zinc-600 text-xl z-9">
          <Navbar />
        </div>
      )}
      <main className="flex-grow">{children}</main>
    </div>
  );
}

function App() {
  return (
    <>
      <Cursor/>
      <div className="fixed h-full w-full bg-zinc-900 -z-10">
        <Bg />
      </div>
      {/* Wrap the Router inside AuthProvider */}
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              {/* <Route path="/" element={<Front />} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/summer" element={<Summer />} />
              <Route path="/rain" element={<Rain />} />
              <Route path="/winter" element={<Winter />} />
              <Route path="/login" element={<Login />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path='/register' element={<Register/>}/>
              
              {/* Dashboard Route and Nested Routes */}
              <Route path="/dashbord" element={<AdminDashboard />}>
                <Route path="create" element={<CreateCard />} />
                <Route path="update" element={<UpdateCard />} />
                <Route path="delete" element={<DeleteCard />} />
              </Route>

            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
