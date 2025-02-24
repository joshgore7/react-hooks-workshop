
import { useState, useEffect } from 'react';

function Card() {
    const [pokemonData, setPokemonData] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
  
    useEffect(() => {
    const fetchPokemon = async () => {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await res.json();
        const allPokemon = await Promise.all(data.results.map(async (pokemon) => {
            const pokemonRes = await fetch(pokemon.url);
            return await pokemonRes.json();
        }));
        setPokemonData(allPokemon);
    };

    fetchPokemon();
    }, []);

    const fetchPokemonDetails = async (id) => {
        const detailsRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const detailsData = await detailsRes.json();
      
        const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const speciesData = await speciesRes.json();
        
        const description = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text;

        setSelectedPokemon({
            name: detailsData.name,
            types: detailsData.types.map(type => type.type.name).join(', '),
            height: detailsData.height / 10, 
            weight: detailsData.weight / 10, 
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


            {selectedPokemon && (
                <div className="pokemon-details">
                    <h2>{selectedPokemon.name}</h2>
                    <img className="pokemon-image" src={selectedPokemon.sprite} alt={selectedPokemon.name} />
                    <p><strong>Type:</strong> {selectedPokemon.types}</p>
                    <p><strong>Height:</strong> {selectedPokemon.height} m</p>
                    <p><strong>Weight:</strong> {selectedPokemon.weight} kg</p>
                    <p><strong>Description:</strong> {selectedPokemon.description}</p>
                    <h3>Stats:</h3>
                    <ul>
                        {selectedPokemon.stats.map((stat) => (
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
