import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "./components/Navigation.tsx";
import Login from "./sites/Login.tsx";
import Register from "./sites/Register.tsx";
import {useCookies} from "react-cookie";
import Main from "./sites/Main.tsx";
import Home from "./sites/Home.tsx";


function App() : JSX.Element {
  const [cookies, ] = useCookies(["token"]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Navigation/>}>
            <Route index element={cookies.token?<Main/>:<Home/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/registrieren"} element={<Register/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
