import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <BrowserRouter>
            <Toaster position="top-right" />

            <h1>Lead Management System</h1>
        </BrowserRouter>
    );
}

export default App;