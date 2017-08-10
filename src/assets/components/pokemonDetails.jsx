import React from 'react';

export class PokemonDetails extends React.Component {
    constructor(){
        super();
        this.state = {
        }
    }

    render() {
        let p = this.props;
        
        return (
            <div className="pokemon-details">
                <img src={p.selectedPokemon.sprites.front_default} />
                <div className="more-info">
                    <p>{p.selectedPokemon.name.toUpperCase()}</p>
                    <p>HT {p.selectedPokemon['height']}</p>
                    <p>WT {p.selectedPokemon.weight}</p>
                    <div className="pokemon-details">
                        {p.selectedPokemon.types.map((type, index) => {
                            return <span key={index}>{type.type.name.toUpperCase()}</span>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}