import { db } from "@/db";

import { quizzes, questions, questionAnswers} from "@/db/schema";
import { eq } from 'drizzle-orm';
import QuizzQuestions from "../QuizzQuestions";

const page = async ({ params }: { params: { quizzId: string }}) => {
  const quizId = params.quizzId;
  const quizz = await db.query.quizzes.findFirst({
    where: eq(quizzes.id, parseInt(quizId)),
    with : {
      questions: {
        with: {
          answers: true
        }
      }
    }
  })

  

  if (!quizId || !quizz) {
    return <div>Quizz not found</div>
  };

  console.log(quizz.questions);

  return (
    <QuizzQuestions quizz={quizz}/>
  )
}

export default page;