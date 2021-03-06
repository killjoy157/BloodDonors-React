import React from "react";
import {
    Link
  } from "react-router-dom";
import "../../css/HeaderGeneral.css"
import PropTypes from 'prop-types';
import useAuth from "../Auth/useAuth";

function HeaderGeneral(props) {
    const auth = useAuth();
    const col = props.colorT;
    const imgUrl = props.image;

    const divStyle = {
        color: col,
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 1)), 
        url(${imgUrl}})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    };
    const buttonStyle = {
        display: props.buttonMos
    }

    return (
    <>
        <header className="headerGeneral" style={divStyle}>
            <div>
                <h2 className="" > {props.title}</h2>
                {!auth.isLogged() && 
                    <div className="containerButton">
                        <Link to="/SignIn" style={buttonStyle} className="button">Sign in</Link>
                        <Link to="/LogIn" style={buttonStyle} className="button">Login</Link>
                    </div>
                }
                {auth.isLogged() && 
					<div className="containerButton" onClick={() => auth.logout()}>
						<button style={buttonStyle} className="button">Cerrar sesión</button>
					</div>
				}
            </div>
        </header>
    </>
    );
  }
HeaderGeneral.protoType = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    colorT: PropTypes.string.isRequired,
}
export default HeaderGeneral;