import Sidebar from "../../components/Sidebar";
import Filter from "./Filter";
import HomeNavbar from "./HomeNavbar";

const Home = () => {
  return (
    <div className="text-white bg-slate-500 font-semibold max-w-7xl mx-auto">
      <HomeNavbar />

      <div className="flex">
        <div className="relative">
          <Sidebar />
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.330962747641!2d90.38113137630452!3d23.735574478680547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8c8e1ea9fd1%3A0xa6e274882fdbce53!2sDhaka%20College!5e0!3m2!1sen!2sbd!4v1700029911453!5m2!1sen!2sbd"
          width={"100%"}
          style={{ border: "0", height: "700px" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <Filter />
    </div>
  );
};

export default Home;
