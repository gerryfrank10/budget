import {useForm} from "react-hook-form";

function RevenueForm(props){

    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    async function onSubmit(data) {
        try {
            const response = await fetch('http://localhost:3001/add-revenues', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`, // Include the token in the headers
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData)
                props.addItem(data); // Assuming the server returns the added revenue data
                reset();
            } else {
                console.error('Failed to add revenue');
            }
        } catch (error) {
            console.error('Error adding revenue', error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <input className="form-control" type="text" {...register("BillName", {required: "Name is required"})} placeholder="Bill Name" style={props.myStyle} />
                {errors.BillName && <p className="text-danger">{errors.BillName.message}</p>}
            </div>
            <div className="mb-3">
                <select
                    className="form-select"
                    {...register("Account", { required: "Account is required" })}
                    style={props.myStyle}
                >
                    <option value="">Select an account</option>
                    <option value="Mpesa">Mpesa</option>
                    <option value="Tigo">Tigo</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank">Bank</option>
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
export default RevenueForm;