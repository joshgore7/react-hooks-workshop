import React, { useState, useEffect } from 'react';

function Card() {
    const [pokemonData, setPokemonData] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [pokemonDetails, setPokemonDetails] = useState(null);
  
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
  
    // Fetch the additional details for the selected Pokémon
    const fetchPokemonDetails = async (id) => {
        const detailsRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const detailsData = await detailsRes.json();
      
        const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const speciesData = await speciesRes.json();
        
        const description = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text;
        
        setPokemonDetails({
            name: detailsData.name,
            types: detailsData.types.map(type => type.type.name).join(', '),
            height: detailsData.height / 10, // Convert from decimeters to meters
            weight: detailsData.weight / 10, // Convert from hectograms to kilograms
            stats: detailsData.stats.map(stat => ({
                name: stat.stat.name,
                base_stat: stat.base_stat
            })),
            description: description || 'No description available.',
            sprite: detailsData.sprites.front_shiny
        });
    };
  
    return (
        <div>
            <div className="cards-container">
                {pokemonData.map((pokemon) => (
                    <div className="card" key={pokemon.id} onClick={() => fetchPokemonDetails(pokemon.id)}>
                        <img className="card-image" src={pokemon.sprites.front_shiny} alt={pokemon.name} />
                        <p>{pokemon.name}</p>
                    </div>
                ))}
            </div>

            {/* If a Pokémon is selected, show its details */}
            {selectedPokemon && pokemonDetails && (
                <div className="pokemon-details">
                    <h2>{pokemonDetails.name}</h2>
                    <img className="pokemon-image" src={pokemonDetails.sprite} alt={pokemonDetails.name} />
                    <p><strong>Type:</strong> {pokemonDetails.types}</p>
                    <p><strong>Height:</strong> {pokemonDetails.height} m</p>
                    <p><strong>Weight:</strong> {pokemonDetails.weight} kg</p>
                    <p><strong>Description:</strong> {pokemonDetails.description}</p>
                    <h3>Stats:</h3>
                    <ul>
                        {pokemonDetails.stats.map((stat) => (
                            <li key={stat.name}>
                                {stat.name}: {stat.base_stat}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Card;