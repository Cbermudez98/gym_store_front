import "./NotFound.css";

const NotFound = () => {
    return <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="text-center animated slideInDown">
            <h1 className="display-1 text-danger">404</h1>
            <p className="lead">The page you are looking for does not exist.</p>
            <a className="btn btn-primary" href={"/"}>Go to main page</a>
        </div>
    </div>
};

export default NotFound;