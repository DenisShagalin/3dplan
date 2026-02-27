import Image from "next/image";
import Link from "next/link";
import { Flex } from "antd";

const logos = [
  {
    src: "/logos/AJAS.png",
    link: "https://www.ajas-immo.at/",
  },
  {
    src: "/logos/brimo.png",
    link: "https://brimo-immobilien.de/",
  },
  {
    src: "/logos/graf_immobilien_logo.png",
    link: "https://www.graf-immobilienmakler.com/",
  },
  {
    src: "/logos/remax.png",
    link: "https://www.remax.de/",
  },
];

export const Logos = () => (
  <Flex
    align="center"
    justify="space-evenly"
    style={{ padding: "20px", overflow: "auto" }}
  >
    {logos.map((logo, index) => (
      <Link href={logo.link} key={index}>
        <Image
          src={logo.src}
          alt={logo.link}
          width={100}
          height={100}
          style={{
            height: "auto",
            width: "auto",
          }}
        />
      </Link>
    ))}
  </Flex>
);
