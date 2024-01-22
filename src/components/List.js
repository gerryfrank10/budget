import {} from "@fortawesome/fontawesome-svg-core";

function List(props) {

    return (
        <li
            id={props.itemId}
            style={{fontFamily: "Aclonica, sans-serif",fontSize: "12px"}}
            className="list-group-item d-flex justify-content-between align-items-center"
        >
            {props.name}
            <div className="btn-group" role="group" aria-label="Item Actions">
                    <i
                        className="bi bi-trash mx-2"
                        style={{ color: "red"}}
                        onClick={() => props.deleteItem(props.itemId)}
                    ></i>
                    <i
                        className="bi bi-pencil mx-2"
                        style={{color: "blue"}}
                        onClick={() => props.editItem(props.itemId)}
                    ></i>
            </div>
        </li>
    )
}
export default List;