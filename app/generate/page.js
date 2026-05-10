"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [handle, setHandle] = useState(searchParams.get("handle") || "");
  const [pic, setPic] = useState("");
  const [desc, setDesc] = useState("");
  const [createdHandle, setCreatedHandle] = useState("");
  const [loading, setLoading] = useState(false); // ✅ added state for button loading

  const handleChange = (index, link, linktext) => {
    setLinks((prevLinks) =>
      prevLinks.map((item, i) => (i === index ? { link, linktext } : item))
    );
  };

  const addLink = () => setLinks([...links, { link: "", linktext: "" }]);

  const normalizeHandle = (value) => value.trim().toLowerCase();

  const submitLink = async () => {
    const normalizedHandle = normalizeHandle(handle);
    if (!normalizedHandle) {
      toast.error("Please choose a handle before submitting.");
      return;
    }

    setLoading(true);
    try {
      const myHeader = new Headers();
      myHeader.append("Content-Type", "application/json");

      const raw = JSON.stringify({ links, handle: normalizedHandle, pic, desc });

      const response = await fetch("/api/add", {
        method: "POST",
        headers: myHeader,
        body: raw,
        redirect: "follow",
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        setCreatedHandle(normalizedHandle);
        setLinks([{ link: "", linktext: "" }]);
        setPic("");
        setDesc("");
        setHandle("");
      } else {
        toast.error(result.message || "Handle already exists. Try another one.");
      }
    } catch (err) {
      toast.error("Server error. Please try again later.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-[#E9C0E9] ">
      {/* Left Column - Form */}
      <div className="flex flex-col  items-center px-6 mt-32 text-gray-900">
        <div className="w-full max-w-lg">
          <h1 className="font-extrabold text-3xl  my-6">
            Create your LinkHub
          </h1>

          {/* Step 1 */}
          <h2 className="font-bold text-2xl my-4">Step 1: Claim your Handle</h2>
          <input
            type="text"
            placeholder="Choose a Handle"
            value={handle}
            onChange={(e) => {
              setHandle(e.target.value);
              setCreatedHandle("");
            }}
            className="bg-gray-50 text-gray-800 px-6 rounded-full py-3 w-full focus:outline-pink-500"
          />

          {/* Step 2 */}
          <h2 className="font-bold text-2xl my-5">Step 2: Add Links</h2>
          {links.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-3 mt-3">
              <input
                type="text"
                placeholder="Enter link text"
                value={item.linktext}
                onChange={(e) =>
                  handleChange(index, item.link, e.target.value)
                }
                className="bg-gray-50 text-gray-800 px-6 rounded-full py-3 flex-1 focus:outline-pink-500"
              />
              <input
                type="text"
                placeholder="Enter link"
                value={item.link}
                onChange={(e) =>
                  handleChange(index, e.target.value, item.linktext)
                }
                className="bg-gray-50 text-gray-800 px-6 rounded-full py-3 flex-1 focus:outline-pink-500"
              />
            </div>
          ))}
          <button
            onClick={addLink}
            className="px-4 py-2 my-4 bg-black text-white rounded-full text-lg hover:bg-gray-800 transition"
          >
            ➕ Add Link
          </button>

          {/* Step 3 */}
          <h2 className="font-bold text-2xl my-5">
            Step 3: Add Picture and Description
          </h2>
          <input
            type="text"
            value={pic}
            onChange={(e) => setPic(e.target.value)}
            placeholder="Enter Link to your picture"
            className="bg-gray-50 text-gray-800 px-6 rounded-full py-3 w-full focus:outline-pink-500"
          />
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter description"
            className="bg-gray-50 text-gray-800 px-6 rounded-full py-3 w-full focus:outline-pink-500 mt-3"
          />
          <button
            disabled={
              loading ||
              !pic.trim() ||
              !handle.trim() ||
              !links[0].linktext.trim()
            }
            onClick={submitLink}
            className={`mt-4 w-full py-3 text-xl rounded-3xl text-white transition ${
              loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-slate-900 hover:bg-slate-800"
            }`}
          >
            {loading ? "Creating..." : "Create your Lynkbit"}
          </button>

          {createdHandle && (
            <button
              type="button"
              onClick={() => router.push(`/show/${createdHandle}`)}
              className="mt-4 w-full py-3 text-xl rounded-3xl text-black bg-yellow-300 hover:bg-yellow-400 transition"
            >
              View created handler
            </button>
          )}
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="hidden md:flex justify-center items-center">
        <img
          src="./generate.png"
          className="h-[80%] object-contain"
          alt="Preview"
        />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Page;
