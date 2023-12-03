import React, { createContext, useContext, useEffect, useState } from "react";

const modelcontext = createContext();
function useModal() {
  return useContext(modelcontext);
}   
function ModalContext({ children }) {
  const [data, setdata] = useState();
  const [modalshow,setModalshow] = useState(false);
  const [Updatedata,setupdate] = useState()
  const openModal = (daats) => {
    setdata(daats);
    setModalshow(true);   
  };
  
  const closeModel = (e) =>{
    setModalshow(false);
  }  
  useEffect(() => {
    if (modalshow) {
      document.getElementById("my_modal_3").showModal();
    }
    else{
      document.getElementById("my_modal_3").close();
    }
  }, [openModal]);

  return (
    <modelcontext.Provider value={{Updatedata,setupdate, data, openModal,closeModel,modalshow }}>
      {children}
    </modelcontext.Provider>
  );
}

export { ModalContext, useModal };
