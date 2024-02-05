import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {useEffect, useState} from "react";
function Revenue() {

    const [revenues, setRevenue] = useState([]);

    useEffect(() => {
        async function fetchRevenues() {
            try {
                const response = await fetch("http://localhost:3001/revenues", {
                    method: "GET",
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log(responseData.revenues);
                    setRevenue(responseData.revenues);
                } else {
                    console.error("Failed to fetch expense list");
                }
            } catch (error) {
                console.error("Error fetching expense list", error);
            }
        }
        fetchRevenues();
    }, []);

    return (
        <div className="container mt-5">
            <DataTable value={revenues} tableStyle={{ minWidth: '50rem'}}>
                <Column field="revenueName" header="Revenue Name"></Column>
                <Column field='Account' header='Account'></Column>
                <Column field="amount" header="Amount"></Column>
                <Column field="date" header="Date"></Column>
            </DataTable>
        </div>
    )
}
export default Revenue;