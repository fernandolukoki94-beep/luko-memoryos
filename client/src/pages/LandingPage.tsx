import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Heart, Lock, Zap, Users, Archive, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const { currentUser } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const features = [
    {
      icon: <Archive className="w-8 h-8" />,
      title: "Guarde Sua História",
      description: "Preserve cada momento importante da sua vida em um único lugar seguro.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Reviva Seus Momentos",
      description: "Acesse suas memórias quando quiser e relembre os melhores momentos.",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Proteja Suas Memórias",
      description: "Criptografia de ponta a ponta para manter seus dados completamente privados.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "IA Inteligente",
      description: "Transforme suas memórias em histórias poéticas e homenagens especiais.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Compartilhe com Amor",
      description: "Escolha quem pode ver suas memórias: privadas, família ou públicas.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Sua Biografia Viva",
      description: "Crie uma timeline de vida com os eventos mais importantes da sua jornada.",
      color: "from-violet-500 to-fuchsia-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2"
            >
              <Archive className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                MemoryOS
              </span>
            </motion.div>
            <div className="flex gap-4">
              {currentUser ? (
                <Button
                  onClick={() => setLocation("/home")}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Ir para Home
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => setLocation("/auth")}
                    className="text-white hover:bg-white/10"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => setLocation("/auth")}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    Começar
                  </Button>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                O Cofre Digital da Sua Vida
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
            >
              Guarde sua história. Reviva seus momentos. Proteja suas memórias.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
            >
              MemoryOS é mais que um diário digital. É um cofre seguro para seus momentos mais preciosos, com IA inteligente e proteção máxima.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => setLocation(currentUser ? "/home" : "/auth")}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg px-8 py-6"
              >
                <Heart className="mr-2 w-5 h-5" />
                {currentUser ? "Continuar Minha Jornada" : "Começar Minha Jornada"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 font-bold text-lg px-8 py-6"
              >
                Saiba Mais
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating element */}
          <motion.div
            className="mt-20 flex justify-center"
            variants={floatingVariants}
            animate="animate"
          >
            <div className="relative w-full max-w-md h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-white/10 backdrop-blur-xl p-8 flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <p className="text-gray-300">Suas memórias, seguras e sempre acessíveis</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Funcionalidades Poderosas
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Tudo que você precisa para preservar sua vida digital
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 text-white`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-white/10 rounded-3xl p-12 md:p-16 text-center backdrop-blur-xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pronto para começar?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Crie sua conta gratuitamente e comece a guardar suas memórias hoje mesmo.
            </p>
            <Button
              onClick={() => setLocation(currentUser ? "/home" : "/auth")}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg px-8 py-6"
            >
              {currentUser ? "Aceder ao Meu Painel" : "Criar Conta Agora"}
            </Button>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 backdrop-blur-md mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Archive className="w-5 h-5 text-purple-400" />
                  MemoryOS
                </h3>
                <p className="text-gray-400 text-sm">
                  O cofre digital da sua vida
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Produto</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Funcionalidades</a></li>
                  <li><a href="#" className="hover:text-white transition">Segurança</a></li>
                  <li><a href="#" className="hover:text-white transition">Preços</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Empresa</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Sobre</a></li>
                  <li><a href="#" className="hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition">Contato</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Privacidade</a></li>
                  <li><a href="#" className="hover:text-white transition">Termos</a></li>
                  <li><a href="#" className="hover:text-white transition">Cookies</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
              <p>&copy; 2026 MemoryOS. Todos os direitos reservados. Feito com ❤️ por Fernando Lukoki</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
