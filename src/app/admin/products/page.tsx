"use client";

import { useEffect, useState } from "react";
import { productAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  base_price: number;
  is_active: boolean;
  is_featured: boolean;
  is_customizable: boolean;
  meta_title?: string;
  meta_description?: string;
  specifications: Record<string, string>;
  images: string[];
}

export default function AdminProductsPage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<Partial<Product>>({
    name: "",
    slug: "",
    description: "",
    short_description: "",
    base_price: 0,
    is_active: true,
    is_featured: false,
    is_customizable: false,
    meta_title: "",
    meta_description: "",
    specifications: {},
    images: [],
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!isAuthenticated || !user?.is_admin) {
      router.push('/auth/login');
      return;
    }
    fetchProducts();
    // eslint-disable-next-line
  }, [isAuthenticated, user]);

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await productAPI.getProducts();
      setProducts(data.items || data);
    } catch (err: any) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setModalMode("create");
    setForm({
      name: "",
      slug: "",
      description: "",
      short_description: "",
      base_price: 0,
      is_active: true,
      is_featured: false,
      is_customizable: false,
      meta_title: "",
      meta_description: "",
      specifications: {},
      images: [],
    });
    setFormError("");
    setShowModal(true);
    setSelectedProduct(null);
  };

  const openEditModal = (product: Product) => {
    setModalMode("edit");
    setForm({ ...product });
    setFormError("");
    setShowModal(true);
    setSelectedProduct(product);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" && e.target instanceof HTMLInputElement ? e.target.checked : value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    try {
      if (modalMode === "create") {
        await productAPI.createProduct(form);
      } else if (modalMode === "edit" && selectedProduct) {
        await productAPI.updateProduct(selectedProduct.id, form);
      }
      setShowModal(false);
      fetchProducts();
    } catch (err: any) {
      setFormError(err.message || "Failed to save product.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`Delete product "${product.name}"?`)) return;
    try {
      await productAPI.deleteProduct(product.id);
      fetchProducts();
    } catch (err: any) {
      alert(err.message || "Failed to delete product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <Button onClick={openCreateModal}>+ New Product</Button>
        </div>
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading products...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No products found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Active</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {products.map((prod) => (
                  <tr key={prod.id}>
                    <td className="px-4 py-2 font-medium text-gray-900">{prod.name}</td>
                    <td className="px-4 py-2 text-gray-700">{prod.slug}</td>
                    <td className="px-4 py-2">
                      ${Number(prod.base_price).toFixed(2)}
                    </td>
                    <td className="px-4 py-2">{prod.is_active ? "Yes" : "No"}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => openEditModal(prod)}>Edit</Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(prod)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for create/edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">
              {modalMode === "create" ? "Create Product" : "Edit Product"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                  maxLength={100}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Slug *</label>
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleFormChange}
                  required
                  maxLength={100}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Short Description</label>
                <input
                  type="text"
                  name="short_description"
                  value={form.short_description}
                  onChange={handleFormChange}
                  maxLength={200}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  maxLength={1000}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Base Price *</label>
                <input
                  type="number"
                  name="base_price"
                  value={form.base_price}
                  onChange={handleFormChange}
                  required
                  min={0}
                  step={0.01}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={!!form.is_active}
                  onChange={handleFormChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label className="text-sm text-gray-700">Active</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={!!form.is_featured}
                  onChange={handleFormChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label className="text-sm text-gray-700">Featured</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_customizable"
                  checked={!!form.is_customizable}
                  onChange={handleFormChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label className="text-sm text-gray-700">Customizable</label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                <input
                  type="text"
                  name="meta_title"
                  value={form.meta_title}
                  onChange={handleFormChange}
                  maxLength={200}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                <textarea
                  name="meta_description"
                  value={form.meta_description}
                  onChange={handleFormChange}
                  maxLength={500}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                />
              </div>
              {formError && <div className="text-red-500 text-sm">{formError}</div>}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={formLoading}>
                  {formLoading ? "Saving..." : modalMode === "create" ? "Create" : "Update"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 