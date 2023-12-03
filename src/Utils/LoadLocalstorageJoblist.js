const getDonatelist = () =>{
       if(localStorage.getItem("DonateList")){
         const data = localStorage.getItem("DonateList")
          return JSON.parse(data);          
       }   
       else{
          return [];          
       }            
}

const saveItemInLocalStorage = (Data) =>{
   const newdata = JSON.stringify(Data);
   localStorage.setItem("DonateList",newdata)                  
} 
const newDonateitem = (data) =>{
     const olddata = getDonatelist();
     const newdata = [...olddata , data]

     saveItemInLocalStorage(newdata);
}


export { getDonatelist , newDonateitem  } 