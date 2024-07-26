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
			favorites: [],
			currentItem: {},
			token: null,
			admin: null,
			currentUser: null, // Esta es la variable que necesitas
		},
		actions: {
			login: async (email, password) => {
				console.log("Intentando iniciar sesión con email:", email);
				console.log("Contraseña:", password);
				const url = process.env.BACKEND_URL + '/api/login';

				const response = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email, password })
				});

				if (!response.ok) {
					console.log("Error logging in", response.status, response.statusText);
					return null;
				}

				const data = await response.json();
				if (data.access_token) {
					setStore({ token: data.access_token });
					localStorage.setItem('token', data.access_token);
					getActions().setIsLogin(true);

					// Guarda el ID del usuario en el estado
					setStore({ currentUser: data.id });
					localStorage.setItem('admin', data.is_admin);
					setStore({ admin: data.is_admin });
				}
				return data;
			},
			
			logout: () => {
				setStore({ token: null, currentUser: null }); // Limpia el currentUser al cerrar sesión
				localStorage.removeItem('token');
				getActions().setIsLogin(false);
			},
		
			setCurrentItem: (item) => {
				setStore({ currentItem: item });
			},

			loadSomeData: () => {
				// Traer a los personajes
				fetch("https://swapi.dev/api/people")
					.then((response) => response.json())
					.then((data) => setStore({ characters: data.results }));

				fetch("https://swapi.dev/api/planets")
					.then((response) => response.json())
					.then((data) => setStore({ planets: data.results }));

				fetch("https://www.swapi.tech/api/starships")
					.then((response) => response.json())
					.then((data) => setStore({ starships: data.results }));
			},
			
			setIsLogin: (login) => {
				setStore({ isLogin: login });
			},

			setCurrentUser: (userId) => {
				setStore({ currentUser: userId });
			},
			updateFavorites: async () => {
				try {
					const response = await fetch('/api/favorites'); 
					if (!response.ok) {
						throw new Error('Error fetching favorites');
					}
					const data = await response.json();
					setStore({ favorites: data }); 
				} catch (error) {
					console.error('Error updating favorites:', error);
				}
			},
		}
	};
};

export default getState;
