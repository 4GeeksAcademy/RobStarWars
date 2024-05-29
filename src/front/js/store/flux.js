const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			
			characters: [],
			planets: [],


		},
		actions: {

			loadSomeData: () => {

				//Traer a los personajes
				fetch("https://swapi.dev/api/people")
					.then((response) => response.json())
					.then((data) => setStore({ characters: data.results }))
				

				fetch("https://swapi.dev/api/planets")
					.then((response) => response.json())
					.then((data) => setStore({ planets: data.results }))

				fetch("https://www.swapi.tech/api/starships")
					.then((response) => response.json())
					.then((data) => setStore({starships: data.results }))
				},
			
		}
	};
};

export default getState;
