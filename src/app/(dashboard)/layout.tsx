'use client'

import Sidebar from "../components/Sidebar"

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <main className="flex bg-background">
      <Sidebar />
      <section className="max-w-[1280px] w-full p-[16px] mx-auto ">
          {children}
      </section>
    </main>
  )
}

export default DashboardLayout