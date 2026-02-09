#!/bin/bash

# 🚀 VonTamona - Pre-deployment Checklist
# Запустите этот скрипт перед деплоем на Vercel

echo "🔍 Проверка готовности к деплою..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

errors=0
warnings=0

# 1. Check if package.json exists
if [ -f "package.json" ]; then
  echo -e "${GREEN}✓${NC} package.json найден"
else
  echo -e "${RED}✗${NC} package.json не найден"
  ((errors++))
fi

# 2. Check if next.config.ts exists
if [ -f "next.config.ts" ]; then
  echo -e "${GREEN}✓${NC} next.config.ts найден"
else
  echo -e "${RED}✗${NC} next.config.ts не найден"
  ((errors++))
fi

# 3. Check if .env.example exists
if [ -f ".env.example" ]; then
  echo -e "${GREEN}✓${NC} .env.example найден"
else
  echo -e "${YELLOW}⚠${NC} .env.example не найден (не критично)"
  ((warnings++))
fi

# 4. Check if node_modules exists
if [ -d "node_modules" ]; then
  echo -e "${GREEN}✓${NC} node_modules существует"
else
  echo -e "${YELLOW}⚠${NC} node_modules не найден, запустите: npm install"
  ((warnings++))
fi

# 5. Try to build
echo ""
echo "📦 Пробую собрать проект..."
if npm run build > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} Проект успешно собирается"
else
  echo -e "${RED}✗${NC} Ошибка при сборке проекта"
  echo "   Запустите 'npm run build' для деталей"
  ((errors++))
fi

# 6. Check API routes
echo ""
echo "🔌 Проверка API роутов..."
if [ -f "src/app/api/quiz/route.ts" ]; then
  echo -e "${GREEN}✓${NC} /api/quiz существует"
else
  echo -e "${RED}✗${NC} /api/quiz не найден"
  ((errors++))
fi

# 7. Check environment variables template
echo ""
echo "🔐 Проверка переменных окружения..."
required_vars=("TELEGRAM_BOT_TOKEN" "TELEGRAM_CHAT_ID")
for var in "${required_vars[@]}"; do
  if grep -q "$var" .env.example 2>/dev/null; then
    echo -e "${GREEN}✓${NC} $var присутствует в .env.example"
  else
    echo -e "${YELLOW}⚠${NC} $var отсутствует в .env.example"
    ((warnings++))
  fi
done

# 8. Check if git is clean
echo ""
echo "📝 Проверка Git статуса..."
if [ -z "$(git status --porcelain)" ]; then
  echo -e "${GREEN}✓${NC} Все изменения закоммичены"
else
  echo -e "${YELLOW}⚠${NC} Есть незакоммиченные изменения"
  echo "   Рекомендуется закоммитить перед деплоем"
  ((warnings++))
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $errors -eq 0 ]; then
  echo -e "${GREEN}✓ Проект готов к деплою!${NC}"
  echo ""
  echo "Следующие шаги:"
  echo "1. Создайте Telegram бота через @BotFather"
  echo "2. Получите TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID"
  echo "3. Запустите: vercel"
  echo "4. Добавьте environment variables в Vercel Dashboard"
  echo ""
  echo "📖 Полная инструкция: см. DEPLOYMENT.md"
else
  echo -e "${RED}✗ Найдено $errors ошибок${NC}"
  echo "Исправьте ошибки перед деплоем"
fi

if [ $warnings -gt 0 ]; then
  echo -e "${YELLOW}⚠ $warnings предупреждений${NC}"
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

exit $errors
