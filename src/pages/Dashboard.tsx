import React, { useState, useEffect } from 'react';
import { Users, BarChart3, Settings, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RoleGuard from '../components/RoleGuard';
import DashboardCard from '../components/DashboardCard';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (error) {
        console.error('Error parsing user:', error);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <RoleGuard allowedRoles={['admin', 'manager', 'user']}>
      <div className="min-h-screen flex flex-col bg-background">
        <Header
          isAuthenticated={true}
          userName={user?.name}
          userRole={user?.role?.toUpperCase()}
        />

        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <section className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Bem-vindo, {user?.name}!
            </h1>
            <p className="text-muted-foreground">
              Você está logado como <span className="font-semibold">{user?.role?.toUpperCase()}</span>
            </p>
          </section>

          {/* Dashboard Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard
              title="Total de Usuários"
              value="1,234"
              icon={Users}
              description="Usuários ativos no sistema"
              trend="up"
              trendValue="+12% este mês"
            />
            <DashboardCard
              title="Receita"
              value="$45,231"
              icon={TrendingUp}
              description="Receita total"
              trend="up"
              trendValue="+8% este mês"
            />
            <DashboardCard
              title="Conversões"
              value="3,245"
              icon={BarChart3}
              description="Conversões totais"
              trend="down"
              trendValue="-2% este mês"
            />
            <DashboardCard
              title="Configurações"
              value="5"
              icon={Settings}
              description="Configurações ativas"
            />
          </section>

          {/* Role-Based Content */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Admin Section */}
            {user?.role === 'admin' && (
              <div className="lg:col-span-3 bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Painel Administrativo</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Gerenciar Usuários</p>
                    <button className="text-primary font-medium hover:underline">
                      Acessar →
                    </button>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Configurações do Sistema</p>
                    <button className="text-primary font-medium hover:underline">
                      Acessar →
                    </button>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Relatórios</p>
                    <button className="text-primary font-medium hover:underline">
                      Acessar →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Manager Section */}
            {user?.role === 'manager' && (
              <div className="lg:col-span-3 bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Painel de Gerenciamento</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Equipe</p>
                    <button className="text-primary font-medium hover:underline">
                      Visualizar →
                    </button>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Relatórios</p>
                    <button className="text-primary font-medium hover:underline">
                      Visualizar →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* User Section */}
            {user?.role === 'user' && (
              <div className="lg:col-span-3 bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Meu Perfil</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nome</p>
                    <p className="font-medium">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Função</p>
                    <p className="font-medium">{user?.role?.toUpperCase()}</p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Activity Section */}
          <section className="mt-8 bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Atividade Recente</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">Login realizado</p>
                  <p className="text-sm text-muted-foreground">Hoje às 10:30</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Sucesso
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">Perfil atualizado</p>
                  <p className="text-sm text-muted-foreground">Ontem às 14:20</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Atualização
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">Senha alterada</p>
                  <p className="text-sm text-muted-foreground">2 dias atrás</p>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  Segurança
                </span>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </RoleGuard>
  );
}