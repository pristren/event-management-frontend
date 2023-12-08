import * as Bytescale from "@bytescale/sdk";
import GoogleMapReact from "google-map-react";
import React, { useContext, useEffect, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import MyProvider from "../../Provider/Provider";
import Profile from "../../components/Profile";
import MapMarker from "../Home/MapMarker";
import Calender from "./Calender";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";

const clubIcons = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M483.424 24.638L449.83 39.98c.944.974 1.864 1.99 2.754 3.068 3.544 4.29 6.546 8.89 9.07 13.745l21.77-32.155zm-221.18 14.426l4.217 42.527c7.223-6.983 14.875-13.594 22.97-19.575l-27.186-22.95zm143.17 2.358c-2 .03-4.06.133-6.18.298-11.58.906-24.367 3.983-37.02 7.41l23.55 36.178.404.62.297.68c3.1 7.08 2.3 14.488-.006 21.41-2.308 6.924-6.405 13.565-12.487 18.53-6.082 4.962-14.756 8.037-23.813 6.118-9.056-1.92-17.6-8.213-25.506-18.803l-1.718-2.305-1.104-48.535c-25.135 12.94-47.54 34.326-66.178 57.047l17.14 9.428 2.892 1.59 1.177 3.08c4.892 12.782 5.147 26.122-1.43 37.13-6.575 11.01-18.66 18.744-35.435 24.293l-6.9 2.285-11.653-19.82c-1.71 3.762-3.41 7.56-5.093 11.43l-17.225 108.624-2.75-61.597c-10.444 24.205-21.82 48.42-36.09 70.063C119.643 368.216 28.322 462.01 28.322 462.01l-.07.072-.07.07c-3.905 3.85-3.91 5.573-3.475 7.693.29 1.418 1.348 3.368 3.168 5.43l97.166-78.713-84.007 87.3c5.778 2.305 11.906 3.587 15.895 3.495 6.885-6.482 66.713-62.5 107.11-88.644 38.117-24.67 69.79-54.084 106.32-82.045l12.213-70.723.37-2.147 1.312-1.74c6.783-8.997 15.585-14.236 24.506-15.33a31.905 31.905 0 0 1 6.588-.113c6.464.56 12.5 3.047 17.584 6.59 11.895 8.287 20.172 22.808 18.008 37.68 6.76-3 13.436-6.003 19.883-9.153 20.67-10.1 38.705-21.33 51.063-37.56-7.023-.544-13.58-3.672-19.03-7.846-7.455-5.707-13.412-13.558-17.25-22.2-3.84-8.64-5.723-18.287-2.974-27.615 2.75-9.326 11.142-17.274 22.833-20.01l.645-.153 45.662-3.797c.92-5.208 1.667-10.42 2.19-15.58 1.022-10.1 1.175-19.927.35-29.187l-28.927 31.25 19.88-64.613c-1.88-3.562-4.056-6.88-6.556-9.907-7.064-8.55-16.195-12.217-27.474-12.957a72.25 72.25 0 0 0-5.82-.134zm-65.937 5.773l1.316 57.93c5.447 6.628 10.038 9.285 13.098 9.933 3.385.717 5.85-.13 8.702-2.457 2.852-2.327 5.483-6.348 6.79-10.272 1.253-3.757 1.01-7.105.624-8.23l-30.53-46.903zm-136.057 64.69l37.62 63.984c10.068-4.252 16.137-9.108 18.94-13.802 3.017-5.05 3.41-10.74.962-18.547l-57.522-31.636zm284.063 45.76l-78.336 6.513c-6.528 1.622-8.23 3.973-9.252 7.443-1.05 3.558-.457 9.338 2.156 15.218 2.614 5.88 7.085 11.648 11.745 15.217 4.102 3.14 7.867 4.322 10.924 4.105.6-.433 1.22-.876 2.16-1.576a960.486 960.486 0 0 0 10.226-7.758c8.388-6.43 19.428-14.995 30.408-23.547 10.038-7.82 12.08-9.442 19.97-15.616zM312.38 244.497c-.48.007-.957.04-1.43.097-3.424.42-7.092 2.18-11.067 6.868l-16.496 95.523 49.18-76.508c2.014-7.113-2.495-17.326-9.926-22.504-2.873-2.002-5.883-3.162-8.806-3.422a14.095 14.095 0 0 0-1.453-.054zm74.02 29.52a328.805 328.805 0 0 1-7.677 3.886c-5.127 2.505-10.308 4.887-15.488 7.232l27.76 17.047-4.594-28.166z"></path>
  </svg>
);

const CreateEvent = () => {
  const navigate = useNavigate();
  const { Axios } = useAxios();
  const { isExpand, setIsExpand } = useContext(MyProvider);
  const { user } = useSelector((state) => state.auth);
  const [selectedBtn, setSelectedBtn] = useState("private");
  const [multipleImages, setMultipleImages] = useState([]);
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState({
    address: "",
    latitude: "",
    longitude: "",
  });
  const [eventDate, setEventDate] = useState(false);
  const [error, setError] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [inputData, setInputData] = useState({
    invitedUserId: "",
    event_title: "",
    event_Details: "",
    event_clubName: "",
    time_start: "",
    time_end: "",
    joinedPeople: "",
    anOtherParticipants: false,
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // input handle change set object value dynamical
  const handleInputChange = (event) => {
    if (event.target.name == "anOtherParticipants") {
      return setInputData((inputs) => ({
        ...inputs,
        [event.target.name]: event.target.checked,
      }));
    } else {
      setInputData((inputs) => ({
        ...inputs,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const defaultProps = {
    center: {
      lat: 23.7330218,
      lng: 90.3983829,
    },
    zoom: 11,
  };

  const images = [];
  const uploadManager = new Bytescale.UploadManager({
    apiKey: "public_W142iMq3aDCn9NTRMSpXjPdpgg5W",
  });
  const imageUpload = async (file) => {
    try {
      const { fileUrl, filePath } = await uploadManager.upload({ data: file });
      images.push({ image: fileUrl });
    } catch (e) {
      console.log("catch e ", e);
      alert(`Error:\n${e.message}`);
    }
  };
  const handleFileChange = async (e) => {
    setFileUploadLoading(true);
    const files = e.target.files;
    await Promise.all(
      Array.from(files).map(async (file) => {
        if (file.size) {
          await imageUpload(file);
        }
      })
    );

    setFileUploadLoading(false);
    setMultipleImages(images);
  };

  const createEvent = () => {
    if (
      user?._id !== "" &&
      inputData?.event_title !== "" &&
      inputData?.event_Details !== "" &&
      inputData?.event_clubName !== ""
    ) {
      const newData = {
        userId: user?._id,
        event_images: multipleImages,
        event_title: inputData?.event_title,
        event_Details: inputData?.event_Details,
        event_clubName: inputData?.event_clubName,
        location: selectedPlace?.address,
        mapLocation: {
          lat: selectedPlace?.latitude,
          lng: selectedPlace?.longitude,
        },
        event_date: eventDate,
        event_time: {
          time_start: startDate,
          time_end: endDate,
        },
        sharable: selectedBtn,
        anOtherParticipants: inputData?.anOtherParticipants,
      };
      Axios.post("/create-event", newData)
        .then((res) => {
          toast.success("Event Created Successfully!");
          setCreateSuccess(res?.data?.event);
          navigate("/my-events");
        })
        .catch((err) => {
          toast.error("creating error");
        });
    } else {
      toast.error("Plase input all the feild!");
    }
  };
  useEffect(() => {
    const initAutocomplete = () => {
      const input = document.getElementById("autocomplete");
      const autocomplete = new window.google.maps.places.Autocomplete(input);
      autocomplete.addListener("place_changed", () => {
        const selectedPlace = autocomplete.getPlace();
        setSelectedPlace((inputs) => ({
          ...inputs,
          address: selectedPlace?.formatted_address,
          latitude: selectedPlace?.geometry?.location?.lat(),
          longitude: selectedPlace?.geometry?.location?.lng(),
        }));
      });
    };
    initAutocomplete();

    // // Load the Google Maps API script
    // const script = document.createElement("script");
    // script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAFJnzdCNNnWNCOFH9O79ASmHG3OndfNK4&libraries=places`;
    // script.async = true;
    // script.defer = true;
    // script.onload = initAutocomplete;

    // document.head.appendChild(script);

    // // Cleanup function to remove the script when the component unmounts
    // return () => {
    //   document.head.removeChild(script);
    // };
  }, []);

  return (
    <div className="flex">
      <div>
        <div className="flex items-center justify-between pt-4 pb-5 px-4">
          <span
            className="cursor-pointer sm:hidden"
            onClick={() => setIsExpand(!isExpand)}
          >
            <svg
              stroke="currentColor"
              fill="#1BB6ED"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="23px"
              width="23px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"></path>
            </svg>
          </span>
          <h1 className="text-[#1BB6ED] font-bold text-2xl">Event creation</h1>
          <Profile />
        </div>

        <div className="min-h-screen bg-[#F2F6FF] py-10 px-5 grid items-stretch grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Left Content  */}
          <div>
            <div className="flex items-center bg-white rounded-full overflow-hidden px-4 shadow-primary">
              <span className="flex items-center">
                <svg
                  stroke="currentColor"
                  fill="#1BB6ED"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"></path>
                </svg>
              </span>
              {/* <span className="text-[#1D1D1D] font-medium whitespace-nowrap"></span> */}

              <input
                type="text"
                placeholder={"Name of event"}
                name="event_title"
                onChange={handleInputChange}
                className="w-full px-2 py-2 outline-none border-none text-[15px] focus:outline-none font-normal placeholder:text-[#6c757d] placeholder:font-medium"
                required
              />
            </div>

            {/* Calender  */}
            <div className="my-10 relative">
              <span className="bg-[#1BB6ED] p-3 rounded-xl flex items-center justify-center absolute -top-5 left-5">
                <svg
                  stroke="currentColor"
                  fill="#fff"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="25px"
                  width="25px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6.445 12.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"></path>
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"></path>
                  <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"></path>
                </svg>
              </span>
              <div
                className="bg-white py-12 px-20 sm:px-8 md:px-3 md:py-12 lg:px-3 xl:px-4 rounded-3xl"
                style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
              >
                <Calender setEventDate={setEventDate} />
              </div>
            </div>

            <div className="flex gap-5 mt-5">
              <div className="w-full flex gap-3 items-center justify-between bg-white rounded-full shadow-primary">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  className="w-full py-2 px-4 outline-none border-none text-[15px] text-[#1BB6ED] bg-white font-medium rounded-full placeholder:text-[#6c757d] placeholder:font-medium"
                  placeholderText="Time start"
                />
                {/* <input
                  type="time"
                  placeholder="Time start"
                  title="Time start"
                  name="time_start"
                  onChange={handleInputChange}
                  required
                /> */}
              </div>

              <div className="w-full flex gap-3 items-center justify-between bg-white rounded-full shadow-primary">
                {/* <input
                  type="time"
                  placeholder="Time end"
                  title="Time end"
                  name="time_end"
                  onChange={handleInputChange}
                  className="w-full py-2 px-4 outline-none border-none text-[15px] text-[#1BB6ED] bg-white font-medium rounded-full placeholder:text-[#6c757d] placeholder:font-medium"
                /> */}
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  className="w-full py-2 px-4 outline-none border-none text-[15px] text-[#1BB6ED] bg-white font-medium rounded-full placeholder:text-[#6c757d] placeholder:font-medium"
                  placeholderText="Time start"
                />
              </div>
            </div>

            <div className="flex items-center bg-white rounded-full overflow-hidden px-4 shadow-primary mt-5">
              <span className="flex items-center">
                <svg
                  stroke="currentColor"
                  fill="#1BB6ED"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Location_On">
                    <g>
                      <path d="M12,21.933a1.715,1.715,0,0,1-1.384-.691L5.555,14.5a7.894,7.894,0,1,1,12.885-.009L13.385,21.24A1.717,1.717,0,0,1,12,21.933ZM11.992,3.066A6.81,6.81,0,0,0,7.414,4.815a6.891,6.891,0,0,0-1.05,9.1l5.051,6.727a.725.725,0,0,0,.584.292h0a.732.732,0,0,0,.586-.292l5.044-6.734A6.874,6.874,0,0,0,12.81,3.113,7.277,7.277,0,0,0,11.992,3.066Z"></path>
                      <path d="M12,12.5A2.5,2.5,0,1,1,14.5,10,2.5,2.5,0,0,1,12,12.5Zm0-4A1.5,1.5,0,1,0,13.5,10,1.5,1.5,0,0,0,12,8.5Z"></path>
                    </g>
                  </g>
                </svg>
                {/* <span className="text-[#1D1D1D] font-medium whitespace-nowrap"></span> */}
              </span>
              <input
                id="autocomplete"
                type="text"
                placeholder="Place"
                // value={selectedPlace?.address}
                // onChange={(e) =>
                //   setSelectedPlace({
                //     ...selectedPlace,
                //     address: e.target.value,
                //   })
                // }
                className="w-full px-2 py-2 outline-none border-none text-[15px] font-normal focus:outline-none placeholder:text-[#6c757d] placeholder:font-medium"
              />
            </div>
          </div>

          {/* Middle Content  */}
          <div>
            <div className="flex items-center bg-white rounded-full overflow-hidden px-4 shadow-primary mb-5">
              <span className="flex items-center text-[#1BB6ED]">
                {clubIcons}
              </span>
              {/* <span className="text-[#1D1D1D] font-medium whitespace-nowrap"></span> */}

              <input
                type="text"
                placeholder={"Club Name"}
                name="event_clubName"
                onChange={handleInputChange}
                className="w-full px-2 py-2 outline-none border-none text-[15px] focus:outline-none font-normal placeholder:text-[#6c757d] placeholder:font-medium"
                required
              />
            </div>

            {/* Placeholder  */}
            <div className="flex gap-3 items-center bg-white rounded-2xl overflow-hidden shadow-primary">
              <textarea
                name="event_Details"
                onChange={handleInputChange}
                placeholder="Placeholder"
                className="w-full h-[200px] p-4 font-normal outline-none border-none text-[15px] placeholder:text-[#6c757d] placeholder:font-medium"
                required
              ></textarea>
            </div>

            {/* Checkbox  */}
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                id="enable"
                name="anOtherParticipants"
                onChange={handleInputChange}
                className="checkbox"
              />
              <label htmlFor="enable">
                Enable picture uploads from another participants
              </label>
            </div>

            {/* Share event  */}
            <div className="bg-white rounded-2xl p-4 shadow-primary mt-5 overflow-hidden">
              <span className="block mb-5">Share event</span>

              <div className="w-full flex gap-6 items-center overflow-hidden">
                <button
                  onClick={(e) => setSelectedBtn("public")}
                  className={`w-full py-2 px-6 rounded-full  ${
                    selectedBtn === "public" ? "bg-[#1BB6ED]" : "bg-[#C3C3C5]"
                  } text-white`}
                >
                  Public
                </button>

                <button
                  onClick={(e) => setSelectedBtn("contract")}
                  className={`w-full py-2 px-6 rounded-full ${
                    selectedBtn === "contract" ? "bg-[#1BB6ED]" : "bg-[#C3C3C5]"
                  } text-white`}
                >
                  Contract
                </button>
              </div>

              <div className="w-full flex flex-col gap-3 mt-8">
                <div
                  className="flex items-center justify-center overflow-hidden relative w-full bg-white py-2 border-[1px] border-[#1BB6ED] border-dotted rounded-full"
                  style={{
                    boxShadow: "-1px 4px 110px 9px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <input
                    type="file"
                    style={{
                      boxShadow: "-1px 4px 110px 9px rgba(43, 37, 37, 0.06)",
                    }}
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute top-0 right-0 w-full h-full opacity-0 font-Jost text-[#000000] font-semibold leading-[22px] uppercase border-[1px] border-[#0070D2] rounded-[10px] py-4 px-8 bg-white placeholder:text-[16px] placeholder:font-normal placeholder:capitalize cursor-pointer"
                  />
                  <div
                    className="flex gap-3 text-center text-[#A7A7A7] font-Jost text-[16px] md:text-[18px]"
                    onClick={() => {
                      document.getElementById("fileInput").click();
                    }}
                  >
                    {multipleImages ? (
                      <p className="text-[#1BB6ED] text-[15px]">
                        {fileUploadLoading
                          ? "Uploading..."
                          : `Uploaded files:
                        ${multipleImages?.length}`}
                      </p>
                    ) : (
                      <>
                        <span className="flex items-center">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 256 256"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M165.66,90.34a8,8,0,0,1,0,11.32l-64,64a8,8,0,0,1-11.32-11.32l64-64A8,8,0,0,1,165.66,90.34ZM215.6,40.4a56,56,0,0,0-79.2,0L106.34,70.45a8,8,0,0,0,11.32,11.32l30.06-30a40,40,0,0,1,56.57,56.56l-30.07,30.06a8,8,0,0,0,11.31,11.32L215.6,119.6a56,56,0,0,0,0-79.2ZM138.34,174.22l-30.06,30.06a40,40,0,1,1-56.56-56.57l30.05-30.05a8,8,0,0,0-11.32-11.32L40.4,136.4a56,56,0,0,0,79.2,79.2l30.06-30.07a8,8,0,0,0-11.32-11.31Z"></path>
                          </svg>
                        </span>
                        <span className="text-[#1BB6ED] text-[15px]">
                          {fileUploadLoading
                            ? "Uploading..."
                            : `Uploaded files:
                        ${multipleImages?.length}`}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Share button  */}
            <div
              className="flex justify-center mt-6"
              style={{
                boxShadow: "24px 83px 106px -52px rgba(79,70,70,0.75)",
              }}
            >
              {createSuccess ? (
                <button className="flex items-center gap-4 bg-[#1BB6ED] py-2 px-7 rounded-full">
                  <span className="flex items-center">
                    <svg
                      stroke="#fff"
                      fill="#fff"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="128"
                        cy="256"
                        r="48"
                        fill="#fff"
                        strokeLinecap="round"
                        stroke-linejoin="round"
                        strokeWidth="32"
                      ></circle>
                      <circle
                        cx="384"
                        cy="112"
                        r="48"
                        fill="#fff"
                        strokeLinecap="round"
                        stroke-linejoin="round"
                        strokeWidth="32"
                      ></circle>
                      <circle
                        cx="384"
                        cy="400"
                        r="48"
                        fill="#fff"
                        strokeLinecap="round"
                        stroke-linejoin="round"
                        strokeWidth="32"
                      ></circle>
                      <path
                        fill="#fff"
                        strokeLinecap="round"
                        stroke-linejoin="round"
                        strokeWidth="32"
                        d="M169.83 279.53l172.34 96.94m0-240.94l-172.34 96.94"
                      ></path>
                    </svg>
                  </span>
                  <span className="text-white">Share</span>
                </button>
              ) : (
                <button
                  onClick={createEvent}
                  className="flex items-center gap-4 bg-[#1BB6ED] py-2 px-7 rounded-full"
                  disabled={fileUploadLoading}
                >
                  {/* <span className="flex items-center"></span> */}
                  <span className="text-white">create Event</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Content  */}
          {/* <div className="shadow-primary rounded-2xl overflow-hidden md:w-full">
            <div style={{ height: "100%", width: "100%" }}>
              <GoogleMapReact
                // bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_API_KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              >
                {[
                  { lat: 23.7330218, lng: 90.3983829 },
                  { lat: 23.7330215, lng: 90.3983829 },
                ]?.map((res) => {
                  <MapMarker text="My Marker" />;
                })}
              </GoogleMapReact>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
