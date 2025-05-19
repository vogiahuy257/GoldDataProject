import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CourseIntroduction } from '@/components/course-introduction';
import AppLogoIcon from '@/components/app-logo-icon';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center py-8 px-2 bg-[#FDFDFC] text-[#1b1b18] justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="fixed z-50 top-0 bor w-full text-sm lg:max-w-5xl">
                    <nav className="flex items-center backdrop-blur-md justify-end gap-4 p-4 shadow-xs rounded-b-md border border-[#19140035] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]">
                        <Link href={route('home')} className='flex justify-center items-center gap-1 mr-auto '>
                            <AppLogoIcon className="size-6 fill-current text-[var(--foreground)] dark:text-white" />
                            <p className="pt-1 text-sm font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Gold Data</p>
                        </Link>
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="w-full mt-16 text-sm lg:max-w-5xl lg:mt-10">
                  {/* phần cần thiết kế thêm các nội dung liện quan đến Tên Môn học, Tên đề tài, Danh sách sinh viện thực hiện và mã số sinh viện */}
                  <CourseIntroduction auth={auth}/>
                </div>
            </div>
        </>
    );
}
