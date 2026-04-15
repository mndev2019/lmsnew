import React, {useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Base_Url } from "../../Api/Base_Url";


const Learning = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  const token = localStorage.getItem("token");

  // 🔥 Fetch Course
  const getCourse = async () => {
    try {
      const res = await axios.get(`${Base_Url}/course/${id}`);
      setCourse(res.data.course);

      // 👉 default first preview video
      const firstLesson =
        res.data.course.chapters?.[0]?.lessons?.[0];

      setActiveLesson(firstLesson);

    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getCourse();
  }, [id]);

  if (!course) return <p className="p-10">Loading...</p>;

  // return (
  //   <div className="flex h-screen bg-[#0f172a] text-white pt-30">

  //     {/* LEFT SIDEBAR */}
  //     <div className="w-[30%] overflow-y-auto border-r border-gray-700 p-4">

  //       <h2 className="text-xl font-bold mb-4">
  //         {course.title}
  //       </h2>

  //       {course.chapters?.map((chapter, i) => (
  //         <div key={i} className="mb-4">

  //           <h3 className="text-sm font-semibold text-gray-300 mb-2">
  //             {i + 1}. {chapter.title}
  //           </h3>

  //           {chapter.lessons?.map((lesson, j) => {

  //             const isLocked =
  //               course.pricing.type === "paid" &&
  //               !lesson.isPreview;

  //             return (
  //               <div
  //                 key={j}
  //                 onClick={() => {
  //                   if (!isLocked) setActiveLesson(lesson);
  //                 }}
  //                 className={`p-2 rounded cursor-pointer mb-1 flex justify-between items-center
  //                   ${activeLesson?._id === lesson._id
  //                     ? "bg-indigo-600"
  //                     : "hover:bg-gray-700"
  //                   }`}
  //               >
  //                 <span className="text-sm">
  //                   {lesson.title}
  //                 </span>

  //                 <span className="text-xs">
  //                   {isLocked ? "🔒" : "▶️"}
  //                 </span>
  //               </div>
  //             );
  //           })}
  //         </div>
  //       ))}
  //     </div>

  //     {/* RIGHT VIDEO PLAYER */}
  //     <div className="flex-1 flex flex-col">

  //       {/* VIDEO */}
  //       <div className="h-[70%] bg-black flex items-center justify-center">

  //         {activeLesson?.type === "video" ? (
  //           <video
  //             src={activeLesson.url}
  //             controls
  //             className="w-full h-full"
  //           />
  //         ) : (
  //           <p>No video available</p>
  //         )}
  //       </div>

  //       {/* DETAILS */}
  //       <div className="p-6 bg-[#111827] flex-1">

  //         <h2 className="text-xl font-bold mb-2">
  //           {activeLesson?.title}
  //         </h2>

  //         <p className="text-sm text-gray-400">
  //           {activeLesson?.type}
  //         </p>

  //       </div>
  //     </div>
  //   </div>
  // );

return (
  <div className="flex flex-col md:flex-row h-auto md:h-screen bg-[#0f172a] text-white pt-25 md:pt-30">

    {/* LEFT SIDEBAR */}
    <div className="w-full md:w-[30%] max-h-[300px] md:max-h-full overflow-y-auto border-b md:border-b-0 md:border-r border-gray-700 p-4">

      <h2 className="text-lg md:text-xl font-bold mb-4">
        {course.title}
      </h2>

      {course.chapters?.map((chapter, i) => (
        <div key={i} className="mb-4">

          <h3 className="text-xs md:text-sm font-semibold text-gray-300 mb-2">
            {i + 1}. {chapter.title}
          </h3>

          {chapter.lessons?.map((lesson, j) => {
            const isLocked =
              course.pricing.type === "paid" &&
              !lesson.isPreview;

            return (
              <div
                key={j}
                onClick={() => {
                  if (!isLocked) setActiveLesson(lesson);
                }}
                className={`p-2 rounded cursor-pointer mb-1 flex justify-between items-center
                ${activeLesson?._id === lesson._id
                    ? "bg-indigo-600"
                    : "hover:bg-gray-700"
                  }`}
              >
                <span className="text-xs md:text-sm">
                  {lesson.title}
                </span>

                <span className="text-xs">
                  {isLocked ? "🔒" : "▶️"}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>

    {/* RIGHT VIDEO PLAYER */}
    <div className="flex-1 flex flex-col">

      {/* VIDEO */}
      <div className="h-[250px] md:h-[70%] bg-black flex items-center justify-center">

        {activeLesson?.type === "video" ? (
          <video
            src={activeLesson.url}
            controls
            className="w-full h-full object-contain"
          />
        ) : (
          <p>No video available</p>
        )}
      </div>

      {/* DETAILS */}
      <div className="p-4 md:p-6 bg-[#111827] flex-1">

        <h2 className="text-lg md:text-xl font-bold mb-2">
          {activeLesson?.title}
        </h2>

        <p className="text-xs md:text-sm text-gray-400">
          {activeLesson?.type}
        </p>

      </div>
    </div>
  </div>
);

};

export default Learning;