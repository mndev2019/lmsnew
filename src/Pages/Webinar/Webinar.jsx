import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Base_Url } from "../../Api/Base_Url";
import InnerBanner from "../../Component/InnerBanner";
import banner from '../../assets/Image/innerbanner.png'

const Webinar = () => {
  const [webinars, setWebinars] = useState([]);
  const navigate = useNavigate();

  // const getWebinars = async () => {
  //   const res = await axios.get(`${Base_Url}/webinars`);

  //   // only published
  //   const filtered = res.data.data.filter(
  //     (w) => w.status === "published"
  //   );

  //   setWebinars(filtered);
  // };
  const getWebinars = async () => {
    const res = await axios.get(`${Base_Url}/webinars`);

    const filtered = res.data.data.filter(
      (w) =>
        w.status === "published" &&
        w.liveStatus !== "completed"
    );

    setWebinars(filtered);
  };

  React.useEffect(() => {
    getWebinars();
  }, []);

  return (
    <>
      <InnerBanner
        title="Live Webinars"
        subtitle="Join our live sessions to learn from experts, gain real-world insights, and enhance your skills."
        image={banner}
      />
      <div className="p-6 min-h-screen">
        <div className="mb-10 text-left">
          <h2 className="md:text-3xl text-2xl font-extrabold text-gray-900 mb-4 uppercase">
            Live Webinars 🎥
          </h2>

          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-yellow-400 rounded-full" />
            <span className="md:text-lg text-md font-medium text-gray-700">
              Join interactive live sessions with experts and gain real-time insights
            </span>
          </div>
        </div>




          {webinars.length > 0 ? (
            <div className="grid grid-cols-3 gap-6">
              {webinars.map((webinar) => (
                <div
                  key={webinar._id}
                  onClick={() => navigate(`/webinar/${webinar._id}`)}
                  className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="h-40 bg-gray-200">
                    {webinar.thumbnail && (
                      <img
                        src={webinar.thumbnail}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg">
                      {webinar.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      📅 {new Date(webinar.startTime).toLocaleDateString()}
                    </p>

                    <p className="text-sm text-gray-500">
                      ⏰ {new Date(webinar.startTime).toLocaleTimeString()}
                    </p>

                    <p className="text-sm mt-2">
                      💰 {webinar.isPaid ? `₹${webinar.price}` : "Free"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 col-span-3 ">
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">
                No Live Webinars Available 🎥
              </h3>

              <p className="text-gray-500 mb-5">
                There are no live webinars at the moment. Stay tuned for upcoming sessions!
              </p>

              <button
                onClick={() => navigate("/")}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
              >
                Explore Courses
              </button>
            </div>
          )}

        </div>

   
    </>

  );
};

export default Webinar;