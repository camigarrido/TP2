import fs from "node:fs/promises";
import path from "node:path";

const POKEMON_API = "https://pokeapi.co/api/v2/pokemon";
const CSV_PATH = path.resolve("database/pokemon_15.csv");
const CSV_HEADERS = ["id", "name", "height", "weight", "base_experience"];
const TOTAL_POKEMON = 15;

const escapeCsvValue = (value) => {
	const stringValue = String(value ?? "");
	if (/[",\n]/.test(stringValue)) {
		return `"${stringValue.replace(/"/g, '""')}"`;
	}
	return stringValue;
};

const toCsv = (pokemons) => {
	const rows = pokemons.map((pokemon) =>
		CSV_HEADERS.map((header) => escapeCsvValue(pokemon[header])).join(","),
	);
	return [CSV_HEADERS.join(","), ...rows].join("\n");
};

const fetchPokemon = async (id) => {
	let response;
	try {
		response = await fetch(`${POKEMON_API}/${id}`);
	} catch (error) {
		throw new Error(`No se pudo contactar la PokeAPI para el pokemon ${id}`);
	}

	if (!response.ok) {
		throw new Error(`La PokeAPI respondio con un error para el pokemon ${id}`);
	}

	return response.json();
};

export const generatePokemonCsv = async () => {
	const pokemons = [];

	for (let id = 1; id <= TOTAL_POKEMON; id += 1) {
		const pokemon = await fetchPokemon(id);
		pokemons.push({
			id: pokemon.id,
			name: pokemon.name,
			height: pokemon.height,
			weight: pokemon.weight,
			base_experience: pokemon.base_experience,
		});
	}

	const csv = toCsv(pokemons);
	await fs.writeFile(CSV_PATH, csv);

	return csv;
};
