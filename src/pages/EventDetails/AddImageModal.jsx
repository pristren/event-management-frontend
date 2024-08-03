import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import ImageUploader from "react-images-upload";
import { useSelector } from "react-redux";
import useAxios from "../../Hooks/useAxios";

export default function AddImageModal({
  openImgModal,
  handleCloseModal2,
  event,
  setEvents,
}) {
  const [loading, setLoading] = useState(false);
  const [multipleImages, setMultipleImages] = useState([]);
  const { accessToken } = useSelector((state) => state.auth);

  const { Axios } = useAxios();
  const API_KEY = "36d1f9afd01a5a168255a86c4349f031";

  const onDrop = async (pictureFiles) => {
    setLoading(true);
    // setPictures(pictureFiles);
    const uploadedImagesArray = [];

    for (const image of pictureFiles) {
      const formData = new FormData();
      formData.append("image", image);

      const response = await Axios.post(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        formData
      );
      // console.log(response.data);

      uploadedImagesArray.push({ image: response?.data?.data?.url });
    }

    // setUploadedImages(uploadedImagesArray);
    if (uploadedImagesArray?.length) {
      setLoading(false);
      setMultipleImages(uploadedImagesArray);
      // images.push({ image: fileUrl });
    }
  };

  const handleImgAdd = async () => {
    await Axios.put(
      `/addImages/${event._id}`,
      { images: multipleImages },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => {
      if (res.status === 200) {
        Axios.get(`/event-details/${event._id}`)
          .then((res) => setEvents(res.data.data))
          .catch((err) => console.log(err))
          .finally(() => {
            handleCloseModal2();
          });
      }
    });
  };
  return (
    <>
      <Transition appear show={openImgModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleCloseModal2}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="space-y-6">
                    <div className="flex justify-end items-center">
                      <span
                        className="cursor-pointer"
                        onClick={handleCloseModal2}
                      >
                        <svg
                          stroke="currentColor"
                          fill="red"
                          strokeWidth="0"
                          viewBox="0 0 1024 1024"
                          height="22px"
                          width="22px"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512 282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0zm0 961.008c-247.024 0-448-201.984-448-449.01 0-247.024 200.976-448 448-448s448 200.977 448 448-200.976 449.01-448 449.01zm181.008-630.016c-12.496-12.496-32.752-12.496-45.248 0L512 466.752l-135.76-135.76c-12.496-12.496-32.752-12.496-45.264 0-12.496 12.496-12.496 32.752 0 45.248L466.736 512l-135.76 135.76c-12.496 12.48-12.496 32.769 0 45.249 12.496 12.496 32.752 12.496 45.264 0L512 557.249l135.76 135.76c12.496 12.496 32.752 12.496 45.248 0 12.496-12.48 12.496-32.769 0-45.249L557.248 512l135.76-135.76c12.512-12.512 12.512-32.768 0-45.248z"></path>
                        </svg>
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <ImageUploader
                        withIcon={true}
                        buttonText="Choose images"
                        onChange={onDrop}
                        // imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                        maxFileSize={5242880}
                        withPreview={true}
                        className="border-none"
                      />
                    </div>
                    <button
                      onClick={handleImgAdd}
                      className={` text-white px-4 py-2 rounded-md flex justify-center w-full ${
                        loading ? "bg-green-300" : "bg-green-600"
                      }`}
                      disabled={loading}
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
