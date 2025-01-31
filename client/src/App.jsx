import { lazy, Suspense, useContext } from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import { AppContext } from "./context/AppContext"

const Home = lazy(() => import('./pages/Home'))
const SingupPage = lazy(() => import('./pages/Signup'))
const SinginPage = lazy(() => import('./pages/Signin'))
const EditorProfile = lazy(() => import('./pages/EditorProfile'))
const YoutuberProfile = lazy(() => import('./pages/YoutuberProfile'))
const EditorDashboard = lazy(() => import ('./pages/EditorDashboard'))
const YoutuberDashboard = lazy(() => import ('./pages/YoutuberDashboard'))

export default function App() {
  const {isLoggedin, category} = useContext(AppContext);
  return (
    <div>
      <Navbar/>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={isLoggedin ? (category === "youtuber" ? <YoutuberDashboard /> : <EditorDashboard />) : <Home/>}/>
          <Route path="/login" element={<SinginPage/>}/>
          <Route path="/signup" element={<SingupPage/>}/>
          <Route path="/dashboard" element={isLoggedin ? (category === "youtuber" ? <YoutuberDashboard /> : <EditorDashboard />) : <Home />} />
          <Route path="/editor/profile" element={<EditorProfile/>}/>
          <Route path="/youtuber/profile" element={<YoutuberProfile/>}/>
        </Routes>
      </Suspense>
    </div>
  )
}