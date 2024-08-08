"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ui/progressBar";
import { ChevronLeft, X } from "lucide-react";
import ResultCard from "./ResultCard";
import QuizzSubmit from "./QuizzSubmit";

const questions = [
    {
        questionText : "Some random question about the subject?",
        answers : [
            {answerText : "Option 1", isCorrect : false, id : 1},
            {answerText : "Option 2", isCorrect : true, id : 2},
            {answerText : "Option 3", isCorrect : false, id : 3},
            {answerText : "Option 4", isCorrect : false, id : 4},
        ]
    },
    {
        questionText : "Some random question about the subject?",
        answers : [
            {answerText : "gfhj 1", isCorrect : false, id : 1},
            {answerText : "fcgvhgbj 2", isCorrect : true, id : 2},
            {answerText : "fcgv 3", isCorrect : false, id : 3},
            {answerText : "fvcg 4", isCorrect : false, id : 4},
        ]
    },
    {
        questionText : "Some random question about the subject?",
        answers : [
            {answerText : "fgvhb 1", isCorrect : false, id : 1},
            {answerText : "ghjhjkj 2", isCorrect : true, id : 2},
            {answerText : "hjkkj 3", isCorrect : false, id : 3},
            {answerText : "tgfyhuj 4", isCorrect : false, id : 4},
        ]
    }
    
]

export default function Home() {

    const [started, setStarted] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [selecAns, setSelecAns] = useState<number | null>(null)
    const [isCrt, setIsCrt] = useState<boolean | null>(null)
    const [submitted, setSubmitted] = useState<boolean>(false)

    const handleNext = () => {
        if(!started){
            setStarted(true);
        }

        if(started && currentQuestion < questions.length - 1){
            setCurrentQuestion(currentQuestion + 1);
        }
        else if(currentQuestion == questions.length-1){
            setSubmitted(true);
            return;
        }

        setIsCrt(null);
        setSelecAns(null);
    }

    const handleAnswer = (answer : any) => {
        setSelecAns(answer.id);
        const isCurCrt = answer.isCorrect;
        if(isCurCrt){
            setScore(score + 1);
        }
        setIsCrt(isCurCrt)
    }

    const scrPer : number = Math.round((score/questions.length)*100)

    if(submitted){
        return(
            <QuizzSubmit
            score={score}
            scrPer={scrPer}
            totalQues={questions.length}
            />
        )
    }

  return (
    <div className="flex flex-col flex-1">
        <div className="position-sticky top-0 z-10 shadow-md py-4 w-full">
            <header className="grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-between py-2 gap-2">
                <Button size="icon" variant="outline"><ChevronLeft/></Button>
                {started && <ProgressBar value={((currentQuestion+1)/questions.length)*100}/>}
                <Button size="icon" variant="outline"><X/></Button>
            </header>
        </div>
      <main className="flex justify-center flex-1">
        {!started ? <h1 className="text-3xl font-bold">Welcome to the quizz 👋</h1> : (
            <div>
                <h2 className="text-3xl font-bold">{questions[currentQuestion].questionText}</h2>
                <div className="grid grid-cols-1 gap-6 mt-6">
                   {questions[currentQuestion].answers.map((answer) => {

                    const variant = selecAns === answer.id?(answer.isCorrect ? "neoSuccess" : "neoDanger") : "neoOutline";

                    return (
                        <>
                        <Button 
                        key={answer.id} 
                        variant={variant}
                        size="xl"
                        onClick={() => handleAnswer(answer)}
                        >
                            <p className="whitespace-normal">
                            {answer.answerText}
                            </p>
                        </Button>
                        </>
                    )
                   })}
                </div>
            </div>
        )}
      </main>
      <footer className="footer pb-9 px-6 relative mb-0">
        <ResultCard isCrt={isCrt} correctAns={questions[currentQuestion].answers.find(answer=>answer.isCorrect === true)?.answerText}/>
        <Button variant="neo" size="lg" onClick={handleNext}>{!started ? 'Start' : (currentQuestion === questions.length - 1) ? 'Submit' : 'Next'}</Button>
      </footer>
    </div>
  )
}
