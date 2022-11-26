import React from "react";
import { motion } from "framer-motion";
import {
	MdCloudUpload,
	MdFastfood,
	MdDelete,
	MdFoodBank,
	MdAttachMoney,
} from "react-icons/md";
import { useState } from "react";
import { categories } from "../utils/data";
import Loader from "./Loader";
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { getAllFoodItems, saveItem } from "../utils/firebaseFunctions";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const CreateContainer = () => {
	const [title, setTitle] = useState("");
	const [calories, setCalories] = useState("");
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState(null);
	const [imageAsset, setImageAsset] = useState(null);
	const [fields, setFields] = useState(false);
	const [alertStatus, setAlertStatus] = useState("danger");
	const [msg, setMsg] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [{ foodItems }, dispatch] = useStateValue();

	const uploadImage = (e) => {
		setIsLoading(true);
		const imageFile = e.target.files[0];
		// Upload data on specific path in firebase on desired name format
		const storageRef = ref(
			storage,
			`Images/${Date.now()}-${imageFile.name}`
		);
		// Calculate the upload progress on firebase
		const uploadTask = uploadBytesResumable(storageRef, imageFile);

		uploadTask.on(
			"state_changed",
			//upload details
			(snapshot) => {
				const uploadProgress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
			//error details
			(error) => {
				console.log(error);
				setFields(true);
				setMsg("Error in Upload : Try Again !!!");
				setAlertStatus("danger");
				setTimeout(() => {
					setFields(false);
					setIsLoading(false);
				}, 4000);
			},
			//download URL for that image
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then(
					(getDownloadURL) => setImageAsset(getDownloadURL),
					setIsLoading(false),
					setFields(true),
					setMsg("Image uploaded Successfully..."),
					setAlertStatus("success"),
					setTimeout(() => {
						setFields(false);
					}, 4000)
				);
			}
		);
	};
	const deleteImage = (e) => {
		setIsLoading(true);
		const deleteRef = ref(storage, imageAsset);
		deleteObject(deleteRef).then(() => {
			setImageAsset(null);
			setIsLoading(false);
			setFields(true);
			setMsg("Image Deleted Successfully...");
			setAlertStatus("success");
			setTimeout(() => {
				setFields(false);
			}, 4000);
		});
	};
	const saveDetails = (e) => {
		setIsLoading(true);
		try {
			if (!title || !calories || !imageAsset || !price || !category) {
				setFields(true);
				setMsg("Required Field cannot be empty!!");
				setAlertStatus("danger");
				setTimeout(() => {
					setFields(false);
					setIsLoading(false);
				}, 4000);
			} else {
				const data = {
					id: `${Date.now()}`,
					title: title,
					imageURL: imageAsset,
					category: category,
					calories: calories,
					qty: 1,
					price: price,
				};
				saveItem(data);
				setIsLoading(false);
				setFields(true);
				setMsg("Data Uploaded Successfully");
				clearData();
				setAlertStatus("success");
				setTimeout(() => {
					setFields(false);
				}, 4000);
			}
		} catch (error) {
			console.log(error);
			setFields(true);
			setMsg("Error in Upload : Try Again !!!");
			setAlertStatus("danger");
			setTimeout(() => {
				setFields(false);
				setIsLoading(false);
			}, 4000);
		}
		fetchData();
	};

	const clearData = () => {
		setTitle("");
		setImageAsset(null);
		setCalories("");
		setPrice("");
		setCategory(null);
	};

	const fetchData = async () => {
		await getAllFoodItems().then((data) => {
			dispatch({
				type: actionType.SET_FOOD_ITEMS,
				foodItems: data,
			});
		});
	};

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
						className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
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
					{isLoading ? (
						<Loader />
					) : (
						<>
							{!imageAsset ? (
								<>
									<label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
										<div className="w-full h-full flex flex-col items-center justify-center cursor-pointer gap-2">
											<MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
											<p className="text-gray-500 hover:text-gray-700">
												Click here to upload
											</p>
										</div>
										<input
											type="file"
											name="uploadImage"
											accept="image/*"
											onChange={uploadImage}
											className="w-0 h-0"
										/>
									</label>
								</>
							) : (
								<>
									<div className="relative h-full">
										<img
											src={imageAsset}
											alt=""
											className="w-full h-full object-cover"
										/>
										<button
											type="button"
											className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
											onClick={deleteImage}>
											<MdDelete className="text-white" />
										</button>
									</div>
								</>
							)}
						</>
					)}
				</div>

				<div className="w-full flex flex-col md:flex-row items-center gap-3">
					<div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
						<MdFoodBank className="text-gray-700 text-2xl" />
						<input
							className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
							type="text"
							value={calories}
							onChange={(e) => setCalories(e.target.value)}
							required
							placeholder="Calories"
						/>
					</div>

					<div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
						<MdAttachMoney className="text-gray-700 text-2xl" />
						<input
							className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
							type="text"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							required
							placeholder="Price"
						/>
					</div>
				</div>

				<div className="flex items-center w-full">
					<button
						className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
						onClick={saveDetails}
						type="button">
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateContainer;
