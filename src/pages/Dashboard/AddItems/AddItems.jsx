import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const imageFile = { image: data.image[0] };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { 'content-type': 'multipart/form-data' }
            });

            if (res.data.success) {
                const menuItem = {
                    name: data.name,
                    category: data.category,
                    price: parseFloat(data.price),
                    recipe: data.recipe,
                    image: res.data.data.display_url
                };

                const menuRes = await axiosSecure.post('/menu', menuItem);
                if (menuRes.data.insertedId) {
                    reset();
                    Swal.fire({
                        icon: "success",
                        title: `${data.name} added successfully!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        } catch (error) {
            Swal.fire({ icon: "error", title: "Something went wrong!" });
        }
        setLoading(false);
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
            <SectionTitle heading="Add New Item" subHeading="What's cooking?" />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="label font-semibold">Recipe Name*</label>
                        <input type="text" {...register('name', { required: true })} placeholder="Enter recipe name" className="input input-bordered w-full" required />
                    </div>
                    <div>
                        <label className="label font-semibold">Category*</label>
                        <select {...register('category', { required: true })} className="select select-bordered w-full">
                            <option disabled selected>Select a category</option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="drinks">Drinks</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="label font-semibold">Price*</label>
                    <input type="number" {...register('price', { required: true })} placeholder="Enter price" className="input input-bordered w-full" required />
                </div>
                <div>
                    <label className="label font-semibold">Recipe Details</label>
                    <textarea {...register('recipe')} className="textarea textarea-bordered w-full h-24" placeholder="Enter recipe details"></textarea>
                </div>
                <div>
                    <label className="label font-semibold">Upload Image*</label>
                    <input type="file" {...register('image', { required: true })} className="file-input w-full" />
                </div>
                <button className={`btn w-full ${loading ? 'btn-disabled' : ''}`} disabled={loading}>
                    {loading ? "Adding..." : "Add Item"} <FaUtensils className="ml-4" />
                </button>
            </form>
        </div>
    );
};

export default AddItems;