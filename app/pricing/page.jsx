  "use client";

import { useState } from "react";
import { CheckCircle, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for beginners who want to explore.",
    features: ["AI-powered questions", "Basic feedback", "Limited interviews"],
  },
  {
    name: "Pro",
    price: "$19/mo",
    description: "Great for job seekers and professionals.",
    features: ["Unlimited interviews", "Advanced feedback", "AI suggestions"],
  },
  {
    name: "Enterprise",
    price: "$49/mo",
    description: "Best for teams and recruiters and classes.",
    features: ["Team collaboration", "Custom AI training", "Dedicated support"],
  },
];

export default function PricingPage() {
  

  return (
    <div className={`min-h-screen py-15 px-6`}>
      {/* Header */}
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">Choose Your Plan</h1>
        
      </div>

      {/* Pricing Cards */}
      <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="p-6 border rounded-lg shadow-md transition transform hover:scale-105 bg-opacity-90 bg-white dark:bg-gray-800"
          >
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="text-2xl font-bold mt-2">{plan.price}</p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{plan.description}</p>
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="h-5 w-5 " />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="mt-6 w-full bg-[#5B50E6] text-white py-2 rounded-lg shadow-md bg-[#5B50E6] transition">
              {plan.name === "Basic" ? "Get Started" : "Subscribe"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
