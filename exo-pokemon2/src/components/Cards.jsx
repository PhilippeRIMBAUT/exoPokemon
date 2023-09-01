import axios from "axios";
import { useEffect, useState } from "react";
import PokemonDetails from "./PokemonDetails";

const Cards = ({ url }) => {
  const [pokemonData, setPokemonData] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [pokemonSpeciesData, setPokemonSpeciesData] = useState("");

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  useEffect(() => {
    axios.get(url).then((res) => {
      setPokemonData(res.data);
      axios.get(res.data.species.url).then((speciesRes) => setPokemonSpeciesData(speciesRes.data));
    });
  }, [url]);

  return (
    <div className="card" onClick={toggleDetails}>
      {pokemonData && (
        <div>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <h2>{pokemonData.name} </h2>
          <p>N° {pokemonData.id}</p>
          <div className="types">
            {pokemonData.types.map((t, index) => (
              <div key={index} className={`type-box ${t.type.name}`}>
                {t.type.name}
              </div>
            ))}
          </div>
          {showDetails && <PokemonDetails pokemonData={pokemonData} pokemonSpeciesData={pokemonSpeciesData} />}
        </div>
      )}
    </div>
  );
};

export default Cards;
