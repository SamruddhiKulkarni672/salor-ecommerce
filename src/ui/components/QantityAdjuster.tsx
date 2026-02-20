"use client";

import React, { useTransition } from "react";

interface Props {
	initialQuantity: number;
	onQuantityChange: (quantity: number) => Promise<void>;
}

export const QuantityAdjuster: React.FC<Props> = ({ initialQuantity, onQuantityChange }) => {
	const [quantity, setQuantity] = React.useState(initialQuantity);
	const [isPending, startTransition] = useTransition();

	const handleChange = (newQuantity: number) => {
		if (newQuantity < 1) return;
		setQuantity(newQuantity);

		startTransition(() => {
			onQuantityChange(newQuantity);
		});
	};

	return (
		<div
			className="
        flex items-center 
        gap-2 rounded-full border
        border-[#383e45] bg-[#e4eedc] px-2 py-0.5 text-xs
        font-medium text-neutral-700 sm:gap-3 sm:px-4 sm:py-1 sm:text-sm md:mr-7
      "
		>
			<button
				type="button"
				onClick={() => handleChange(quantity - 1)}
				disabled={isPending || quantity <= 1}
				className="
          text-base font-bold text-neutral-700 transition hover:scale-150
          sm:text-lg
        "
			>
				−
			</button>
			<span
				className="
          text-sm font-medium text-neutral-800
          sm:text-base
        "
			>
				{quantity}
			</span>
			<button
				type="button"
				onClick={() => handleChange(quantity + 1)}
				disabled={isPending}
				className="
          text-base font-bold text-neutral-700 transition hover:scale-150
          sm:text-lg
        "
			>
				+
			</button>
		</div>
	);
};
