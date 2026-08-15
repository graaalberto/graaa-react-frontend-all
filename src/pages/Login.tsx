import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm';
import SocialAuthButtons from '../components/SocialAuthButtons';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isAuthenticated={false} />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
            <h1 className="text-2xl font-bold mb-2">Entrar</h1>
            <p className="text-muted-foreground mb-6">
              Digite suas credenciais para acessar o dashboard
            </p>

            <LoginForm />

            <SocialAuthButtons />

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Não tem uma conta?{' '}
                <button
                  onClick={() => navigate('/register')}
                  className="text-primary font-medium hover:underline"
                >
                  Cadastre-se
                </button>
              </p>
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
              <p className="font-medium mb-2">Credenciais de Teste:</p>
              <p>Email: admin@example.com</p>
              <p>Senha: password123</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}