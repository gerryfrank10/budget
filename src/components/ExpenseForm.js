import {useForm} from "react-hook-form";
import {nanoid} from "nanoid";

function ExpenseForm(props) {
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const base_url = process.env.REACT_APP_API_HOST;

    async function onSubmit(data) {
        try {
            data['id'] = nanoid();
            data['date'] = new Date().toLocaleString()
            const response = await fetch(`${base_url}/add-expenses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`, // Include the token in the headers
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData.message);
                props.addItem(responseData.expense, responseData.expense['id'], responseData.totalAmount); // Assuming the server returns the added revenue data
                reset();
            } else {
                console.error('Failed to add expense');
            }
        } catch (error) {
            console.error('Error adding expense', error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <input className="form-control" type="text" {...register("ExpenseName", {required: "Expense is required"})} placeholder="Expense Name" style={props.myStyle} />
                {errors.BillName && <p className="text-danger">{errors.BillName.message}</p>}
            </div>
            <div className="mb-3">
                <select
                    className="form-select"
                    {...register("Account", { required: "Expense is required" })}
                    style={props.myStyle}
                >
                    <option value="">Select an Expense</option>
                    <option value="Fees">Fees</option>
                    <option value="Home">Home Accessories</option>
                    <option value="Oil">Oil</option>
                    <option value="Other">Other</option>
                </select>
                {errors.Account && <p className="text-danger">{errors.Account.message}</p>}
            </div>
            <div className="mb-3">
                <input className="form-control" type="number" {...register("Amount", {required: "Amount is Required"})} placeholder="Amount" style={props.myStyle} />
                {errors.Amount && <p className="text-danger">{errors.Amount.message}</p>}
            </div>
            <div className="mb-3">
                <textarea className="form-control" {...register("Note")} rows="6" placeholder="Note" style={props.myStyle} />
            </div>
            <div>
                <button className="btn btn-primary d-block w-100" type="submit" style={props.myStyle}>Submit</button>
            </div>
        </form>
    )
}

export default ExpenseForm;