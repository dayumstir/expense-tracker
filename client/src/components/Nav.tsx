import { ReactElement, useState } from "react";
import { RxHome, RxFileText, RxGear } from "react-icons/rx";
import { Link } from "react-router-dom";

type NavIconProps = {
  icon: ReactElement;
  url: string;
  name: string;
};

export default function nav() {
  const [active, setActive] = useState(window.location.pathname);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const id = event.currentTarget.id;
    setActive(id);
  };

  const NavIcon: React.FC<NavIconProps> = ({ icon, url, name }) => {
    return (
      <Link
        to={url}
        id={url}
        onClick={handleClick}
        className={`${active === url ? "text-accent" : ""}`}
      >
        {icon}
        <span className="text-xs">{name}</span>
      </Link>
    );
  };

  return (
    <nav className="btm-nav bg-base-100">
      <NavIcon icon={<RxHome size={20} />} url="/" name="Home" />
      <NavIcon icon={<RxFileText size={20} />} url="/history" name="History" />
      <NavIcon icon={<RxGear size={20} />} url="/settings" name="Settings" />
    </nav>
  );
}
