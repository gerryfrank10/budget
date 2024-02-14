import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useEffect, useState} from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {FilterMatchMode} from "primereact/api";

function Expense() {

    const [expenses, setExpense] = useState([]);

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS}
    })

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(expenses);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'expenses');
        });
    };
    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };

    const renderHeader = () => {
        return (
            <div className="d-flex align-items-center justify-content-end gap-2">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" />
                </span>
                <Button className="" type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
            </div>
        );
    };
    const header = renderHeader();
    const base_url = process.env.REACT_APP_API_HOST;

    useEffect(() => {
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
    }, [base_url]);

    return (
        <div className="container mt-5">
            <DataTable
                value={expenses}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                stripedRows tableStyle={{ minWidth: '50rem'}}
                filters={filters}
                header={header}
            >
                <Column field='expenseName' sortable header='Expense Name'></Column>
                <Column field="ExpenseChoice" sortable header="Choice "></Column>
                <Column field="Amount" sortable header="Amount"></Column>
                <Column field="date" sortable header="Date"></Column>
            </DataTable>
        </div>
    )
}
export default Expense;