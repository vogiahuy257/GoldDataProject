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
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const frontendSummaryList = [
  "Laravel",
  "ReactJS, TailwindCSS, shadcn/ui",
  "Deploy Laravel Cloud",
  "Database PostgreSQL",
]

const frontendDetailText = `Frontend được xây dựng trên nền ReactJS với TailwindCSS giúp tạo giao diện nhanh, đẹp, dễ bảo trì. Các component được tối ưu để hỗ trợ dark mode, responsive và tích hợp tốt với backend qua API RESTful.`

const sections = [
  {
    title: "Backend - Laravel MVC",
    description: `Hệ thống backend sử dụng Laravel - một PHP framework mạnh mẽ theo mô hình MVC (Model - View - Controller)...`,
    image: "/images/backend.png",
  },
  {
    title: "Frontend - React + TailwindCSS + shadcn/ui",
    description: `Phía giao diện sử dụng ReactJS kết hợp TailwindCSS để xây dựng UI hiện đại...`,
    image: "/images/frontend-ui.png",
  },
  {
    title: "Database - PostgreSQL Cloud",
    description: `Dữ liệu được lưu trữ và truy vấn trên hệ quản trị cơ sở dữ liệu PostgreSQL...`,
    image: "/images/postgresql.png",
  },
  {
    title: "Triển khai trên Laravel Cloud",
    description: `Toàn bộ hệ thống được deploy trên Laravel Cloud, hỗ trợ CI/CD, SSL...`,
    image: "/images/frontend.png",
  },
]

export function FrontendDetailDialog() {
    const [index, setIndex] = useState(0)

  const next = () => {
    if (index < sections.length - 1) {
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
        <Card className="relative group cursor-pointer bg-zinc-100 dark:bg-zinc-800 border dark:border-zinc-700 p-4 space-y-1 hover:shadow-lg transition-shadow">
          <h4 className="font-semibold text-lg">Công Nghệ Phát Triển Giao Diện</h4>
          <ul className="list-disc pl-5 text-zinc-600 dark:text-zinc-300 space-y-1">
            {frontendSummaryList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <img
            src="/images/frontend.png"
            alt="Frontend minh họa"
            className="rounded-md w-full aspect-video object-cover border border-zinc-300 dark:border-zinc-700"
          />
          <div className="absolute top-0 right-0 w-8 h-8 flex justify-center items-center bg-black/90 text-white rounded-tr-xl rounded-bl-md group-hover:w-full group-hover:h-full group-hover:bg-black/40 group-hover:rounded-xl  transition-all duration-300 ease-in-out">
            <p className="hidden pr-1 group-hover:block text-sm">xem chi tiết</p>
            <ArrowUpRight size={24}/>
          </div>
        </Card>
      </DialogTrigger>
      
       
      <DialogContent className="max-h-[90vh] overflow-y-auto p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg scrollbar-thin">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">
            {sections[index].title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 relative">
          <img
            src={sections[index].image}
            alt={sections[index].title}
            className="rounded-lg object-contain object-center border border-zinc-300 dark:border-zinc-700 shadow-md"
          />
          <p className="text-base leading-relaxed whitespace-pre-wrap text-zinc-800 dark:text-zinc-200">
            {sections[index].description}
          </p>

          <div className="">
            <Button asChild>
              <a
                href="https://github.com/vogiahuy257/GoldDataProject"
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
            {index === sections.length - 1 ? (
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
