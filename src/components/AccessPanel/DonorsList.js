import React from "react";
import "../../css/DonorsList.css";
import DonorCard from "./DonorCard";

//Autenticación
import useAuth from "../Auth/useAuth";

const DonorsList = ( props ) =>{
    const auth = useAuth();
    
    const [donors, setDonors] = React.useState([]);

    React.useEffect(() => {
        const getData = async () =>
        {
            try {
                const response = await fetch("https://blood-donors-v1.herokuapp.com/v1/donors/search?field=blood_type&value=A-", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': auth.user
                    }
                });
                const data = await response.json();

                const resp = data.filter((dat) => dat.place_of_residence === props.data.place_of_residence);
                console.log(response, props.data)
                setDonors(resp);
            }
            catch(e) {
                console.error(e);
            }
        }
        getData();
    }, []);

    return(
        <div className="list-container">
            <h1>Lista de donadores </h1>

            {donors.map(donor => <DonorCard key={donor.id} donor={donor} />)}
            
        </div>
    )
}

export default DonorsList;
