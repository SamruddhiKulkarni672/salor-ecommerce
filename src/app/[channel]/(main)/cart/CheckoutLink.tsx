"use client";
import Image from "next/image";

type Props = {
	disabled?: boolean;
	checkoutId?: string;
	className?: string;
};

export const CheckoutLink = ({ disabled, checkoutId, className = "" }: Props) => {
	return (
		<a
			data-testid="CheckoutLink"
			aria-disabled={disabled}
			onClick={(e) => disabled && e.preventDefault()}
			href={`/checkout?checkout=${checkoutId}`}
			className={`inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-[#87A62C] px-6 py-2 text-center font-medium text-white hover:bg-neutral-800 aria-disabled:cursor-not-allowed aria-disabled:bg-neutral-500 sm:px-8 md:py-3 ${className}`}
		>
			<div className="relative h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7">
				<Image src="/images/checkoutIcon.svg" alt="Basket" fill className="object-contain" priority />
			</div>
			<span>Checkout</span>
		</a>
	);
};
