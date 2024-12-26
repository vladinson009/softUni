
import { useCallback, useContext, useState } from "react"
import userService from "../../api/userService";
import { checkSession, createSession } from "../../utils/parseToken";
import sessionContext from "../../utils/createContext";
import { useNavigate } from "react-router-dom";

export default function LoginSection() {
    const [input, setInput] = useState({ email: '', password: '', repass: '' });
    const [error, setError] = useState(null);
    const [session, setSession] = useContext(sessionContext)
    const navigate = useNavigate()

    const handleChange = useCallback((e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);

    async function onRegister(e) {
        e.preventDefault();
        try {
            if (input.password != input.repass) {
                throw new Error('Passwords does not match!')

            }
            const user = await userService.register(input.email, input.password);
            if (!session) {
                createSession(user);
                setSession(checkSession())
                navigate('/')
            }
        } catch (err) {
            setError(err.message);
        }
    }



    return (
        <section>
            <form onSubmit={onRegister} method="POST" className="form">
                <h2>Register Form</h2>
                {error ? <div className="error">{error}</div> : null}
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="text" placeholder="JohnDoe@abv.bg" value={input.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" placeholder="******" value={input.password} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="repass">Password</label>
                    <input id="repass" name="repass" type="password" placeholder="******" value={input.repass} onChange={handleChange} />
                </div>
                <input className="btn" type="submit" value='Register' onClick={onRegister} />
            </form>
        </section>
    )
}