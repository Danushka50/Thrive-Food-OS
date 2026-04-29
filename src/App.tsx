import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Process from './components/Process';
import Nutrition from './components/Nutrition';
import SetMenus from './components/SetMenus';
import CommunityKitchen from './components/CommunityKitchen';
import Leaderboard from './components/Leaderboard';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import MealBuilder from './pages/MealBuilder'; // The new page you just created
import PowerDrinks from './components/PowerDrinks';
import './App.css';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/LoginPage';
import MainLayout from '../src/Layout/MainLayout';
import SignUpPage from './pages/SignUpPage';

const LandingPage = () => (
  <>
    <Hero />
    <Stats />
    <Process />
    <Nutrition />
    <SetMenus />
    <CommunityKitchen />
    <Leaderboard />
    <FinalCTA />
    <PowerDrinks />
  </>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* --- ROUTES WITH HEADER/FOOTER --- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/build" element={<MealBuilder />} />
          <Route path="/order" element={<OrderPage />} />
        </Route>
        {/* --- ROUTES WITHOUT HEADER/FOOTER --- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
};

export default App;