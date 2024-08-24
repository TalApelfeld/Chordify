import { Link } from "react-router-dom";

interface ButtonSidebarProps {
  children?: React.ReactNode; // Explicitly typing children
  name: string;
  classStyle: string;
  path: string;
}

export default function ButtonSidebar({
  children,
  name,

  path,
}: ButtonSidebarProps) {
  return (
    <Link to={path}>
      <li>
        <button
          className={`top-button-item-container hover:bg-background-black hover:rounded-full`}
        >
          {children}
          {name}
        </button>
      </li>
    </Link>
  );
}
