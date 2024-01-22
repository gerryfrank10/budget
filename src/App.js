import Header from "./components/Header";
import Main from "./components/Main";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Revenue from "./components/Revenue";
import Expense from "./components/Expense";
import Login from "./components/Login";
import {Fragment} from "react";
import PrivateRoute from "./utils/PrivateRoute";


function App() {
    return (
        <Router>
                <div>
                    <Header/>
                    <Routes>
                        <Fragment>
                            <Route path="/" element={<PrivateRoute />}>
                                <Route path="/" element={<Main />} />
                                <Route path="/expense" element={<Expense />}/>
                                <Route path="/revenue" element={<Revenue />}/>
                            </Route>
                            <Route path="/login" element={<Login />}/>
                            <Route path="*" element={<Main />}/>
                        </Fragment>
                    </Routes>
                </div>

        </Router>
    );
}

export default App;
