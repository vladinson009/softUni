export default function Header() {
    return (<header className="masthead bg-primary text-white text-center">
        <div className="container d-flex align-items-center flex-column">

            <img id="me" className="masthead-avatar mb-5" src="src/assets/img/me.jpeg" alt="..." />

            <h1 className="masthead-heading text-uppercase mb-0">Learning React</h1>

            <div className="divider-custom divider-light">
                <div className="divider-custom-line"></div>
                <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                <div className="divider-custom-line"></div>
            </div>

            <p className="masthead-subheading font-weight-light mb-0">
                Web Developer - ExpressJS Backend - JS Full Stack
            </p>
        </div>
    </header>)
}