import { useState } from "react";
import { RxHome, RxPlusCircled, RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

type IconType = typeof RxHome;
type ClickEvent = React.MouseEvent<HTMLAnchorElement>;

interface NavIconProps {
  icon: IconType;
  url: string;
  name: string;
}

export default function nav() {
  const [active, setActive] = useState(window.location.pathname);

  const handleClick = (event: ClickEvent) => {
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
      <NavIcon icon={<RxPlusCircled size={20} />} url="/add" name="Add" />
      <NavIcon
        icon={<RxHamburgerMenu size={20} />}
        url="/settings"
        name="Settings"
      />
    </nav>
  );
}
