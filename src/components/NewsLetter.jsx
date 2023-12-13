export default function NewsLetter() {
  return (
    <div className="bg-[#09253D]  flex items-center text-white py-10">
      <div className="container mx-auto">
        <div className="flex min-h-[400px] border-b border-opacity-50 border-white h-full  lg:gap-20 flex-col items-center lg:flex-row">
          <div className="flex-1 space-y-3" >
            <h5 className="text-sky-400 ">NOTIFY NEW COURSES AND UPDATES </h5>
          <h1 className="text-4xl leading-[40px]">
            <strong>Subscribe to our newsletter.</strong>
            Get updates to news and events.
          </h1>
          </div>          
          <div className="flex-1 ">
           <div className="flex"><input placeholder="Type your Email here." className="w-full px-5 text-sky-400  focus:outline-none max-w-md" type="email" />
           <button className="btn btn-success rounded-none ml-4 text-white">Subscribe</button></div>
          </div>
        </div>
      </div>
    </div>
  );
}
