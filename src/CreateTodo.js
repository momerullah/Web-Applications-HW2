export default function CreateTodo() {
    return (
        <form onSubmit={e => e.preventDefault()}>
            Author: <b><span id="author-display"></span></b>
            <div>
                <label htmlFor="create-title">Title:</label>
                <input type="text" name="create-title" id="create-title" required />
            </div>
            <div>
                <label htmlFor="create-description">Description:</label>
                <textarea name="create-description" id="create-description"></textarea>
            </div>
            <input type="submit" value="Add Todo" onClick={() => {
                const title = document.getElementById("create-title").value;
                if (!title.trim()) return; // Ensure title is provided and is not just whitespace
                const description = document.getElementById("create-description").value;
                const author = document.getElementById("author-display").innerText;
                const dateCreated = Date.now();
                const complete = false;

                const todoList = document.getElementById("todo-list");
                const todoItem = document.createElement("div");
                todoItem.innerHTML = `
                    <h3>${title}</h3>
                    <div>${description}</div>
                    <div>Author: ${author}</div>
                    <div>Date Created: ${new Date(dateCreated).toLocaleString()}</div>
                    <input type="checkbox" onchange="updateCompletionStatus(this)" />
                `;
                todoList.appendChild(todoItem);
            }} />
        </form>
    )
}
