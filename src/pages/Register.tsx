import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RegistrationForm from '../components/RegistrationForm';
import SocialAuthButtons from '../components/SocialAuthButtons';

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isAuthenticated={false} />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
            <h1 className="text-2xl font-bold mb-2">Criar Conta</h1>
            <p className="text-muted-foreground mb-6">
              Preencha os dados abaixo para se cadastrar
            </p>

            <RegistrationForm
              onSuccess={() => {
                setTimeout(() => navigate('/login'), 1500);
              }}
            />

            <SocialAuthButtons />

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Já tem uma conta?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-primary font-medium hover:underline"
                >
                  Faça login
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}