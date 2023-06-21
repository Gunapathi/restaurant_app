import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";

const HomeContainer = () => {
	return (
		<section
			id="home"
			className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
			{/* left content of banner */}
			<div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
				<div className="flex items-center justify-center gap-3 bg-orange-100 px-4 py-1 rounded-full">
					<p className="text-base text-orange-500 font-semibold">
						Bike Delivery
					</p>
					<div className="w-10 h-10 bg-white rounded-full overflow-hidden drop-shadow-xl">
						<img
							className="w-full h-full object-contain"
							src={Delivery}
							alt="Delivery"
						/>
					</div>
				</div>

				<p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
					The Fastest Delivery in{" "}
					<span className="text-orange-600 text-[3rem] lg:text-[5rem]">
						Your City
					</span>
				</p>

				<p className="text-base text-textColor text-center md:text-left md:w-[80%]">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Provident, sed sit delectus natus illum deserunt dolorum eum
					corporis, esse id aut necessitatibus sequi iusto consequatur
					voluptatem fugiat mollitia earum? Quasi.
				</p>

				<button
					type="button"
					className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100">
					Order Now
				</button>
			</div>

			{/* right hero image on banner */}
			<div className="py-2 flex-1 items-center relative">
				<img
					src={HeroBg}
					className="ml-auto h-420 w-full lg:w-auto xl:w-[75%] lg:h-650"
					alt="Hero"
				/>

				<div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-20 xl:px-32 py-4 gap-4 flex-wrap">
					{heroData &&
						heroData.map((n) => (
							<div
								key={n.id}
								className="  lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex items-center justify-center flex-col">
								<img
									src={n.imageSrc}
									alt="I1"
									className="w-20 lg:w-40 -mt-10 lg:-mt-20"
								/>
								<p className="text-base lg:text-xl font-semibold text-textColor">
									{n.name}
								</p>
								<p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-2">
									{n.desc}
								</p>
								<p className="text-sm font-semibold text-headingColor">
									{" "}
									<span className="text-xs text-red-600">
										$
									</span>{" "}
									{n.price}
								</p>
							</div>
						))}
				</div>
			</div>
		</section>
	);
};

export default HomeContainer;
