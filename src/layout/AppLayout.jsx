import StartsBg from "@/components/custom/StartsBg"
import { Outlet } from "react-router-dom"
import '../app.css'
import Header from "@/components/custom/Header"
import Footer from "@/components/custom/Footer"

const AppLayout = () => {
  return (
    <div>
      <StartsBg/>
      <main className="min-h-screen max-w-[1320px] mx-auto">
        <Header/>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default AppLayout
