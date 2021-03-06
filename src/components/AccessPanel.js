import {useEffect, useState} from "react"
import PanelHome from "./AccessPanel/PanelHome";
import User from  "./AccessPanel/User";

//Css
import "../css/AccessPanel/AcessPanel.css";

//Autenticacion
import useAuth from "./Auth/useAuth";

function AccessPanel() { 
  const auth = useAuth();
  const user = auth.type.typeUser;
  const url = auth.url[0] + user + auth.url[1]+"/me";
  const [me, setMe] = useState({
    first_name: "Juan",
    email: "ger@ger",
    id: "609032da0f127e0015984fd9"
  })
  useEffect(() => {
    const GetData = async () =>
    {   
      let data;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ auth.user.token
                }
            });
            data = await response.json();
            console.log(data, "usuario", auth.user.token);
            setMe(data.data);
            return
        }
        catch(e) {
            console.error(e);
            auth.logout();
        }
    }
    GetData();
  },[url]);

  return (
    <div className="accesPanel">
        <User me={me}/>
        <PanelHome me={me} />
    </div>
  );
}
export default AccessPanel;
