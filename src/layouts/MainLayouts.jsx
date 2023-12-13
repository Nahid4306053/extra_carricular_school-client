
import { ThreeCircles } from "react-loader-spinner";
import { Outlet, useNavigation } from "react-router-dom";
import "../app.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ModalContext } from "../Context/ModalContext";
import Modal from "../components/Modal";
import PrivateRouter from "../Routes/PrivateRouter";
import { Toaster } from "react-hot-toast";

export default function MainLayouts() {
  const navigation = useNavigation();
 
  return (
   <>
   <ModalContext>
   <div className="min-h-screen  flex flex-col justify-between">
      <div>
      <div><Toaster/></div>
        <Navbar />
         <Modal></Modal>
        {navigation.state === "loading" ? (
          <div className=" flex justify-center items-center min-h-screen  w-full">
            <ThreeCircles
              height="200"
              width="200"
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperclassName=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor="#3498db"
              innerCircleColor="#e67e22"
              middleCircleColor="#e74c3c"
            />
          </div>
         ) 
        :
         (
          <PrivateRouter><Outlet></Outlet></PrivateRouter>
        )}
      </div>
      <Footer/>
    </div>
   </ModalContext>
   </>
  );
}
