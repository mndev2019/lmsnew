import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Base_Url } from "../../Api/Base_Url";
import { GrChapterAdd } from "react-icons/gr";
import { toast } from "react-toastify";

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // ✅ Fetch Package
  const getPackage = async () => {
    try {
      const res = await axios.get(`${Base_Url}/packages/${id}`);

      const data = res.data.data; // ✅ object

      setPkg(data);
      setCourses(data?.courses || []);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Check Purchase (FIXED)
  const checkPurchase = async () => {
    try {
      const res = await axios.get(`${Base_Url}/my-packages`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const purchased = res.data.data.some(
        (p) => p.package_id?._id === id
      );

      setIsPurchased(purchased);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPackage();
    if (token) checkPurchase();
  }, [id]);

  // 🔥 Main Action
  // const handleAction = async () => {
  //   if (!token) {
  //     navigate("/login", {
  //       state: { from: `/package/${id}` },
  //     });
  //     return;
  //   }

  //   if (isPurchased) {
  //     navigate(`/learn/package/${id}`);
  //   } else {
  //     // ✅ Direct buy (temporary without payment)
  //     try {
  //       await axios.post(
  //         `${Base_Url}/buy-package`,
  //         { package_id: id },
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       toast.success("Package Purchased 🎉");
  //       setIsPurchased(true);

  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };
  const handleAction = () => {
  if (!token) {
    navigate("/login", {
      state: { from: `/package/${id}` },
    });
    return;
  }

 if (!isPurchased) {
    // 🔥 sirf payment pe bhejo
    navigate(`/payment/package/${id}`);
  }
};

  if (loading) return <p className="text-center py-20">Loading...</p>;

  return (
    <section className="bg-[#FBF9F4] min-h-screen pt-28 px-5 md:px-20">

      {/* TOP SECTION */}
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* IMAGE */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src={pkg?.coverImage}
            alt={pkg?.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col gap-5">

          <h1 className="lg:text-3xl text-2xl font-bold text-gray-900">
            {pkg?.title}
          </h1>

          <p className="text-gray-600 text-sm">
            {pkg?.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <GrChapterAdd /> {courses.length} Courses
            </span>
          </div>

          {/* PRICE */}
          <div className="text-2xl font-bold text-indigo-600">
            ₹{pkg?.packagePrice}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleAction}
            className={`px-6 py-2 rounded-full text-white font-semibold transition
              ${isPurchased
                ? "bg-green-500"
                : "bg-gradient-to-r from-indigo-600 to-purple-600"
              }`}
          >
           {isPurchased ? "Purchased ✅" : "Buy Now"}
          </button>
        </div>
      </div>

      {/* COURSES LIST */}
      <div className="mt-14">
        <h2 className="text-2xl font-bold mb-6">Courses Included</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={course?.thumbnail}
                className="h-40 w-full object-cover rounded"
              />

              <h3 className="font-semibold mt-2">
                {course?.title}
              </h3>

              <button
                onClick={() =>
                  isPurchased
                    ? navigate(`/course/${course._id}`)
                    : toast.info("Please buy package first 🔒")
                }
                className="mt-2 w-full bg-indigo-600 text-white py-1 rounded"
              >
                {isPurchased ? "View Course" : "Locked 🔒"}
              </button>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default PackageDetail;