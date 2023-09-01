import { useEffect, useState } from "react";
import axios from "axios";

const PokemonDetails = ({ pokemonData, pokemonSpeciesData }) => {
  const ConvHeightToMeters = pokemonData.height / 10;
  const ConvWeightToKg = pokemonData.weight / 10;
  const [pokemonEvoData, setPokemonEvoData] = useState(null);

  const renderEvolutionChain = (evoChain) => {
    let evoData = [];
    let currentEvo = evoChain;

    do {
      evoData.push(currentEvo.species.name);
      currentEvo = currentEvo.evolves_to[0];
    } while (!!currentEvo && currentEvo.hasOwnProperty("evolves_to"));

    return evoData.join(" -> ");
  };

  useEffect(() => {
    if (pokemonSpeciesData && pokemonSpeciesData.evolution_chain) {
      axios.get(pokemonSpeciesData.evolution_chain.url).then((res) => setPokemonEvoData(res.data.chain));
    }
  }, [pokemonSpeciesData]);

  return (
    <div className="pokemon-infos-container">
      <div>
        <h4>Pokedex Entry</h4>
        <span>{pokemonSpeciesData && pokemonSpeciesData.flavor_text_entries[0].flavor_text}</span>
      </div>
      <div>
        <h4>Height</h4>
        <p>{ConvHeightToMeters}m</p>
        <h4>Wheight</h4>
        <p> {ConvWeightToKg}kg</p>
      </div>
      <div>
        <h4>Abilities</h4>
        <div className="abilities">
          {" "}
          {pokemonData.abilities.map((ab, index) => (
            <div className="ab" key={index}>
              {ab.ability.name}
            </div>
          ))}{" "}
        </div>
      </div>
      <h4>Stats</h4>
      <div className="stats">
        {pokemonData.stats.map((st, index) => (
          <div key={index}>
            {st.stat.name} : {st.base_stat}
          </div>
        ))}
      </div>

      <div>
        <h4>Evolution</h4>
        <div>{pokemonEvoData ? renderEvolutionChain(pokemonEvoData) : "Loading..."}</div>
      </div>
    </div>
  );
};

export default PokemonDetails;
