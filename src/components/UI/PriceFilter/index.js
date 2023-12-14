"use client";
// components/PriceFilter.js
import React, { useState } from "react";
import Link from "next/link";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./style.scss"; // Importez le fichier CSS pour les styles personnalisés
import FilterButton from "../FilterButton";
const PriceFilter = ({ onFilterChange, onClick, maxPrice }) => {
    const [priceRange, setPriceRange] = useState([0, maxPrice]);

    const handleFilterChange = () => {
        const filterValues = {
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
        };
        onFilterChange(filterValues);
    };
    const handleClick = () => {
        onClick(priceRange);
    };

    return (
        <div>
            <label className="block mb-2">Prix</label>
            <div className="flex justify-center mt-2">
                <span>
                    {priceRange[0]}€-{priceRange[1]}€
                </span>
            </div>
            <Slider
                range
                min={0}
                max={maxPrice}
                value={priceRange}
                onChange={(value) => setPriceRange(value)}
                trackStyle={[{ backgroundColor: "black" }]} // Applique la couleur noire à la piste du slider
                handleStyle={[
                    // Applique la couleur noire aux poignées du slider
                    { backgroundColor: "white", borderColor: "black" },
                    { backgroundColor: "white", borderColor: "black" },
                ]}
                railStyle={{ backgroundColor: "gray" }} // Applique la couleur grise au rail du slider
            />

            <div className="flex justify-center">
                <Link
                    href={`/shop?price_max=${priceRange[1]}&price_min=${priceRange[0]}`}
                >
                    <button
                        onClick={handleClick}
                        className="bg-white border-black border-2 text-black font-bold py-2 px-4 rounded flex items-center mt-5" // Add tailwind classes
                    >
                        Apply
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PriceFilter;
