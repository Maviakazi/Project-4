import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import AddForm from "./pages/AddForm";


function App() {
    return (
        <>
            <Router>
                <Nav />
                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/add"} element={<AddForm />}/>

                </Routes>
            </Router>
        </>
    );
}

export default App;