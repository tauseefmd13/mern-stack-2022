import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
	return (
		<>
			<CssBaseline />
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}

export default App;
