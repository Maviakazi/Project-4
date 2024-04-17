import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import AddForm from "./pages/AddForm";
import EditNote from './pages/EditNote';

function App() {
    return (
        <>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/add"} element={<AddForm />} />
                <Route path={"/edit/:id"} element={<EditNote />} />
            </Routes>
        </>
    );
}

export default App;