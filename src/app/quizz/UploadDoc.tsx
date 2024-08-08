"use client"
import {  useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const UploadDoc = () => {

    const [document, setDocument] = useState<Blob | File | null | undefined>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!document){
            setIsError("Please select a file to upload")
            return;
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append('pdf', document as Blob);
        try{
            const res = await fetch("/api/auth/quizz/generate",{
                method: "POST",
                body: formData
            })
            if(res.status === 201){
                const data = await res.json();
                const quizzId = data.quizzId;
                router.push(`/quizz/${quizzId}`)
            }
        }
        catch(e){
            console.log(e)
        }
        setIsLoading(false);
        console.log(formData);
    }

  return (
    <div className="w-full">
        {isLoading ? <p>Loading...</p> : <form className="w-full" onSubmit={handleSubmit}>
            <label htmlFor="document" className="bg-secondary w-full flex h-20 rounded-md border-4 border-dashed border-blue-900 relative">
                <div className="absolute inset-0 m-auto flex justify-center items-center">
                    {(document && document?.name) ? document.name : `Drag and Drop your File.`}
                </div>
                <input className="relative block w-full h-full z-50 opacity-0" onChange={(e)=>{ setDocument(e?.target?.files?.[0])}} type="file" id="document"/>
            </label>
            {isError ? <p className="text-red-500">{isError}</p> : null}
            <Button size="lg" className="mt-2" type="submit">Generate Quizz</Button>

        </form>}
    </div>
  )
}

export default UploadDoc
