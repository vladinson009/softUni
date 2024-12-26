
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react';

import { checkSession } from './utils/parseToken';

import Navigation from './components/Navigation';
import HomeSection from './components/HomeSection';
import RecipesSection from './components/recipes/RecipesSection';
import FooterSection from './components/FooterSection';
import LoginSection from './components/user/LoginSection';
import RegisterSection from './components/user/RegisterSection';
import CreateRecipeForm from './components/recipes/CreateRecipeForm';
import MyRecipes from './components/recipes/MyRecipes';
import RecipeDetails from './components/recipes/RecipeDetails';
import RecipeEdit from './components/recipes/RecipeEdit';
import sessionCtx from './utils/createContext.js'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection.jsx';
import SearchRecipes from './components/recipes/SearchRecipes.jsx';

function App() {
  const sessionContext = sessionCtx
  const [session, setSession] = useState(() => {
    return checkSession();
  })

  useEffect(() => {

    if (!session) {
      return setSession(null)
    }

  }, [session])

  return (
    <sessionContext.Provider value={[session, setSession]}>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomeSection />} />
        <Route path="/recipes" element={<RecipesSection />} />
        <Route path="/login" element={<LoginSection />} />
        <Route path="/register" element={<RegisterSection />} />
        <Route path="/create" element={<CreateRecipeForm />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/search" element={<SearchRecipes />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
        <Route path="/recipe/edit/:recipeId" element={<RecipeEdit />} />
      </Routes>
      <FooterSection />
    </sessionContext.Provider >
  )
}

export default App
