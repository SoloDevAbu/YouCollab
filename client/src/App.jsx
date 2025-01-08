import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"

const Home = lazy(() => import('./pages/Home'))
const SingupPage = lazy(() => import('./pages/Signup'))
const SinginPage = lazy(() => import('./pages/Signin'))
const EditorProfile = lazy(() => import('./pages/EditorProfile'))
const YoutuberProfile = lazy(() => import('./pages/YoutuberProfile'))

export default function App() {
  return (
    <div>
          <Navbar/>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<SinginPage/>}/>
          <Route path="/signup" element={<SingupPage/>}/>
          <Route path="/profile/editor" element={<EditorProfile/>}/>
          <Route path="/profile/youtuber" element={<YoutuberProfile/>}/>
        </Routes>
      </Suspense>
    </div>
  )
}