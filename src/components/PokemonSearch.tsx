import React, { Component } from 'react'
import User from '../interface/User.interface';
//import SearchState from '../interface/SearchState.interface';

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

export class PokemonSearch extends Component<User, SearchState> {
    pokemonRef: React.RefObject<HTMLInputElement>;

    constructor(props: User) {
        super(props);
        this.state = {
            error: false,
            pokemon: null
        }
        this.pokemonRef = React.createRef();
    }

    onSearchClick = ():void => {
        const inputValue = this.pokemonRef.current!.value;
        fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`).then(response => {
            console.log(response.status);
            console.log(response);
            if(response.status !== 200) {
                this.setState({
                    error: true
                });
                return;
            }
            response.json().then(data => {
                console.log(data);
                this.setState({
                    error: false,
                    pokemon: {
                        name: data.name,
                        numberOfAbilities: data.abilities.length,
                        baseExperience: data.base_experience,
                        imageUrl: data.sprites.front_default,
                    }
                })
            });
            
        }).catch(err => console.log('Error occured', err));
    }

    /**
     * Here you can see the type casting also return number.
     */
    addNumber = (a: number, b:number): number => {
        return a + b;
    }

    render() {
        const {name: userName, numberOfPokemons} = this.props;
        const { error, pokemon } = this.state;

        let resultMarkup;

        if(error) {
            resultMarkup = <p>Pockemon not Found Please try Again</p>;
        } else if (this.state.pokemon) {
            resultMarkup = <div>
                <img src={pokemon.imageUrl} alt='pokemon' className="pokemon-image"/>
                <p>{pokemon.name} has {pokemon.numberOfAbilities} abilities and {pokemon.baseExperience} base eprerience points</p>
            </div>
        }

        return (
            <div>
                <p> User {userName} {' '} 
                { numberOfPokemons && <span>has {numberOfPokemons} pokemons</span>}</p>
                <input type="text" ref={this.pokemonRef} />
                <button onClick={this.onSearchClick} className="my-button">
                    Search
                </button>
                {resultMarkup}
            </div>
            
        )
    }
}

export default PokemonSearch
