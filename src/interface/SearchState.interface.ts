interface SearchState {
    error: boolean,
    pokemon: Pokemon
}

interface Pokemon {
    name: string,
    numberOfAbilities: number,
    baseExperience: number,
    imageUrl: string
}

export default SearchState;