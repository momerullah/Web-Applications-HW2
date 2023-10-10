export default function Login() {
    return (
        <form onSubmit={e => e.preventDefault()}>
            <label htmlFor="login-username">Username:</label>
            <input type="text" name="login-username" id="login-username" />
            <label htmlFor="login-password">Password:</label>
            <input type="password" name="login-password" id="login-password" />
            <input type="submit" value="Login" onClick={() => {
                const username = document.getElementById("login-username").value;
                const authorDisplayElements = document.querySelectorAll("#author-display");
                authorDisplayElements.forEach(element => {
                    element.innerText = username;
                });
            }} />
        </form>
    )
}
