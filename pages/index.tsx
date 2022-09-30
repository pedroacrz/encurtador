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
      <Box backgroundColor="default.zinc" minH="100vh" color="default.white" px={["10px", "10px", "36"]} pt="5" pb="20">
        <Box maxWidth="1000px" margin="0 auto">
          <Box as="header">
            <Text fontSize="2xl" fontWeight="thin">ENCURTADOR</Text>
          </Box>
          <Box as="main">
            <Text fontSize={["3xl", "5xl", "5xl"]} mt="10" fontWeight="bold" textTransform="uppercase" marginTop="28" >Encurte seu link de maneira <Text as="span" color="default.primary">rápida</Text>  e <Text as="span" color="default.primary">fácil</Text>!</Text>
          </Box>
          <Box as="section">
            <Grid backgroundColor="default.blue" mt="20" gridTemplateColumns={["1fr", "6fr 1fr"]} gap="2" width="100%" borderRadius="10" alignItems="center" py="4" px="4">
              <GridItem>
                <Input placeholder="Escreva sua url aqui..." backgroundColor="default.white" height="49px" color="default.zinc" onChange={(e) => setUrl(e.target.value)}></Input>
              </GridItem>
              <GridItem>
                <Button backgroundColor="default.primary" width="100%" mt={["5px", "0px"]} height="49px" onClick={() => sendUrl()}>Encurtar</Button>
              </GridItem>
            </Grid>
          </Box>
          <Box as="section">
            {shortenedLinks.length > 0 && (
              <Text mt="5">Seus links encurtados:</Text>
            )}
            {shortenedLinks && shortenedLinks.map((url, index) => {
              return (
                <Box display="flex" flexDirection={["column", "column", "column", "row"]} p="3" key={index} backgroundColor="default.white" color="default.zinc" mt="2" width="100%" borderRadius="6" justifyContent="space-between"  >
                  <Box width={["70%", "70%", "30%"]} >
                    <Text overflow="hidden" fontWeight="semibold" whiteSpace="nowrap" style={{ textOverflow: "ellipsis" }}>{url.url}</Text>
                  </Box>
                  <Box alignItems={["", "", "", "center"]} display="flex" flexDirection={["column", "column", "column", "row"]}>
                    <Text as="a" mt={["5", "5", "5", "0"]} href={`${window.location.href}${url.shortened_url}`} cursor="pointer" target="_blank" mr="5" fontWeight="bold" color="default.primary" ref={textAreaRef}>{window.location.href}{url.shortened_url}</Text>
                    <CopyToClipboard text={`${window.location.href}${url.shortened_url}`}>
                      <Button mt={2} backgroundColor="default.primary" width="100%" height="32px" color="default.white" >Copiar</Button>
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
