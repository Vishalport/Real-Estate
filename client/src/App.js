import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import Login from "./pages/JoinNew/Login";
import Register from "./pages/JoinNew/Register";
import VerifyOTP from "./pages/JoinNew/VerifyOTP";
import { AuthProvider } from "./context/auth";
import { SearchProveider } from "./components/search/Search";
import Main from "./components/navBar/Main";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./pages/JoinNew/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import AdCreate from "./pages/propertyManagment/AdCreate";
import PrivateRoutes from "./components/routes/PrivateRoutes";
import SellHouse from "./pages/propertyManagment/SellHouse";
import RentHouse from "./pages/propertyManagment/RentHouse";
import RentLand from "./pages/propertyManagment/RentLand";
import SellLand from "./pages/propertyManagment/SellLand";
// import ImageUpload from './components/Forms/ImageUpload';
import ViewCard from "./pages/ViewCard";
import Footer from "./components/navBar/Footer";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import ContectSeller from "./components/Forms/ContectSeller";
import EditMyCard from "./components/cards/EditMyCard"
import WishList from "./components/WishList";
import Agent from "./pages/Agent";
import Search from "./pages/Search";



function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <SearchProveider>
            <Main />
            <Toaster />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/login" element={<Login />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />

              <Route path="/" element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/propertyManagment" element={<AdCreate />} />
                <Route path="/propertyManagment/sell/House" element={<SellHouse />} />
                <Route path="/propertyManagment/sell/Land" element={<SellLand />} />
                <Route path="/propertyManagment/rent/House" element={<RentHouse />} />
                <Route path="/propertyManagment/rent/Land" element={<RentLand />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/property/edit/:_id" element={<EditMyCard />} />
                <Route path="/wishlist/list" element={<WishList />} />
              </Route>
              <Route path="/agents/list" element={<Agent />} />
              <Route path="/property/viewproperty/:_id" element={<ViewCard />} />
              <Route path="/Contect-to-Seller" element={<ContectSeller />} />
              <Route path="/search" element={<Search />} />
            </Routes>
            <Footer />
          </SearchProveider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
