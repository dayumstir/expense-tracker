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
      return <LuPizza />;
    case "Travel":
      return <LuPlane />;
    case "Entertainment":
      return <LuPartyPopper />;
    case "Fashion":
      return <LuShirt />;
    case "Sports":
      return <IoBasketballOutline />;
    case "Healthcare":
      return <LuHeart />;
    case "Gifts":
      return <LuGift />;
    default:
      return <LuWrench />;
  }
}
