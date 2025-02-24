
import { useState, useEffect } from 'react';

function Card() {
    const [pokemonData, setPokemonData] = useState([]);
  
    useEffect(() => {
        const fetchPokemon = async () => {
            const allPokemon = [];
            for (let i = 1; i <= 151; i++) {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                const data = await res.json();
                allPokemon.push(data);
            }
            setPokemonData(allPokemon);
        };
      
        fetchPokemon();
    }, []);
  
    return (
        <div className="cards-container">
            {pokemonData.map((pokemon) => (
                <div className="card" key={pokemon.id}>
                    <a href={`${pokemon.name}`}>
                        <img className="card-image" src={pokemon.sprites.front_shiny}/>
                    </a>
                    <p>{pokemon.name}</p>
                </div>
            ))}
        </div>
    );
}

export default Card;
