import { Link, Spacer, Text, useTheme } from "@nextui-org/react";
import NextLink from "next/link";
import Image from "next/image";

export const NavBar = () => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: "20px",
        backgroundColor: theme?.colors.gray100.value,
      }}
    >
      <NextLink href="/" passHref>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
            alt="Icono de la app"
            width={70}
            height={70}
          />
          <Text color="white" h2>
            P
          </Text>
          <Text color="white" h3>
            okémon
          </Text>
          <Spacer css={{ flex: 1 }} />
        </div>
      </NextLink>
      <NextLink href="/favorites" passHref>
        <div>
          <Text color="white">Favoritos</Text>
        </div>
      </NextLink>
    </div>
  );
};
