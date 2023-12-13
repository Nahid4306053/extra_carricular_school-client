/* eslint-disable react/prop-types */

export default function ViewAllBtn({children}) {
  return (
    <div className="col-span-12 my-14 flex justify-end container mx-auto">
      <button className="btn rounded-none btn-info text-white mb-20">
      {children}<i className="fa-thin fa-arrow-right"></i>
      </button>
    </div>
  );
}
