import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import EditNote from './pages/EditNote';
import AddNote from './pages/AddNote';

function App() {
    return (
        <>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/add"} element={<AddNote />} />
                <Route path={"/edit/:id"} element={<EditNote />} />
            </Routes>
        </>
    );
}

export default App;