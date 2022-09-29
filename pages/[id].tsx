import { Box, Text, Grid, GridItem, Input, Button, useQuery } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useEffect } from "react";
import { useRouter } from 'next/router'
import axios from "axios";


const Id: NextPage = () => {
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        const getRedirection = async () => {
            if (id) {
                try {
                    const response = await axios.get(`/api/getShortenedUrl/${id}`);
                    let urlToRedirect: string = response.data.result?.url
                    if (urlToRedirect.startsWith("http" || "https")) {
                        window.location.replace(response.data.result?.url)
                    }
                    window.location.replace("https://" + response.data.result?.url)
                } catch (error) {
                    console.log(error)
                }
            }
        }

        getRedirection()
    }, [id])

    return (
        <div>
            <Head>
                <title>Redirecionando...</title>
                <meta name="description" content="Redirecionando..." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

        </div >
    )
}

export default Id
