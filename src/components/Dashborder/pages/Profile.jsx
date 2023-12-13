/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../Context/Authntication";
import UploadImg from "../../../Utils/UploadIMG";
import Input from "../../InputBox";
import toast from "react-hot-toast";
export default function Profile() {
  const usrnameInput = useRef();
  const [readmood, setReadmood] = useState(true);
  const [img, setimg] = useState();
  const [Submitbutton, setSubmitbutton] = useState(true);
  const { user, getCurrentuser } = useAuth();
  const { username, email, phone_number, address, avatar } = user || {};
  const [handleform, sethandleform] = useState({});
  const [errmsg, setErrorMsg] = useState([]);
  const handleinput = (e) => {
    sethandleform({
      ...handleform,
      [e.target.name]: e.target.value,
    });
    if (
      JSON.stringify({ username, phone_number, address }) !==
      JSON.stringify(handleform)
    ) {
      setSubmitbutton(false);
    } else {
      setSubmitbutton(true);
    }
  };
  const handleReadmood = () => {
    setReadmood(false);
  };
  useEffect(() => {
    if (!readmood) {
      usrnameInput.current.focus();
    }
    if (user) {
      sethandleform({
        username: username,
        phone_number: phone_number,
        address: address,
      });
    }
  }, [readmood]);

  const handleuserUpdate = async (form) => {
    form.preventDefault();
    const newavatar = form.target.avatar.files[0];
    if (
      handleform.username.trim() !== username ||
      handleform.phone_number.trim() !== phone_number ||
      handleform.address.trim() !== address ||
      newavatar
    ) {
      const formdata = new FormData(form.target);
      if (newavatar) {
        const url = await UploadImg(newavatar);
        formdata.set("avatar", url.data.data.display_url);
      }
      axios
        .put(`${import.meta.env.VITE_API_URL}/user`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then(async function (response) {
          if (
            response.data.error &&
            Object.keys(response.data.error).length > 0
          ) {
            console.log(response.data.error);

            for (let erros in response.data.error) {
              setErrorMsg([response.data.error[erros].msg]);
            }
          } else {
            if (response.data) {
              getCurrentuser();
              setReadmood(true);
              setErrorMsg([]);
            }
          }
        })
        .catch(function (error) {
          setErrorMsg([error.message]);
          console.log(error);
        });
    } else {
      toast.error("No changes found");
    }
  };

  return (
    user && (
      <form
        onSubmit={handleuserUpdate}
        action={`${import.meta.env.VITE_API_URL}/user`}
        method="POST"
        encType="multipart/form-data"
        className="grid gap-4  pt-5 pb-5 px-5  grid-cols-12"
      >
        <div className="lg:col-span-4 col-span-full  justify-center mt-5">
          <div className="grid relative justify-center">
            <div className="avatar">
              <div className="w-44 rounded-full ring  ring-offset-base-100 ring-offset-2">
                <img src={img ? img : avatar} />
              </div>
            </div>
            {readmood ? (
              <button
                onClick={() => handleReadmood()}
                className="btn btn-neutral mt-10"
              >
                Update profile
              </button>
            ) : (
              <div className="relative mt-10 flex justify-center">
                <input
                  accept=".jpg , .png , .webp , .jpeg"
                  onChange={(e) =>
                    setimg(
                      URL.createObjectURL(e.target.files[0]),
                      setSubmitbutton(false)
                    )
                  }
                  type="file"
                  className="absolute h-14 w-full cursor-pointer opacity-0"
                  name="avatar"
                  id=""
                />
                <button className="btn btn-neutral ">Choose</button>
              </div>
            )}
          </div>
        </div>
        <div className="lg:col-span-8 col-span-full mt-5 font-semibold infos">
          <div className="form-control">
            <label className="label">
              <span className="text-lg ">Name</span>
            </label>
            <input
              ref={usrnameInput}
              onChange={handleinput}
              value={handleform.username}
              readOnly={readmood ? true : false}
              name="username"
              type="text"
              placeholder="Name"
              className="input input-bordered"
            />
          </div>
          <Input
            readOnly={true}
            value={email}
            placeholder="Email"
            label="Email (Not Editable)"
          />
          <Input
            onChange={handleinput}
            readOnly={readmood ? true : false}
            value={handleform.phone_number}
            placeholder="Phone Number"
            label="Phone Number"
            name="phone_number"
          />
          <Input
            onChange={handleinput}
            readOnly={readmood ? true : false}
            value={handleform.address}
            placeholder="Address"
            label="Address"
            name="address"
          />
          {!readmood && (
            <div className="flex mt-5 justify-between">
              <div className="flex items-center justify-between w-full">
                <div className="errobox py-4 px-5">
                  {errmsg.length > 0 && (
                    <ul className="erros  list-disc rounded-lg text-red-600">
                      {errmsg.map((ele, ind) => (
                        <li key={ind}>{ele}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {Submitbutton ? (
                  <button disabled type="submit" className="btn btn-neutral">
                    Save
                  </button>
                ) : (
                  <button type="submit" className="btn btn-neutral">
                    Save
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </form>
    )
  );
}
