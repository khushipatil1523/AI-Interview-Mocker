"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import {v4 as uuidv4} from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/utils/db";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [JobPosition, setJobPosition] = useState("");
  const [JobDesc, setJobDesc] = useState("");
  const [JobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse,setJsonResponse]=useState([]);
  const router=useRouter();
  const {user}=useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(JobPosition, JobDesc, JobExperience);
  
    const InputPrompt = `Job position: ${JobPosition}, Job Description: ${JobDesc}, Years of Experience: ${JobExperience}. Based on these details, provide ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with answers in JSON format.`;
  
    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const responseText = await result.response.text();
  
      const MockJsonResp = responseText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
  
      let parsedData;
      try {
        parsedData = JSON.parse(MockJsonResp);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return;
      }
  
      console.log(parsedData);
      setJsonResponse(parsedData);
  
      if (parsedData) {
        const resp = await db.insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: MockJsonResp,
            jobPosition: JobPosition,
            jobDec: JobDesc,
            jobExperience: JobExperience,
            createdBy: user?.primaryEmailAddress.emailAddress,
            createdAt: moment().format('DD-MM-YYYY'),
          })
          .returning({ mockId: MockInterview.mockId });
  
        console.log("Inserted ID", resp);
        if(resp){
          setOpenDialog(false);
          router.push('/dashboard/interview/'+resp[0]?.mockId)
        }
      }
    } catch (error) {
      console.error("Error processing response:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="!w-full !max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about the job you are interviewing for
            </DialogTitle>
            <DialogDescription>
              Add details about your job position/role, job description, and
              years of experience.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mt-7 my-3">Job Role/Job Position</label>
              <Input
                placeholder="Ex. Full Stack Developer"
                required
                value={JobPosition}
                onChange={(event) => setJobPosition(event.target.value)}
              />
            </div>

            <div className="my-3">
              <label>Job Description/ Tech Stack (In Short)</label>
              <Textarea
                placeholder="Ex. React, Angular, Node.js, MySQL, etc."
                required
                value={JobDesc}
                onChange={(event) => setJobDesc(event.target.value)}
              />
            </div>

            <div className="my-3">
              <label>Years of Experience</label>
              <Input
                placeholder="Ex. 5"
                type="number"
                max="35"
                required
                value={JobExperience}
                onChange={(event) => setJobExperience(event.target.value)}
              />
            </div>

            <div className="flex justify-end gap-5">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Generating from
                    AI...
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
