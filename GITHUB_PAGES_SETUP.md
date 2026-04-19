# 🚀 Configurar GitHub Pages - Luko Social

## Passo 1: Ir para as Configurações do Repositório

1. Acede a: https://github.com/fernandolukoki94-beep/luko-social
2. Clica em **Settings** (Configurações)
3. No menu esquerdo, clica em **Pages**

## Passo 2: Configurar a Fonte de Publicação

1. Em "Build and deployment", seleciona:
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/ (root)`

2. Clica em **Save**

## Passo 3: Aguardar o Deploy

- GitHub irá fazer o build automaticamente
- Podes ver o progresso em **Actions**
- O site estará disponível em: `https://fernandolukoki94-beep.github.io/luko-social`

## Passo 4 (Opcional): Usar um Domínio Personalizado

Se quiseres usar um domínio personalizado (ex: `luko-social.fernandolukoki.com`):

1. Em **Settings** → **Pages**
2. Em "Custom domain", escreve o teu domínio
3. Clica em **Save**
4. Configura os registos DNS do teu domínio:
   - Adiciona um registo CNAME apontando para `fernandolukoki94-beep.github.io`

## 🔧 Build Local para Testar

Se quiseres testar o build localmente antes de fazer push:

```bash
# Build para produção
pnpm build

# O output estará em ./dist/public
```

## 📝 Notas Importantes

- O GitHub Pages serve ficheiros estáticos
- Qualquer push para `main` irá fazer deploy automático
- O build demora cerca de 1-2 minutos
- Podes ver o histórico de deploys em **Actions**

## 🐛 Troubleshooting

### A página não carrega
- Aguarda 2-3 minutos após o push
- Limpa o cache do navegador (Ctrl+Shift+Delete)
- Verifica se o build foi bem-sucedido em **Actions**

### Erro 404
- Verifica se o repositório é público
- Confirma que o branch é `main`
- Verifica se a pasta é `/ (root)`

### Domínio personalizado não funciona
- Aguarda até 24h para a propagação DNS
- Verifica se o registo CNAME está correto
- Tenta aceder via HTTPS

## 📚 Referências

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Configurar um domínio personalizado](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

**URL do Repositório:** https://github.com/fernandolukoki94-beep/luko-social  
**URL do GitHub Pages:** https://fernandolukoki94-beep.github.io/luko-social
