import { useCallback, useContext, useState } from "react"
import userService from "../../api/userService";
import { checkSession, createSession } from "../../utils/parseToken";
import sessionContext from "../../utils/createContext";
import { useNavigate } from "react-router-dom";

export default function LoginSection() {
    const [input, setInput] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [session, setSession] = useContext(sessionContext)
    const navigate = useNavigate()

    const handleChange = useCallback((e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);
    const onLogin = useCallback(async (e) => {
        e.preventDefault();
        try {

            const user = await userService.login(input.email, input.password);
            if (!session) {
                createSession(user);
                setSession(checkSession())
                navigate('/')
            }
        } catch (error) {
            setError(error.message);

        }
    }, [input]);
    return (
        <section>
            <form method="POST" className="form" onSubmit={onLogin}>
                <h2>Login Form</h2>
                {error ? <div className="error">{error}</div> : null}
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email"
                        name="email"
                        type="text"
                        placeholder="JohnDoe@abv.bg"
                        value={input.email}
                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password"
                        name="password"
                        type="password"
                        placeholder="******"
                        value={input.password}
                        onChange={handleChange} />
                </div>
                <input className="btn"
                    type="submit"
                    value='Login'
                    onClick={onLogin} />
            </form>
        </section>
    )
}