import { GoldPriceChart } from '@/components/gold-price-chart-all';
import { GoldPriceChartCard } from '@/components/GoldPriceChartCard';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {useEffect,useState} from 'react';
import { useGoldPriceApi } from "../hooks/useGoldPriceApi";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface GoldPrice {
  source: string; // Hãng vàng
  date: string | null; // Ngày
  time: string | null; // Giờ
  buy_price: string | null; // Giá mua
  sell_price: string | null; // Giá bán
}

export default function Dashboard() {

      const { getAll } = useGoldPriceApi();
    const [goldPriceData, setGoldPriceData] = useState<GoldPrice[]>([]);

    useEffect(() => {
        const fetchData = async () => {
        const data = await getAll();
        setGoldPriceData(data);
        };

        fetchData();
    }, []);
    const sjcData = goldPriceData.filter((item) => item.source === 'SJC');
    const dojiData = goldPriceData.filter((item) => item.source === 'DOJI');
    const pnjData = goldPriceData.filter((item) => item.source === 'PNJ');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <GoldPriceChartCard title="SJC" data={sjcData} />
                        <GoldPriceChartCard title="DOJI" data={dojiData} />
                        <GoldPriceChartCard title="PNJ" data={pnjData} />
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <GoldPriceChart />
                </div>
            </div>
        </AppLayout>
    );
}
