import { db } from "./firebase/config";

import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Context
import { AuthContextProvider } from "./context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
// Hooks React
import { useState, useEffect } from "react";
// Hook custom
import { useAuthentication } from "./hooks/useAuthentication";
// Imports Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import EditPost from "./pages/EditPost";
import Show from "./pages/Show";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup - Função de limpeza para cancelar
    // a inscrição do ouvinte quando o componente é desmontado
    return () => unsubscribe();
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <AuthContextProvider value={{ user }}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/posts"
              element={user ? <Posts /> : <Navigate to="/login" />}
            />
            <Route
              path="/post/edit/:id"
              element={user ? <EditPost /> : <Navigate to="/login" />}
            />
            <Route path="/show/:id" element={<Show />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/dashboard" />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
