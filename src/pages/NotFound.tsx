import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFound() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('authToken');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isAuthenticated={isAuthenticated} />

      <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-2xl font-semibold mb-2">Página não encontrada</p>
          <p className="text-muted-foreground mb-6">
            A página que você está procurando não existe ou foi movida.
          </p>
          <button
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/')}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            {isAuthenticated ? 'Ir para Dashboard' : 'Ir para Home'}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}