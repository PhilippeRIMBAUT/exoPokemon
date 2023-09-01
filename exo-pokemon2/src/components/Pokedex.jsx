import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const filteredPokemons = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(searchValue.toLocaleLowerCase()));

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`).then((res) => {
      setPokemons((prevPokemons) => [...prevPokemons, ...res.data.results]);
    });
  }, [offset]);

  const handleNextPage = () => {
    setOffset((prevOffset) => prevOffset + 20);
  };

  return (
    <div className="pokedex">
      <div className="input">
        <input type="text" placeholder="Entrez le nom d'un Pokemon" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />

        <div className="card-container">
          {searchValue ? filteredPokemons.map((pokemon, index) => <Cards key={index} url={pokemon.url} />) : pokemons.map((pokemon, index) => <Cards key={index} url={pokemon.url} />)}
        </div>
      </div>

      <div>
        <button onClick={handleNextPage}>Suivant</button>
      </div>
    </div>
  );
};

export default Pokedex;
