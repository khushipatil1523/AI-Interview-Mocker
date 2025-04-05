"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle, PlayCircle, LogIn, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <div className="text-black min-h-screen bg-white">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 max-w-5xl mx-auto bg-white">
        <h1 className="text-4xl md:text-6xl font-bold text-black">
          AI-Powered <span className="text-[#5B50E6]">Mock Interviews</span>
        </h1>
        <p className="text-gray-700 mt-4 text-lg py-10">
          Ace your next interview with real-time AI feedback, personalized
          insights, and powerful improvement tips — all in one smart platform
          designed to boost your confidence and performance.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Button
            className="bg-[#5B50E6] hover:bg-[#4a42c9] text-white px-6 py-3 rounded-lg shadow-md"
            onClick={() => router.push("/dashboard")}
          >
            <LogIn className="mr-2 h-5 w-5" /> Go To Dashboard
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center text-black">
          Why Choose Us?
        </h2>
        <div className="mt-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
          {[
            "Real-time AI feedback",
            "Speech & tone analysis",
            "Personalized improvement tips",
            "Multiple job role interviews",
            "Save & review past interviews",
            "Interview insights & analytics",
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-4">
              <CheckCircle className="h-6 w-6 text-[#5B50E6]" />
              <p className="text-lg">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 text-center bg-white">
        <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
        <div className="mt-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: "Sarah M.",
              feedback:
                "This AI mock interview tool helped me land my dream job!",
            },
            {
              name: "John D.",
              feedback: "The feedback was spot on and helped me improve a lot.",
            },
            {
              name: "Priya R.",
              feedback:
                "I loved how simple and intuitive the experience was. Highly recommend it!",
            },
            {
              name: "Carlos T.",
              feedback:
                "Great tool for preparing for behavioral and technical interviews alike.",
            },
            {
              name: "Emily W.",
              feedback:
                "Having real-time AI suggestions changed how I approach interviews!",
            },
            {
              name: "Ankit S.",
              feedback:
                "Finally, a smart way to prepare for interviews. Super impressed with the insights.",
            },
          ].map((review, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 rounded-lg shadow-md text-left"
            >
              <p className="text-lg italic text-gray-700">
                "{review.feedback}"
              </p>
              <p className="mt-3 font-semibold text-gray-900">
                - {review.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 text-center text-gray-600">
        <p>© 2025 AI Interview Mocker. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="hover:text-[#5B50E6]">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[#5B50E6]">
            Terms of Service
          </a>
          <a href="#" className="hover:text-[#5B50E6]">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}
