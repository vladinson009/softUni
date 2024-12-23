import { Link } from 'react-router-dom';
import { useEffect } from 'react';
export default function Navigation() {
    useEffect(() => {
        const link = document.querySelector('.navbar-brand');
        link.addEventListener('click', scrollToTop);

        return () => {
            link.removeEventListener('click', scrollToTop);
        };
    }, []);
    return (
        <nav className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav" style={{ marginBottom: '20px', padding: '0.5rem 1rem' }}>
            <div className="container">
                <Link className="navbar-brand" to="/">Home</Link>
                <button className="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded" to="/portfolio">Portfolio</Link></li>
                        <li className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded" to="/about">About</Link></li>
                        <li className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded" to="/contact">Contact</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}




function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}