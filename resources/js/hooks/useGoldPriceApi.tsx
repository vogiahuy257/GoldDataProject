import { useState } from 'react';
import { GoldPrice } from '../types/GoldPrice';

const BASE_URL = '/api/gold-prices';

export const useGoldPriceApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Hàm lấy tất cả dữ liệu
  const getAll = async (): Promise<GoldPrice[]> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) {
        throw new Error('Failed to fetch all');
      }
      const data = await res.json();
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch all');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Hàm lấy dữ liệu theo ID
  const getById = async (id: number): Promise<GoldPrice | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch by ID');
      }
      const data = await res.json();
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch by ID');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Hàm lấy dữ liệu theo nguồn (SJC, DOJI, PNJ)
  const getBySource = async (source: 'SJC' | 'DOJI' | 'PNJ'): Promise<GoldPrice[]> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/source/${source}`);
      if (!res.ok) {
        throw new Error('Failed to fetch by source');
      }
      const data = await res.json();
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch by source');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Hàm tạo dữ liệu mới
  const create = async (data: Omit<GoldPrice, 'id'>): Promise<GoldPrice | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error('Failed to create');
      }
      const createdData = await res.json();
      return createdData;
    } catch (err: any) {
      setError(err.message || 'Failed to create');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Hàm cập nhật dữ liệu
  const update = async (id: number, data: Partial<Omit<GoldPrice, 'id'>>): Promise<GoldPrice | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error('Failed to update');
      }
      const updatedData = await res.json();
      return updatedData;
    } catch (err: any) {
      setError(err.message || 'Failed to update');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Hàm xóa dữ liệu
  const remove = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete');
      }
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getAll,
    getById,
    getBySource,
    create,
    update,
    remove,
  };
};
