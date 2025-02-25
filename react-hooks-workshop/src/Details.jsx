function Details({ pokemon, setSelectedPokemon }) {
  return (
    <div className="details-container">
      <button className="back-button" onClick={() => setSelectedPokemon(null)}>
        Back to Pokédex
      </button>

      <div className="pokemon-info">
        <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
        <img className="pokemon-image" src={pokemon.sprite} alt={pokemon.name} />
        <p>{pokemon.description}</p>
        <p>
          <strong>Type:</strong> {pokemon.types}
        </p>
        <p>
          <strong>Height:</strong> {pokemon.height}m | <strong>Weight:</strong>{" "}
          {pokemon.weight}kg
        </p>

        <h3>Stats:</h3>
        <ul>
          {pokemon.stats.map((stat) => (
            <li key={stat.name}>
              {stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>

        <h3>Moves:</h3>
        <ul className="moves-list">
          {pokemon.moves.map((move) => (
            <li key={move}>{move}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Details;
