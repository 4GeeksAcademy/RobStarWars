import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/loginregister.css";

const Signup = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };


  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Email y contraseña son requeridos");
      return;
    }
    const data = await actions.login(email, password);
    if (data) {
      navigate('/');
    } else {
      setError("Credenciales incorrectas");
    }
  };

  const handleSubmitSignup = async (event) => {
    event.preventDefault();
    if (!email || !password ) {
      setError("Todos los campos son requeridos");
      return;
    }
    const dataToSend = { email, password };
    const url = `${process.env.BACKEND_URL}/api/signup`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend),
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.error);
      return;
    }
    const data = await response.json();
    localStorage.setItem('token', data.access_token);
    navigate('/');
  };

  return (
    <div className="wrapper">
      <div className="card-switch">
        <label className="switch">
          <input type="checkbox" className="toggle" />
          <span className="slider"></span>
          <span className="card-side"></span>
          <div className="flip-card__inner">
            <div className="flip-card__front">
              <div className="title">Log in</div>
              <form className="flip-card__form" action="">
                <input className="flip-card__input" name="email" placeholder="Email" type="email" value={email} onChange={handleEmail} />
                <input className="flip-card__input" name="password" placeholder="Password" type="password" value={password} onChange={handlePassword} />
                <button className="flip-card__btn" onClick={handleLogin}>Ingresar</button>
              </form>
            </div>
            <div className="flip-card__back">
              <div className="title">Registrarse</div>
              <form className="flip-card__form" action="">
                <input className="flip-card__input" name="email" placeholder="Email" type="email" value={email} onChange={handleEmail} />
                <input className="flip-card__input" name="password" placeholder="Password" type="password" value={password} onChange={handlePassword} />
                <button className="flip-card__btn" onClick={handleSubmitSignup}>Enviar</button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Signup;