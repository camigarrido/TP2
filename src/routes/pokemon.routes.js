import { Router } from "express";
import * as pokemonController from "../controllers/pokemon.controller.js";

const router = Router();

router.get("/csv", pokemonController.getPokemonCsv);

export default router;
