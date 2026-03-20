import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";

function App(){
    const [view, setView] = useState("login")

	return (
        <AppRoutes />
    )
}
export default App;