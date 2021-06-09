import express from 'express'
import cors from 'cors'

const server = express();
server.use(express.json());

server.get("/" , (req, res) => {
    console.log("chegou uma cartinha");
});

server.post("/" , (req, res) => {
    console.log("chegou uma cartinha tipo post!");
})

server.listen(6666);