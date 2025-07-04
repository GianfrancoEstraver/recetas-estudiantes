import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes';
import RecipeCard from '../components/RecipeCard';
import { SearchBar } from '../components/SearchBar';
import type { Recipe } from '../types/Recipe';

const HomePage: React.FC = () => {
  const { recetas } = useRecipes();
  // Estado local para resultados de búsqueda
  const [searchResults, setSearchResults] = useState<Recipe[]>(recetas);

  // Sincronizar cuando cambian las recetas
  useEffect(() => {
    setSearchResults(recetas);
  }, [recetas]);

  // Función que maneja la búsqueda por nombre
  const handleSearch = (query: string) => {
    if (!query) {
      setSearchResults(recetas);
    } else {
      const lower = query.toLowerCase();
      setSearchResults(
        recetas.filter(r => r.nombre.toLowerCase().includes(lower))
      );
    }
  };

  // Recetas destacadas y rápidas sobre los resultados filtrados
  const recetasDestacadas = [...searchResults]
    .sort((a, b) => b.valoracion - a.valoracion)
    .slice(0, 3);

  const recetasRapidas = searchResults
    .filter(receta => receta.tiempo <= 20)
    .slice(0, 3);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">🍳 Recetas para Estudiantes</h1>
          <p className="hero-subtitle">
            Deliciosas recetas fáciles, rápidas y económicas para estudiantes universitarios
          </p>
          <div className="hero-buttons">
            <Link to="/recetas" className="cta-button primary">
              Explorar Recetas
            </Link>
            <Link to="/crear" className="cta-button secondary">
              Crear Mi Receta
            </Link>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="search-section container mt-4">
        <SearchBar onSearch={handleSearch} />
      </section>

      <section className="featured-section container mt-4">
        <h2 className="section-title">⭐ Recetas Más Valoradas</h2>
        <div className="recipes-grid row">
          {recetasDestacadas.map(receta => (
            <div key={receta.id} className="col-md-4 mb-3">
              <RecipeCard recipe ={receta} />
            </div>
          ))}
        </div>
        <div className="section-footer">
          <Link to="/recetas" className="view-all-link">
            Ver todas las recetas →
          </Link>
        </div>
      </section>

      <section className="quick-section container mt-4">
        <h2 className="section-title">⚡ Recetas Rápidas</h2>
        <p className="section-subtitle">Perfectas para cuando tienes poco tiempo</p>
        <div className="recipes-grid row">
          {recetasRapidas.map(receta => (
            <div key={receta.id} className="col-md-4 mb-3">
              <RecipeCard recipe ={receta} />
            </div>
          ))}
        </div>
      </section>

      <section className="stats-section container mt-4">
        <div className="stats-container d-flex justify-content-around">
          <div className="stat-item text-center">
            <span className="stat-number">{searchResults.length}</span>
            <span className="stat-label">Recetas</span>
          </div>
          <div className="stat-item text-center">
            <span className="stat-number">
              {searchResults.length > 0
                ? Math.round(
                    searchResults.reduce((acc, r) => acc + r.tiempo, 0) /
                      searchResults.length
                  )
                : 0}
            </span>
            <span className="stat-label">Min Promedio</span>
          </div>
          <div className="stat-item text-center">
            <span className="stat-number">
              {searchResults.filter(r => r.dificultad === 'fácil').length}
            </span>
            <span className="stat-label">Recetas Fáciles</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;