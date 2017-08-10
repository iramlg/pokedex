import React from 'react';
import {PokemonDetails} from './pokemonDetails.jsx';
import {PokemonItem} from './pokemonItem.jsx';

export class SinglePageApp extends React.Component {
	constructor(){
		super();
		this.state = {
			totalPages: 0,
			page: 0,
			selectedPokemon: false,
			pokemonList: []
		}
	}

	setPage(direction) {
		let page = this.state.page;

		if (direction === 'next') {
			page = page + 1;
		} else {
			page = page - 1;
		}

		$.ajax({
			url: "http://pokeapi.co/api/v2/pokemon/",
			method: "GET",
			data: {
				limit: 10,
				offset: page * 10
			}
		}).done((response) => {
			this.setState({
				page: page,
				pokemonList: response.results
			})

			this.onSelectPokemon(response.results[0])
		})
	}

	componentDidMount() {
		$.ajax({
			url: "http://pokeapi.co/api/v2/pokemon/",
			method: "GET",
			data: {
				limit: 10
			}
		}).done((response) => {
			this.setState({
				totalPages: Math.floor(response.count / 10),
				pokemonList: response.results
			})

			this.onSelectPokemon(response.results[0])
		})
	}

	onSelectPokemon(pokemon) {
		this.setState({
			selectedPokemon: false
		});

		$.ajax({
			url: pokemon.url,
			method: "GET"
		}).done((response) => {
			this.setState({
				selectedPokemon: response
			});
		});
	}

	render() {
		let s = this.state;

		return (
			<div>
				<div className="header">
					<h1>Pokedex</h1>
				</div>
				<div className="content">
					<div className="menu-select">
						{s.pokemonList.map((pokemon, i) => {
							return <PokemonItem 
								selectedPokemon={s.selectedPokemon}
								pokemon={pokemon}
								onSelectPokemon={this.onSelectPokemon.bind(this)}
								key={i} />
						})}
						<div className="controllers">
							{(s.page) ? <div onClick={this.setPage.bind(this, 'back')} className="arrow-left"></div> : <div></div>}
							<div onClick={this.setPage.bind(this, 'next')} className="arrow-right"></div>
						</div>
					</div>
					<div className="pokedex-details">
						{s.selectedPokemon ? 
							<PokemonDetails 
								selectedPokemon={s.selectedPokemon} />
						: <img src="public/img/loading.gif" />}
					</div>
				</div>
			</div>

		)
	}
}