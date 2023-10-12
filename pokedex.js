const pokeForm = document.querySelector('form');
const testBtn = document.getElementById('testBtn');
const pokeInfo = document.getElementById('pokeInfo');

pokeForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const pokeName = document.getElementById('pokemonName').value;
    await getPokemonDetails(pokeName);
});

testBtn.addEventListener('click', () => {
    testBtn.style.backgroundColor = 'pink';
    testBtn.style.transform = testBtn.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
    testBtn.style.fontSize = '20px';
});

async function getPokemonDetails(name) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (response.ok) {
            const data = await response.json();
            const abilities = data.abilities.map((ability) => ability.ability.name).join(', ');
            const move1 = data.moves[0].move.name;
            const baseExperience = data.base_experience;

            pokeInfo.innerHTML = `
                <h2>${data.name}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>Abilities: ${abilities}</p>
                <p>Sick Move: ${move1}</p>
                <p>Base experience: ${baseExperience}</p>
            `;
        } else {
            pokeInfo.innerHTML = `<p>Pokémon not found. Please try again.</p>`;
        }
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        pokeInfo.innerHTML = `<p>An error occurred. Please try again later.</p>`;
    }
}
