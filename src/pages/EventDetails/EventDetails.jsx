import React from "react";
import Profile from "../../components/Profile";
import Sidebar from "../../components/Sidebar";

const EventDetails = () => {
  return (
    <section className="flex">
      <Sidebar />
      <div className="w-full">
        <Profile />
        <div>
          <h1 className="text-[#1BB6ED] font-bold text-[24px] p-4">
            Event details
          </h1>
          <div>
            <div>
              <h1>Lunch menu uptp 50%</h1>
              <p>3 hours | 12, june 2021, 10 a.m.</p>
            </div>

            <div>
              <span>24 people has joined</span>
              <div className="flex items-center gap-2">
                <div></div>
                <span className="w-[40px] h-[40px] text-[15px] rounded-full bg-[#1BB6ED] text-white flex items-center justify-center">
                  24+
                </span>
                <span className="text-[15px] text-[#1BB6ED] cursor-pointer">
                  See all
                </span>
              </div>
            </div>

            <div>
              <h4>Descriptions</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptate, animi. Debitis aliquam fugiat quaerat alias ad
                numquam, hic natus deleniti molestiae voluptatem quam itaque
                placeat recusandae illum soluta exercitationem tenetur!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
