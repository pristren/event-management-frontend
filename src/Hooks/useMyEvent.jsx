import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import initFirebase from "../services/auth/firebase.init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  getIdToken,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
initFirebase();

const useMyEvent = () => {
  const { Axios } = useAxios();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const [myEvent, setMyEvent] = useState([]);
  const [ownEvent, setOwnEvent] = useState({});
  const [invitedEvent, setInvitedEvent] = useState({});
  const [jointedEvent, setJointedEvent] = useState({});
  const auth = getAuth();

  const [phone, setPhone] = useState("");

  const sendOtp = async () => {
    const recaptcha = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
    });

    // console.log();
    const ph = "+" + Number(phone);
    signInWithPhoneNumber(auth, ph, recaptcha)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        // console.log(confirmationResult);
        // ...
      })
      .catch((error) => {
        console.log(error);
        // Error; SMS not sent
        // ...
      });
    // const recaptcha = new RecaptchaVerifier(auth, "sign-in-button", {
    //   size: "invisible",
    // });
    // const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
    // console.log(confirmation);
  };

  // console.log(myEvent);

  useEffect(() => {
    if (user?._id) {
      setIsLoading(true);
      Axios.get(`/my-events/${user?._id}`)
        .then((res) => {
          setMyEvent(res.data);
        })
        .catch((err) => setIsError(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user?._id]);

  useEffect(() => {
    setOwnEvent(myEvent?.data?.ownEvents);
    setInvitedEvent(myEvent?.data?.invitedEvents);
    setJointedEvent(myEvent?.data?.joinedEvents);
  }, [myEvent]);

  return {
    jointedEvent,
    invitedEvent,
    ownEvent,
    myEvent,
    isLoading,
    isError,
    setMyEvent,
    sendOtp,
    phone,
    setPhone,
  };
};

export default useMyEvent;
