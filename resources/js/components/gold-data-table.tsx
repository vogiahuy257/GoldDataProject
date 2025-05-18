import { useEffect, useMemo, useState } from 'react';
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
import { Trash2, Plus, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type SourceType = 'PNJ' | 'SJC' | 'DOJI';

interface GoldPriceTableProps {
  source: SourceType;
}

type SortOption = 'buy_asc' | 'buy_desc' | 'sell_asc' | 'sell_desc';

export default function GoldPriceTable({ source }: GoldPriceTableProps) {
  const [data, setData] = useState<GoldPrice[]>([]);
  const { getBySource, loading, error, update, remove, create } = useGoldPriceApi();
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GoldPrice | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>("buy_asc");

  const nowDate = () => new Date().toISOString();

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
      } catch {
        // lỗi đã xử lý trong hook
      }
    };
    fetchData();
  }, [source]);

  const uniqueDates = useMemo(() => {
    const dateSet = new Set(data.map((item) => item.date).filter(Boolean));
    return Array.from(dateSet).sort((a, b) => (b as string).localeCompare(a as string));
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        scraped_at: nowDate(),
      };

      if (editingItem) {
        const updated = await update(editingItem.id, payload);
        if (updated) {
          setData((prev) =>
            prev.map((item) => (item.id === editingItem.id ? updated : item))
          );
        }
      } else {
        const created = await create(payload);
        if (created) {
          setData((prev) => [created, ...prev]);
        }
      }
    } catch {
      // lỗi đã xử lý trong hook
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

  const safeParseFloat = (value: string | null | undefined) => {
    if (!value) return 0; // hoặc Number.MIN_SAFE_INTEGER / Number.MAX_SAFE_INTEGER nếu muốn sắp xếp khác
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };


  const filteredData = data
  .filter((item) => item.gold_type)
  .filter((item) =>
    item.gold_type!.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .filter((item) => !selectedDate || item.date === selectedDate)
  .sort((a, b) => {
    if (!sortOption) return 0;

    switch (sortOption) {
      case 'buy_asc':
        return safeParseFloat(a.buy_price) - safeParseFloat(b.buy_price);
      case 'buy_desc':
        return safeParseFloat(b.buy_price) - safeParseFloat(a.buy_price);
      case 'sell_asc':
        return safeParseFloat(a.sell_price) - safeParseFloat(b.sell_price);
      case 'sell_desc':
        return safeParseFloat(b.sell_price) - safeParseFloat(a.sell_price);
      default:
        return 0;
    }
  });

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-col justify-start gap-4">
        <h2 className="text-xl font-bold text-center">Giá vàng {source}</h2>
        <div className="flex items-center justify-end gap-2">
          <Input
            type="text"
            placeholder="Tìm theo loại vàng..."
            className="w-[250px] mr-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Select value={selectedDate ?? ""} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Tất cả ngày" />
            </SelectTrigger>
            <SelectContent>
              {uniqueDates.map((date) => (
                <SelectItem key={date} value={date ?? ""}>
                  {date}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
           {/* ✅ Thêm Select để chọn sắp xếp */}
          <Select value={sortOption} onValueChange={(val) => setSortOption(val as SortOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sắp xếp theo giá" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buy_asc">Giá mua tăng dần</SelectItem>
              <SelectItem value="buy_desc">Giá mua giảm dần</SelectItem>
              <SelectItem value="sell_asc">Giá bán tăng dần</SelectItem>
              <SelectItem value="sell_desc">Giá bán giảm dần</SelectItem>
            </SelectContent>
          </Select>

          <Dialog
            open={open}
            onOpenChange={(isOpen) => {
              setOpen(isOpen);
              if (!isOpen) setEditingItem(null);
            }}
          >
            <DialogTrigger asChild>
              <Button className="cursor-pointer">
                <Plus className="h-4 w-4" /> Thêm
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                  {editingItem ? 'Chỉnh sửa giá vàng' : 'Thêm giá vàng mới'}
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 gap-4 py-4">
                <div className="space-y-1">
                  <Label htmlFor="source">Nguồn</Label>
                  <Input
                    id="source"
                    name="source"
                    value={formData.source}
                    readOnly
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="gold_type">Loại vàng</Label>
                  <Input
                    id="gold_type"
                    name="gold_type"
                    placeholder="VD: Vàng 9999"
                    value={formData.gold_type ?? ''}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="buy_price">Giá mua</Label>
                  <Input
                    id="buy_price"
                    name="buy_price"
                    type="number"
                    placeholder="VD: 7400000"
                    value={formData.buy_price ?? ''}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="sell_price">Giá bán</Label>
                  <Input
                    id="sell_price"
                    name="sell_price"
                    type="number"
                    placeholder="VD: 7450000"
                    value={formData.sell_price ?? ''}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="date">Ngày</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date ?? ''}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="time">Giờ</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time ?? ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button onClick={handleSubmit}>{editingItem ? 'Cập nhật' : 'Lưu'}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
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
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.source || '-'}</TableCell>
                    <TableCell>{item.gold_type || '-'}</TableCell>
                    <TableCell>{item.buy_price || '-'}</TableCell>
                    <TableCell>{item.sell_price || '-'}</TableCell>
                    <TableCell>{item.date || '-'}</TableCell>
                    <TableCell>{item.time || '-'}</TableCell>
                    <TableCell>{item.scraped_at || '-'}</TableCell>
                    <TableCell className="flex gap-2 m-auto">
                      <Button size="sm" className="cursor-pointer" variant="outline" onClick={() => handleEdit(item)}>
                        Sửa
                      </Button>
                      <Button size="sm" className="cursor-pointer" variant="destructive" onClick={() => handleDelete(item.id)}>
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
