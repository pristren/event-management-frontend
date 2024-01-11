import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const funnelIcons = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="20px"
    width="20px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path>
  </svg>
);
const closeIcons = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-full h-full"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const radioIcons = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    className="w-full h-full"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M256 48C141.601 48 48 141.601 48 256s93.601 208 208 208 208-93.601 208-208S370.399 48 256 48zm0 374.399c-91.518 0-166.399-74.882-166.399-166.399S164.482 89.6 256 89.6 422.4 164.482 422.4 256 347.518 422.399 256 422.399z"></path>
  </svg>
);
const radioIconsFocus = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    className="w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M256 152c-57.2 0-104 46.8-104 104s46.8 104 104 104 104-46.8 104-104-46.8-104-104-104zm0-104C141.601 48 48 141.601 48 256s93.601 208 208 208 208-93.601 208-208S370.399 48 256 48zm0 374.4c-91.518 0-166.4-74.883-166.4-166.4S164.482 89.6 256 89.6 422.4 164.482 422.4 256 347.518 422.4 256 422.4z"></path>
  </svg>
);
const upArrowIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    className="w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M256 217.9L383 345c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.3-24.6 0-34L273 167c-9.1-9.1-23.7-9.3-33.1-.7L95 310.9c-4.7 4.7-7 10.9-7 17s2.3 12.3 7 17c9.4 9.4 24.6 9.4 33.9 0l127.1-127z"></path>
  </svg>
);
const searchIcons = (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="20px"
    width="20px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const type = [
  {
    name: "Sports",
  },
  {
    name: "BirstDay",
  },
  {
    name: "Study",
  },
];

const Filter = ({ selected2, setSelected2 }) => {
  const [fieldError, setFieldError] = useState(false);

  const filterBtn = (
    <div className="block truncate text-gray-400">
      <button
        className="bg-[black] text-white p-4 rounded-l-2xl flex items-center gap-2"
        // className="bg-[#1BB6E-D--- ] text-white p-4 rounded-l-2xl flex items-center gap-2"
      >
        <span>{funnelIcons}</span>
        <span>Filter</span>
      </button>
    </div>
  );
  return (
    <div className="absolute top-[200px] right-5 max-w-[450px] lg:max-w-[650px] w-full bg-white rounded-2xl flex border-[2px] border-white shadow-xl">
      <div className="w-full flex items-center justify-between">
        <div className="w-full">
          <Listbox value={selected2} onChange={setSelected2} multiple>
            <div className="relative shadow-xl ">
              <Listbox.Button
                className={`relative w-full cursor-default rounded-lg bg-white text-left ${
                  fieldError && selected2.length === 0
                    ? "border-red-500"
                    : "border-[#E5E7EC] "
                } focus:outline-none flex gap-2`}
              >
                <div className="flex gap-2 items-center">
                  {filterBtn}
                  {selected2?.length
                    ? selected2?.map((s, i) => {
                        return (
                          <span
                            key={i}
                            className="inline-flex truncate bg-[black] text-white px-3 py-2 rounded-2xl items-center gap-1"
                          >
                            <span> {s.name}</span>

                            <span className="w-5 h-5"> {closeIcons} </span>
                            {/* {selected2.length > i + 1 ? "," : ""} */}
                          </span>
                        );
                      })
                    : ""}
                </div>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="!z-[9999] absolute mt-1 w-1/2 rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm shadow-xl border ">
                  <span className="block truncate py-3 px-4 font-semibold text-[black] text-base border-b-2 border-[black] relative">
                    <span>Select Filter Option</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <span className="h-5 w-5 text-[black]">
                        {upArrowIcon}
                      </span>
                    </span>
                  </span>
                  {type.map((tp, tpIdx) => (
                    <Listbox.Option
                      key={tpIdx}
                      className={({ active }) =>
                        `relative font-semibold select-none py-4 pl-5 pr-4 cursor-pointer ${
                          active ? "text-[black]" : "text-gray-900"
                        }`
                      }
                      value={tp}
                    >
                      {({ selected }) => (
                        <div className="flex justify-between">
                          <span
                            className={`block truncate ${
                              selected ? "font-semibold" : "font-normal"
                            }`}
                          >
                            {tp.name}
                          </span>
                          {selected}
                          <span className="absolute top-1/2 -translate-y-1/2 right-5 w-5 h-5 flex items-center text-[black]">
                            {selected ? radioIconsFocus : radioIcons}
                          </span>
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        <button className="bg-[black] text-white p-4 rounded-2xl">
          {" "}
          {searchIcons}{" "}
        </button>
      </div>
    </div>
  );
};

export default Filter;
