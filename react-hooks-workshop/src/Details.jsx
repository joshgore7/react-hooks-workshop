
function Details() {
  return (
    <div>
      <div className="details-container">
        <div className="pokemon-image">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
            alt="Bulbasaur"
          />
        </div>
        <div className="pokemon-info">
          <h1>Bulbasaur</h1>
          <p>Description</p>
          <p>Type</p>
          <p>Height: 7</p>
          <p>Base Stats</p>
        </div>
      </div>
      <div className="pokemon-moves">
          <h2>Moves</h2>
          <ul>
            <li>Move 1</li>
            <li>Move 2</li>
            <li>Move 3</li>
            <li>Move 4</li>
          </ul>
      </div>
    </div>
  );
}

export default Details;