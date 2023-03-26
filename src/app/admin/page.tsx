"use client";

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { Users, ShoppingCart, TrendingUp, Package } from 'lucide-react';
import { api } from '@/lib/api';

interface DashboardStats {
  total_users: number;
  total_orders: number;
  total_products: number;
  revenue: number;
}

export default function AdminDashboardPage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated || !user?.is_admin) {
      router.push('/auth/login');
      return;
    }
    const fetchStats = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get('/admin/dashboard');
        setStats(response.data);
      } catch (err: any) {
        setError('Failed to load dashboard stats.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [isAuthenticated, user, router]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      {loading ? (
        <div className="text-center text-gray-500 py-12">Loading dashboard...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-12">{error}</div>
      ) : stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
            <Users className="h-10 w-10 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.total_users}</div>
              <div className="text-gray-600">Total Users</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
            <ShoppingCart className="h-10 w-10 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.total_orders}</div>
              <div className="text-gray-600">Total Orders</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
            <Package className="h-10 w-10 text-purple-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats.total_products}</div>
              <div className="text-gray-600">Total Products</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
            <TrendingUp className="h-10 w-10 text-yellow-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                ${typeof stats.revenue === 'number' ? stats.revenue.toLocaleString() : '0'}
              </div>
              <div className="text-gray-600">Revenue</div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
} 