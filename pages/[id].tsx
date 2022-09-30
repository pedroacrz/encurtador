import { Box, Text, Grid, GridItem, Input, Button, useQuery } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import { useEffect } from "react";
import { useRouter } from 'next/router'
import axios from "axios";

const mysql = require("serverless-mysql")({
    config: {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    }
})

const Id: NextPage = () => {
    const router = useRouter()
    const { id } = router.query

    // useEffect(() => {

    //     const getRedirection = async () => {
    //         if (id) {
    //             try {
    //                 const response = await axios.get(`/api/getShortenedUrl/${id}`);
    //                 let urlToRedirect: string = response.data.result?.url
    //                 if (urlToRedirect.startsWith("http://") || urlToRedirect.startsWith("https://")) {
    //                     //window.location.replace(response.data.result?.url)


    //                     return;
    //                 }

    //                 //window.location.replace("https://" + response.data.result?.url)
    //             } catch (error) {
    //                 console.log(error)
    //             }
    //         }
    //     }

    //     getRedirection()
    // }, [id])

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

export async function getServerSideProps(context: any) {
    const { res } = context;
    console.time("a")
    let results = await mysql.query(`select * from shortened_links where shortened_url = "${context.params.id}"`);
    console.timeEnd("a")

    let urlToRedirect: string = results[0]?.url
    if (urlToRedirect.startsWith("http://") || urlToRedirect.startsWith("https://")) {
        res.setHeader("location", urlToRedirect);
        res.statusCode = 302;
        res.end(); 
        return {
            props: {},
        }
    }
    res.setHeader("location", "https://" + urlToRedirect);
    res.statusCode = 302;
    res.end(); 

    return {
        props: {},
    }
}

export default Id
