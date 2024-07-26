import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Navbar = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);

	const host = `${process.env.BACKEND_URL}`;

	const fetchProfile = async () => {
		const token = localStorage.getItem('token');
		if (!token) {
			console.log("No token found in localStorage");
			return;
		}

		const response = await fetch(`${host}/api/profile`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});

		if (response.ok) {
			const data = await response.json();
			console.log(data.results);
		} else {
			console.log("Failed to fetch profile");
		}
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	return (
		<nav className="navbar navbar-dark bg-dark mb-3 px-3">
			<div className="d-flex m-auto justify-content-around">
				<div className="d-flex m-auto justify-content-around align-items-center">
					<div className="mx-5">
						<Link to="/">
							<img src="https://i.pinimg.com/originals/ee/ec/fb/eeecfb4866cb83c610f0f29400f541ad.png" alt="" style={{ maxHeight: "60px", width: "auto" }} />
						</Link>
					</div>
					<div className="mx-5">
						<Link to="/contacts">
							<button className="btn btn-warning">Contact</button>
						</Link>
					</div>
					{!store.isLogin ? (
						<div className="mx-5">
							<Link to="/signup">
								<button className="btn btn-warning">Signup</button>
							</Link>
						</div>
					) : (
						<div className="mx-5">
							<Link to="/">
								<button className="btn btn-danger" onClick={actions.logout}>Logout</button>
							</Link>
						</div>
					)}
					<div className="dropdown">
						<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
							Dropdown button
						</button>
						<ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
							{store.favorites.map((item, index) => (
								<li key={index} className="dropdown-item">
									{item}
									<span className="text-danger" onClick={() => actions.removeFavorite(item)}>
										<i className="fas fa-trash"></i>
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};
