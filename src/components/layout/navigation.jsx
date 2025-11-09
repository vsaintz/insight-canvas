import { Link } from "react-router-dom"
import Logo from "@/logo"

const Navigation = () => {

  return (
    <header className="flex justify-between w-full items-center p-5 sm:pr-10 mb-10">
      <div>
        <Link
          to="/"
          className='flex items-center gap-2'>
          <Logo /> <strong className='hidden sm:block'>Insight Canvas</strong>
        </Link>
      </div>
      <nav className='flex gap-5 items-center'>
        <Link
          to="/"
          className="font-medium no-underline hover:underline"
        >
          SignIn
        </Link>
        <Link
          to="/"
          className="no-underline font-medium text-black bg-white rounded-md px-3 py-1 hover:underline"
        >
          SignUp
        </Link>
      </nav>
    </header>
  )
}

export default Navigation
