function Details({ pokemon, setSelectedPokemon }) {
  return (
    <div className="details-container">
      <button className="back-button" onClick={() => setSelectedPokemon(null)}>
        Back to Pokédex
      </button>
      <div>
        <h1>It's {pokemon.name}!</h1>
        <div className="pokemon-info">
          <img className="pokemon-image" src={pokemon.sprite} alt={pokemon.name} />
          <div className="pokemon-details">
            <p>{pokemon.description}</p>
            <p><strong>Type:</strong> {pokemon.types}</p>
            <p><strong>Height:</strong> {pokemon.height}m | <strong>Weight:</strong> {pokemon.weight}kg</p>

            <h3> Base Stats:</h3>
            <ul>
              {pokemon.stats.map((stat) => (
                <li key={stat.name}>
                  <strong>{stat.name}:</strong> {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
          </div>
          <div className="pokemon-moves">
            <h3 className="moves-title">Moves:</h3>
            <ul className="moves-list">
              {pokemon.moves.sort().map((move) => (
                <li key={move}>{move}</li>
              ))}
            </ul>
          </div>
        </div>
    </div>
  );
}

export default Details;
