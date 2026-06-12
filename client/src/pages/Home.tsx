import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Gamepad2, Zap, Sword } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Gamepad2 className="w-10 h-10 text-red-500" />
            Fernando Lukoki: Luta e Aventura
          </h1>
          <p className="text-gray-400 mt-2">Um jogo RPG de ação 2D épico</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">Bem-vindo à Aventura</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Embarque em uma jornada épica através de florestas misteriosas, ruínas antigas e templos sagrados.
            Derrote inimigos poderosos, ganhe experiência e torne-se um verdadeiro guerreiro.
          </p>
          <Button
            onClick={() => setLocation('/game')}
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-6"
          >
            <Sword className="mr-2 w-5 h-5" />
            Iniciar Jogo
          </Button>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-red-500 transition">
            <Zap className="w-8 h-8 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Combate Dinâmico</h3>
            <p className="text-gray-400">
              Sistema de combate corpo a corpo com ataques críticos e knockback.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-red-500 transition">
            <Gamepad2 className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Progressão RPG</h3>
            <p className="text-gray-400">
              Ganhe experiência, suba de nível e melhore seus stats com cada vitória.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-red-500 transition">
            <Sword className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Múltiplos Mapas</h3>
            <p className="text-gray-400">
              Explore a Floresta, as Ruínas e o Templo Final em sua busca pela glória.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gray-800 p-8 rounded-lg border border-gray-700 mb-12">
          <h3 className="text-2xl font-bold mb-6">Sobre o Jogo</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold text-red-500 mb-3">Mecânicas</h4>
              <ul className="text-gray-300 space-y-2">
                <li>✓ Movimento e salto fluido</li>
                <li>✓ Sistema de combate com cooldown</li>
                <li>✓ Inimigos com IA inteligente</li>
                <li>✓ Sistema de vida e dano</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-blue-500 mb-3">Progressão</h4>
              <ul className="text-gray-300 space-y-2">
                <li>✓ Sistema de XP e níveis</li>
                <li>✓ Stats: Força, Defesa, Vitalidade</li>
                <li>✓ Inventário de itens</li>
                <li>✓ Missões e objetivos</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="bg-gray-800 p-8 rounded-lg border border-gray-700">
          <h3 className="text-2xl font-bold mb-6">Controles</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-300 mb-2"><span className="font-bold text-red-500">A / Seta Esquerda:</span> Mover para esquerda</p>
              <p className="text-gray-300 mb-2"><span className="font-bold text-red-500">D / Seta Direita:</span> Mover para direita</p>
              <p className="text-gray-300 mb-2"><span className="font-bold text-red-500">Espaço:</span> Saltar</p>
            </div>
            <div>
              <p className="text-gray-300 mb-2"><span className="font-bold text-red-500">Clique do Mouse:</span> Atacar</p>
              <p className="text-gray-300 mb-2"><span className="font-bold text-red-500">ESC:</span> Pausar</p>
              <p className="text-gray-300 mb-2"><span className="font-bold text-red-500">P:</span> Menu de Pausa</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>Desenvolvido por Fernando Lukoki | Jogo RPG de Ação 2D</p>
        </div>
      </footer>
    </div>
  );
}
