/* eslint-disable react/prop-types */

import TeacherCard from './TeacherCard'
export default function Teacher({instructors}) {
  return (
   <div className='container mx-auto'>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      { instructors.map((ele,ind)=> <TeacherCard instructor={ele} key={ind}/>)
      }
     </div>
   </div>
  )
}
