import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function InterviewItemCard({ interview }) {
    const router=useRouter();
    const onStart=()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }
    const onFeedBackPress=()=>{
        router.push('/dashboard/interview/'+interview.mockId+"/feedback")
    }
  return (
    <div className="border shadow-sm rounded-lg p-3">
<h2 className="font-bold text-[#5B50E6]">{interview?.jobPosition}</h2>
<h2 className="text-sm text-gray-600">
        {interview?.jobExperience} Years of Experience
      </h2>
      <h2 className="text-xs text-gray-400">
        Created At:{interview.createdAt}
      </h2>
      <div className="max-w-sm mx-auto">
  <div className="flex justify-between mt-2 gap-5">
    <Button size="sm" variant="outline" className="w-1/2" onClick={onFeedBackPress}>
      Feedback
    </Button>
    <Button size="sm" className="bg-[#5B50E6] text-white hover:bg--700 w-1/2" onClick={onStart}>
      Start
    </Button>
  </div>
</div>

    </div>
  );
}

export default InterviewItemCard;
