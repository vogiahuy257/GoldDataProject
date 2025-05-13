import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Link } from "@inertiajs/react"
import { ChevronRight } from "lucide-react"

const metadata = {
  course: {
    name: "Kỹ thuật lập trình trong phân tích dữ liệu",
    class: "CNTT.CQ.02",
    topic: "CRAWL VÀ HIỂN THỊ TRỰC QUAN DỮ LIỆU VỀ GIÁ VÀNG TRÊN CÁC TRANG WEB PNJ, DOJI, SJC",
    description: "Đề tài này nhằm thu thập và hiển thị trực quan dữ liệu về giá vàng từ các trang web PNJ, DOJI và SJC. Dữ liệu sẽ được crawl từ các trang web này và lưu trữ vào cơ sở dữ liệu PostgreSQL trên Cloud. Sau đó, dữ liệu sẽ được hiển thị trên giao diện người dùng sử dụng React và TailwindCSS.",

  },
  crawl: {
    title: "Xử lý Crawl Dữ liệu",
    details: [
      "Thu thập dữ liệu từ PNJ, DOJI, SJC",
      "Sử dụng các thư viện Python hỗ trợ crawl dữ liệu",
      "Lưu trữ dữ liệu vào hệ quản trị CSDL PostgreSQL trên Cloud",
    ],
    image: "/images/crawl.png", // Đường dẫn ảnh minh họa crawl
  },
  frontend: {
    title: "Công Nghệ Phát Triển Giao Diện",
    details: [
      "Laravel",
      "ReactJS, TailwindCSS, shadcn/ui",
      "Deploy Laravel Cloud",
      "Database PostgreSQL",
    ],
    image: "/images/frontend.png", // Đường dẫn ảnh minh họa giao diện
  },
  team: {
    name: "Nhóm 16 - Kỹ thuật lập trình trong phân tích dữ liệu",
    members: [
      {
        id: "2224802010822",
        name: "Võ Gia Huy",
        tasks: ["Phát triển Giao diện", "Cwarl dữ liệu trang PNG"],
      },
      {
        id: "2224802010476",
        name: "Lê Nguyễn Bảo Trân",
        tasks: ["Gửi crawl dữ liệu lên database", "Crawl dữ liệu trang SJC"],
      },
      {
        id: "2224802010846",
        name: "Lê Thị Ngọc Mai",
        tasks: ["Crawl dữ liệu trang DOJI"],
      },
    ],
  },
}

export function CourseIntroduction({ auth }: any) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-white justify-center lg:p-4">
      {/* 1. Thông tin môn học */}
      <Card className="w-full max-w-6xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 md:p-8 space-y-10">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Môn học: {metadata.course.name}</h1>
          <h2 className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400">Lớp học: {metadata.course.class}</h2>
          <p className="text-md text-zinc-500 dark:text-zinc-400">Giảng viên: Nguyễn Thế Bảo</p>
        </div>
      </Card>
      <Card className="mt-8 w-full max-w-6xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 md:p-8 space-y-10">
        {/* 2. Tên đề tài */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Tên Đề Tài</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">{metadata.course.topic}</p>
          <p className="text-md text-zinc-500 dark:text-zinc-400">{metadata.course.description}</p>
          {auth.user ? (
            <Link
              href={route('dashboard')}
              className="flex justify-center w-max m-auto items-center gap-2 mt-6 rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
            >
              Go to Dashboard
              <ChevronRight size={18} />
            </Link>
          ) : (
              <Link
                href={route('login')}
                className="flex justify-center w-max m-auto items-center gap-2 mt-6 rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
              >
                Join and Log In
                <ChevronRight size={18}/>
              </Link>
          )}
        </div>


        {/* 3. Giới thiệu đề tài */}
        <div className="space-y-8">
          <h3 className="text-xl font-semibold text-center">Giới Thiệu Đề Tài</h3>
          <div className="grid md:grid-cols-2 gap-6">

            {/* Crawl Data */}
            <Card className="bg-zinc-100 dark:bg-zinc-800 border dark:border-zinc-700 p-4 space-y-4">
              <h4 className="font-semibold text-lg">{metadata.crawl.title}</h4>
              <ul className="list-disc pl-5 text-zinc-600 dark:text-zinc-300 space-y-1">
                {metadata.crawl.details.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <img
                src={metadata.crawl.image}
                alt="Crawl minh họa"
                className="rounded-md w-full aspect-video object-cover border border-zinc-300 dark:border-zinc-700"
              />
            </Card>

            {/* Frontend Tech */}
            <Card className="bg-zinc-100 dark:bg-zinc-800 border dark:border-zinc-700 p-4 space-y-1">
              <h4 className="font-semibold text-lg">{metadata.frontend.title}</h4>
              <ul className="list-disc pl-5 text-zinc-600 dark:text-zinc-300 space-y-1">
                {metadata.frontend.details.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <img
                src={metadata.frontend.image}
                alt="Frontend minh họa"
                className="rounded-md w-full aspect-video object-cover border border-zinc-300 dark:border-zinc-700"
              />
            </Card>
          </div>
        </div>

        <Separator className="bg-zinc-300 dark:bg-zinc-800" />

        {/* 4. Giới thiệu nhóm thực hiện */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-center">Giới Thiệu Nhóm Thực Hiện</h3>
          <p className="text-center text-zinc-500 dark:text-zinc-400">{metadata.team.name}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metadata.team.members.map((student) => (
              <Card key={student.id} className="bg-zinc-50 dark:bg-zinc-800 border dark:border-zinc-700 overflow-hidden">
                <div className="px-4 space-y-4">
                  <div>
                    <h4 className="font-medium">{student.name}</h4>
                    <p className="text-sm mt-1 text-zinc-500 dark:text-zinc-400">Mã SV: {student.id}</p>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium mb-2">Công Việc:</h5>
                    <ul className="text-sm text-zinc-600 dark:text-zinc-300 space-y-1">
                      {student.tasks.map((task, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-zinc-500 dark:text-zinc-400">•</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
