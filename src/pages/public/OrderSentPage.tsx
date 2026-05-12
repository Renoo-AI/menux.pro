
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { CheckCircle2 } from 'lucide-react';

export default function OrderSentPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-mx-bg p-6 text-center">
      <div className="mb-6 rounded-full bg-mx-success/10 p-6">
        <CheckCircle2 className="h-16 w-16 text-mx-success" />
      </div>

      <h1 className="mb-2 font-display text-3xl font-bold text-mx-espresso">Order Received!</h1>
      <p className="mb-8 max-w-sm text-mx-muted">
        Your order has been sent to the kitchen. The waiter will bring it to your table shortly.
      </p>

      <div className="space-y-4 w-full max-w-xs">
        <Button className="w-full" onClick={() => navigate(-1)}>
          Back to Menu
        </Button>
      </div>
    </div>
  );
}
