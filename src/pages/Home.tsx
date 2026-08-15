import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Lock, Users } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('authToken');

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isAuthenticated={false} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Versa Group
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Cadastro, login e controle de acesso baseado em funções. Seguro, rápido e fácil de integrar com qualquer backend.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                Começar Agora
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="border border-primary text-primary px-8 py-3 rounded-lg font-medium hover:bg-primary/5 transition-colors"
              >
                Já tenho conta
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-card border-y border-border py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Recursos Principais</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Segurança</h3>
                <p className="text-muted-foreground">
                  Autenticação segura com tokens JWT e validação de dados em tempo real.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lock size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Controle de Acesso</h3>
                <p className="text-muted-foreground">
                  Três níveis de acesso: Admin, Manager e User com permissões específicas.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Gerenciamento</h3>
                <p className="text-muted-foreground">
                  Painel intuitivo para gerenciar usuários e suas permissões.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-lg mb-8 opacity-90">
              Crie sua conta agora e acesse o dashboard com controle de acesso baseado em funções.
            </p>
            <button
              onClick={() => navigate('/register')}
              className="bg-primary-foreground text-primary px-8 py-3 rounded-lg font-medium hover:bg-primary-foreground/90 transition-colors"
            >
              Criar Conta
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}