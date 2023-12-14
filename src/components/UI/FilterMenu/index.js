"use client";
// components/PriceFilterMenu.js
import React from "react";
import { useEffect } from "react";
import PriceFilter from "@/components/UI/PriceFilter";
import { FaTimes } from "react-icons/fa";

const FilterMenu = ({
    isOpen,
    onRequestClose,
    onFilterChange,
    onClick,
    maxPrice,
}) => {
    const handleFilterChange = () => {
        onFilterChange();
        onRequestClose();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest(".your-menu-container")) {
                onRequestClose();
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen, onRequestClose]);

    return (
        <div
            className={`your-menu-container fixed right-0 top-0 h-full w-64 bg-white shadow-md transform ${
                isOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform ease-in-out duration-300`}
            style={{ zIndex: 1000 }}
        >
            <div className="p-4 ">
                <div className="flex items-center justify-between border-b-2 border-black mb-8	">
                    <div className="text-2xl">Trier</div>
                    <FaTimes
                        onClick={onRequestClose}
                        className="cursor-pointer"
                    />
                </div>

                <div>
                    <PriceFilter
                        onFilterChange={handleFilterChange}
                        onClick={onClick}
                        maxPrice={maxPrice}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterMenu;
