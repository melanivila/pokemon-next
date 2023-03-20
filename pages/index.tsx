import { Layout } from "../components/layouts";
import { GetStaticProps, NextPage } from "next";
import pokeApi from "../api/pokeApi";
import { PokemonListResponse, SmallPokemon } from "../interfaces/pokemon-list";
import { Grid } from "@nextui-org/react";
import { PokemonCard } from "../components/pokemon";

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado de Pokemons">
      <>
        <Grid.Container gap={2} justify={"flex-start"}>
          {pokemons.map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id} />
          ))}
        </Grid.Container>
      </>
    </Layout>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
  const pokemons: SmallPokemon[] = data.results.map((poke, index) => ({
    ...poke,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      index + 1
    }.svg`,
  }));
  return {
    props: {
      pokemons: pokemons,
    },
  };
};
