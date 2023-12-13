
import Gellary from "../components/Gellary";
import useLoadGallerys from '../Hooks/lodaGellarey';
export default function SchoolGellary() {
  const GellaryData = useLoadGallerys()
  return (
    <>
    <div className="banner">
    <div className="hero -mt-36 min-h-[600px]" style={{backgroundImage: 'url(https://artlogic-res.cloudinary.com/w_1400,h_1400,c_limit,f_auto,fl_lossy,q_auto:good/ws-flowers/usr/images/feature_panels/image/10/flowers-cork-street-50-years-2020-14-of-17-.jpg)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Gellary</h1>
    </div>
  </div>
</div>
    </div>
    <div className="container mx-auto">
      <Gellary customCss="my-20" elements={GellaryData}/>
    </div>
    </>
  )
}
