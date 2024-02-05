import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useEffect, useState} from "react";

function Expense() {

    const [expenses, setExpense] = useState([]);

    useEffect(() => {
        async function fetchExpenses() {
            try {
                const response = await fetch("http://localhost:3001/expenses", {
                    method: "GET",
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log(response.expenses);
                    setExpense(responseData.expenses);
                } else {
                    console.error("Failed to fetch expense list");
                }
            } catch (error) {
                console.error("Error fetching expense list", error);
            }
        }
        fetchExpenses();
    }, []);

    return (
        <div className="container mt-5">
            <DataTable value={expenses} tableStyle={{ minWidth: '50rem'}}>
                <Column field='expenseName' header='Expense Name'></Column>
                <Column field="ExpenseChoice" header="Choice "></Column>
                <Column field="Amount" header="Amount"></Column>
                <Column field="date" header="Date"></Column>
            </DataTable>
        </div>
    )
}
export default Expense;