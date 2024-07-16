import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import logo from "../../img/Star-Wars-Logo-1.png";
import "../../styles/home.css";


export const Navbar = () => {
const navigate = useNavigate()
const logout = () => {
	actions.setIsLogin(false)
	navigate('/')

}
	return (
		<nav className="navbar navbar-dark bg-dark mb-3 px-3">
			<div className="d-flex m-auto justify-content-around">
				<div className="justify-content-start">			
			<Link to="/">
				{/* <img src={logo} 
				id="logoHome" /> */}
				
			</Link>
			</div>
			<div className="justify-content-end">
				<Link to="/demo">
					<button className="btn btn-warning">Favoritos</button>
				</Link>
			</div>
			</div>
		</nav>
	);
};
