import { Route, Routes } from "react-router"
import WA_Home from "../../wa/WA_Home"
import Header from "./Header"
import Footer from "./Footer"
import ChatHome from "../../chat/ChatHome"

export const Mains = ()=>{
    return(<>
        <div className="flex w-screen h-screen flex-col">
            <Header />
            <Contents/>
            <Footer />
        </div>
    </>)
}

const Contents = ()=>{
    return(<>
        <div className="flex w-full h-full">
            <Routes>
                <Route exact path="/" element={<WA_Home/>}/>
                <Route exact path="/chat" element={<ChatHome />} />
            </Routes>
        </div>
    </>)
}
