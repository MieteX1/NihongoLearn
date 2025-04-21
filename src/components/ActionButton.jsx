import { Link } from "react-router-dom";

export default function ActionButton({ to, text, color = "btn-pink", add }) {
  return (
    <Link
      to={to}
      className={`btn-m1 ${color} text-lg px-8 py-2 text-white relative inline-block ${add}`}
    >
      {text}
    </Link>
  );
}