import PropTypes from 'prop-types';
import {useState} from "react";

function RequestCard(props){
        const request = props.request;
		const [statusReques, useStatusReques] = useState(request.status);
		const deletRequest = props.deletRequest;

        const HandleStatus = () => {
            deletRequest(request);
            useStatusReques("Cancelada");
        }
		
    return(
        <div>
            <div>
                <h2> Solicitud de donador </h2>
                <div>
                    <h3> Donador: {request.id_donor.first_name} </h3>
                    <h3> Tipo de sangre: {request.required_blood_type }</h3>
                </div>
                <div>
                    <h4> Mensaje: </h4>
                    <p> {request.message}</p>
                </div>
                <div>
                    <h4>Estado de la solicitud</h4>
                    <p> {statusReques} </p>
                </div>
            </div>
            <div>
                <button onClick={() => HandleStatus()}>Cancelar </button>
            </div>
        </div>
    )
}
RequestCard.prototype = {
    request: PropTypes.object.isRequired,
}

export default RequestCard;
