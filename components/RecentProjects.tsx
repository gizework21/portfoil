"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";
import { useState } from "react";

const RecentProjects = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false); 
  const [modalMessage, setModalMessage] = useState<string>(""); 

  const handleNavigate = (link: string | URL | undefined) => {
    if (link && link !== "") {
      window.open(link, "_blank");
    } else {
      setModalMessage("This is a private project in production.");
      setShowModal(true);
    }
  };

  const toggleDescription = (id: number) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="py-20">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {projects.map((item) => (
          <div
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={item.id}
          >
            <PinContainer title={item.title} href={item.link}>
              <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <img src="/bg.png" alt="bgimg" />
                </div>
                <img
                  src={item.img}
                  alt="cover"
                  className="z-10 absolute bottom-0"
                />
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {item.title}
              </h1>

              <p
                className={`lg:text-xl lg:font-normal font-light text-sm ${
                  expandedProject === item.id ? "" : "line-clamp-2"
                }`}
                style={{ color: "#BEC1DD", margin: "1vh 0", cursor: "pointer" }}
                onClick={() => toggleDescription(item.id)}
              >
                {item.des}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {item.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{ transform: `translateX(-${5 * index + 2}px)` }}
                    >
                      <img src={icon} alt="icon5" className="p-2" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  <button
                    onClick={() => handleNavigate(item.link)}
                    className="flex items-center"
                  >
                    <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                      Check Live Site
                    </p>
                    <FaLocationArrow className="ms-3" color="#CBACF9" />
                  </button>
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold text-black mb-4">Notice</h2>
            <p className="text-gray-700 mb-4">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="bg-purple text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentProjects;
