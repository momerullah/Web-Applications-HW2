export default function Logout() {
    return (
        <form onSubmit={e => e.preventDefault()} className="logout-container">
            Logged in as: <span id="author-display"></span>
            <br />
            <input type="submit" value="Logout" onClick={() => {
                document.getElementById("author-display").innerText = '';
            }} />
        </form>
    )
}
