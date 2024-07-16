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
			
			isLogin: false,
			characters: [],
			planets: [],
			currentItem: {}

		},
		actions: {
			
			setCurrentItem: (item) => {
             
                setStore({currentItem: item});
            },

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
			setIsLogin: (login) => setStore({ isLogin: login }),
			profile: async() => {
				const url = process.env.BACKEND_URL + '/api/profile'
				const token = localStorage.getItem('token')
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'response/json',
						'Authorization': `Bearer ${token}`
					}
				}
				const response = await fetch(url, options)
				if (!response.ok) {
					console.log('Error: ', response.status, response.statusText);
					return
				}
				const data = await response.json()
			}
			
		}
	};
};

export default getState;
