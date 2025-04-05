'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

function Feedback() {
  const router = useRouter();
  const params = useParams();
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    if (!params.InterviewId) {
      console.warn("InterviewId not found in URL params");
      return;
    }

    const fetchFeedback = async () => {
      await GetFeedback();
    };

    fetchFeedback();
  }, [params]);

  const GetFeedback = async () => {
    const interviewId = params.InterviewId;
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id);

    console.log('Feedback Data:', result);
    setFeedbackList(result);
  };

  return (
    <div className="p-10">
      

      {feedbackList?.length === 0 ? (
        <h2 className="bold">No Interview FeedBack Record Found</h2>
      ) : (
        <>
        <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
      <h2 className="font-bold text-2xl my-3">
        Here is your interview feedback
      </h2>
          <h2 className="text-primary text-lg my-3">
            Your overall interview rating: <strong>7/10</strong>
          </h2>
          <h2 className="text-sm text-gray-500">
            Find below interview questions with correct answer, your answer, and feedback for improvement
          </h2>

          {feedbackList.map((item, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger className="p-2 bg-secondary flex justify-between rounded-lg my-10 text-left gap-7 w-full">
                {item.question}
                <ChevronsUpDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="text-red-500 p-2 border rounded-lg">
                    <strong>Rating:</strong> {item.rating}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                    <strong>Your Answer: </strong> {item.userAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                    <strong>Correct Answer: </strong> {item.correctAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-900">
                    <strong>Feedback: </strong> {item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}

      <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
    </div>
  );
}

export default Feedback;
