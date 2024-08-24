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
  classStyle,
  path,
}: ButtonSidebarProps) {
  return (
    <Link to={path}>
      <li>
        <button
          className={`${classStyle} hover:bg-background-black hover:rounded-full`}
        >
          {children}
          {name}
        </button>
      </li>
    </Link>
  );
}
