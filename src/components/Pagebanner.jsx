import React from 'react'

export default function Pagebanner({backimg , children}) {
  return (
                    <div className=" mx-auto">
                    <div className="banner">
                      <div
                        className="hero -mt-36 min-h-[600px]"
                        style={{
                          backgroundImage:
                            `url(${backimg})`,
                          backgroundPosition: "top",
                          backgroundPosition: "center top",
                        }}
                      >
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                          <div className="max-w-3xl">
                           {children}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
  )
}
