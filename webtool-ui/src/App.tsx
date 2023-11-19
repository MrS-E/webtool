import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "./components/Navigation.tsx";
import Login from "./sites/Login.tsx";


function App() : JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Navigation/>}>
            <Route path={"/login"} element={<Login/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
