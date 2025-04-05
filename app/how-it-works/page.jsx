  "use client";

import { useState } from "react";
import { PlayCircle, CheckCircle, Mic, FileText, Star, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { id: 1, title: "Login & Authentication", description: "Sign in using Clerk Auth to access the dashboard.", icon: <CheckCircle className="h-8 w-8 text-blue-500" /> },
  { id: 2, title: "Create Interview", description: "Enter job details to generate AI-powered interview questions.", icon: <FileText className="h-8 w-8 text-green-500" /> },
  { id: 3, title: "Start Interview", description: "Click start to begin answering AI-generated questions.", icon: <PlayCircle className="h-8 w-8 text-purple-500" /> },
  { id: 4, title: "Record Answers", description: "Answer each question while the system records your response.", icon: <Mic className="h-8 w-8 text-red-500" /> },
  { id: 5, title: "AI Feedback & Analysis", description: "Receive feedback and ratings on your answers.", icon: <Star className="h-8 w-8 text-yellow-500" /> },
  { id: 6, title: "View Results", description: "Access a detailed breakdown of your interview performance.", icon: <CheckCircle className="h-8 w-8 text-blue-500" /> },
];

export default function HowItWorksPage() {


  return (
    <div className={` min-h-screen py-10 px-6`}>
      {/* Header */}
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">How It Works</h1>
      </div>

      {/* Steps Section */}
      <div className="mt-8 max-w-4xl mx-auto grid gap-6">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center gap-4 p-4 border rounded-lg shadow-md bg-opacity-80 bg-white dark:bg-gray-800">
            <div>{step.icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
