import type { NextApiRequest, NextApiResponse } from "next"

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
    if (req.method === "GET") {
        const { id } = req.query;
        let results = await mysql.query(`select * from shortened_links where shortened_url = "${id}"`);
        await mysql.end();
        return res.status(200).json({ result: results[0] });
    } else {
        res.status(400).send("Method not allowed.");
    }
}