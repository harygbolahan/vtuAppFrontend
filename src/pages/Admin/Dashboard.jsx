import { Sidebar } from "./components/Sidebaree"
import { Header } from "./components/Header"
import { StatCard } from "./components/Stat-card"
import { TransactionsTable } from "./components/transactions-table"
import { Wallet, Users, MessageSquare, Eye } from 'lucide-react'

export default function Dashboard() {

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 dark:bg-gray-900">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="User (Wallet)"
                value="N2,625,934"
                icon={<Wallet className="h-4 w-4" />}
                color="primary"
              />
              <StatCard
                title="API (Wallet)"
                value="N0"
                icon={<Wallet className="h-4 w-4" />}
                color="secondary"
              />
              <StatCard
                title="Vendors (Wallet)"
                value="N4,315"
                icon={<Wallet className="h-4 w-4" />}
                color="success"
              />
              <StatCard
                title="Referrals (Wallet)"
                value="N52"
                icon={<Wallet className="h-4 w-4" />}
                color="warning"
              />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total user"
                value="11,811"
                icon={<Users className="h-4 w-4" />}
                color="info"
              />
              <StatCard
                title="Verified"
                value="0"
                icon={<Users className="h-4 w-4" />}
                color="info"
              />
              <StatCard
                title="Unverified"
                value="1"
                icon={<Users className="h-4 w-4" />}
                color="info"
              />
              <StatCard
                title="Referrals"
                value="99"
                icon={<Users className="h-4 w-4" />}
                color="info"
              />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Verified Users"
                value="1,107"
                icon={<Users className="h-4 w-4" />}
                color="success"
              />
              <StatCard
                title="Transactions"
                value="159,561"
                icon={<Wallet className="h-4 w-4" />}
                color="primary"
              />
              <StatCard
                title="Unread Messages"
                value="22"
                icon={<MessageSquare className="h-4 w-4" />}
                color="danger"
              />
              <StatCard
                title="Visit Today"
                value="64"
                icon={<Eye className="h-4 w-4" />}
                color="secondary"
              />
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-800">
              <h3 className="text-lg font-semibold mb-4">Last 500 Transactions</h3>
              <TransactionsTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

