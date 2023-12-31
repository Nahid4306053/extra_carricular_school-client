/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Authntication";
import Log_in from "/images/Log_in.png";
export default function Login() {
  const { getCurrentuser } = useAuth();
  const navigate = useNavigate();
  const [errmsg, setErrorMsg] = useState([]);
  const handleuserAdd = (form) => {
    form.preventDefault();
    const email = form.target.email.value;
    const password = form.target.password.value;
    const err = [];

    if (email.trim() === "") {
      err.push("Email is Required");
    }
    if (password.trim() === "") {
      err.push("Password is Required");
    }

    if (err.length === 0) {
      // const formdata = new FormData(form.target);
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/user/login`,
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then(function (response) {
          if (
            response.data.error &&
            Object.keys(response.data.error).length > 0
          ) {
           
            for (let erros in response.data.error) {
              setErrorMsg((old) => [...old, response.data.error[erros].msg]);
            }
          } else {
            if (response.data.success === true) {
              navigate("/");
              getCurrentuser();
              console.log(response);
            }
          }
        })
        .catch(function (error) {
          setErrorMsg([error.message]);
        });
    }

    setErrorMsg(err);
  };

  return (
    <div className="hero -mt-36 min-h-screen shadow-lg bg-sky-100">
      <div className="container">
        <div className="card  w-full mt-40  mb-40">
          <div className="p-10 min-h-[60vh] grid grid-cols-[1fr,1fr] items-center gap-10">
            <div className="">
              <img src={Log_in} alt="" />
            </div>
            <div className="max-w-lg bg-base-100 p-10 rounded-lg bg-opacity-75">
              <div className="">
                <h1 className="text-5xl font-bold">Login now!</h1>
                <p className="py-6">
                  Welcome Back To Nahider School, Please Log In to Your Account By Provide Required Information
                </p>
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
              </div>
              <form onSubmit={handleuserAdd} className=" p-4" action="">
                <div className="form-control">
                  <label className="label">
                    <span className="text-lg">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    className="input input-bordered"
                    name="email"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-lg">Password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="password"
                    className="input input-bordered"
                    name="password"
                  />
                  <label className="label">
                    <a href="#" className="text-lg- link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
              <div className="text-center mt-5">
                <p>
                  Dont't have an account?
                  <Link
                    to="/signup"
                    className="pl-2 capitalize text-sky-500 hover:underline"
                  >
                     sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
