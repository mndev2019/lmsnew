import React from 'react'
import Banner from './Banner'
import Courses from './Courses'
import Faq from './Faq'
import CourseCategory from './CourseCategory'

const Home = () => {
  return (
<>
 <Banner/>
 <CourseCategory/>
 {/* <Courses/> */}
 
 <Faq/>
</>
  )
}

export default Home
