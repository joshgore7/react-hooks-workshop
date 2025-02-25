import { useState, useEffect } from "react";
import Details from "./Details";

function Card() {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await res.json();
        const allPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonRes = await fetch(pokemon.url);
            return await pokemonRes.json();
          })
        );
        setPokemonData(allPokemon);
        setLoading(false);
      } catch (err) {
        setError("Failed to load Pokémon data. Please try again.");
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const fetchPokemonDetails = async (id) => {
    try {
      const detailsRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const detailsData = await detailsRes.json();

      const speciesRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      const speciesData = await speciesRes.json();

      const description = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      )?.flavor_text;

      setSelectedPokemon({
        name: detailsData.name,
        sprite: detailsData.sprites.front_shiny,
        description: description || "No description available.",
        types: detailsData.types.map((type) => type.type.name).join(", "),
        height: detailsData.height / 10,
        weight: detailsData.weight / 10,
        stats: detailsData.stats.map((stat) => ({
          name: stat.stat.name,
          base_stat: stat.base_stat,
        })),
        moves: detailsData.moves.map((move) => move.move.name),
      });
    } catch (err) {
      setError("Failed to load Pokémon details. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Loading Pokédex...</p>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div>
      {selectedPokemon ? (
        <Details pokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
      ) : (
        <div className="cards-container">
          {pokemonData.map((pokemon) => (
            <div
              className="card"
              key={pokemon.id}
              onClick={() => fetchPokemonDetails(pokemon.id)}
            >
              <img
                className="card-image"
                src={pokemon.sprites.back_shiny}
                alt={pokemon.name}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Card;
