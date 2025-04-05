"use client";

import { useState } from "react";
import { Search, PlayCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const interviewQuestions = [
  { id: 1, question: "Tell me about yourself.", answer: "I am a full-stack developer with experience in building high-performance web applications using React.js and Node.js. I have worked on projects like Stoxify and CozyCue, which enhanced my skills in authentication, real-time data fetching, and UI/UX optimization." },
  { id: 2, question: "Why do you want this job?", answer: "I am passionate about building scalable applications, and this role aligns with my skills in frontend and backend development. I see this opportunity as a way to contribute my expertise while continuing to grow and learn." },
  { id: 3, question: "Describe a challenging project you worked on.", answer: "One of the challenging projects I worked on was developing a remote team management tool. It involved real-time collaboration, role-based access, and optimizing API performance to handle high traffic." },
  { id: 4, question: "How do you handle stress and deadlines?", answer: "I break tasks into smaller milestones, prioritize efficiently, and maintain clear communication with the team to ensure deadlines are met while maintaining code quality." },
  { id: 5, question: "What are your strengths and weaknesses?", answer: "My strengths include problem-solving, quick learning, and attention to detail. As for weaknesses, I sometimes spend too much time refining UI details, but I’m improving my time management skills." },
  { id: 6, question: "Where do you see yourself in 5 years?", answer: "I see myself leading development teams, contributing to innovative projects, and mentoring junior developers to create impactful digital products." },
];

const appFAQs = [
  {
    question: "What is this app about?",
    answer:
      "This app helps users prepare for interviews by providing AI-generated questions and feedback on their answers.",
  },
  {
    question: "How does the interview system work?",
    answer:
      "You start an interview, record your answers, and receive AI-driven feedback based on your responses.",
  },
  {
    question: "Can I customize interview questions?",
    answer:
      "Yes, you can input job details to get tailored interview questions for your role.",
  },
  {
    question: "How is feedback generated?",
    answer:
      "We use AI models like Gemini AI to analyze answers and provide ratings with improvement suggestions.",
  },
  {
    question: "Is my interview data saved?",
    answer:
      "Yes, all your interview responses and feedback are securely stored and accessible for future reference.",
  },
];

export default function QuestionsPage() {
  const [search, setSearch] = useState("");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [openAnswer, setOpenAnswer] = useState(null);

  const filteredQuestions = interviewQuestions.filter((q) =>
    q.question.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const toggleAnswer = (id) => {
    setOpenAnswer(openAnswer === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Common Questions
      </h2>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search questions..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <div
              key={q.id}
              className="p-4 border rounded-lg shadow-sm bg-white"
            >
              <div className="flex justify-between items-center">
                <p className="text-gray-700">{q.question}</p>
                <Button 
                  className="bg-blue-600 text-white hover:bg-blue-700" 
                  onClick={() => toggleAnswer(q.id)}
                >
                  Answer
                </Button>
              </div>
              {openAnswer === q.id && (
                <p className="mt-2 text-gray-600">{q.answer}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No questions found.</p>
        )}
      </div>

      {/* FAQ Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">FAQs</h3>
        <div className="space-y-2">
          {appFAQs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left font-medium text-gray-900"
              >
                {faq.question}
                <ChevronDown
                  className={`transition-transform ${
                    openFAQ === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFAQ === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
