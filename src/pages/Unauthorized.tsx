import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isAuthenticated={false} />

      <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-destructive/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-destructive" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Acesso Negado</h1>
          <p className="text-muted-foreground mb-6">
            Você não tem permissão para acessar esta página. Sua função não permite este acesso.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}