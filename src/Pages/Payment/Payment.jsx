import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Base_Url } from "../../Api/Base_Url";
import { toast } from "react-toastify";

const Payment = () => {
  const { type, id } = useParams(); // 🔥 course / webinar
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ Fetch Data (Course / Webinar)
  const getData = async () => {
    try {
      if (type === "course") {
        const res = await axios.get(`${Base_Url}/course/${id}`);
        setData(res.data.course);
      }

      if (type === "webinar") {
        const res = await axios.get(`${Base_Url}/webinars/${id}`);
        setData(res.data.data);
      }
      // ✅ NEW: PACKAGE
      if (type === "package") {
        const res = await axios.get(`${Base_Url}/packages/${id}`);
        setData(res.data.data);
      }

    } catch (err) {
      console.log(err);
      toast.error("Error loading data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // ✅ Payment Handler
  const handlePayment = async () => {
    try {
      if (!token) {
        toast.error("Please login first");
        return;
      }

      setLoading(true);

      // 🔥 Fake delay (simulate payment)
      await new Promise((res) => setTimeout(res, 1500));

      // 🎓 Course Payment
      if (type === "course") {
        await axios.post(
          `${Base_Url}/enroll`,
          { courseId: id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Course Purchased 🎉");
        navigate("/my-course");
      }

      // 🎥 Webinar Payment
      if (type === "webinar") {
        await axios.post(
          `${Base_Url}/webinars/register`,
          { webinarId: id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Webinar Registered 🎉");
        navigate("/my-webinar");
      }
      // 📦 PACKAGE PAYMENT
      if (type === "package") {
        await axios.post(
          `${Base_Url}/buy-package`,
          { package_id: id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Package Purchased 🎉");
        navigate(`/pkg/${id}`);
      }

    } catch (err) {
      console.log(err);
      toast.error("Payment failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Loading State
  if (!data) {
    return <p className="text-center py-20">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF9F4]">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-[400px] text-center">

        <h1 className="text-2xl font-bold mb-4">
          Complete Your Payment
        </h1>

        {/* Thumbnail */}
        <img
          src={data.thumbnail || data.coverImage}
          alt={data.title}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />

        {/* Title */}
        <h2 className="text-lg font-semibold">{data.title}</h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-4">
          {data.description}
        </p>

        {/* Price */}
        <p className="text-2xl font-bold text-indigo-600 mb-6">
         ₹{data.packagePrice || data.price || data.pricing?.price}
        </p>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        {/* Cancel */}
        <button
          onClick={() => navigate(-1)}
          className="mt-3 text-sm text-gray-500 underline"
        >
          Cancel
        </button>

      </div>
    </div>
  );
};

export default Payment;