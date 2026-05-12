import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { FastLoginModal } from '../../components/auth/FastLoginModal';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function LoginPage() {
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const { user, role, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // Redirect if already logged in as owner/admin
  if (user) {
    if (role === 'superadmin') return <Navigate to="/superadmin" replace />;
    if (role === 'owner') return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-mx-bg p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Welcome to MenuxPro</CardTitle>
          <p className="mt-2 text-sm text-mx-muted">Choose your login method to continue.</p>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Button variant="primary" onClick={() => alert("Owner login stub (Firebase Auth)")}>
            Owner Login (Email)
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-mx-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-mx-surface px-2 text-mx-muted">OR</span>
            </div>
          </div>

          <Button variant="outline" onClick={() => setIsStaffModalOpen(true)}>
            Staff / Cashier PIN Access
          </Button>
        </CardContent>
      </Card>

      <FastLoginModal isOpen={isStaffModalOpen} onClose={() => setIsStaffModalOpen(false)} />
    </div>
  );
}
