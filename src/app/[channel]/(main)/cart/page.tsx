import * as Checkout from "@/lib/checkout";
import { CheckoutLinesUpdateDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { invariant } from "ts-invariant";
import CartPageClient from "./CartPageClient";

export const metadata = {
	title: "Shopping Cart",
};

export default async function Page(props: { params: Promise<{ channel: string }> }) {
	const params = await props.params;
	const checkoutId = await Checkout.getIdFromCookies(params.channel);

	async function updateItem(variantId: string, newQuantity: number) {
		"use server";

		const checkout = await Checkout.findOrCreate({
			checkoutId: await Checkout.getIdFromCookies(params.channel),
			channel: params.channel,
		});

		invariant(checkout, "This should never happen");

		await Checkout.saveIdToCookie(params.channel, checkout.id);

		await executeGraphQL(CheckoutLinesUpdateDocument, {
			variables: {
				checkoutId: checkout.id,
				lines: [
					{
						variantId: decodeURIComponent(variantId),
						quantity: newQuantity,
					},
				],
			},
			cache: "no-cache",
		});
	}

	const checkout = await Checkout.find(checkoutId);

	return <CartPageClient checkout={checkout} checkoutId={checkoutId} updateItem={updateItem} />;
}
