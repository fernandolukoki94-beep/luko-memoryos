import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Camera, Clock } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <header className="bg-white border-b">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">MemoryVault</h1>
          <div className="space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-indigo-600">Login</Link>
            <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Começar Agora</Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="py-20 text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">O Cofre Digital da Sua Vida</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Guarde seus momentos, histórias e sentimentos em um lugar seguro e eterno.
          </p>
          <Link to="/register" className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 shadow-lg transition-all">
            Criar Minha Primeira Memória
          </Link>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12">
            <div className="text-center p-6">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                <Camera size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Multimédia Completa</h3>
              <p className="text-gray-600">Fotos, vídeos e áudios para dar vida às suas histórias.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-600">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Estados Emocionais</h3>
              <p className="text-gray-600">Registe como se sentiu em cada momento especial.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Caixa do Futuro</h3>
              <p className="text-gray-600">Envie mensagens para si mesmo ler daqui a 10 anos.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
