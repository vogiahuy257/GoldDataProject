import { useEffect, useState } from 'react';
import { type GoldPrice } from '@/types/GoldPrice';
import { useGoldPriceApi } from '@/hooks/useGoldPriceApi';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

type SourceType = 'PNJ' | 'SJC' | 'DOJI';

interface GoldPriceTableProps {
  source: SourceType;
}

export default function GoldPriceTable({ source }: GoldPriceTableProps) {
  const [data, setData] = useState<GoldPrice[]>([]);
  const { getBySource, loading, error,update,remove,create } = useGoldPriceApi();
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GoldPrice | null>(null);
  const [formData, setFormData] = useState<Omit<GoldPrice, 'id'>>({
    source: source,
    gold_type: '',
    buy_price: '',
    sell_price: '',
    date: '',
    time: '',
    scraped_at: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getBySource(source);
        setData(fetchedData);
      } catch (err) {
        // Do nothing here since error is handled from the hook
      }
    };

    fetchData();
  }, [source]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
  try {
    if (editingItem) {
      const updated = await update(editingItem.id, formData);
      if (updated) {
        setData((prev) =>
          prev.map((item) => (item.id === editingItem.id ? updated : item))
        );
      }
    } else {
      const created = await create(formData);
      if (created) {
        setData((prev) => [created, ...prev]);
      }
    }
  } catch {
    // Error đã được xử lý trong hook
  } finally {
    setOpen(false);
    setEditingItem(null);
    setFormData({
      source,
      gold_type: '',
      buy_price: '',
      sell_price: '',
      date: '',
      time: '',
      scraped_at: '',
    });
  }
};

const handleDelete = async (id: number) => {
  const success = await remove(id);
  if (success) {
    setData((prev) => prev.filter((item) => item.id !== id));
  }
};

const handleEdit = (item: GoldPrice) => {
  setEditingItem(item);
  setFormData({
    source: item.source,
    gold_type: item.gold_type,
    buy_price: item.buy_price,
    sell_price: item.sell_price,
    date: item.date,
    time: item.time,
    scraped_at: item.scraped_at,
  });
  setOpen(true);
};

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Giá vàng {source}</h2>
        <Dialog
          open={open}
          onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) setEditingItem(null);
          }}
        >
          <DialogTrigger asChild>
            <Button className=' cursor-pointer'>
              <Plus className="h-4 w-4" />Thêm
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                {editingItem ? 'Chỉnh sửa giá vàng' : 'Thêm giá vàng mới'}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-4 py-4">
              {[
                { label: 'Nguồn', name: 'source' },
                { label: 'Loại vàng', name: 'gold_type' },
                { label: 'Giá mua', name: 'buy_price' },
                { label: 'Giá bán', name: 'sell_price' },
                { label: 'Ngày (YYYY-MM-DD)', name: 'date' },
                { label: 'Giờ (HH:mm:ss)', name: 'time' },
                { label: 'Scraped at (ISO)', name: 'scraped_at' },
              ].map((field) => (
                <div key={field.name} className="space-y-1">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder={field.label}
                    value={(formData as any)[field.name]}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>

            <DialogFooter>
              <Button onClick={handleSubmit}>{editingItem ? 'Cập nhật' : 'Lưu'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="rounded-xl border shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center p-6">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Đang tải dữ liệu...</span>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nguồn</TableHead>
                  <TableHead>Loại vàng</TableHead>
                  <TableHead>Giá mua</TableHead>
                  <TableHead>Giá bán</TableHead>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Giờ</TableHead>
                  <TableHead>Scraped at</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.source || '-'}</TableCell>
                    <TableCell>{item.gold_type || '-'}</TableCell>
                    <TableCell>{item.buy_price || '-'}</TableCell>
                    <TableCell>{item.sell_price || '-'}</TableCell>
                    <TableCell>{item.date || '-'}</TableCell>
                    <TableCell>{item.time || '-'}</TableCell>
                    <TableCell>{item.scraped_at || '-'}</TableCell>
                    <TableCell className="flex gap-2 m-auto">
                      <Button size="sm" className=' cursor-pointer' variant="outline" onClick={() => handleEdit(item)}>
                        Sửa
                      </Button>
                      <Button size="sm" className=' cursor-pointer' variant="destructive" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {data.length === 0 && (
              <div className="p-4 text-center text-muted-foreground">Không có dữ liệu</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
