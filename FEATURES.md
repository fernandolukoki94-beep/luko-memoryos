# 🚀 Funcionalidades Avançadas - Luko Social

## 📸 Upload de Imagens

### Como Usar
1. Acede à página de criar post
2. Clica no botão "Clica para fazer upload"
3. Seleciona uma imagem (PNG, JPG, GIF até 5MB)
4. A imagem será enviada automaticamente para Firebase Storage
5. Recebe a URL da imagem para usar no post

### Componentes Utilizados
- `ImageUpload.tsx` - Componente de upload com preview
- `useImageUpload.ts` - Hook para gerenciar upload

### Validações
- ✅ Tipo de ficheiro (apenas imagens)
- ✅ Tamanho máximo (5MB)
- ✅ Barra de progresso
- ✅ Mensagens de erro

```tsx
import ImageUpload from "@/components/ImageUpload";

export default function CreatePost() {
  const handleImageUpload = (imageUrl: string) => {
    console.log("Imagem enviada:", imageUrl);
    // Usar imageUrl no post
  };

  return (
    <ImageUpload
      onUploadComplete={handleImageUpload}
      folder="posts"
    />
  );
}
```

---

## 🔔 Notificações em Tempo Real

### Como Usar
1. Clica no ícone de sino no header
2. Vê todas as notificações (likes, comentários, mensagens, follows)
3. As notificações não lidas aparecem com fundo rosa
4. Clica em "Marcar como lidas" para marcar todas

### Tipos de Notificações
- ❤️ **Like** - Quando alguém gosta de um post
- 💬 **Comentário** - Quando alguém comenta num post
- 📨 **Mensagem** - Quando recebe uma mensagem privada
- 👤 **Follow** - Quando alguém te segue

### Componentes Utilizados
- `NotificationBell.tsx` - Componente do sino de notificações
- `NotificationContext.tsx` - Contexto para gerenciar notificações
- `useNotifications.ts` - Hook para lógica de notificações

### Adicionar Notificações no Código

```tsx
import { useNotificationContext } from "@/contexts/NotificationContext";

export default function MyComponent() {
  const { addNotification } = useNotificationContext();

  const handleLike = () => {
    addNotification({
      type: "like",
      message: "Gostou do teu post",
      userId: "user123",
      userName: "João Silva",
      read: false,
    });
  };

  return <button onClick={handleLike}>Gostar</button>;
}
```

---

## 🔍 Pesquisa de Utilizadores

### Como Usar
1. Clica no ícone de pesquisa no header
2. Escreve o nome ou email do utilizador
3. Vê os resultados em tempo real
4. Clica em "Seguir" para adicionar à tua rede

### Funcionalidades
- 🔎 Pesquisa por nome ou email
- 👥 Mostra foto, bio e número de seguidores
- ✅ Botão de seguir/deixar de seguir
- ⚡ Resultados em tempo real

### Componentes Utilizados
- `UserSearch.tsx` - Componente de pesquisa
- `useUserSearch.ts` - Hook para lógica de pesquisa

### Integrar com API Real

```tsx
// Em useUserSearch.ts, substituir a função searchUsers:

const searchUsers = useCallback(async (query: string) => {
  if (!query.trim()) {
    setResults([]);
    setSearchQuery("");
    return;
  }

  setSearchQuery(query);
  setIsSearching(true);

  try {
    // Chamar API do Firebase Firestore
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("displayName", ">=", query),
      where("displayName", "<=", query + "\uf8ff"),
      limit(10)
    );
    
    const querySnapshot = await getDocs(q);
    const results = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    setResults(results);
  } catch (error) {
    console.error("Erro ao pesquisar:", error);
    setResults([]);
  } finally {
    setIsSearching(false);
  }
}, []);
```

---

## 🎨 Componentes Disponíveis

### Header
- Logo com gradiente
- Pesquisa de utilizadores
- Sino de notificações
- Sticky no topo

### BottomNav
- Navegação mobile-first
- 3 abas: Feed, Chat, Perfil
- Indicador de página ativa

### NotificationBell
- Contador de notificações não lidas
- Dropdown com histórico
- Ícones por tipo de notificação

### UserSearch
- Input de pesquisa
- Resultados com foto e bio
- Botão de seguir/deixar de seguir

### ImageUpload
- Preview de imagem
- Barra de progresso
- Validações automáticas

---

## 📊 Estrutura de Dados

### Notificação
```typescript
interface Notification {
  id: string;
  type: "like" | "comment" | "message" | "follow";
  message: string;
  userId: string;
  userName: string;
  userImage?: string;
  timestamp: number;
  read: boolean;
}
```

### Utilizador (Pesquisa)
```typescript
interface UserSearchResult {
  id: string;
  displayName: string;
  email: string;
  photoURL?: string;
  bio?: string;
  followers: number;
  isFollowing?: boolean;
}
```

---

## 🔧 Configuração Firebase

As funcionalidades utilizam os seguintes serviços Firebase:

### Storage (Upload de Imagens)
```typescript
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
```

### Firestore (Pesquisa de Utilizadores)
```typescript
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
```

---

## 🚀 Próximos Passos

1. **Integrar Pesquisa com Firestore** - Conectar com base de dados real
2. **Sincronizar Notificações** - Usar Firestore listeners para tempo real
3. **Compressão de Imagens** - Reduzir tamanho antes de upload
4. **Cache de Imagens** - Armazenar em cache local
5. **Paginação** - Carregar mais resultados ao scroll

---

## 📝 Notas Importantes

- As notificações são armazenadas em memória (usar Firestore para persistência)
- A pesquisa usa dados mock (integrar com Firestore em produção)
- O upload de imagens requer regras de segurança no Firebase
- Todas as imagens são validadas no cliente e servidor

---

## 🎯 Dicas de Desenvolvimento

### Adicionar Nova Notificação
```tsx
const { addNotification } = useNotificationContext();

addNotification({
  type: "like",
  message: "Gostou do teu post",
  userId: "user123",
  userName: "João Silva",
  read: false,
});
```

### Fazer Upload de Imagem
```tsx
const { uploadImage, uploadProgress } = useImageUpload();

const imageUrl = await uploadImage(file, "posts");
```

### Pesquisar Utilizadores
```tsx
const { results, searchUsers } = useUserSearch();

await searchUsers("joão");
```

---

**Versão:** 1.0.0  
**Última atualização:** Abril 2026
