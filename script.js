const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=200";

const container = document.getElementById("pokemonContainer");
const searchBox = document.getElementById("searchBox");

let allPokemons = [];

// Fetch Pokémon List
async function fetchPokemons() {
    const response = await fetch(API_URL);
    const data = await response.json();

    const pokemonResults = data.results;

    // Fetch image + details of each Pokémon
    for (let pokemon of pokemonResults) {
        const res = await fetch(pokemon.url);
        const details = await res.json();

        allPokemons.push({
            name: details.name,
            image: details.sprites.front_default
        });
    }

    displayPokemons(allPokemons);
}

// Display Pokémon Cards
function displayPokemons(pokemonList) {
    container.innerHTML = "";

    pokemonList.forEach(pokemon => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <h3>${pokemon.name.toUpperCase()}</h3>
        `;

        container.appendChild(card);
    });
}

// Search Pokémon in real-time
searchBox.addEventListener("input", () => {
    const text = searchBox.value.toLowerCase();

    const filtered = allPokemons.filter(poke =>
        poke.name.toLowerCase().includes(text)
    );

    displayPokemons(filtered);
});

// Load Pokémon from API
fetchPokemons();
