import {Outlet, Link} from "react-router-dom";
import {useCookies} from "react-cookie";

function Navigation() : JSX.Element  {
    const [cookies, ] = useCookies(["token"]);

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        {!cookies.token?<Link to={"/login"}>Anmelden</Link>:<Link to={"/logout"}>Abmelden</Link>}
                    </li>
                </ul>
            </nav>

            <Outlet/>
        </>
    );
};

export default Navigation;
