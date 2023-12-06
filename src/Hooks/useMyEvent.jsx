import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useMyEvent = () => {
  const { Axios } = useAxios();
  const [isLoading, setLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const [myEvent, setMyEvent] = useState([]);
  const [ownEvent, setOwnEvent] = useState({});
  const [invitedEvent, setInvitedEvent] = useState({});
  const [jointedEvent, setJointedEvent] = useState({});

  useEffect(() => {
    if (user?._id) {
      Axios.get(`/my-events/${user?._id}`)
        .then((res) => setMyEvent(res.data))
        .catch((err) => setIsError(err));
    }
  }, []);

  useEffect(() => {
    setOwnEvent(myEvent?.data?.ownEvents);
    setInvitedEvent(myEvent?.data?.invitedEvents);
    setJointedEvent(myEvent?.data?.joinedEvents);
  }, [myEvent]);

  return { jointedEvent, invitedEvent, ownEvent, myEvent, isLoading, isError };
};

export default useMyEvent;
