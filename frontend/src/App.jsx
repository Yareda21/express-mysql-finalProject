import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/guest/Home";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/about"
                        element={<div className="p-8">About Us Page</div>}
                    />
                    <Route
                        path="/contact"
                        element={<div className="p-8">Contact Page</div>}
                    />
                    <Route
                        path="/auth/login"
                        element={<div className="p-8">Login Page</div>}
                    />
                    <Route
                        path="/privacy"
                        element={<div className="p-8">Privacy Policy</div>}
                    />
                    <Route
                        path="/terms"
                        element={<div className="p-8">Terms of Service</div>}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
