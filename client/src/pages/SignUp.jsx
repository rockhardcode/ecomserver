import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import imageToBase64 from "../helpers/imageToBase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: ""
  });
  const navigate = useNavigate()
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url,{
        method : SummaryApi.signUP.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })

      const dataApi = await dataResponse.json()
      if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/login')
      }
      if(dataApi.error){
        toast.error(dataApi.message)
      }
    } else {
      toast.error("Please check passwrod and confirm password")
    }
  };
  const handleUploadPic = async (e) => {
    const file = e.target.files[0]
    const imagePic = await imageToBase64(file)
    setData((prev) => {
        return {
            ...prev,
            profilePic: imagePic
        }
    })
  }
  return (
    <section id="signup">
      <div className="max-auto container p-4">
        <div className="bg-white p-4 py-5 w-full max-w-sm mx-auto rounder">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcons} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input type="file" className="hidden" onChange={handleUploadPic}/>
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="enter name"
                  className="w-full h-full bg-transparent"
                  name="name"
                  value={data.name}
                  onChange={handleInput}
                  required
                />
              </div>
            </div>
            <div className="grid">
              <label>Email :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="enter email"
                  className="w-full h-full bg-transparent"
                  name="email"
                  value={data.email}
                  onChange={handleInput}
                  required
                />
              </div>
            </div>
            <div>
              <label>Password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  name="password"
                  value={data.password}
                  onChange={handleInput}
                  className="w-full h-full bg-transparent"
                  required
                />
                <div className="cursor-pointer text-xl">
                  <span
                    onClick={() => {
                      setShowPassword((prev) => !prev);
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label> Confirm password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showCPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleInput}
                  className="w-full h-full bg-transparent"
                  required
                />
                <div className="cursor-pointer text-xl">
                  <span
                    onClick={() => {
                      setShowCPassword((prev) => !prev);
                    }}
                  >
                    {showCPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button className="bg-customBlue hover:bg-customDarkblue text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Sign up
            </button>
          </form>
          <p className="my-4">
            Already have account?{" "}
            <Link
              to={"/login"}
              className="text-red-500 hover:text-red-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
