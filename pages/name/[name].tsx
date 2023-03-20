import React, { useEffect, useState } from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { Button, Card, Grid, Text, Container, Image } from "@nextui-org/react";
import { Layout } from "../../components/layouts/Layout";
import pokeApi from "../../api/pokeApi";
import { Pokemon } from "../../interfaces/pokemon-full";
import { localFavorites, getPokemonInfo } from "../../utils";
import confetti from "canvas-confetti";
import { PokemonListResponse } from "../../interfaces/pokemon-list";

interface Props {
  pokemon: Pokemon;
}

const PokemonPageByName: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState<boolean>(false);
  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };
  useEffect(() => {
    localFavorites.existInFavorites(pokemon.id);
  }, [pokemon.id]);

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                color="gradient"
                ghost={!isInFavorites}
                onPress={onToggleFavorite}
              >
                {isInFavorites ? "En favoritos" : "Guardar en favoritos"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=151`);
  const listOfNames: string[] = data.results.map((pokemon) => pokemon.name);

  return {
    paths: listOfNames.map((pokeName) => ({
      params: { name: pokeName },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { name } = ctx.params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name),
    },
  };
};

export default PokemonPageByName;
