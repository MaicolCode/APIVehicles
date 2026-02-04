import { Router } from "express";
import { __dirname } from "../utils/dirname.js";
import {join} from "path";

export const routerPages = Router();

routerPages.get("/home", (req, res) => {
    res.sendFile(join(__dirname, "public", "index.html"));
});

routerPages.get("/introduction", (req, res) => {
    res.sendFile(join(__dirname, "public", "introduction.html"));
});

routerPages.get("/rest-api", (req, res) => {
    res.sendFile(join(__dirname, "public", "rest-api.html"));
});



