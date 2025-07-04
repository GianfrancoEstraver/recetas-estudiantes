import React from 'react';
import { useRecipes } from '../hooks/useRecipes';

const StatsPage: React.FC = () => {
    const { recetas } = useRecipes();

    const total = recetas.length;

    const byCategory = recetas.reduce<Record<string, number>>((acc, r) => {
        acc[r.categoria] = (acc[r.categoria] || 0) + 1;
        return acc;
    }, {});

    const popular = recetas.reduce((prev, curr) =>
        curr.valoracion > prev.valoracion ? curr : prev
    , recetas[0]);

    return (
        <div className="container mt-4">
        <h1>Estadísticas de Recetas</h1>

        <div className="row mt-3">
            <div className="col-md-4 mb-3">
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">Total de Recetas</h5>
                <p className="card-text">{total}</p>
                </div>
            </div>
            </div>

            <div className="col-md-4 mb-3">
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">Recetas por Categoría</h5>
                {Object.entries(byCategory).map(([cat, count]) => (
                    <p key={cat} className="card-text">{cat}: {count}</p>
                ))}
                </div>
            </div>
            </div>

            <div className="col-md-4 mb-3">
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">Receta Más Popular</h5>
                <p className="card-text">{popular.nombre} ({popular.valoracion}⭐)</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default StatsPage;
