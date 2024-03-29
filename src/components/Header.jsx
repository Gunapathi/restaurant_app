import React, { useState } from "react";
// google auth
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
// icons & animation
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
// images
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
	const firebaseAuth = getAuth(app);
	const provider = new GoogleAuthProvider();

	const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

	// show user menu dropdown only on click
	const [isMenu, setIsMenu] = useState(false);

	const login = async () => {
		// if having user on localstorage dont activate the signin process
		if (!user) {
			const {
				// eslint-disable-next-line
				user: { refreshToken, providerData },
			} = await signInWithPopup(firebaseAuth, provider);

			// update global user value from stateprovider
			dispatch({
				type: actionType.SET_USER,
				user: providerData[0],
			});

			// update user data on local Storage so that user data will not get reset on page load
			localStorage.setItem("user", JSON.stringify(providerData[0]));
		} else {
			setIsMenu(!isMenu);
		}
	};

	// logout on click
	const logout = () => {
		setIsMenu(false);
		localStorage.clear();

		dispatch({
			type: actionType.SET_USER,
			user: null,
		});
	};

	const showCart = () => {
		dispatch({
			type: actionType.SET_CART_SHOW,
			cartShow: !cartShow,
		});
	};
	return (
		<header className="fixed z-50 w-full max-w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
			{/* deskto and tablet */}
			<div className="hidden md:flex w-full h-full items-center justify-between">
				<Link
					to={"/"}
					onClick={() => setIsMenu(false)}
					className="flex items-center gap-2">
					<img
						src={Logo}
						className="w-8 object-cover"
						alt="Logo"
					/>
					<p className="text-headingColor text-xl font-bold">City</p>
				</Link>

				{/* main menu */}
				<div className="flex items-center gap-8">
					<motion.ul
						initial={{ opacity: 0, x: 200 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 200 }}
						className="flex items-center gap-8">
						<li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
							Home
						</li>
						<li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
							Menu
						</li>
						<li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
							About Us
						</li>
						<li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
							Service
						</li>
					</motion.ul>

					<div
						className="relative flex items-center justify-center cursor-pointer"
						onClick={showCart}>
						<MdShoppingBasket className="text-textCOlor text-2xl"></MdShoppingBasket>
						{cartItems && cartItems.length > 0 && (
							<div className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-cartNumBg">
								<p className="text-xs text-white font-semibold">
									{cartItems.length}
								</p>
							</div>
						)}
					</div>

					{/* user image */}
					<div className="relative">
						<motion.img
							whileTap={{ scale: 0.6 }}
							src={user ? user.photoURL : Avatar}
							className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
							alt="User"
							onClick={login}
						/>
						{/* show user menu dropdown only on click */}
						{isMenu && (
							<motion.div
								initial={{ opacity: 0, scale: 0.6 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.6 }}
								className="w-40 bg-gray-50 shadow-xl rounded-lg absolute top-12 right-0 flex flex-col">
								{
									// upate add new item only user is admin - static verification here upate later
									user &&
										user.email ===
											"gunapathi.selvam@gmail.com" && (
											<Link to={"/createItem"}>
												<p
													className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
													onClick={() =>
														setIsMenu(false)
													}>
													New Item <MdAdd />
												</p>
											</Link>
										)
								}
								<p
									className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
									onClick={logout}>
									Logout <MdLogout />
								</p>
							</motion.div>
						)}
					</div>
				</div>
			</div>

			{/* mobile */}
			<div
				className="flex items-center justify-between md:hidden w-full h-full cursor-pointer"
				onClick={showCart}>
				{/* mobile cart icon */}
				<div className="relative flex items-center justify-center">
					<MdShoppingBasket className="text-textCOlor text-2xl"></MdShoppingBasket>
					<div className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-cartNumBg">
						{cartItems && cartItems.length > 0 && (
							<div className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-cartNumBg">
								<p className="text-xs text-white font-semibold">
									{cartItems.length}
								</p>
							</div>
						)}
					</div>
				</div>

				{/* mobile logo */}
				<Link
					to={"/"}
					className="flex items-center gap-2">
					<img
						src={Logo}
						className="w-8 object-cover"
						alt="Logo"
					/>
					<p className="text-headingColor text-xl font-bold">City</p>
				</Link>

				{/* mobile menu and user auth */}
				<div className="relative">
					<motion.img
						whileTap={{ scale: 0.6 }}
						src={user ? user.photoURL : Avatar}
						className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
						alt="user profile"
						onClick={login}
					/>
					{/* show user menu dropdown only on click */}
					{isMenu && (
						<motion.div
							initial={{ opacity: 0, scale: 0.6 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.6 }}
							className="w-40 bg-gray-50 shadow-xl rounded-lg absolute top-12 right-0 flex flex-col">
							{
								// upate add new item only user is admin - static verification here upate later
								user &&
									user.email ===
										"gunapathi.selvam@gmail.com" && (
										<Link to={"/createItem"}>
											<p
												className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
												onClick={() =>
													setIsMenu(false)
												}>
												New Item <MdAdd />
											</p>
										</Link>
									)
							}

							<ul className="flex flex-col items-start">
								<li
									className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2 w-full"
									onClick={() => setIsMenu(false)}>
									Home
								</li>
								<li
									className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2 w-full"
									onClick={() => setIsMenu(false)}>
									Menu
								</li>
								<li
									className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2 w-full"
									onClick={() => setIsMenu(false)}>
									About Us
								</li>
								<li
									className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2 w-full"
									onClick={() => setIsMenu(false)}>
									Service
								</li>
							</ul>
							<p
								className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
								onClick={logout}>
								Logout <MdLogout />
							</p>
						</motion.div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
