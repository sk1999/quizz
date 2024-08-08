import { cn } from '@/lib/utils';
import clsx from 'clsx';
import React from 'react'

type Props = {
    isCrt : boolean | null | undefined,
    correctAns : string | undefined
}

const ResultCard = (props : Props) => {

    const { isCrt } = props;

    if(isCrt === null){
        return null
    }

    const text = isCrt ? 'Correct!' : 'Incorrect! The correct answer is:' + props.correctAns;

    const borderClasses = clsx({
        'border-green-500': isCrt,
        'border-red-500': !isCrt
    });

  return(
    <div className={cn(
        borderClasses,
        "border-2",
        "rounded-lg",
        "p-4",
        "text-center",
        "text-lg",
        "font-semibold",
        "my-4",
        "bg-secondary"
    )}>
      {text}
    </div>
  )
}

export default ResultCard
