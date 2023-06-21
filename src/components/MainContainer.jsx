import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";
import CartContainer from "./CartContainer";
import HomeContainer from "./HomeContainer";
import MenuContainer from "./MenuContainer";
import RowContainer from "./RowContainer";

const MainContainer = () => {
	// eslint-disable-next-line
	const [{ foodItems, cartShow }, dispatch] = useStateValue();
	const [scrollValue, setScrollValue] = useState(0);

	useEffect(() => {}, [setScrollValue]);

	return (
		<div className="w-full h-auto flex flex-col items-center justify-center">
			<HomeContainer />

			<section className="w-full m-6">
				<div className="w-full flex items-center justify-between">
					<p className="text-2xl text-headingColor font-semibold capitalize relative before:absolute before:rounded-lg before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from:orange-400 to-orange-600 before:bg-orange-500 transition-all ease-in-out duration-100">
						Our Fresh & Healthy Fruits
					</p>
					<div className="hidden md:flex gap-3 items-center">
						<motion.div
							whileTap={{ scale: 0.75 }}
							onClick={() => setScrollValue(-200)}
							className="w-8 h-9 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer hover:shadow-lg flex items-center justify-center">
							<MdChevronLeft className="text-lg text-white" />
						</motion.div>
						<motion.div
							whileTap={{ scale: 0.75 }}
							onClick={() => setScrollValue(+200)}
							className="w-8 h-9 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer hover:shadow-lg flex items-center justify-center">
							<MdChevronRight className="text-lg text-white" />
						</motion.div>
					</div>
				</div>

				<RowContainer
					scrollValue={scrollValue}
					flag={true}
					data={foodItems?.filter((n) => n.category === "fruits")}
				/>
			</section>

			<MenuContainer />
			{cartShow && <CartContainer />}
		</div>
	);
};

export default MainContainer;
