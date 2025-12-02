import { Route, Routes } from "react-router"
import WA_Home from "../../wa/WA_Home"
import Header from "./Header"
import Footer from "./Footer"

export const Mains = ()=>{
    return(<>
        <div className="flex w-screen h-screen flex-col bg-amber-400">
            <Header />
            <Contents/>
            <Footer />
        </div>
    </>)
}

const Contents = ()=>{
    return(<>
        <div className="flex w-full h-full bg-green-400">
            <Routes>
                <Route exact path="/" element={<WA_Home/>}/>
            </Routes>
        </div>
    </>)
}
