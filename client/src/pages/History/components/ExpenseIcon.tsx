import {
  LuPizza,
  LuPlane,
  LuPartyPopper,
  LuHeart,
  LuGift,
  LuShirt,
  LuWrench,
} from "react-icons/lu";
import { IoBasketballOutline } from "react-icons/io5";

type ExpenseIconProps = {
  category: string;
};

export default function ExpenseIcon({ category }: ExpenseIconProps) {
  switch (category) {
    case "Food":
      return <LuPizza size={20} className="text-secondary" />;
    case "Travel":
      return <LuPlane size={20} className="text-secondary" />;
    case "Entertainment":
      return <LuPartyPopper size={20} className="text-secondary" />;
    case "Fashion":
      return <LuShirt size={20} className="text-secondary" />;
    case "Sports":
      return <IoBasketballOutline size={20} className="text-secondary" />;
    case "Healthcare":
      return <LuHeart size={20} className="text-secondary" />;
    case "Gifts":
      return <LuGift size={20} className="text-secondary" />;
    default:
      return <LuWrench size={20} className="text-secondary" />;
  }
}
