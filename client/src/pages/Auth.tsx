import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, login } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignup) {
        if (!displayName.trim()) {
          toast.error("Por favor, insira um nome de utilizador");
          setLoading(false);
          return;
        }
        await signup(email, password, displayName);
        toast.success("Conta criada com sucesso!");
      } else {
        await login(email, password);
        toast.success("Bem-vindo de volta!");
      }
      setLocation("/");
    } catch (error: any) {
      toast.error(error.message || "Erro na autenticação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-cyan-100 p-4">
      <div className="w-full max-w-md">
        {/* Hero Image Background */}
        <div className="mb-8 text-center">
          <div className="inline-block mb-6">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663550783227/WhiKSnB8XZrFxSQpnnwhMw/luko-hero-gradient-fzLRXqnrxKXDYBLehMZF5G.webp"
              alt="Luko Social"
              className="w-32 h-32 rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 mb-2">
            Luko Social
          </h1>
          <p className="text-gray-600 font-medium">
            Conecta-te com amigos e partilha momentos
          </p>
        </div>

        {/* Auth Card */}
        <div className="card-playful bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome de Utilizador
                </label>
                <Input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Escolhe um nome"
                  className="w-full rounded-lg border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-colors"
                  disabled={loading}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="teu@email.com"
                className="w-full rounded-lg border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-colors"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Palavra-passe
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-colors"
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="btn-primary-playful w-full"
            >
              {loading ? "Carregando..." : isSignup ? "Criar Conta" : "Entrar"}
            </Button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {isSignup ? "Já tens conta?" : "Não tens conta?"}{" "}
              <button
                onClick={() => {
                  setIsSignup(!isSignup);
                  setEmail("");
                  setPassword("");
                  setDisplayName("");
                }}
                className="text-pink-500 font-semibold hover:text-pink-600 transition-colors"
              >
                {isSignup ? "Entra aqui" : "Cria uma agora"}
              </button>
            </p>
          </div>
        </div>

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-yellow-100 rounded-xl border-2 border-yellow-300">
          <p className="text-sm text-yellow-800 font-medium">
            💡 <strong>Dica:</strong> Usa qualquer email e palavra-passe para testar!
          </p>
        </div>
      </div>
    </div>
  );
}
