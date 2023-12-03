import React from "react";

export default function DashborderSearchBox() {
  return (
    <div className="header sticky flex   bg-slate-200 left-0 z-1 top-0  p-5 w-full">
      <div className="form-control w-full">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search…"
            className="w-full input input-bordered"
          />
          <button className="btn btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
