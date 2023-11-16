import React from "react";
import Image from "../../assets/client.jpg";

const MemberCard = () => {
  return (
    <div className="bg-white rounded-xl p-3">
      <div className="flex items-center gap-3">
        <img
          src={Image}
          alt=""
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
        <div>
          <h4 className="text-[18px]">Valerytina</h4>
          <p className="text-[15px]">email@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
