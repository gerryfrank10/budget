import Header from "./components/Header";
import Main from "./components/Main";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Revenue from "./components/Revenue";
import Expense from "./components/Expense";
import {Fragment} from "react";
import PrivateRoute from "./utils/PrivateRoute";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import Profile from "./components/Profile";


function App() {
    return (
        <Router>
                <div>
                    <Header/>
                    <Routes>
                        <Fragment>
                            <Route path="/" element={<Main />} />
                            <Route path="/" element={<PrivateRoute />}>
                                <Route path="/expense" element={<Expense />}/>
                                <Route path="/revenue" element={<Revenue />}/>
                                <Route path="*" element={<Main />}/>
                            </Route>
                            <Route path="/login" element={<Profile />}/>
                        </Fragment>
                    </Routes>
                </div>

        </Router>
    );
}

export default App;
