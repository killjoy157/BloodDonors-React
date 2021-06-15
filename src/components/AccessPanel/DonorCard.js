import React from "react";
import {Link} from "react-router-dom";
import "../../css/DonorCard.css"
import PropTypes from 'prop-types';

const DonorCard = (props) => 
    <div className="donor-card">
        <h2>{props.donor.first_name}</h2>
        <p>Tipo de sangre: {props.donor.blood_type}</p>
        <p>Ubicación: {props.donor.place_of_residence}</p>
        <div className="flex">
            <Link to={`/panel/contacto/id=${props.donor.id}`}>Mas información</Link>
        </div>
    </div>

DonorCard.propTypes = {
    donor: PropTypes.object.isRequired
}
export default DonorCard;