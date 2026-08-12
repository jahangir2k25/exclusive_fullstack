import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const CategoryForm = () => {
    const [categoryName, setCategoryName] = useState("")
    const [allCategory, setAllCategory] = useState([])
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editCategoryName, setEditCategoryName] = useState("")
    const [editCategoryId, setEditCategoryId] = useState(null)

    const refreshCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/v1/category")
            setAllCategory(response.data.category || [])
        } catch (error) {
            console.log(error)
        }
    }

    const addCategory = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/v1/category", {
                categoryName: categoryName,
            })
            console.log(response)
            toast(response.data.message)
            if (response.data.success) {
                setCategoryName("")
                await refreshCategories()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddCategory = (e) => {
        e.preventDefault()
        addCategory()
        console.log(categoryName)
    }

    const deleteCategory = async (categoryId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/v1/category/${categoryId}`)
            console.log(response)
            toast(response.data.message)
            if (response.data.success) {
                await refreshCategories()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const openEditModal = (item) => {
        setEditCategoryId(item._id)
        setEditCategoryName(item.categoryName)
        setIsEditOpen(true)
    }

    const handleUpdateCategory = async (e) => {
        e.preventDefault()

        if (!editCategoryId || !editCategoryName.trim()) {
            toast("Category name is required")
            return
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/v1/category/${editCategoryId}`, {
                categoryName: editCategoryName.trim(),
            })
            console.log(response)
            toast(response.data.message)

            if (response.data.success) {
                setAllCategory((prev) =>
                    prev.map((item) =>
                        item._id === editCategoryId
                            ? { ...item, categoryName: editCategoryName.trim() }
                            : item
                    )
                )
                setIsEditOpen(false)
                setEditCategoryId(null)
                setEditCategoryName("")
                await refreshCategories()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        refreshCategories()
    }, [])

    return (
        <div className="max-w-3xl rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="mb-6">
                <p className="text-sm uppercase tracking-[0.2em] text-[#DB4444]">Category section</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Create a new category</h2>
            </div>

            <form className="grid gap-5 sm:grid-cols-[1fr_auto] items-center">
                <label className="space-y-2">
                    <span className="block text-xl font-medium text-slate-700">Category Name:</span>
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
                    className="h-12.5 rounded-full bg-[#DB4444] px-6 text-sm font-semibold text-white transition hover:bg-[#b63636] cursor-pointer"
                >
                    Add Category
                </button>
            </form>

            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                    <h3 className="text-lg font-semibold text-slate-900">Category List</h3>
                    <span className="rounded-full bg-[#DB4444]/10 px-3 py-1 text-xs font-medium text-[#DB4444]">
                        {allCategory?.length} Categories
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead className="bg-slate-50 text-sm uppercase tracking-[0.12em] text-slate-500">
                            <tr>
                                <th className="px-5 py-4 font-semibold">SL</th>
                                <th className="px-5 py-4 font-semibold">Category Name</th>
                                <th className="px-5 py-4 text-right font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                            {allCategory?.map((item, index) => (
                                <tr key={item._id} className="transition hover:bg-slate-50">
                                    <td className="px-5 py-4">
                                        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
                                            {index + 1}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
                                            {item.categoryName}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => openEditModal(item)}
                                                className="rounded-full border border-[#DB4444]/20 bg-[#DB4444]/5 px-3 py-1.5 text-xs font-semibold text-[#DB4444] transition hover:border-[#DB4444] hover:bg-[#DB4444] hover:text-white cursor-pointer"
                                            >
                                                Edit
                                            </button>
                                            <button onClick={() => deleteCategory(item._id)} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-[#DB4444] cursor-pointer">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-200">
                        <div className="mb-5 flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-slate-900">Edit Category</h3>
                            <button
                                type="button"
                                onClick={() => setIsEditOpen(false)}
                                className="rounded-full bg-slate-100 px-2.5 py-1 text-sm text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleUpdateCategory} className="space-y-4">
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-slate-700">Category Name</span>
                                <input
                                    type="text"
                                    value={editCategoryName}
                                    onChange={(e) => setEditCategoryName(e.target.value)}
                                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#DB4444] focus:ring-2 focus:ring-[#DB4444]/20"
                                    placeholder="Enter category name"
                                />
                            </label>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEditOpen(false)}
                                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-full bg-[#DB4444] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#b63636]"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CategoryForm;