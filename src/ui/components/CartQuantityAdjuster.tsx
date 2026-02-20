"use client";

import React from "react";
import { QuantityAdjuster } from "./QantityAdjuster";

export function CartQuantityAdjuster({
	initialQuantity,
	variantId,
	updateItem,
}: {
	initialQuantity: number;
	variantId: string;
	updateItem: (variantId: string, quantity: number) => Promise<void>;
}) {
	return (
		<QuantityAdjuster
			initialQuantity={initialQuantity}
			onQuantityChange={(quantity) => updateItem(variantId, quantity)}
		/>
	);
}
