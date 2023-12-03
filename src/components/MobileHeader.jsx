import React from 'react'
import NavbarManus from './NavbarManus'
import Button from './Button'

export default function MobileHeader({customclass , handleManubar, routes}) {
  return (
    <div className={`mobileHeader transition-all  duration-500 text-[#1F2937]  bg-[wheat] fixed top-0 h-[100vh] z-[100000] w-full max-w-lg min-w-[350px] p-10 ${customclass}`}>  
     <div className="close flex justify-end text-2xl">
       <i onClick={handleManubar}className="fa-solid fa-xmark"></i>            
      </div>               
     <NavbarManus handleManubar={handleManubar} customclass="gap-5  flex-col w-full text-xl font-semibold" routes={routes}>        
       </NavbarManus>           
    </div>
  )
}
