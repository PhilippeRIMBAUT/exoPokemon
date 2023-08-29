import axios from "axios";
import { useEffect, useState } from "react";

const Cards = ({ url }) => {
  const [pokemonData, setPokemonData] = useState("");

  useEffect(() => {
    axios.get(url).then((res) => {
      setPokemonData(res.data);
    });
  }, [url]);

  return (
    <div className="card">
      {pokemonData && (
        <div>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <h2>{pokemonData.name} </h2>
          <p>N° {pokemonData.id}</p>
          <div>
            {pokemonData.types.map((t, index) => (
              <div key={index}>{t.type.name}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
