import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Inventory from './pages/Inventory';
import Recipes from './pages/Recipes';
import MealPlan from './pages/MealPlan';
import ShoppingList from './pages/ShoppingList';
import Settings from './pages/Settings';

function App() {
  return (
    <>
      <main style={{ flexGrow: 1, overflowY: 'auto' }}>
        <Routes>
          <Route path="/" element={<Inventory />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/meal-plan" element={<MealPlan />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
