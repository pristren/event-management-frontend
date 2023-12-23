import React, { useEffect, useState } from "react";
import Image from "../../assets/client.jpg";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";
import { useNavigate } from "react-router-dom";

const MemberCard = ({ member }) => {
  const navigate = useNavigate();
  const { Axios } = useAxios();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const user = async () => {
      await Axios.get(`/user/${member}`)
        .then((res) => {
          setUser(res.data?.data?.user);
          // console.log(res.data?.data?.user);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    user();
  }, [member]);
  return (
    <div
      className="bg-white rounded-xl p-3 "
      onClick={() => navigate(`/profile/${user._id}`)}
    >
      {!loading ? (
        <div className="flex items-center gap-3">
          <img
            src={user?.profile_images?.length ? user?.profile_images[0] : Image}
            alt=""
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
          <div>
            <h4 className="text-[18px]">
              {user?.firstName} {user?.lastName}{" "}
            </h4>
            <p className="text-[15px]">{user?.email}</p>
          </div>
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
};

export default MemberCard;
