"use client";

import React, { useEffect, useState } from "react";
import { adminAPI } from "@/lib/api";
import { Order } from "@/types";
import { Button } from "@/components/ui/button";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [form, setForm] = useState({
    status: "",
    payment_status: "",
    tracking_number: "",
    notes: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await adminAPI.getOrders();
        setOrders(Array.isArray(response.data) ? response.data : response.data.items || []);
      } catch (err: any) {
        setError(err.message || "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const openUpdateModal = (order: Order) => {
    setSelectedOrder(order);
    setForm({
      status: order.status || "",
      payment_status: order.payment_status || "",
      tracking_number: order.tracking_number || "",
      notes: "",
    });
    setFormError("");
    setShowModal(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    setFormLoading(true);
    setFormError("");
    try {
      const response = await adminAPI.updateOrderStatus(selectedOrder.id, form);
      // Use the updated order from the response if available
      const updatedOrder = response?.data || null;
      setOrders((prev) =>
        prev.map((order) =>
          order.id === selectedOrder.id
            ? updatedOrder
              ? { ...order, ...updatedOrder }
              : {
                  ...order,
                  status: form.status as Order["status"],
                  payment_status: form.payment_status as Order["payment_status"],
                  tracking_number: form.tracking_number,
                }
            : order
        )
      );
      setShowModal(false);
    } catch (err: any) {
      setFormError(err.message || "Failed to update order.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Orders</h1>
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading orders...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Order #</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-900">{order.order_number}</td>
                    <td className="px-4 py-2 text-gray-700 capitalize">{order.status}</td>
                    <td className="px-4 py-2 text-gray-700 capitalize">{order.payment_status}</td>
                    <td className="px-4 py-2 text-gray-900 font-semibold">
                      {typeof order.total_amount === 'number'
                        ? `$${order.total_amount.toFixed(2)}`
                        : `$${parseFloat(order.total_amount).toFixed(2)}`}
                    </td>
                    <td className="px-4 py-2 text-gray-500">{new Date(order.created_at).toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <Button size="sm" variant="secondary" onClick={() => openUpdateModal(order)}>
                        Update
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Update Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Update Order</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                >
                  <option value="">Select status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                <select
                  name="payment_status"
                  value={form.payment_status}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                >
                  <option value="">Select payment status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tracking Number</label>
                <input
                  type="text"
                  name="tracking_number"
                  value={form.tracking_number}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleFormChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                />
              </div>
              {formError && <div className="text-red-500 text-sm">{formError}</div>}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={formLoading}>
                  {formLoading ? "Saving..." : "Update"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 