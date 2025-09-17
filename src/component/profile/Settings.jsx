import React, { useEffect, useState } from "react";
import axios from "axios";

function Settings() {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // ✅ Corrected handleChange
  const handleChange = (e) => {
    const { name, value: val } = e.target;
    setValue((prev) => ({ ...prev, [name]: val }));
  };

  // ✅ Submit updated address
 const handleSubmit = async () => {
  try {
    setUpdating(true);
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URI}/api/update-address`,
      { address: value.address },
      { headers }
    );

    setMessage({
      type: "success",
      text: response.data?.message || "Address updated",
    });

    if (response.data?.user) {
      setProfileData(response.data.user);
      setValue({ address: response.data.user.address || "" });
    }
  } catch (error) {
    console.error("update-address error:", error);
    setMessage({
      type: "error",
      text: error.response?.data?.message || "Failed to update address",
    });
  } finally {
    setUpdating(false);
  }
};


  // ✅ Fetch profile info
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/get-user-information`,
          { headers }
        );
        const user = response.data;    
        setProfileData(user);
        setValue({ address: user?.address || "" });
      } catch (error) {
        console.error("fetchProfile error:", error);
        setMessage({
          type: "error",
          text:
            error.response?.data?.message ||
            error.response?.data?.message ||
            "Failed to load profile data",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-5xl text-gray-800 font-bold mb-8">
        Settings
      </h1>

      {/* Message Alert */}
      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Profile Info Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        <div>
          <label className="text-sm text-gray-500">Username</label>
          <p className="p-2 px-4 rounded bg-gray-100 font-semibold text-gray-800">
            {profileData?.username}
          </p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Email</label>
          <p className="p-2 px-4 rounded bg-gray-100 font-semibold text-gray-800">
            {profileData?.email}
          </p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Current Address</label>
          <p className="p-2 px-4 rounded bg-gray-100 font-semibold text-gray-800">
            {profileData?.address}
          </p>
        </div>
      </div>

      {/* Update Address */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
        <label className="text-sm text-gray-600 font-medium">New Address</label>
        <textarea
          className="w-full mt-2 p-3 border rounded-lg bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
          rows="4"
          placeholder="Enter your new address..."
          name="address"
          value={value.address}
          onChange={handleChange}
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={updating}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              updating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
          >
            {updating ? "Updating..." : "Update Address"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
