import React from 'react';

export class PokemonItem extends React.Component {
    constructor(){
        super();
        this.state = {
        }
    }

    render() {
        let p = this.props;

        return (
            <div 
                className={(p.selectedPokemon && (p.pokemon.name === p.selectedPokemon.name)) ? "pokemon-item active" : "pokemon-item"}  
                onClick={() => { this.props.onSelectPokemon(p.pokemon) }}>
                <span>{p.pokemon.name.toUpperCase()}</span>
            </div>
        )
    }
}























