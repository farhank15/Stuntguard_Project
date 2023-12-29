// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/index";
import Chatapp from "./pages/chatapp/index";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Login from "./components/Loginform/Login";
import Profilform from "./components/profil/Profilform";
import Editprofil from "./components/profil/EditProfile";
import Register from "./components/Loginform/Register";
import Calculate from "./pages/calculate/index";
import Article from "./pages/article/index";
import EditData from "./pages/formdata/edit";
import AddData from "./pages/formdata/Add";
import DataAnak from "./pages/dataanak/index";
import Spinner from "./components/spinner/spinner";
import About from "./pages/aboutpages/index";
import Tns from "./pages/tns/index";
import Dashboard from "./pages/dashboard/index"; // Make sure this path is correct
import ArticleDetail from "./components/article/ArticleDetail";
import ContactButton from "./components/consultation/ConsultationButton";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculate" element={<Calculate />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profilform" element={<Profilform />} />
            <Route path="/editprofil" element={<Editprofil />} />
            <Route path="/register" element={<Register />} />
            <Route path="/article" element={<Article />} />
            <Route path="/dataanak" element={<DataAnak />} />
            <Route path="/tns" element={<Tns />} />
            <Route path="/add" element={<AddData />} />
            <Route path="/edit/:id" element={<EditData />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chatapp" element={<Chatapp />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
          </Routes>
          <Footer />
          <ContactButton />
        </>
      )}
    </Router>
  );
};

export default App;
