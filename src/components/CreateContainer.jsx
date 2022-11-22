import React from "react";
import { motion } from "framer-motion";
import { MdFastfood } from "react-icons/md";
import { useState } from "react";
import { categories } from "../utils/data";
import Loader from "./Loader";

const CreateContainer = () => {
	const [title, setTitle] = useState("");
	const [calories, setCalories] = useState("");
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState(null);
	const [imageAsset, setImageAsset] = useState(null);
	const [fields, setFields] = useState(false);
	const [alertStatus, setAlertStatus] = useState("danger");
	const [msg, setMsg] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	// const [{ foodItems }, dispatch] = useStateValue();

	return (
		<div className="w-full h-auto min-h-screen flex justify-center items-center">
			<div className="w-[90%] md:w-[75%] border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
				{fields && (
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className={`w-full p-2 roundex-lg text-center text-base font-semibold ${
							alertStatus === "danger"
								? "bg-red-400 text-red-800"
								: "bg-emerald-400 text-emerald-800"
						}`}>
						{msg}
					</motion.p>
				)}

				<div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
					<MdFastfood className="text-xl text-gray-700" />
					<input
						className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-textColor"
						onChange={(e) => setTitle(e.target.value)}
						type="text"
						required
						value={title}
						placeholder="Give me a title...!"
					/>
				</div>

				<div className="w-full">
					<select
						className="w-full outline-none text-base borderr-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
						onChange={(e) => setCategory(e.target.value)}>
						<option
							value="other"
							className="bg-white">
							Select Category
						</option>
						{categories &&
							categories.map((item) => (
								<option
									key={item.id}
									className="text-base border-0 outline-none capitalize bg-white text-headingColor"
									value={item.urlParamName}>
									{item.name}
								</option>
							))}
					</select>
				</div>

				<div className="w-full group flex justify-center items-center felx-col border-2 border-dotted border-gray-300 h-225 md:h-420 cursor-pointer rounded-lg">
					{isLoading ? <Loader /> : <></>}
				</div>
			</div>
		</div>
	);
};

export default CreateContainer;
