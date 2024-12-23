export default function Footer() {
    return (<footer className="footer text-center">
        <div className="container">
            <div className="row">

                <div className="col-lg-4 mb-5 mb-lg-0">
                    <h4 className="text-uppercase mb-4">Location</h4>
                    <p className="lead mb-0">

                        <br />
                        Oslo, Norway
                    </p>
                </div>

                <div className="col-lg-4 mb-5 mb-lg-0">
                    <h4 className="text-uppercase mb-4">Around the Web</h4>
                    <a className="btn btn-outline-light btn-social mx-1" href="https://www.facebook.com/VladinSon/" target="_blank"
                    ><i className="fab fa-fw fa-facebook-f"></i
                    ></a>
                    <a className="btn btn-outline-light btn-social mx-1" href="https://x.com/VladinSon009" target="_blank"
                    ><i className="fab fa-fw fa-twitter"></i
                    ></a>
                    <a className="btn btn-outline-light btn-social mx-1" href="https://www.linkedin.com/in/vladimir-gulev-040b3a317/" target="_blank"
                    ><i className="fab fa-fw fa-linkedin-in"></i
                    ></a>
                    <a className="btn btn-outline-light btn-social mx-1" href="https://github.com/vladinson009" target="_blank"
                    ><i className="fab fa-fw fa-github"></i
                    ></a>
                </div>

                <div className="col-lg-4">
                    <h4 className="text-uppercase mb-4">About Me</h4>
                    <p className="lead mb-0">This is my first web template created by <a href="http://startbootstrap.com" target="_blank" rel="noopener noreferrer">Start Bootstrap</a>
                        .
                    </p>
                </div>
            </div>
        </div>
    </footer>)
}