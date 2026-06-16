import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/endpoints";
import BottomNav from "../components/shared/BottomNav";
import Greetings from "../components/home/Greetings";
import MiniCard from "../components/home/MiniCard";
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import RecentOrders from "../components/home/RecentOrders";
import PopularDishes from "../components/home/PopularDishes";
import FullScreenLoader from "../components/shared/FullScreenLoader";

const Home = () => {
  const { data: ordersRes, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  if (isLoading) return <FullScreenLoader />;

  const ordersList = ordersRes?.data?.data || [];

  // Calculate total earnings from Completed orders
  const totalEarnings = ordersList
    .filter((ord) => ord.orderStatus?.toLowerCase() === "completed")
    .reduce((sum, ord) => sum + (ord.bills?.totalWithTax || 0), 0);

  // Calculate in progress orders
  const inProgressCount = ordersList.filter(
    (ord) =>
      ord.orderStatus?.toLowerCase() === "preparing" ||
      ord.orderStatus?.toLowerCase() === "progress" ||
      ord.orderStatus?.toLowerCase() === "pending"
  ).length;

  // Get the 6 most recent orders (newest first)
  const recentOrders = [...ordersList]
    .sort((a, b) => new Date(b.createdAt || b.orderDate) - new Date(a.createdAt || a.orderDate))
    .slice(0, 6);

  return (
    <section className="bg-bg-primary min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row pb-28">
      {/* Left Div */}
      <div className="w-full lg:w-[60%] xl:w-[65%] flex flex-col">
        <Greetings />
        <div className="flex flex-col sm:flex-row items-center w-full gap-3 px-6 md:px-8 mt-4">
          <MiniCard
            title="Total Earnings"
            icon={<BsCashCoin />}
            number={parseFloat(totalEarnings.toFixed(2))}
            footerNum={1.6}
          />
          <MiniCard
            title="In Progress"
            icon={<GrInProgress />}
            number={inProgressCount}
            footerNum={3.6}
          />
        </div>

        <RecentOrders orders={recentOrders} />
      </div>

      {/* Right Div */}
      <div className="w-full lg:w-[40%] xl:w-[35%]">
        <PopularDishes />
      </div>
      <BottomNav />
    </section>
  );
};

export default Home;
