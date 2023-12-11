import React, { useEffect, useState } from "react";
import Image from "../../assets/client.jpg";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";

const MemberCard = ({ member }) => {
  const { Axios } = useAxios();
  const [user, setUser] = useState({});
  useEffect(() => {
    const user = async () => {
      await Axios.get(`/user/${member}`).then((res) => {
        setUser(res.data?.data?.user);
        console.log(res.data?.data?.user);
      });
    };
    user();
  }, [member]);
  return (
    <div className="bg-white rounded-xl p-3">
      <div className="flex items-center gap-3">
        <img
          src={Image}
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
    </div>
  );
};

export default MemberCard;
