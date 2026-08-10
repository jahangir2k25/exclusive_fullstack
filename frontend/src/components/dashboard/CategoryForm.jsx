import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CategoryForm = () => {
    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/v1/category");
            setCategories(response.data.category || []);
        } catch (error) {
            console.log(error);
        }
    };

    const addCategory = async () => {
        const trimmedName = categoryName.trim();

        if (!trimmedName) {
            toast("Category name is required!");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/v1/category", {
                categoryName: trimmedName,
            });
            toast(response.data.message);
            setCategoryName("");
            fetchCategories();
        } catch (error) {
            console.log(error);
            toast(error.response?.data?.message || "Failed to create category");
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/v1/category/${categoryId}`);
            toast(response.data.message);
            fetchCategories();
        } catch (error) {
            console.log(error);
            toast(error.response?.data?.message || "Failed to delete category");
        }
    };

    const handleAddCategory = (e) => {
        e.preventDefault();
        addCategory();
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="max-w-4xl space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#DB4444]">Category section</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Create a new category</h2>
            </div>

            <form className="grid gap-5 sm:grid-cols-[1fr_auto]">
                <label className="space-y-2">
                    <span className="block text-sm font-medium text-slate-700">Category name</span>
                    <input
                        type="text"
                        placeholder="Example: Electronics"
                        className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#DB4444] focus:ring-2 focus:ring-[#DB4444]/20"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </label>

                <button
                    type="submit"
                    onClick={handleAddCategory}
                    disabled={isLoading}
                    className="h-14 rounded-full bg-[#DB4444] px-6 text-sm font-semibold text-white transition hover:bg-[#b63636] disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {isLoading ? "Saving..." : "Add Category"}
                </button>
            </form>

            <div className="rounded-3xl border border-slate-200 bg-white p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">Existing categories</h3>
                    <span className="text-sm text-slate-500">{categories.length} items</span>
                </div>

                {categories.length === 0 ? (
                    <p className="text-sm text-slate-500">No categories yet.</p>
                ) : (
                    <ul className="space-y-3">
                        {categories.map((item) => (
                            <li key={item._id} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                                <span className="font-medium text-slate-800">{item.categoryName}</span>
                                <button
                                    type="button"
                                    onClick={() => deleteCategory(item._id)}
                                    className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-600 cursor-pointer"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CategoryForm;