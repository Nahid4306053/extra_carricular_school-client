import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Authntication.jsx";
import Input from "../components/InputBox.jsx";
import "../styles/SignUp.scss";
export default function Signup() {
  const { getCurrentuser } = useAuth();
  const [img, setimg] = useState();
  const [errmsg, setErrorMsg] = useState([]);
  const handleimg = (inputimg) => {
    const profileimg = inputimg.target.files[0];
    setimg(URL.createObjectURL(profileimg));
  };

  const navigate = useNavigate();
  const handleuserAdd = (form) => {
    form.preventDefault();
    const username = form.target.username.value;
    const email = form.target.email.value;
    const password = form.target.password.value;
    const confirmPassword = form.target.confirmPassword.value;
    const phone_number = form.target.phone_number.value;
    // const address = form.target.address.value;
    const avatar = form.target.avatar.files;
    const err = [];
    if (avatar.length === 0) {
      err.push("Please select an Profile Picture");
    }

    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === "" ||
      phone_number.trim() === ""
    ) {
      err.push("Please fill all the fields");
    }

    if (password !== confirmPassword) {
      err.push("Password and confirm password not match");
    }

    if (err.length === 0) {
      const formdata = new FormData(form.target);
      axios
        .post(`${import.meta.env.VITE_API_URL}/user`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          if (
            response.data.error &&
            Object.keys(response.data.error).length > 0
          ) {
            for (let erros in response.data.error) {
              setErrorMsg((old) => [...old, response.data.error[erros].msg]);
              console.log(response);
            }
          } else {
            if (response.data.success === true) {
              navigate("/login");
              getCurrentuser();
            }
          }
        })
        .catch((error) => {
          console.log(error);
          // setErrorMsg([error?.message]);
        });
    }
    if (err.length > 0) {
      // setErrorMsg(err);
    }
  };

  return (
    <div className="hero sighup-hero -mt-36 min-h-screen py-20">
      <div className="container">
        <div className="card  w-full mt-40  bg-base-100">
          <div className="p-10 min-h-[60vh] items-center grid lg:grid-cols-[1fr,1fr]  gap-10">
            <div className="hidden overflow-hidden max-h-[800px] lg:flex items-center bg-gray-900 h-full rounded-lg">
              <img
                className=" mx-auto"
                src={img ? img : "https://i.ibb.co/M1WCLcV/teacher-m-9.jpg"}
                alt=""
              />
            </div>
            <div className="flex flex-col justify-evenly">
              <div>
                <h1 className="text-4xl font-bold text-center">Sign Up</h1>
                <p className="text-center text-gray-600">
                  Enter your details below
                </p>
              </div>
              <div>
                {errmsg.length > 0 && (
                  <div className="errobox py-4 px-5">
                    <ul className="erros p-4 list-disc bg-red-300 rounded-lg text-red-600">
                      {errmsg.map((ele, ind) => (
                        <li className="ml-5" key={ind}>
                          {ele}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <form
                  onSubmit={handleuserAdd}
                  className="p-4"
                  encType="multipart/form-data"
                  method="POST"
                  action={import.meta.env.VITE_API_URL + "/user"}
                >
                  <Input placeholder="Name" label="Name" name="username" />
                  <Input placeholder="Email" label="Email" name="email" />
                  <Input
                    placeholder="Password"
                    label="Password"
                    name="password"
                  />
                  <Input
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    name="confirmPassword"
                  />
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Profile Picture</span>
                    </label>
                    <input
                      onChange={handleimg}
                      accept=".jpg,.png,.webp,.jpeg"
                      type="file"
                      className="file-input file-input-bordered w-full "
                      name="avatar"
                    />
                  </div>
                  <Input
                    placeholder="Phone Number"
                    label="Phone Number"
                    name="phone_number"
                  />
                  <Input placeholder="Address" label="Address" name="address" />
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Gender</span>
                    </label>
                    <div className="flex gap-6 mt-2">
                      <div className="flex gap-2">
                        <input
                          value="male"
                          type="radio"
                          name="gender"
                          className=" radio-secondary radio"
                          defaultChecked
                        />
                        Male
                      </div>
                      <div className="flex gap-2">
                        <input
                          value="female"
                          type="radio"
                          name="gender"
                          className="radio radio-secondary "
                        />
                        Female
                      </div>
                    </div>
                  </div>
                  <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
