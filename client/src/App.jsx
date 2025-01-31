import { lazy, Suspense, useContext } from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import { AppContext } from "./context/AppContext"
import ProtectedRoute from './components/ProtectedRoute'

const Home = lazy(() => import('./pages/Home'))
const SignupPage = lazy(() => import('./pages/Signup'))
const SigninPage = lazy(() => import('./pages/Signin'))
const EditorProfile = lazy(() => import('./pages/EditorProfile'))
const YoutuberProfile = lazy(() => import('./pages/YoutuberProfile'))
const EditorDashboard = lazy(() => import ('./pages/EditorDashboard'))
const YoutuberDashboard = lazy(() => import ('./pages/YoutuberDashboard'))

export default function App() {
  const { isLoggedin, category, loading } = useContext(AppContext);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={isLoggedin ? (category === "youtuber" ? <YoutuberDashboard /> : <EditorDashboard />) : <Home />} />
          <Route path="/login" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedCategories={["youtuber"]} />}>
            <Route path="/dashboard" element={<YoutuberDashboard />} />
            <Route path="/youtuber/profile" element={<YoutuberProfile />} />
          </Route>

          <Route element={<ProtectedRoute allowedCategories={["editor"]} />}>
            <Route path="/dashboard" element={<EditorDashboard />} />
            <Route path="/editor/profile" element={<EditorProfile />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}