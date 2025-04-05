"use client";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Mic, StopCircle, User } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import moment from "moment";

function RecordAnswerSection({
  mockInterviewQuestion = [],
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  useEffect(() => {
    if (results.length > 0) {
      setUserAnswer(results.map((result) => result.transcript).join(" "));
    }
  }, [results]);

  useEffect(()=>{
    if(!isRecording && userAnswer.length>10){
      UpdateUserAnswer(); 
    }
  },[userAnswer])

  const StartStopRecording = async () => {
    if (isRecording) {
      
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async() => {
    console.log(userAnswer);
    setLoading(true);

    const feedbackPrompt =
    "Question:" +
    mockInterviewQuestion[activeQuestionIndex]?.question +
    ",User Answer:" +
    userAnswer +
    ", Depends on question and user answer for given interview question" +
    "please give us rating for answer and feedback as area of improvement if any" +
    "in just 3 lines to improve it in JSON format with rating field and feedback field";

  const result = await chatSession.sendMessage(feedbackPrompt);
  const responseText = await result.response.text();
  const mockJsonResp = responseText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  console.log(mockJsonResp);
  const JsonFeedbackResp = JSON.parse(mockJsonResp);
    console.log(JsonFeedbackResp)
  const resp = await db.insert(UserAnswer).values({
    mockIdRef: interviewData?.mockId,
    question: mockInterviewQuestion[activeQuestionIndex]?.question,
    correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
    userAns: userAnswer,
    feedback: JsonFeedbackResp?.feedback,
    rating: JsonFeedbackResp?.rating,
    userEmail: user?.primaryEmailAddress.emailAddress,
    createdAt: moment().format("DD-MM-YYYY"),
  });
  if (resp) {
    toast("User answer recorded successfully");
    setUserAnswer('');
    setResults([]);
  }
  setResults([]);
  setLoading(false);
  };
  return (
    <div className=" flex items-center justify-center flex-col">
      <div className="flex flex-col  mt-20 justify-center items-center bg-black rounded-lg p-5">
        <Image
          src="/image1.png"
          width={200}
          height={200}
          className="absolute"
          alt="webcam image"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        disable={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircle />
            Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
