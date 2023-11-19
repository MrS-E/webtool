import {Outlet, Link} from "react-router-dom";

function Navigation() : JSX.Element  {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/login"}>Login</Link>
                    </li>
                </ul>
            </nav>

            <Outlet/>
        </>
    );
};

export default Navigation;
