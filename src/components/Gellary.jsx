/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Masonry } from "@mui/lab";
import React from "react";
import "../styles/gellary.scss";
import { useModal } from "../Context/ModalContext";
export default function Gellary({ elements , customCss }) {
  const { data, openModal , closeModel} = useModal()
  return (
    <div className={`container mx-auto ${customCss}`}>
      <Masonry columns={{ xs: 1, sm: 1, md: 2, lg: 3 }} spacing={3}>
        {elements.map((gellaryItem, ind) => {
          const { id, title, image_url, description } = gellaryItem;
          const dataformodel = {
            Img: image_url,
            date: null,
            title: title,
            description : description
          }
          return (
            <div
              key={ind}
              className="gellary rounded-md overflow-hidden relative"
            >
              <img className="w-full" src={image_url} alt={title} />
              <div className="flex items-end details p-6  h-full w-full absolute top-0 left-0">
                <div>
                  <h1 onClick={()=>openModal(dataformodel)} className="text-white hover:text-sky-500 transition-all text-2xl font-bold">
                    {title}
                  </h1>
                  <p>{description.slice(0, 65) + " [..]"}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Masonry>
    </div>
  );
}
