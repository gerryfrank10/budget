import Footer from "./Footer";
import RevenueForm from "./RevenueForm";
import List from "./List";
import {useEffect, useState} from "react";
import ExpenseForm from "./ExpenseForm";

function Main() {
    const myStyle = {
        fontFamily: "Aclonica, sans-serif",
    };
    const [revenues, setRevenue] = useState([]);
    const [expenses, setExpense] = useState([]);
    const [mode, setMode] = useState("revenue");
    const [totalExpense, setTotalExpense] = useState();
    const [totalRevenue, setTotalRevenue] = useState();
    const base_url = process.env.REACT_APP_API_HOST;
    console.log(`Base Host ${base_url}`);

    useEffect(() => {
        // Fetch revenue data from API
        async function fetchRevenues() {
            try {
                const response = await fetch(`${base_url}/revenues`, {
                    method: "GET",
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                });

                if (response.ok) {
                    const responseData = await response.json();
                    setRevenue(responseData.revenues);
                    setTotalRevenue(responseData.totalAmount);
                } else {
                    console.error("Failed to fetch revenue list");
                }
            } catch (error) {
                console.error("Error fetching revenue list", error);
            }
        }

        // Fetch expense data from API
        async function fetchExpenses() {
            try {
                const response = await fetch(`${base_url}/expenses`, {
                    method: "GET",
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                });

                if (response.ok) {
                    const responseData = await response.json();
                    setExpense(responseData.expenses);
                    setTotalExpense(responseData.totalAmount)
                } else {
                    console.error("Failed to fetch expense list");
                }
            } catch (error) {
                console.error("Error fetching expense list", error);
            }
        }

        fetchRevenues();
        fetchExpenses();
    }, [base_url]);

    function addRevenue(data, id) {
        const newItem = {
            id: id, name: data.BillName, account: data.Account, amount: data.Amount, note: data.Note
        };
        setRevenue([...revenues, newItem]);
    }

    async function removeRevenue(id) {
        try {
            const response = await fetch(`${base_url}/delete-revenue/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            })
            if (response.ok) {
                const responseData = await response.json();
                setTotalRevenue(responseData.totalAmount);
                console.log(responseData.message);
                setRevenue(() => revenues.filter((item) => item.id !== id))
            }
        } catch (error) {
            console.log("Error deleting revenue", error)
        }

    }

    function addExpense(data, id) {
        console.log(id)
        const newItem = {
            id: id, name: data.ExpenseName, account: data.Account, amount: data.Amount, note: data.Note
        };
        setExpense([...expenses, newItem]);
    }

    async function removeExpense(id) {
        try {
            const response = await fetch(`${base_url}/delete-expense/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                },
            })
            if (response.ok) {
                const responseData = await response.json();
                setTotalExpense(responseData.totalAmount)
                console.log(responseData.message);
                setExpense(() => expenses.filter((item) => item.id !== id))
            }
        } catch (error) {
            console.log("Error deleting expense", error)
        }
    }

    function editItem(name) {
        alert("Edit " + name)
    }

    const revenueList = revenues?.map((item) => (
        <List key={item.id} name={item.revenueName} itemId={item.id} deleteItem={removeRevenue} editItem={editItem}/>));
    const expenseList = expenses?.map((item) => (
        <List key={item.id} name={item.expenseName} itemId={item.id} deleteItem={removeExpense}/>));

    console.log(expenseList);

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
                        <h3 style={{fontFamily: "Aclonica, sans-serif", fontSize: "17.408px"}}>Total Revenue
                            : {totalRevenue}</h3>
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
                        <h5 style={{fontFamily: "Aclonica, sans-serif", fontSize: "17px"}}>Total Expenses
                            : {totalExpense}</h5>
                        <ul className="list-group list-group-flush">
                            {expenseList}
                        </ul>
                    </div>
                </div>
                <Footer />
            </div>
        </section>
    </div>)
}

export default Main;