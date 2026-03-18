import React, { useState } from "react";
import Login from "./components/Login/Login";

function App(){
    const [view, setView] = useState("login")

	return (
        <>
            {view === "login" ? (
                <Login></Login>
            ) :
            null}
            <button 
                className="fixed bottom-4 right-4 bg-white rounded-lg shadow px-5 py-3"
                onClick={() => {
                    view === "login" ? setView("signup") : setView("login")
                }}
            >
                Toggle
            </button>
        </>
    )
}

export default App;