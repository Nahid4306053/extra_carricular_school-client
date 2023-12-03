import React from 'react'
import { useModal } from '../Context/ModalContext'
import Handlecorseinfo from './Dashborder/Handlecorseinfo';
import "../app.css"
export default function Modal() {
    const {data , closeModel} =useModal();
    const  {Img ,date , description , title} = data || {};

    return (
    
    <>

  {/* <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button> */}
  <dialog id="my_modal_3" className="modal ">
    <div className="modal-box w-11/12 max-w-7xl custom-scrollber">

        {/* if there is a button in form, it will close the modal */}
        <button onClick={closeModel} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

      {data && 
      
      <div className="body m-5">
        {data?.type === "form" 
        ?
        data?.fieldname === 'course' && <Handlecorseinfo  render={Math.random()} data={data} /> 
        ||  data?.event && <Handlecorseinfo data={data?.course === "add" ? "add" : data?.course} />
        :
        <>
       <div className="img relative">
        <img className='w-full' src={Img} alt="" />
        {data && <div className='date absolute bottom-0 bg-sky-500 p-2 px-3 font-bold text-white'>{date}</div> }   
      </div>               
      <h3 className="font-bold text-2xl mt-5">{title}</h3>
      <p className="py-2">{description}</p> </>
      
       }             
      </div>
      }
     
    </div>
  </dialog>
  </>
    )
}
