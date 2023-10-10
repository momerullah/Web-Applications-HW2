export default function Todo({ title, description, author, dateCreated, complete, dateCompleted }) {
    return (
        <div>
            <h3>{title}</h3>
            <div>{description}</div>
            <br />
            <i>Written by <b>{author}</b></i>
            <br />
            <label>
                <input type="checkbox" checked={complete} onChange={() => {}} /> Completed
            </label>
        </div>
    )
}
