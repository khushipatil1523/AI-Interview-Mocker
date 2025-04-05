"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MockInterview } from "@/utils/schema";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Interview() {
  const params = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setwebCamEnabled] = useState(false);

  useEffect(() => {
    console.log("Interview ID:", params?.InterviewId);
    if (params?.InterviewId) {
      GetInterviewDetails();
    } else {
      console.error("Interview ID is undefined!");
    }
  }, [params]);

  /** Fetch interview details */
  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params?.InterviewId));

      console.log("Fetched Interview Data:", result);

      if (result.length > 0) {
        setInterviewData(result[0]);
      } else {
        console.warn("No interview data found!");
        setInterviewData(null);
      }
    } catch (error) {
      console.error("Error fetching interview data:", error);
      setInterviewData(null);
    }
  };

  return (
    <div className="mt-16 mb-12 flex justify-center flex-col items-center w-full">
      <h2 className="font-bold text-2xl mb-10">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl px-4">
        <div className="flex flex-col gap-8 w-full mt-4">
          {interviewData ? (
            <div className="flex flex-col gap-5 p-6 rounded-lg border w-full min-h-[200px] mt-2">
              <h2 className="text-lg">
                <strong>Job Role/Job Position:</strong>{" "}
                {interviewData.jobPosition}
              </h2>
              <h2 className="text-lg">
                <strong>Job Description/Tech stack:</strong>{" "}
                {interviewData.jobDec}
              </h2>
              <h2 className="text-lg">
                <strong>Years of Experience:</strong>{" "}
                {interviewData.jobExperience}
              </h2>
            </div>
          ) : (
            <div className="flex flex-col gap-5 p-6 rounded-lg border w-full min-h-[200px] mt-2">
              <h2 className="text-lg">
                <strong>Job Role/Job Position:</strong> full stack developer
              </h2>
              <h2 className="text-lg">
                <strong>Job Description/Tech stack:</strong> react,angular,node
              </h2>
              <h2 className="text-lg">
                <strong>Years of Experience:</strong> 4
              </h2>
            </div>
          )}

          <div className="p-6 border rounded-lg border-yellow-300 bg-yellow-50 w-full min-h-[150px] mt-2">
            <h2 className="flex gap-2 items-center mb-3">
              <Lightbulb className="text-yellow-600" />
              <strong>Information</strong>
            </h2>
            <p className="text-base">
              Enable Video Web Cam and Microphone to start your AI Generator
              Mock Interview, It Has 5 question which you can answer and at the
              last you will get the report on the basis of your answer. NOTE: We
              never record your video, web cam access you can disable at any
              time if you want
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full h-full">
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setwebCamEnabled(true)}
              onUserMediaError={() => setwebCamEnabled(false)}
              mirrored={true}
              style={{ height: 300, width: 300 }}
            />
          ) : (
            <>
              <WebcamIcon className="h-76 w-full my-7 p-20 bg-secondary rounded-lg border" />

              <Button
                variant="ghost"
                className="w-full py-2 border border-gray-300 hover:bg-gray-100 transition"
                onClick={() => setwebCamEnabled(true)}
              >
                Enable Web Cam and Microphone
              </Button>

            </>
          )}
          <Link
                href={`/dashboard/interview/${params?.InterviewId}/start`}
                passHref
                className="w-full"
              >
                <Button className="w-full mt-3">Start An Interview</Button>
              </Link>
        </div>
      </div>
    </div>
  );
}

export default Interview;
