# User Service

Сервис работы с пользователями на **Express + TypeScript + Prisma + PostgreSQL + Docker**.
Реализованы регистрация, авторизация, работа с профилями и ролями, блокировка пользователей.

---

## ✨ Возможности

- **Регистрация нового пользователя**
  `POST /api/auth/register`
- **Авторизация по email + пароль, выдача JWT**
  `POST /api/auth/login`
- **Обновление access-токена по refresh-токену**
  `POST /api/auth/refresh`
- **Получение пользователя по ID**
  `GET /api/users/:id`
  _Доступ: админ или сам пользователь_
- **Получение списка пользователей**
  `GET /api/users`
  _Доступ: только админ_
- **Блокировка пользователя**
  `POST /api/users/:id/block`
  _Доступ: админ или сам пользователь_

---

## 🛠️ Технологии

- [Node.js 22 LTS](https://nodejs.org)
- [Express](https://expressjs.com)
- [TypeScript](https://www.typescriptlang.org)
- [Prisma ORM](https://www.prisma.io)
- [PostgreSQL 17](https://www.postgresql.org)
- [Zod](https://zod.dev) — валидация входных данных
- [JWT](https://www.npmjs.com/package/jsonwebtoken) — аутентификация
- [bcrypt](https://www.npmjs.com/package/bcrypt) — хэширование паролей
- [Winston](https://github.com/winstonjs/winston) — логирование

---

## 🚀 Запуск проекта

### 1. Клонировать репозиторий и установить зависимости

```bash
git clone https://github.com/your-org/user-service.git
cd user-service
npm install
```

### 2. Настроить переменные окружения

Создайте файл `.env` в корне проекта и заполните его следующими переменными:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/users?schema=public"
JWT_SECRET="your_jwt_secret"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
PORT=4000
```

### 3. Поднять базу данных в Docker

Убедитесь, что у вас установлен Docker. Затем выполните команду:

```bash
docker compose up -d
```

Это создаст контейнер с PostgreSQL, доступный по адресу `localhost:5432`.

### 4. Применить миграции Prisma

После запуска базы данных выполните команду для применения миграций:

```bash
npx prisma migrate dev
```

### 5. Запустить сервер

Для запуска сервера в режиме разработки выполните:

```bash
npm run dev
```

Для сборки и запуска в production-режиме выполните:

```bash
npm run build
npm run start
```

Сервер будет доступен по адресу: `http://localhost:4000`.

### 6. Тестирование API

Используйте Postman или аналогичный инструмент для тестирования следующих эндпоинтов:

- Регистрация: `POST /api/auth/register`
- Авторизация: `POST /api/auth/login`
- Обновление токена: `POST /api/auth/refresh`
- Получение пользователя: `GET /api/users/:id`
- Список пользователей: `GET /api/users`
- Блокировка пользователя: `POST /api/users/:id/block`
