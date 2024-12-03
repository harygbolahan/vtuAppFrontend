import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import TransactionDetails from './TransactionDetails';

const recentTransactions = [
  { id: 1, user: "John Doe", amount: "₦5,000", type: "Airtime", status: "Completed", date: "2023-06-01" },
  { id: 2, user: "Jane Smith", amount: "₦10,000", type: "Data", status: "Pending", date: "2023-06-02" },
  { id: 3, user: "Bob Johnson", amount: "₦2,000", type: "Electricity", status: "Failed", date: "2023-06-03" },
  { id: 4, user: "Alice Brown", amount: "₦7,500", type: "Cable TV", status: "Completed", date: "2023-06-04" },
  { id: 5, user: "Charlie Wilson", amount: "₦3,000", type: "Airtime", status: "Completed", date: "2023-06-05" },
];

const RecentTransactions = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentTransactions.map((transaction) => (
            <TableRow 
              key={transaction.id} 
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedTransaction(transaction)}
            >
              <TableCell>{transaction.user}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.status}</TableCell>
              <TableCell>{transaction.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedTransaction && (
        <TransactionDetails 
          transaction={selectedTransaction} 
          onClose={() => setSelectedTransaction(null)}
          onStatusChange={(newStatus) => {
            setSelectedTransaction({...selectedTransaction, status: newStatus});
            // In a real app, you'd update the status in your backend here
          }}
        />
      )}
    </div>
  );
};

export default RecentTransactions;

