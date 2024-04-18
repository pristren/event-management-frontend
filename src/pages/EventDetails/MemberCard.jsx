import React, { useEffect, useState } from "react";
import Image from "../../assets/client.jpg";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";

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
      className="bg-white rounded-xl p-3 cursor-pointer"
      onClick={() => navigate(`/profile/${user._id}`)}
    >
      {!loading ? (
        <div className="flex items-center gap-3">
          {user?.profile_images?.length ? (
            <img
              src={user?.profile_images[user?.profile_images.length - 1]}
              alt=""
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
          ) : (
            <div className="bg-[black] text-white  rounded-full  w-12 h-12 flex justify-center items-center">
              <UserRound className="w-8 h-8" />
            </div>
          )}
          <div>
            <h4 className="text-[18px]">{user?.firstName}</h4>
          </div>
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
};

export default MemberCard;
