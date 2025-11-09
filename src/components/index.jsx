import { MoveRight, Files } from "lucide-react"
import { useNavigate } from "react-router-dom"

import Button from "@/components/ui/button"
import HeaderImage from "@/assets/images/8CA2B134-A00A-41C5-97CE-359EC5E02889.png"

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <main className="flex flex-col items-center justify-center">
      <header className="flex flex-col items-center gap-10 py-10 px-2">
        <div className="flex flex-col items-center sm:flex-row">
          <Button label="Version 1.0" textColor="text-black" bgColor="bg-white" className="text-sm py-1 w-fit" />
          <Button label="What's new in the latest version" RightIcon={MoveRight} textColor="text-white" bgColor="bg-transparent" className="text-sm py-1 px-1 sm:px-3 underline underline-offset-2 w-fit" />
        </div>

        <div className='flex flex-col text-center gap-2'>
          <p className='text-sm font-bold'>Insight Canvas</p>
          <p className='text-4xl sm:text-6xl'>A free and open source <br /> data visualization</p>
          <p className='text-sm sm:text-md font-medium mt-3'>Simplify your data analysis with our clean and intuitive tools designed for clarity and efficiency.</p>
        </div>

        <div className='flex gap-3 mt-5'>
          <Button
            label="Dashboard"
            textColor="text-black hover:underline"
            onClick={() => navigate("/dashboard")}
            bgColor="bg-white"
            className="rounded-none"
          />
          <Button
            LeftIcon={Files}
            label="Learn more"
            textColor="text-white hover:underline"
            bgColor="transparent"
          />
        </div>
      </header>

      <div className="px-4 sm:px-10 md:px-20 lg:px-40 mb-10 flex justify-center">
        <img
          src={HeaderImage}
          alt="Header"
          className="w-full max-w-7xl border border-border object-contain"
        />
      </div>
    </main>
  )
}
