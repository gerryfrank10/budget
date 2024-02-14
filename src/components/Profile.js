import {useState} from "react";
import Register from "./Register";
import Login from "./Login";

function Profile(){

    const myStyle = {
        fontFamily: "Aclonica, sans-serif",
    };

    const [mode, setMode] = useState("Login");

    const toggleMode = (selectedMode) => {
        setMode(selectedMode)
    }
    const renderForm = () => {
        if (mode === "Register") {
            return <Register  />
        } else if (mode === "Login") {
            return <Login  />
        }
        return null;
    }

    return (
        <div className="row d-flex justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5 col-xxl-4" style={{width: "375.987px"}}>
            <div className="card mb-5">
                <div className="card-body p-sm-5" style={{height: "462.125px"}}>
                    <div className="text-center mb-4">
                        <h2 style={myStyle}>
                      <span
                          onClick={() => toggleMode("Register")}
                          style={{
                              cursor: "pointer",
                              color: mode === "Register" ? "#007BFF" : "grey",
                              filter: mode === "Register" ? "none" : "blur(1px)"
                          }}
                      >
                        Register
                      </span>{" "}
                            /{" "}
                            <span
                                onClick={() => toggleMode("Login")}
                                style={{
                                    cursor: "pointer",
                                    color: mode === "Login" ? "#007BFF" : "grey",
                                    filter: mode === "Login" ? "none" : "blur(1px)"
                                }}
                            >
                        Login
                      </span>
                        </h2>
                    </div>
                    {renderForm()}
                </div>
            </div>
        </div>
        </div>
    )

}

export default Profile;