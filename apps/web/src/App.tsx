import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { api, setAccessToken, tryRefresh } from '@/lib/api';
import { FullScreenSpinner } from '@/components/ui/spinner';

export default function App() {
  const { user, isAuthenticated, setUser, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tryRefresh()
      .then((token) => {
        if (!token) return null;
        setAccessToken(token);
        return api.get('/auth/me').then((res) => setUser(res.data));
      })
      .catch(() => {
        setAccessToken(null);
      })
      .finally(() => setLoading(false));
  }, [setUser]);

  if (loading) {
    return <FullScreenSpinner />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Agile IA Assistant</h1>
          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {user.name} ({user.role})
              </span>
              <button
                className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
                onClick={() => {
                  setAccessToken(null);
                  logout();
                }}
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">Non connecté</span>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {isAuthenticated && user ? (
          <p className="text-foreground">
            Bonjour {user.name}, vous êtes connecté en tant que {user.role}.
          </p>
        ) : (
          <p className="text-muted-foreground">
            Bienvenue. Le backend sera disponible au J13.
          </p>
        )}
      </main>
    </div>
  );
}