import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface FastLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FastLoginModal({ isOpen, onClose }: FastLoginModalProps) {
  const [pin, setPin] = useState('');
  const [slug, setSlug] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!slug || !pin) {
      setError('Please enter restaurant slug and PIN');
      return;
    }

    setIsLoading(true);

    // Stub: In real app, this should check Firestore securely or use a Function
    setTimeout(() => {
      if (pin === '1234') { // Mock PIN
        localStorage.setItem('staffSession', JSON.stringify({ slug, role: 'cashier', timestamp: Date.now() }));
        onClose();
        navigate('/dashboard/cashier');
      } else {
        setError('Invalid PIN');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Staff Login">
      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          label="Restaurant Slug"
          placeholder="e.g. zcoffee"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <Input
          label="Staff PIN"
          type="password"
          placeholder="****"
          maxLength={4}
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        {error && <p className="text-sm text-mx-danger">{error}</p>}
        <Button className="w-full" type="submit" isLoading={isLoading}>
          Access Dashboard
        </Button>
      </form>
    </Modal>
  );
}
