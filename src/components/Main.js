import Footer from "./Footer";
import RevenueForm from "./RevenueForm";
import List from "./List";
import {nanoid} from "nanoid";
import {useState} from "react";
import ExpenseForm from "./ExpenseForm";

function Main(props) {
    const myStyle = {
        fontFamily: "Aclonica, sans-serif",
    };

    const [revenues, setRevenue] = useState([]);
    const [expenses, setExpense] = useState([]);
    const [mode, setMode] = useState("revenue");

    function addRevenue(data) {
        const newItem = {
            id: `item-${nanoid()}`, name: data.BillName, account: data.Account, amount: data.Amount, note: data.Note
        };
        setRevenue([...revenues, newItem]);
    }

    function removeRevenue(name) {
        setRevenue((prevItems) => revenues.filter((item) => item.name !== name))
    }

    function addExpense(data){
        const newItem = {
            id: `item-${nanoid()}`, name: data.ExpenseName, account: data.Account, amount: data.Amount, note: data.Note
        };
        setExpense([...expenses, newItem]);
    }

    async function removeExpense(id) {
        try {
            const response = await fetch(`http://localhost:3001/delete-expense/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                },
            })
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.message);
                setExpense((prevItem) => expenses.filter((item) => item.id !== id))
            }
        } catch (error) {
            console.log("Error deleting revenue", error)
        }
    }

    function editItem(name) {
        alert("Edit "+ name)
    }

    const revenueList = revenues?.map((item) => (<List key={item.id} name={item.name} itemId={item.id} deleteItem={removeRevenue} editItem={editItem}/>));
    const expenseList = expenses?.map((item) => (<List key={item.id} name={item.name} itemId={item.id} deleteItem={removeExpense}/>));

    const toggleMode = (selectedMode) => {
        setMode(selectedMode)
    }


    const renderForm = () => {
        if (mode === "revenue") {
            return <RevenueForm myStyle={myStyle} addItem={addRevenue}/>
        } else if (mode === "expenses") {
            return <ExpenseForm myStyle={myStyle} addItem={addExpense}/>
        }
        return null;
    }

    return (<div>
            <section>
                <div className="container position-relative">
                    <div className="row d-flex justify-content-center">
                        <div className="col" style={{textAlign: "left"}}>
                            <h3 style={{fontFamily: "Aclonica, sans-serif", fontSize: "17.408px"}}>Total Revenue</h3>
                            <ul className="list-group">
                                {revenueList}
                            </ul>
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-5 col-xxl-4" style={{width: "375.987px"}}>
                            <div className="card mb-5">
                                <div className="card-body p-sm-5" style={{height: "462.125px"}}>
                                    <div className="text-center mb-4">
                                        <h2 style={myStyle}>
                      <span
                          onClick={() => toggleMode("revenue")}
                          style={{
                              cursor: "pointer",
                              color: mode === "revenue" ? "#007BFF" : "grey",
                              filter: mode === "revenue" ? "none" : "blur(1px)"
                          }}
                      >
                        Revenue
                      </span>{" "}
                                            /{" "}
                                            <span
                                                onClick={() => toggleMode("expenses")}
                                                style={{
                                                    cursor: "pointer",
                                                    color: mode === "expenses" ? "#007BFF" : "grey",
                                                    filter: mode === "expenses" ? "none" : "blur(1px)"
                                                }}
                                            >
                        Expenses
                      </span>
                                        </h2>
                                    </div>
                                    {renderForm()}
                                </div>
                            </div>
                        </div>
                        <div className="col" style={{textAlign: "right"}}>
                            <h5 style={{fontFamily: "Aclonica, sans-serif", fontSize: "17px"}}>Total Expenses</h5>
                            <ul className="list-group list-group-flush">
                                {expenseList}
                            </ul>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </section>
        </div>)
}

export default Main;