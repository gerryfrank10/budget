import {NavLink, Link, useNavigate} from "react-router-dom";

function Header() {
    const myStyle = {
        color: 'var(--bs-body-color)',
        background: 'var(--bs-body-color)',
        fontSize: '16px',
        fontFamily: 'Aclonica, sans-serif',
    }

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    const isLoggedIn = !!localStorage.getItem('token');

    return (<nav className="navbar navbar-expand-md bg-body py-3" style={myStyle}>
            <div className="container">
                <NavLink to="/" className="navbar-brand d-flex align-items-center">
                <span
                    className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon"><svg
                    xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16"
                    className="bi bi-bezier">
                        <path fillRule="evenodd"
                              d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"></path>
                        <path
                            d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z"></path>
                    </svg>
                </span>
                    <span>Budget</span>
                </NavLink>
                <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-3"><span
                    className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navcol-3">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <NavLink to="/revenue" className="nav-link">
                                Revenues
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/expense" className="nav-link">
                                Expenses
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/report" className="nav-link">
                                Reports
                            </NavLink>
                        </li>
                    </ul>
                    {isLoggedIn ? (
                        <button className="btn btn-danger" type="button" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <Link to="/login">
                            <button className="btn btn-primary" type="button">
                                Profile
                            </button>
                        </Link>
                    )}
                </div>
            </div>
    </nav>)
}

export default Header;