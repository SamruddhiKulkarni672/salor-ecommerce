"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const items = [
	{ src: "/images/category1.svg", delay: 0 },
	{ src: "/images/category4.svg", delay: 0.4 },
	{ src: "/images/category3.svg", delay: 0.8 },
	{ src: "/images/category2.svg", delay: 1.2 },
];

export default function FallingLoader() {
	return (
		<div className="relative flex h-48 w-48 flex-col items-center">
			{/* Falling Items */}
			{items.map((item, index) => (
				<motion.div
					key={index}
					className="absolute"
					initial={{ y: -100, opacity: 0, rotate: 0 }}
					animate={{
						y: [-100, 120],
						opacity: [0, 1, 1, 0],
						rotate: [0, 20, -20, 0],
					}}
					transition={{
						repeat: Infinity,
						repeatDelay: 0.8,
						duration: 1.5,
						delay: item.delay,
					}}
				>
					<Image src={item.src} width={70} height={70} alt="falling item" className="drop-shadow-lg" />
				</motion.div>
			))}

			{/* Basket */}
			<div className="absolute bottom-0">
				<Image src="/images/fallingBasket.svg" width={120} height={80} alt="basket" />
			</div>
		</div>
	);
}
