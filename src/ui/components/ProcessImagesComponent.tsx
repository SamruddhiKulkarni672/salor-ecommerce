"use client";

import React from "react";
import Image from "next/image";

const ProcessImagesComponent = () => {
	return (
		<div>
			<div className="relative hidden overflow-hidden bg-[#A9BFCB] py-4 md:block md:py-6 lg:pb-20 lg:pt-14">
				{/*  Decorative Falling Leaves */}
				{/* <div className="pointer-events-none absolute inset-0 overflow-hidden">
					{[...Array(7)].map((_, i) => {
						// If i < 3 → left side, else → right side
						const isLeftSide = i < 3;
						return (
							<div
								key={i}
								className={`leaf-animation absolute leaf-${i}`}
								style={{
									left: isLeftSide ? `${Math.random() * 10}%` : `${80 + Math.random() * 10}%`,
									animationDelay: `${i * 1.5}s`,
								}}
							>
								<Image
									src="/images/leafimage.svg"
									alt="Falling Leaf"
									width={60}
									height={60}
									className="opacity-80"
								/>
							</div>
						);
					})}
				</div> */}

				{/* Title */}
				<div className="relative z-10 mb-4 flex justify-center md:mb-6 lg:my-4 lg:mb-10">
					<div className="relative h-[40px] w-[180px] md:h-[64px] md:w-[220px] lg:h-[88px] lg:w-[565px]">
						<Image
							src="/images/fromtotablejourneytitle.svg"
							alt="From to Table Journey Title"
							fill
							style={{ objectFit: "contain" }}
						/>
					</div>
				</div>

				{/* Process Steps */}
				<div className="relative z-10 flex flex-wrap items-center justify-center gap-4 px-4">
					{/* Step: Farmer */}
					<div className="flex flex-col items-center">
						<div className="relative h-[80px] w-[80px] md:h-[140px] md:w-[140px] lg:h-[220px] lg:w-[220px]">
							<Image src="/images/farmerimage.svg" alt="Farmer" fill style={{ objectFit: "contain" }} />
						</div>
						<h2 className="mt-2 font-amatica text-[20px] font-bold leading-[100%] md:text-[32px] lg:text-[48px]">
							Farmer
						</h2>
					</div>

					{/* Arrow */}
					<div className="relative h-[20px] w-[28px] md:h-[25px] md:w-[36px]">
						<Image src="/images/nexticon.svg" alt="Next arrow" fill style={{ objectFit: "contain" }} />
					</div>

					{/* Step: Packaging */}
					<div className="flex flex-col items-center">
						<div className="relative h-[80px] w-[80px] md:h-[140px] md:w-[140px] lg:h-[220px] lg:w-[220px]">
							<Image src="/images/packagingimage.svg" alt="Packaging" fill style={{ objectFit: "contain" }} />
						</div>
						<h2 className="mt-2 font-amatica text-[20px] font-bold leading-[100%] md:text-[32px] lg:text-[48px]">
							Packaging
						</h2>
					</div>

					{/* Arrow */}
					<div className="relative h-[20px] w-[28px] md:h-[25px] md:w-[36px]">
						<Image src="/images/nexticon.svg" alt="Next arrow" fill style={{ objectFit: "contain" }} />
					</div>

					{/* Step: Consumer */}
					<div className="flex flex-col items-center">
						<div className="relative h-[70px] w-[70px] md:h-[120px] md:w-[120px] lg:h-[158px] lg:w-[158px]">
							<Image src="/images/consumerimage.svg" alt="Consumer" fill style={{ objectFit: "contain" }} />
						</div>
						<h2 className="mt-2 font-amatica text-[20px] font-bold leading-[100%] md:text-[32px] lg:mt-12 lg:text-[48px]">
							Consumer
						</h2>
					</div>
				</div>

				{/* Description */}
				<div className="relative z-10 mt-6 flex justify-center px-4 lg:mt-16">
					<p className="max-w-[90%] text-center font-amatica text-[16px] font-bold leading-[100%] md:text-[20px] lg:max-w-[500px] lg:text-[24px]">
						Yes you heard it right!!! We supply product directly from farm without processing
					</p>
				</div>
			</div>

			{/* Mobile */}
			<div className="w-full bg-[#BBCED9] md:hidden">
				<div className="relative aspect-[4/3] h-[221px] w-full">
					<Image
						src="/images/farmtotablemobileimage.svg"
						alt="From to Table Journey Title"
						fill
						className="object-cover"
					/>
				</div>
			</div>
		</div>
	);
};

export default ProcessImagesComponent;
