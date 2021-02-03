import React, {useEffect, useState} from "react";
import "./Home.css";
import {getRole} from "../App";
import Loader from "react-loader-spinner";
import {loaderStyle} from "../App";

function Home() {

    const [roleTab, setRoleTab] = useState(
        null
    )
    useEffect(() => {

            getRole().then(({roles}) => setRoleTab(roles))
        }
    , [])
    if (localStorage.auth_token !== undefined) {

        if (roleTab === 'admin'){

            return (

                <>
                    <h1>This is the AdminPage</h1>

                </>
            );
        } else if (roleTab === 'user') {

            return (

                <>
                    <h1>This is the HomePage</h1>

                </>
            );
        } else  {
            return (
                <Loader
                    style={loaderStyle}
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />
            );

        }
    }

}

export default Home;