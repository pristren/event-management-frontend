import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios";
import { useRegisterMutation } from "../../../features/auth/authApi";

const loginIcons = (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2"></path>
    <path d="M3 12h13l-3 -3"></path>
    <path d="M13 15l3 -3"></path>
  </svg>
);
const userIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 448 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
  </svg>
);
const lockIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="none" d="M0 0h24v24H0z"></path>
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path>
  </svg>
);

const SignUp = () => {
  const { Axios } = useAxios();
  const navigate = useNavigate();
  const [register, { data: UserLoggedInData, isLoading, isError }] =
    useRegisterMutation();
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPW: "",
    rememberMe: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPW, rememberMe } =
      signUpData;

    if (password === confirmPW) {
      if (
        password.length >= 6 &&
        /[a-zA-Z]/.test(password) &&
        /[0-9]/.test(password)
      ) {
        if (firstName || lastName || email || password) {
          const newData = { firstName, lastName, email, password };
          register(newData).then((res) => {
            if (res?.data) {
              toast.success("Regester Successful");
              navigate("/");
            } else {
              toast.error(`${res?.error?.data?.message}`);
            }
          });

          // Axios.post("/user/register", newData)
          //   .then((res) => {
          //     if (res.status == 201) {
          //       const response = res?.data?.data;
          //       const user = {
          //         token: response?.accessToken,
          //         data: {
          //           email: response?.user?.email,
          //           _id: response?.user?._id,
          //           name: `${response?.user?.firstName} ${response?.user?.lastName}`,
          //         },
          //       };
          //       localStorage.setItem("user", JSON.stringify(user));
          //       toast.success("Registration Success");
          //       navigate("/");
          //     }
          //   })
          //   .catch((err) => {
          //     console.log("err ", err);

          //     toast.error(err?.message);
          //   });
        }
        // Here, you might want to submit the form or perform other actions
      } else {
        toast.error(
          "Password should be at least 6 characters long and include at least one number or letter."
        );
        // Optionally, you can add more specific instructions or validation messages
      }
    } else {
      toast.error("Password is not matched!");
    }
  };

  // const localUser = JSON.parse(localStorage.getItem("user"));
  // useEffect(() => {
  //   if (localUser?.token) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center w-full min-h-screen">
          <div className="bg-[#F2F6FF] rounded w-full max-w-md shadow-primary">
            <div className="px-7 py-8">
              <div>
                <p className="flex relative rounded-3xl text-lg max-w-[14rem] mx-auto bg-white shadow-primary text-center py-[0.125rem]">
                  <span className="bg-[black] text-white px-1 py-1 rounded-full w-7 h-7 flex justify-center items-center absolute left-1 top-0.5 ">
                    {loginIcons}
                  </span>
                  <span className="mx-auto text-lg"> Registration </span>
                </p>
                <form className="mt-7" onSubmit={(e) => handleSubmit(e)}>
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between gap-10">
                      <div>
                        <input
                          onKeyUp={(e) =>
                            setSignUpData({
                              ...signUpData,
                              firstName: e.target.value,
                            })
                          }
                          type="text"
                          placeholder="First Name"
                          className="py-1 px-4 text-base rounded-[5rem] shadow-primary w-full"
                        />
                      </div>
                      <div>
                        <input
                          onKeyUp={(e) =>
                            setSignUpData({
                              ...signUpData,
                              lastName: e.target.value,
                            })
                          }
                          type="text"
                          placeholder="last name"
                          className="py-1 px-4 text-base rounded-[5rem] shadow-primary w-full"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <input
                        onKeyUp={(e) =>
                          setSignUpData({
                            ...signUpData,
                            email: e.target.value,
                          })
                        }
                        type="email"
                        placeholder="Email"
                        className="py-1 px-4 text-base rounded-[5rem] shadow-primary w-full"
                        required
                      />
                    </div>

                    <div>
                      <input
                        onKeyUp={(e) =>
                          setSignUpData({
                            ...signUpData,
                            password: e.target.value,
                          })
                        }
                        type="password"
                        placeholder="Password"
                        className="py-1 px-4 text-base rounded-[5rem] shadow-primary w-full"
                        required
                      />
                    </div>

                    <div>
                      <input
                        onKeyUp={(e) =>
                          setSignUpData({
                            ...signUpData,
                            confirmPW: e.target.value,
                          })
                        }
                        type="password"
                        placeholder="Confirm Password"
                        className="py-1 px-4 text-base rounded-[5rem] shadow-primary w-full"
                        required
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        className="checkbox"
                        onChange={(e) =>
                          setSignUpData({
                            ...signUpData,
                            rememberMe: e.target.checked,
                          })
                        }
                      />
                      {/* <label className="select-none" htmlFor="rememberMe">
                        Enable picture uploads from another participants
                      </label> */}
                    </div>

                    <button
                      type="submit"
                      className={`flex relative rounded-3xl text-lg min-w-[15rem] w-full shadow-primary text-center py-[0.125rem] transition duration-300 uppercase bg-[black] hover:bg-white text-white hover:text-black `}
                    >
                      <span className="mx-auto text-lg"> Register now </span>
                    </button>
                  </div>
                </form>

                <p className="text-base mt-8 text-center">
                  already have account.
                  <Link
                    className="text-[black] hover:underline select-none"
                    to="/login"
                  >
                    I will login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
