import type { NextApiRequest, NextApiResponse } from "next"
import { randomUUID } from "crypto";

const mysql = require("serverless-mysql")({
    config: {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    }
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { url } = req.body;
        console.log(url)
        const uuid = randomUUID();
        const randomUrl = randomUUID().split("-", 1)[0];
        const shortened_url = `${randomUrl}`
        await mysql.query(`insert into shortened_links (id, url, shortened_url, created_at) values ("${uuid}", "${url}", "${shortened_url}", "2022-09-26T23:49:00")`);
        let results = await mysql.query(`select * from shortened_links where id = "${uuid}"`);
        await mysql.end();
        return res.status(200).json({ result: results[0] });
    } else {
        res.status(400).send("Method not allowed.");
    }
}