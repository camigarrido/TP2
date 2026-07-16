import * as pokemonService from "../services/pokemonService.js";

export const getPokemonCsv = async (req, res) => {
	try {
		const csv = await pokemonService.generatePokemonCsv();
		res.setHeader("Content-Type", "text/csv");
		if (req.query.download === "true") {
			res.setHeader(
				"Content-Disposition",
				'attachment; filename="pokemon_15.csv"',
			);
		}
		res.status(200).send(csv);
	} catch (error) {
		res.status(503).json({ statusCode: 503, error: error.message });
	}
};
