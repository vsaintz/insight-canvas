import { Link } from "react-router-dom"

const Navigation = ({ showNav }) => {
  if (!showNav) return null

  return (
    <header className="flex justify-between items-center p-5 px-10">
      <div>
        <strong>Insight Canvas</strong>
      </div>
      <nav>
        <Link
          to="/"
          className="ml-5 no-underline text-base hover:underline"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="ml-5 no-underline text-base hover:underline"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="ml-5 no-underline text-base hover:underline"
        >
          Contact
        </Link>
      </nav>
    </header>
  )
}

export default Navigation
