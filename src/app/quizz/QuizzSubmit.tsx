import React,{ useEffect} from 'react'
import Bar from '@/components/ui/bar';
import Image from 'next/image';
import {useReward} from "react-rewards"
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from 'next/navigation';

type Props = {
    scrPer : number,
    score : number,
    totalQues : number
}


const QuizzSubmit = (props : Props) => {
    const {scrPer, score, totalQues} = props;

    const { reward } = useReward('rewardId', 'confetti')

    const router = useRouter();

    useEffect(()=>{
        if(scrPer === 100){
            reward();
        }
    }, [scrPer, reward])

    const handleExit = () => {
      router.back();
    }


  return (
    <div className='flex flex-col flex-1'>
      <div className="position-sticky top-0 z-10 shadow-md py-4 w-full">
        <header className="grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-end py-2 gap-2">
          <Button size="icon" variant="outline" onClick={handleExit}>
            <X />
          </Button>
        </header>
      </div>
      <main className='py-11 flex flex-col gap-4 items-center flex-1 mt-24'>
        <h2 className='text-3xl font-bold'>Quizz Completed!</h2>
        <p>You scored: {scrPer}%</p>
        {
        scrPer === 100 ?
        <div>
            <p className='flex flex-col items-center'>Congratulations!</p>
            <div className='flex justify-center'>
                <Image src="/images/owl-smiling.png" alt="Smiling Owl Image" height={400} width={400}/>
            </div>
            <span id="rewardId"/>
        </div> :
        <>
        <div className='flex flex-row gap-8 mt-6'>
            <Bar percentage={scrPer} color='green'/>
            <Bar percentage={100 - scrPer} color='red'/>
        </div>
        <div className='flex flex-row gap-8'>
            <p>{score} Correct</p>
            <p>{totalQues - score} Incorrect</p>
        </div>
        </>
        }
      </main>
    </div>
  )
}

export default QuizzSubmit
