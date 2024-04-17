import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import AddForm from "./pages/AddForm";

function App() {
    return (
        <>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/add"} element={<AddForm />} />
            </Routes>
        </>
    );
}

export default App;