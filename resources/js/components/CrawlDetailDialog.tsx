import React, { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"

const crawlSummaryList = [
  "Thu thập dữ liệu từ PNJ, DOJI, SJC",
  "Sử dụng các thư viện Python hỗ trợ crawl dữ liệu",
  "Lưu trữ dữ liệu vào hệ quản trị CSDL PostgreSQL trên Cloud",
]

const crawlSections = [
  {
    title: "Cấu hình và thiết kế Model",
    description: `Trước tiên, hệ thống được cấu hình để hỗ trợ crawl từ nhiều nguồn khác nhau, bao gồm định nghĩa các schema dữ liệu, hàm xử lý chuẩn hóa và kiểm tra dữ liệu đầu vào.`,
    image: "/images/model-config.png",
  },
  {
    title: "Crawl dữ liệu từ PNJ",
    description: `Dữ liệu từ website PNJ được thu thập bằng Python sử dụng thư viện requests và BeautifulSoup. Hệ thống định kỳ kiểm tra và cập nhật giá vàng.`,
    image: "/images/pnj-crawl.png",
  },
  {
    title: "Crawl dữ liệu từ SJC",
    description: `Tương tự PNJ, trang web SJC được crawl và xử lý HTML để lấy dữ liệu giá vàng từng khu vực. Dữ liệu sau đó được định dạng và đưa vào pipeline xử lý.`,
    image: "/images/sjc-crawl.png",
  },
  {
    title: "Crawl dữ liệu từ DOJI",
    description: `Trang web DOJI có cấu trúc HTML riêng, cần xử lý XPath và CSS selector phù hợp. Hệ thống đảm bảo crawl chính xác các loại vàng và giá tương ứng.`,
    image: "/images/doji-crawl.png",
  },
  {
    title: "Lưu trữ vào CSDL PostgreSQL",
    description: `Dữ liệu được lưu trữ vào PostgreSQL Cloud, với cấu trúc bảng rõ ràng cho từng nguồn dữ liệu. Quá trình insert có kiểm tra trùng lặp và hỗ trợ backup.`,
    image: "/images/postgresql.png",
  },
]

export function CrawlDetailDialog() {
  const [index, setIndex] = useState(0)

  const next = () => {
    if (index < crawlSections.length - 1) {
      setIndex((prev) => prev + 1)
    }
  }

  const prev = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1)
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild onClick={() => setIndex(0)}>
        <Card className="relative group cursor-pointer bg-zinc-100 dark:bg-zinc-800 border dark:border-zinc-700 p-4 space-y-4 hover:shadow-lg transition-shadow">
          <h4 className="font-semibold text-lg">Xử lý Crawl Dữ liệu</h4>
          <ul className="list-disc pl-5 text-zinc-600 dark:text-zinc-300 space-y-1">
            {crawlSummaryList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <img
            src="/images/crawl.png"
            alt="Crawl minh họa"
            className="rounded-md w-full aspect-video object-cover border border-zinc-300 dark:border-zinc-700"
          />
          <div className="absolute top-0 right-0 w-8 h-8 flex justify-center items-center bg-black/90 text-white rounded-tr-xl rounded-bl-md group-hover:w-full group-hover:h-full group-hover:bg-black/40 group-hover:rounded-xl  transition-all duration-300 ease-in-out">
            <p className="hidden pr-1 group-hover:block text-sm">xem chi tiết</p>
            <ArrowUpRight size={24}/>
          </div>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg scrollbar-thin">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">
            {crawlSections[index].title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <img
            src={crawlSections[index].image}
            alt={crawlSections[index].title}
            className={`rounded-lg w-auto object-contain object-center border border-zinc-300 dark:border-zinc-700 shadow-md`}
          />
          <p className="text-base leading-relaxed whitespace-pre-wrap text-zinc-800 dark:text-zinc-200">
            {crawlSections[index].description}
          </p>
            <div className="">
            <Button asChild>
              <a
                href="https://github.com/Cheese3008/GoldPrice_Analysis"
                target="_blank"
                rel="noopener noreferrer"
              >
                Xem mã nguồn trên GitHub
              </a>
            </Button>
          </div>
          <div className="flex items-center justify-between mt-4">
                      <button
                        onClick={prev}
                        disabled={index === 0}
                        className="flex items-center gap-1 text-sm px-3 py-2 border rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50"
                      >
                        <ChevronLeft size={16} /> Trước
                      </button>
                      {index === crawlSections.length - 1 ? (
                        <DialogClose asChild>
                          <button className="bg-black text-white px-4 py-2 rounded text-sm hover:opacity-90">
                            Kết thúc
                          </button>
                        </DialogClose>
                      ) : (
                        <button
                          onClick={next}
                          className="flex items-center gap-1 text-sm px-3 py-2 border rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          Tiếp <ChevronRight size={16} />
                        </button>
                      )}
                    </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
