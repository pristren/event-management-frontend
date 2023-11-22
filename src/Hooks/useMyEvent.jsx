import { useEffect, useState } from "react";
import useAxios from "./useAxios";

const useMyEvent = () => {
  const { Axios } = useAxios();
  const [isLoading, setLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [user, setUser] = useState(null);
  const [myEvent, setMyEvent] = useState([]);
  const [ownEvent, setOwnEvent] = useState({});
  const [invitedEvent, setInvitedEvent] = useState({});
  const [jointedEvent, setJointedEvent] = useState({});

  // get user
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (!localUser?.token) {
      return navigate("/login");
    }
    setUser(localUser?.data);
  }, []);

  useEffect(() => {
    if (user?._id) {
      Axios.get(`/my-events/${user?._id}`)
        .then((res) => setMyEvent(res.data))
        .catch((err) => setIsError(err));
    }
  }, [user]);

  useEffect(() => {
    setOwnEvent(myEvent?.data?.ownEvents);
    setInvitedEvent(myEvent?.data?.invitedEvents);
    setJointedEvent(myEvent?.data?.joinedEvents);
  }, [myEvent]);

  return { jointedEvent, invitedEvent, ownEvent, myEvent, isLoading, isError };
};

export default useMyEvent;
