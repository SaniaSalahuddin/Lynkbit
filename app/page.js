"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const router=useRouter();
  const[text,setText]=useState("");
  const[loading, setLoading]=useState(false);

  const createTree=async()=>{
    if (!text.trim()) {
      toast.error("Please enter a handle");
      return;
    }

    setLoading(true);
    try {
      const normalizedHandle = text.trim().toLowerCase();
      const response = await fetch("/api/check-handle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle: normalizedHandle }),
      });

      const result = await response.json();

      if (result.exists) {
        // Handle already exists, go to show page
        router.push(`/show/${normalizedHandle}`);
      } else {
        // Handle doesn't exist, go to generate page
        router.push(`/generate?handle=${normalizedHandle}`);
      }
    } catch (err) {
      toast.error("Error checking handle. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
    <main>
    <section className="min-h-screen w-full bg-[#244f1a]">
      <div className="grid lg:grid-cols-2">
        <div className="pt-72 text-7xl font-black text-[#d0e920] pl-[15%]">
          <p>
            Everything you</p>
           <p> are. In one,</p>
           <p> simple link in</p>
            <p>bio.
          </p>
          <div className="input flex gap-2 pt-10">
        <input value={text} onChange={(e)=> setText(e.target.value)} className="px-3 py-2 focus:outline-green-800 hover:bg-green-200 duration-150  bg-gray-100 rounded-md text-xl text-gray-950" type="text" placeholder="Enter your Handle" />
        <button onClick={()=> createTree()} disabled={loading} className="bg-pink-300 rounded-full px-5 py-4 hover:bg-pink-400 duration-150 font-semibold text-xl  text-black disabled:bg-gray-400 disabled:cursor-not-allowed">{loading ? "Checking..." : "Claim your Lynkbit"}</button>
      </div>
        </div>
        <div className="pt-20">
          <img src="./home.png"/>
        </div>
      </div>
    </section>
    <section></section>
    </main>
    <ToastContainer />
   </>
  );
}
