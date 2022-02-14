import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import './App.css';
import Direct from "./Direct"
import Dashboard from './Dashboard'
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />}>
                    <Route path="direct" element={<Direct />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}