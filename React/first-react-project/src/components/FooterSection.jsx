import { Link } from "react-router-dom"

export default function FooterSection() {


    return (
        <footer >
            <p>&copy; 2024 Cooking recipes. All rights reserved.</p>
            <p><Link to="/about">About</Link></p>
            <p><Link to="/contact">Contact</Link></p>
            <p>Made with ❤️ by <Link to="https://github.com/vladinson009" target="_blank">vladinson009</Link></p>
        </footer>
    )
}