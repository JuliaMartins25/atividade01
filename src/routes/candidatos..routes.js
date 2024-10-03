import { Router } from "express";

const routes = Router();

routes.get("/", (req,res) => {
    return res.status(200).send({message: "Vai são paulo!"})
});

export default routes;