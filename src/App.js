import {
    Routes,
    Route,
    HashRouter
} from "react-router-dom";
import './App.css';
import Direct from "./Direct"
import System from "./System"
import Options from './Options'
import Popup from './Popup'

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/options" element={<Options />}>
                    <Route path="direct" element={<Direct />} />
                    <Route path="system" element={<System />} />
                </Route>
                <Route path="/popup" element={<Popup />}>
                </Route>
            </Routes>
        </HashRouter>
    )
}