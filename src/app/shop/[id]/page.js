"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getProduct } from "@/services/api/product.api.js";
import BreadCrumb from "@/components/UI/Breadcrumb";
import TitlePage from "@/components/UI/TitlePage";
import ProductFancyBox from "@/components/products/ProductFancyBox";
import Loader from "@/components/UI/Loader";
import Alert from "@/components/UI/Alert";
import { getBase64 } from "../../../lib/base64";
import Link from "next/link";
import Modal from "@/components/modal";

export default function Page() {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showFancyBox, setShowFancyBox] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        id_product: id,
        name: "",
        last_name: "",
        email: "",
        product_name: "",
    });

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3033/interest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            const data = await response.json();

            if (data.success) {
                setError(null);
                setShowModal(false);
            } else {
                setError(data.error);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                let product = await getProduct(id);
                if (product) {
                    setProduct(product.data);
                    setForm({ ...form, product_name: product.data.name });
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) return <Loader />;

    return (
        <div className="container mx-auto py-12">
            {error && <Alert message={error.message} type="error" />}
            {!product && <Alert message="No products found" type="error" />}
            <BreadCrumb current_page={product?.name} />
            <div className="flex">
                <div className="image_path lg:flex-1">
                    <div
                        onClick={() => setShowFancyBox(true)}
                        className="group/show w-4/5 h-[550px] overflow-hidden cursor-pointer"
                    >
                        <Image
                            className="object-cover h-full w-full group-hover/show:scale-105 transition ease-in-out delay-150 z-1"
                            alt={product.name}
                            src={`https://my-store-ynov.s3.eu-north-1.amazonaws.com/${product.image_path}`}
                            width={500}
                            height={500}
                        />
                    </div>
                </div>
                <div className="content lg:flex-1 p-6">
                    <TitlePage title={product.name} />
                    <p className="mb-3 font-semibold text-lg">
                        {product.price} €
                    </p>
                    <p className="leading-7">{product.description}</p>
                    <Link
                        className="mt-4 inline-flex items-center px-4 py-3 text-sm border border-slate-500 font-medium text-center text-slate-500 bg-white hover:bg-slate-500 hover:text-white"
                        href={`/shop/${product.id}`}
                        onClick={() => {
                            setShowModal(true), setError(null);
                        }}
                    >
                        I am interested
                    </Link>
                </div>
            </div>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <div className="flex flex-col items-center justify-center space-y-4 w-full h-full overflow-y-scroll">
                    <p className=" text-center mt-12 text-slate-500 font-semibold text-lg w-full h-full mt-8">
                        Please fill the form below
                    </p>
                    {error && (
                        <h3 className="text-red-500 text-center">{error}</h3>
                    )}
                    <form
                        className="flex flex-col space-y-4 w-full h-full p-8 items-center sm:p-2"
                        onSubmit={handleOnSubmit}
                    >
                        <label className="flex flex-col space-y-1">
                            <span className="text-sm font-semibold">Name</span>
                            <input
                                className="border border-gray-300 p-2 w-full focus:outline-none focus:border-slate-500"
                                type="text"
                                placeholder="Name"
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                            />
                        </label>
                        <label className="flex flex-col space-y-1">
                            <span className="text-sm font-semibold">
                                Last name
                            </span>
                            <input
                                className="border border-gray-300 p-2 focus:outline-none focus:border-slate-500"
                                type="text"
                                placeholder="Last name"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        last_name: e.target.value,
                                    })
                                }
                            />
                        </label>
                        <label className="flex flex-col space-y-1">
                            <span className="text-sm font-semibold">Email</span>
                            <input
                                className="border border-gray-300 p-2 focus:outline-none focus:border-slate-500"
                                type="email"
                                placeholder="Email"
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                            />
                        </label>
                        <button
                            className="mt-4 inline-flex items-center px-4 py-3 text-sm border border-slate-500 font-medium text-center text-slate-500 bg-white hover:bg-slate-500 hover:text-white"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
