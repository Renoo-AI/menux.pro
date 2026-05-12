
import { Button } from '../../components/ui/Button';

export default function MenuManagementPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-2xl font-bold text-mx-espresso">Menu Management</h1>
        <Button>Add Item</Button>
      </div>
      <div className="bg-mx-surface rounded-xl border border-mx-border shadow-sm p-8 text-center text-mx-muted">
        Menu management functionality goes here.
      </div>
    </div>
  );
}
