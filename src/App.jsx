
import './App.css'

import WebLayout from './Layout/WebLayout'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import Contact from './Pages/Contact'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import CourseDetail from './Pages/Home/CourseDetail'
import Payment from './Pages/Payment/Payment'
import MyCourses from './Pages/Course/MyCourse'
import Learning from './Pages/Course/Learning'
import Courses from './Pages/Home/Courses'
import BlogPage from './Pages/Blog/Blog'
import ProfilePage from './Pages/Profile/Profile'
import Webinar from './Pages/Webinar/Webinar'
import WebinarDetails from './Pages/Webinar/WebinatDetails'
import MyWebinars from './Pages/Webinar/MyWebinar'
import PackageDetail from './Pages/Packages/PackageDetail'

function App() {
  const ThemeRoute = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<WebLayout />}>
          <Route index element={<Home />} />
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/courses' element={<Courses/>}/>
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path='/blog' element={<BlogPage/>}/>
          {/* <Route path='/payment' element={<Payment/>}/> */}
          <Route path="/payment/:type/:id" element={<Payment />} />
          <Route path='/my-course' element={<MyCourses/>}/>
          <Route path="/learn/:id" element={<Learning/>} />
          <Route path='/webinar' element={<Webinar/>}/>
          <Route path='/webinar/:id' element={<WebinarDetails/>}/>
          <Route path='/my-webinar' element={<MyWebinars/>}/>

          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/pkg/:id' element={<PackageDetail/>}/>
          


        </Route>

         <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>


      </>


    )

  )


  return (
    <>
    <ToastContainer position="top-right" autoClose={2000} />
      <RouterProvider router={ThemeRoute} />

    </>
  )
}

export default App
