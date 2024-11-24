import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import transactions from "../data/transactions.json"



export default function TransactionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const transaction = transactions.find(t => t.id === (id));

  if (!transaction) {
    return <div>Transaction not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white border-b p-4 sticky top-0 z-10">
        <div className="flex items-center max-w-3xl mx-auto">
          <Button variant="ghost" className="mr-2" onClick={() => navigate("/transactions")}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">Transaction Details</h1>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-6 max-w-3xl mx-auto w-full">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <CardTitle className="text-xl mb-2">{transaction.description}</CardTitle>
            <p className="text-3xl font-bold">₦{Math.abs(transaction.amount).toFixed(2)}</p>
            <p className="text-green-500 font-semibold mt-2">{transaction.status}</p>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              {/* Progress Status */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col items-center flex-1">
                  <div className="bg-green-500 rounded-full p-2">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-xs mt-1 text-center">Initiated</p>
                  <p className="text-xs text-gray-500 text-center">{transaction.date}</p>
                </div>
                <div className="h-0.5 flex-1 bg-green-500 mx-2" />
                <div className="flex flex-col items-center flex-1">
                  <div className="bg-green-500 rounded-full p-2">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-xs mt-1 text-center">Processing</p>
                  <p className="text-xs text-gray-500 text-center">{transaction.date}</p>
                </div>
                <div className="h-0.5 flex-1 bg-green-500 mx-2" />
                <div className="flex flex-col items-center flex-1">
                  <div className="bg-green-500 rounded-full p-2">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-xs mt-1 text-center">Completed</p>
                  <p className="text-xs text-gray-500 text-center">{transaction.date}</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-4 text-center">
              The transaction has been completed successfully.
            </p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-500">Biller</div>
                <div className="font-medium text-right">{transaction.biller}</div>
                <div className="text-gray-500">Product</div>
                <div className="font-medium text-right">{transaction.product}</div>
                <div className="text-gray-500">Amount</div>
                <div className="font-medium text-right">₦{Math.abs(transaction.amount).toFixed(2)}</div>
                <div className="text-gray-500">Number ID</div>
                <div className="font-medium text-right">{transaction.numberId}</div>
              </div>

              <div className="mt-6">
                <p className="font-semibold mb-2">Transaction Details</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-500">Transaction Date</div>
                  <div className="font-medium text-right">{transaction.date}</div>
                  <div className="text-gray-500">Session ID</div>
                  <div className="font-medium text-right">{`TRX${transaction.id}${Date.now().toString().slice(-6)}`}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Button variant="outline" className="flex-1">Report an Issue</Button>
          <Button className="flex-1">
            <Share2 className="mr-2 h-4 w-4" />
            Share Receipt
          </Button>
        </div>
      </main>
    </div>
  );
}