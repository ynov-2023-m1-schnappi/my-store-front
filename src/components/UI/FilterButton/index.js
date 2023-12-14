"use client";
import React from "react";
import { FaFilter } from "react-icons/fa";

const FilterButton = (props) => {
    return (
        <button
            onClick={props.onClick}
            className="bg-white border-black border-2 text-black font-bold py-2 px-4 rounded flex items-center mr-10" // Add tailwind classes
        >
            {props.title}
            <FaFilter className="ml-1" />
        </button>
    );
};

export default FilterButton;
