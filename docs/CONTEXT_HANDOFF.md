# Контекст-пак для нового чата

## Быстрый старт

**Проект:** Step Pulse — шагомер на React Native (Expo)

**Стек:**
- Expo SDK ~54
- React Native 0.81.5
- TypeScript (strict mode)
- Expo Router (file-based routing)
- Zustand (state management)
- AsyncStorage (persistence)

**Target:** RuStore (Android), разработка на iPhone (Expo Go) + Android Emulator

## Архитектура

```
src/
  app/              # Expo Router routes + providers
  shared/           # Переиспользуемый код
  screens/          # Тонкие экраны-обёртки
```

**Принципы:**
- Тонкие экраны (логика в store/lib)
- Нет циклических импортов
- Производительность на первом месте (60 FPS, Reanimated для анимаций)

## Текущее состояние

✅ **Готово:**
- Базовая структура проекта
- Theme Provider (light/dark/system)
- Onboarding flow (AsyncStorage: "hasOnboarded")
- Tab навигация (Home, History, Goals, Settings)
- Базовые UI компоненты (Text, Card)
- Zustand store (заготовка)

**Экраны:**
- `app/(tabs)/home.tsx` — главный экран (пока placeholder "Steps: 0")
- `app/(tabs)/history.tsx` — история шагов
- `app/(tabs)/goals.tsx` — цели
- `app/(tabs)/settings.tsx` — настройки (+ кнопка Reset onboarding)
- `app/onboarding.tsx` — онбординг при первом запуске

## Ключевые файлы

- `src/app/providers/AppProviders.tsx` — все провайдеры (Theme, Store)
- `src/app/theme/ThemeProvider.tsx` — управление темой
- `src/app/store/app.store.ts` — главный store
- `src/shared/lib/storage.ts` — обёртка над AsyncStorage
- `src/shared/ui/` — базовые UI компоненты

## Логика первого запуска

- Ключ AsyncStorage: `"hasOnboarded"`
- По умолчанию `false` (если ключа нет)
- Если `false` → показываем onboarding
- Кнопка "Continue" в onboarding → `hasOnboarded = true` → переход в `(tabs)/home`
- В Settings есть временная кнопка "Reset onboarding"

## Зависимости

**Основные:**
- `expo-router` — навигация
- `zustand` — state management
- `@react-native-async-storage/async-storage` — persistence

**UI/UX:**
- `react-native-reanimated` — анимации (установлен, структура готова)
- `expo-haptics` — тактильная обратная связь
- `expo-image` — оптимизированные изображения

## Документация

- `docs/CONSTITUTION.md` — архитектурные правила, perf rules, DoD

## Важные заметки

- **Не добавлять** лишние зависимости без необходимости
- **Не усложнять** — всё максимально просто, но по правилам
- Производительность критична — тестировать на реальных устройствах
- Веб не используется как основной способ теста

## Следующие шаги (TODO)

1. Интеграция реального шагомера (expo-sensors / expo-pedometer)
2. Визуализация шагов (графики, анимации)
3. Настройка целей и уведомлений
4. Экран статистики

