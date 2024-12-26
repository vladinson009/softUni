import { Link } from "react-router-dom"
import sessionContext from "../utils/createContext";
import { useCallback, useContext } from "react";
import { clearSession } from "../utils/parseToken";
export default function Navigation() {

    const [session, setSession] = useContext(sessionContext);
    const onLogout = useCallback(function () {
        clearSession();
        setSession(null);

    }, [setSession])
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/recipes">Recipes</Link>
            {session && <>
                <Link to="/create">Create recipe</Link>
                <Link to="/my-recipes">My recipes</Link>
            </>}
            <Link to="/search">Search</Link>

            {session
                ? <> <Link to="/" onClick={onLogout}>Logout</Link>
                    <Link>{session.email}</Link>
                </>
                : <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            }
        </nav>
    )
}
