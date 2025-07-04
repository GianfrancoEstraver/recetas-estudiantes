import { useContext, useState, useMemo } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import type { Recipe } from '../types/Recipe';

// Nivel de dificultad según Recipe.dificultad
export type DifficultyFilter = Recipe['dificultad'] | null;

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes debe ser usado dentro de un RecipeProvider');
  }

  // Estado para el filtro de dificultad ('fácil' | 'medio' | 'difícil' | null)
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>(null);

  /**
   * filterByDifficulty: actualiza el filtro de dificultad.
   * @param level Nivel de dificultad o null para quitar filtro
   */
  const filterByDifficulty = (level: DifficultyFilter) => {
    setDifficultyFilter(level);
  };

  // Recetas filtradas según difficultyFilter
  const filteredRecetas = useMemo<Recipe[]>(() => {
    const allRecetas = context.recetas;
    if (!difficultyFilter) return allRecetas;
    return allRecetas.filter(r => r.dificultad === difficultyFilter);
  }, [context.recetas, difficultyFilter]);

  return {
    // Arreglo de recetas (filtradas si se aplicó filterByDifficulty)
    recetas: filteredRecetas,
    // Función para establecer el filtro
    filterByDifficulty,
    // Reexportar otros valores/métodos del contexto
    favoritos: context.favoritos,
    addToFavoritos: context.addToFavoritos,
    removeFromFavoritos: context.removeFromFavoritos,
    isFavorito: context.isFavorito,
    addReceta: context.addReceta,
  };
};

