"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckoutLink } from "./CheckoutLink";
import { DeleteLineButton } from "./DeleteLineButton";
import { formatMoney, getHrefForVariant } from "@/lib/utils";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import { CartQuantityAdjuster } from "@/ui/components/CartQuantityAdjuster";

export default function CartPageClient({
	checkout,
	checkoutId,
	updateItem,
}: {
	checkout: any;
	checkoutId: string;
	updateItem: (variantId: string, newQuantity: number) => Promise<void>;
}) {
	const [isFooterVisible, setIsFooterVisible] = useState(false);
	const footerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!footerRef.current) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => setIsFooterVisible(entry.isIntersecting));
			},
			{ root: null, threshold: 0 },
		);

		observer.observe(footerRef.current);
		return () => observer.disconnect();
	}, []);

	if (!checkout || checkout.lines.length < 1) {
		return (
			<section className="mx-auto max-w-7xl p-8 text-center">
				<h1 className="mt-8 text-2xl font-bold text-neutral-900 sm:text-3xl">Your Shopping Cart is empty</h1>
				<p className="my-6 text-sm text-neutral-500">
					Looks like you haven’t added any items to the cart yet.
				</p>
				<LinkWithChannel
					href="/products"
					className="inline-block rounded border border-transparent bg-neutral-900 px-6 py-3 text-center font-medium text-neutral-50 hover:bg-neutral-800 sm:px-16"
				>
					Explore products
				</LinkWithChannel>
			</section>
		);
	}

	return (
		<div className="relative flex flex-col gap-8 bg-[#dbe5e9]   lg:flex-row lg:items-start lg:p-5">
			{/* Product List */}
			<div className="flex w-full flex-col lg:ml-20 ">
				{/* basket header  */}
				<div className="flex  w-full flex-row items-center rounded-lg   p-2 sm:flex-row sm:items-center sm:space-x-5">
					{/* Basket Image */}
					<div className="relative h-8 w-8 items-start justify-start sm:h-28 sm:w-28 md:h-11 md:w-11 lg:h-20 lg:w-20">
						<Image src="/images/basket.svg" alt="Basket" fill className="object-contain" priority />
					</div>

					{/* Text Section */}
					<div className="mt-3 text-center sm:mt-0 sm:text-left">
						<h1 className="text-xl font-bold text-[#5b3413] sm:text-2xl lg:text-3xl">Your Basket</h1>
						<p className="text-sm text-gray-600 sm:text-base lg:text-lg">
							{checkout.lines.length} items in your basket
						</p>
					</div>
				</div>

				<ul
					data-testid="CartProductList"
					role="list"
					className="mb-28 w-full divide-y divide-[#aeb1b2]  rounded-lg border-b border-t bg-white px-4 py-3 "
				>
					{checkout.lines.map((item: any) => (
						<li
							key={item.id}
							className="flex flex-col  gap-1 py-3   sm:flex-row sm:items-center sm:justify-between md:gap-3 md:py-6"
						>
							{/* Mobile View */}
							<div className="flex items-start sm:hidden">
								<div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border bg-neutral-50">
									{item.variant?.product?.thumbnail?.url && (
										<Image
											src={item.variant.product.thumbnail.url}
											alt={item.variant.product.thumbnail.alt ?? ""}
											width={96}
											height={96}
											className="h-full w-full rounded-full object-cover"
										/>
									)}
								</div>
								<div className="ml-4 flex flex-col justify-center">
									<LinkWithChannel
										href={getHrefForVariant({
											productSlug: item.variant.product.slug,
											variantId: item.variant.id,
										})}
									>
										<h2 className="truncate text-sm font-semibold text-neutral-900">
											{item.variant?.product?.name}
										</h2>
										<p className="mt-1 text-sm text-neutral-500">{item.variant?.product?.category?.name}</p>
									</LinkWithChannel>
									<p className="mt-1 text-sm text-neutral-500">{item.variant?.name}</p>
								</div>
								<p className="ml-auto mt-1 text-sm font-semibold text-neutral-900">
									₹ {Number(item.totalPrice?.gross?.amount || 0).toFixed(2)}
								</p>
							</div>

							{/* Desktop View */}
							<div className="hidden items-center sm:flex sm:flex-1 sm:gap-4">
								<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-neutral-50">
									{item.variant?.product?.thumbnail?.url && (
										<Image
											src={item.variant.product.thumbnail.url}
											alt={item.variant.product.thumbnail.alt ?? ""}
											width={96}
											height={96}
											className="h-full w-full  object-cover"
										/>
									)}
								</div>
								<div className="min-w-0 max-w-sm flex-1">
									<LinkWithChannel
										href={getHrefForVariant({
											productSlug: item.variant.product.slug,
											variantId: item.variant.id,
										})}
									>
										<h2 className="truncate text-sm font-semibold text-neutral-900 md:text-lg">
											{item.variant?.product?.name}
										</h2>
										<p className="mt-1 text-sm text-neutral-500">{item.variant?.name}</p>

										<p className="mt-1 text-sm text-neutral-500">{item.variant?.product?.category?.name}</p>
									</LinkWithChannel>
								</div>
							</div>

							{/* Quantity & Delete */}
							<div className="mt-2 flex items-center justify-between sm:hidden">
								<CartQuantityAdjuster
									initialQuantity={item.quantity}
									variantId={item.variant.id}
									updateItem={updateItem}
								/>
								<DeleteLineButton checkoutId={checkoutId} lineId={item.id} />
							</div>

							<div className="hidden items-center gap-10 sm:flex">
								<CartQuantityAdjuster
									initialQuantity={item.quantity}
									variantId={item.variant.id}
									updateItem={updateItem}
								/>
								<p className="hidden w-20 text-right text-lg font-semibold text-neutral-900 sm:block">
									₹ {Number(item.totalPrice?.gross?.amount || 0).toFixed(2)}
								</p>
								<DeleteLineButton checkoutId={checkoutId} lineId={item.id} />
							</div>
						</li>
					))}
				</ul>
			</div>

			{/* Order Summary */}
			<div
				className={`
      fixed bottom-0 right-0
      z-10 w-full border-t border-gray-300 bg-white lg:static
      lg:sticky lg:top-20 lg:w-1/3 lg:w-full
      lg:max-w-sm lg:border-0 lg:bg-transparent
      ${isFooterVisible ? "lg:absolute lg:bottom-10" : ""}
    `}
			>
				<div className="rounded-t-xl border-2 border-[#d0dee9] bg-neutral-50 px-2 py-2 md:px-4 md:py-4 lg:rounded-xl">
					<div className="flex items-center justify-between gap-2 py-1 md:py-2">
						<div>
							<span className="flex flex-row text-base font-semibold text-neutral-900 sm:text-xl">
								<div className="relative mx-2 h-5 w-5 sm:h-6 sm:w-6 md:h-6 md:w-6">
									<Image
										src="/images/ordersummaryIcon.svg"
										alt="Basket"
										fill
										className="object-contain"
										priority
									/>
								</div>
								Your Total
							</span>
							<p className="mt-1 text-xs text-neutral-500 sm:text-xs">
								Shipping will be calculated in the next step
							</p>
						</div>
						<div className="text-sm font-semibold text-neutral-900 sm:text-lg">
							{formatMoney(checkout.totalPrice.gross.amount, checkout.totalPrice.gross.currency)}
						</div>
					</div>
					<div className="mt-2 md:mt-4">
						<CheckoutLink
							checkoutId={checkoutId}
							disabled={!checkout.lines.length}
							className="w-full rounded-full bg-[#473629] py-1 text-white md:py-3"
						/>
					</div>
				</div>
			</div>

			{/* Footer Tracker */}
			<div ref={footerRef} className="absolute bottom-0 h-2 w-full"></div>
		</div>
	);
}
