import { useEffect } from "react"
import "aos/dist/aos.css";
import AOS from "aos";
import { Route, Routes } from "react-router-dom"
import Login from "./Components/Authentication/Login/Login";
import Four04 from "./Components/404page/Four04";
import Todo from "./Components/Todo/Todo";
import RequireAuth from "./Components/Authentication/Login/RequireAuth/RequireAuth";

function App() {

	useEffect(() => {
		AOS.init();
	}, [])

	return (
		<>

			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/todo" element={
					<RequireAuth>
						<Todo />
					</RequireAuth>
				} />
				<Route path="*" element={<Four04 />} />
			</Routes>

		</>

	)
}

export default App
