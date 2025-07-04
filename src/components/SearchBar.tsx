import React, { useState, type FormEvent } from 'react';

interface SearchBarProps {
  /** Función que se llama al hacer búsqueda, recibe el término */
    onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [term, setTerm] = useState<string>('');

    const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(term.trim());
    };

    return (
    <form className="d-flex mb-3" onSubmit={handleSubmit}>
        <input
        type="text"
        className="form-control me-2"
        placeholder="Buscar recetas..."
        value={term}
        onChange={e => setTerm(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
        Buscar
        </button>
    </form>
    );
};
