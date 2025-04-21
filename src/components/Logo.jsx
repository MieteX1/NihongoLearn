import { Link } from "react-router-dom";

export default function Logo({ to = "/menu", className = "" }) {
  return (
    <Link to={to}>
      <h1 className={`text-3xl font-bold cursor-pointer audiowide ${className}`}>
        Nihongo Learn
      </h1>
    </Link>
  );
}
