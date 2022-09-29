import { Box, Text, Grid, GridItem, Input, Button } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useEffect, useState, useRef } from "react";
import axios from "axios";

import { CopyToClipboard } from 'react-copy-to-clipboard';

type ShortnedLinks = {
  id: string,
  url: string,
  shortened_url: string,
  created_at: string
}
const Home: NextPage = () => {

  const [url, setUrl] = useState("");
  const [shortenedLinks, setShortenedLinks] = useState<ShortnedLinks[]>([])
  const textAreaRef = useRef(null);

  const sendUrl = async () => {
    try {
      const response = await axios.post<any>("/api/createShortenedUrl", { url: url });
      setShortenedLinks([...shortenedLinks, response.data.result]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Head>
        <title>Encurtador de url</title>
        <meta name="description" content="Encurtador de url" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Box backgroundColor="default.zinc" minH="100vh" color="default.white" px="36" pt="10" pb="20">
        <Box maxWidth="1000px" margin="0 auto">

          <Box as="header">
            <Text fontSize="2xl" fontWeight="thin">ENCURTADOR</Text>
          </Box>

          <Box as="main" mt="28">
            <Grid gap="10" gridTemplateColumns={["1fr", "1fr 1fr"]}>
              <GridItem display="flex" justifyContent="center">
                <Text fontSize="5xl" mt="10" fontWeight="bold" textTransform="uppercase" marginTop="28" >Encurte seu link de maneira <Text as="span" color="default.primary">rápida</Text>  e <Text as="span" color="default.primary">fácil</Text>!</Text>
              </GridItem>
              <GridItem justifyContent="center">
                <Image src="/hero.svg" width="473" height="394" />
              </GridItem>
            </Grid>
          </Box>


          <Box as="section">
            <Box backgroundColor="default.blue" mt="20" width="100%" height="100" borderRadius="10" display="flex" justifyContent="space-between" alignItems="center" px="10">
              <Input placeholder="Escreva sua url aqui..." width="70%" height="49px" backgroundColor="default.white" color="default.zinc" onChange={(e) => setUrl(e.target.value)}></Input>
              <Button backgroundColor="default.primary" width="144px" height="49px" onClick={() => sendUrl()}>Encurtar</Button>
            </Box>
          </Box>

          <Box as="section">
            {shortenedLinks && shortenedLinks.map((url, index) => {
              return (
                <Box key={index} backgroundColor="default.white" color="default.zinc" mt="5" width="100%" height="45px" borderRadius="6" display="flex" justifyContent="space-between" alignItems="center" px="10">
                  <Text fontWeight="semibold">{url.url}</Text>
                  <Box display="flex" alignItems="center">
                    <Text mr="5" fontWeight="bold" color="default.primary" ref={textAreaRef}>{window.location.href}{url.shortened_url}</Text>
                    <CopyToClipboard text={`${window.location.href}${url.shortened_url}`}>
                      <Button backgroundColor="default.primary" width="100px" height="32px" color="default.white" >Copiar</Button>
                    </CopyToClipboard>
                  </Box>
                </Box>
              )
            })}

          </Box>
        </Box>
      </Box>
    </div >
  )
}

export default Home
