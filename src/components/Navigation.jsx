import { Link } from "react-router-dom";

const Navigation = ({ showNav }) => {
  if (!showNav) return null; // Hide navbar when showNav is false

  return (
    <header className="flex justify-between items-center p-5 px-10">
      <div>
        <strong>Insight Canvas</strong>
      </div>
      <nav>
        <Link
          to="/"
          className="ml-5 no-underline text-base text-gray-800 hover:underline"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="ml-5 no-underline text-base text-gray-800 hover:underline"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="ml-5 no-underline text-base text-gray-800 hover:underline"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Navigation;
