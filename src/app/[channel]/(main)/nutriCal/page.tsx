// "use client";

// import { useState } from "react";
// import { nutritionData } from "./nutritionData";
// import GaugeChart from "react-gauge-chart";

// export default function NutritionCalculatorInteractive() {
// 	const [product, setProduct] = useState("atta");
// 	const [amount, setAmount] = useState(100);

// 	const data = nutritionData[product];
// 	const multiplier = amount / 100;
// 	const calories = data.per100g.calories * multiplier;

// 	const maxCalories = 1000;
// 	const gaugePercent = Math.min(calories / maxCalories, 1);

// 	return (
// 		<div className="mx-auto max-w-xl space-y-6 rounded-lg bg-white p-6 shadow-lg">
// 			<h2 className="mb-4 text-center text-2xl font-bold">Nutrition Calculator</h2>

// 			{/* Product Selector */}
// 			<div>
// 				<label className="mb-2 block font-medium">Select Product</label>
// 				<select
// 					value={product}
// 					onChange={(e) => setProduct(e.target.value)}
// 					className="w-full rounded border p-2"
// 				>
// 					{Object.keys(nutritionData).map((item) => (
// 						<option key={item} value={item}>
// 							{item.charAt(0).toUpperCase() + item.slice(1)}
// 						</option>
// 					))}
// 				</select>
// 			</div>

// 			{/* Quantity Slider */}
// 			<div>
// 				<label className="mb-2 block font-medium">Amount ({data.unit})</label>
// 				<input
// 					type="range"
// 					min="10"
// 					max="1000"
// 					step="10"
// 					value={amount}
// 					onChange={(e) => setAmount(Number(e.target.value))}
// 					className="w-full"
// 				/>
// 				<div className="mt-2 text-center text-lg font-semibold">
// 					{amount} {data.unit}
// 				</div>
// 			</div>

// 			{/* Gauge for Calories */}
// 			<div className="flex flex-col items-center">
// 				<GaugeChart
// 					id="calorie-gauge"
// 					nrOfLevels={20}
// 					percent={gaugePercent}
// 					textColor="#000"
// 					colors={["#00ff00", "#ffcc00", "#ff0000"]}
// 					needleColor="#444"
// 					arcWidth={0.3}
// 				/>
// 				<div className="mt-2 text-lg font-semibold">{calories.toFixed(0)} kcal</div>
// 			</div>

// 			{/* Nutrition Breakdown */}
// 			<div className="border-t pt-4">
// 				<h3 className="mb-2 font-semibold">Nutritional Values</h3>
// 				<ul className="space-y-1">
// 					{Object.entries(data.per100g).map(([key, value]) => (
// 						<li key={key} className="flex justify-between">
// 							<span className="capitalize">{key}</span>
// 							<span>{(value * multiplier).toFixed(2)}</span>
// 						</li>
// 					))}
// 				</ul>
// 			</div>
// 		</div>
// 	);
// }

"use client";

import { useState } from "react";
import { nutritionData } from "./nutritionData";
import GaugeChart from "react-gauge-chart";

export default function NutritionCalculatorInteractive() {
	const [product, setProduct] = useState("atta");
	const [amount, setAmount] = useState(100);

	const data = nutritionData[product];
	const multiplier = amount / 100;

	const calories = data.per100g.calories * multiplier;
	const proteins = data.per100g.protein * multiplier;
	const carbs = data.per100g.carbs * multiplier;
	const fats = data.per100g.fat * multiplier;

	const maxCalories = 1000;
	const gaugePercent = Math.min(calories / maxCalories, 1);

	const ProgressBar = ({ value, max }: { value: number; max: number }) => {
		const percent = Math.min((value / max) * 100, 100);
		return (
			<div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
				<div className="h-full rounded-full bg-green-700" style={{ width: `${percent}%` }}></div>
			</div>
		);
	};

	return (
		<div className="mx-auto my-5 max-w-4xl rounded-2xl border-4 border-[#d6d4d4] bg-[#C0D1D0] p-6 shadow-lg">
			{/* Product Selector */}
			<div className="mb-6">
				<label className="mb-2 block font-medium">Select Product</label>
				<select
					value={product}
					onChange={(e) => setProduct(e.target.value)}
					className="w-full rounded border p-2"
				>
					{Object.keys(nutritionData).map((item) => (
						<option key={item} value={item}>
							{item.charAt(0).toUpperCase() + item.slice(1)}
						</option>
					))}
				</select>
			</div>

			{/* Quantity Slider */}
			<div className="mb-6">
				<label className="mb-2 block font-medium">Amount ({data.unit})</label>
				<input
					type="range"
					min="10"
					max="1000"
					step="10"
					value={amount}
					onChange={(e) => setAmount(Number(e.target.value))}
					className="
      h-2 w-full cursor-pointer appearance-none rounded-full
      [&::-moz-range-thumb]:h-5
      [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:cursor-pointer
      [&::-moz-range-thumb]:rounded-full
      [&::-moz-range-thumb]:bg-black
      [&::-webkit-slider-thumb]:mt-[-3px]
      [&::-webkit-slider-thumb]:h-5
      [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:cursor-pointer
      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black
    "
					style={{
						background: `linear-gradient(to right, black ${(amount / 1000) * 100}%, #e5e7eb ${
							(amount / 1000) * 100
						}%)`,
					}}
				/>
				<div className="mt-2 text-center text-lg font-semibold">
					{amount} {data.unit}
				</div>
			</div>

			{/* Gauge at Center */}
			<div className="my-6 flex justify-center">
				<div className="w-72">
					<div className="flex flex-col items-center">
						<GaugeChart
							id="calorie-gauge"
							nrOfLevels={5}
							percent={gaugePercent}
							textColor="#000"
							hideText={true}
							colors={["#419073", "#FCDD34", "#F03136"]}
							needleColor="#444"
							arcWidth={0.5}
						/>
						<div className="mt-2 text-lg font-semibold">{calories.toFixed(0)} kcal</div>
					</div>
				</div>
			</div>

			{/* Nutrition Row at Bottom */}
			<div className="mt-8 grid grid-cols-4 gap-6 text-center">
				{/* Calories */}
				<div>
					<div className="text-xl font-bold">{calories.toFixed(0)}g</div>
					<div className="mb-2 text-sm text-gray-700">Calories</div>
					<ProgressBar value={calories} max={500} />
				</div>

				{/* Proteins */}
				<div>
					<div className="text-xl font-bold">{proteins.toFixed(1)}g</div>
					<div className="mb-2 text-sm text-gray-700">Proteins</div>
					<ProgressBar value={proteins} max={50} />
				</div>

				{/* Carbs */}
				<div>
					<div className="text-xl font-bold">{carbs.toFixed(1)}g</div>
					<div className="mb-2 text-sm text-gray-700">Carbs</div>
					<ProgressBar value={carbs} max={100} />
				</div>

				{/* Fats */}
				<div>
					<div className="text-xl font-bold">{fats.toFixed(1)}g</div>
					<div className="mb-2 text-sm text-gray-700">Fats</div>
					<ProgressBar value={fats} max={50} />
				</div>
			</div>
		</div>
	);
}
