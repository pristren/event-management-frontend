import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios";
import { useRegisterMutation } from "../../../features/auth/authApi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/plain.css";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    termsCheckBox: "",
    onlyPhone: "",
    phoneWithCode: "",
    countryCode: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPW,
      termsCheckBox,
      countryCode,
      onlyPhone,
      phoneWithCode,
    } = signUpData;

    if (!termsCheckBox) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPW === "" ||
      onlyPhone === "" ||
      phoneWithCode === "" ||
      countryCode === ""
    ) {
      toast.error("All fields are required");
      return;
    }

    if (password === confirmPW) {
      if (
        password.length >= 6 &&
        /[a-zA-Z]/.test(password) &&
        /[0-9]/.test(password)
      ) {
        const newData = {
          firstName,
          lastName,
          email,
          password,
          onlyPhone,
          countryCode,
          phoneWithCode,
        };
        register(newData).then((res) => {
          if (res?.data) {
            toast.success("Regester Successful");
            navigate("/");
          } else {
            toast.error(`${res?.error?.data?.message}`);
          }
        });
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
                    <div className="flex items-center justify-between gap-4">
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
                    <div className="-mt-3 space-y-1">
                      <span className="inline-block px-2 text-gray-700">
                        Phone Number{" "}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span
                                className="
                        "
                              >
                                ℹ
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>You cannot change your phone number later.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </span>
                      <PhoneInput
                        buttonStyle={{
                          border: "none",
                          padding: "0.5rem",
                        }}
                        placeholder="Phone Number"
                        inputStyle={{
                          // padding: "0.5rem 1rem",
                          borderRadius: "5rem",
                          width: "100%",
                          border: "none",
                        }}
                        country={"ch"}
                        // value={signUpData?.phoneWithCode}
                        onChange={
                          (phone, country, e, formatted) => {
                            const code = `${country.dialCode}`;
                            const withoutCode = phone.replace(code, "");
                            const newPhone = `+${code}${withoutCode}`;

                            setSignUpData({
                              ...signUpData,
                              onlyPhone: withoutCode,
                              phoneWithCode: newPhone,
                              countryCode: `+${code}`,
                            });
                          }
                          // console.log({ phone, country, e, formatted })
                        }
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
                        id="termsCheckBox"
                        className="checkbox"
                        onChange={
                          (e) =>
                            setSignUpData({
                              ...signUpData,
                              termsCheckBox: e.target.checked,
                            })
                          // setLoginData({
                          //   ...loginData,
                          //   termsCheckBox: e.target.checked,
                          // })
                        }
                      />
                      <label className="select-none" htmlFor="termsCheckBox">
                        I have read{" "}
                        <span
                          className="text-blue-500 underline"
                          onClick={() => navigate("/privacy-policy")}
                        >
                          Terms and Conditions
                        </span>{" "}
                        and agree to them.
                      </label>
                    </div>
                    {/* <label className="select-none" htmlFor="termsCheckBox">
                        Enable picture uploads from another participants
                      </label> */}

                    <button
                      type="submit"
                      className={`flex relative rounded-3xl text-lg min-w-[15rem] w-full shadow-primary text-center py-[0.125rem] transition duration-300 uppercase bg-[black]  text-white  `}
                    >
                      <span className="mx-auto text-lg"> Register now </span>
                    </button>
                  </div>
                </form>

                <p className="text-base mt-8 text-center ">
                  Already have account.{" "}
                  <Link
                    className="text-blue-500 underline select-none"
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
