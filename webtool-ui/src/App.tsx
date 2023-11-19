import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "./components/Navigation.tsx";
import Login from "./sites/Login.tsx";
import Index from "./sites/Index.tsx";


function App() : JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Navigation/>}>
            <Route index element={<Index/>}/>
            <Route path={"/login"} element={<Login/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
