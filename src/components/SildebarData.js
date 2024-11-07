import { FaHome, FaThList } from "react-icons/fa";
import { MdOutlineAdd, MdHorizontalRule } from "react-icons/md";
import { BsCartCheckFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

const SidebarData = [
  {
    id: 0,
    icon: <FaHome />,
    route: "/",
    title: "Dashboard",
  },
  {
    id: 1,
    icon: <FaThList />,
    route: "/product-list",
    title: "ProductList",
  },
  {
    id: 2,
    icon: <MdOutlineAdd />,
    route: "/add-product",
    title: "Add Product",
  },
  {
    id: 3,
    icon: <BsCartCheckFill />,
    route: "/order",
    title: "Order",
  },
  {
    id: 4,
    icon: <FaUser />,
    route: "/user",
    title: "User",
  },
];
const PruductData = [
  {
    title: "oil",
    description: "Engin Oil",
    count: 5,
    addicon: <MdOutlineAdd />,
    minusicon: <MdHorizontalRule />,
  },
];
export { PruductData, SidebarData };
