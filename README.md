# My Express App

Boilerplate Express.js menggunakan MySQL, susunan route/controller/service/query, dan middleware JWT.

## Mula

1. Pastikan Node.js 18.11 atau lebih baru dan MySQL sudah dipasang serta berjalan.
2. Cipta database MySQL bernama `my_express_app`.
3. Salin `.env.example` kepada `.env`, kemudian isi `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, dan `JWT_SECRET` mengikut tetapan MySQL anda.
4. Pasang dependency dan jalankan server:

```bash
npm install
npm run dev
```

Server berjalan pada `http://localhost:3000`. Endpoint `GET /api/health` tidak memerlukan token.

## Jadual users

Pilih database `my_express_app`, kemudian jalankan SQL ini:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);
```

## JWT

Endpoint `GET /api/users` dan `GET /api/users/:id` memerlukan header `Authorization: Bearer <token>`. Middleware mengesahkan tandatangan dan tempoh luput token menggunakan `JWT_SECRET`, kemudian meletakkan `sub` token pada `req.user.id`.

Untuk ujian lokal, jana token dengan `sub` yang sepadan dengan ID pengguna dalam database:

```bash
node -r dotenv/config -e "console.log(require('jsonwebtoken').sign({ sub: '1' }, process.env.JWT_SECRET, { expiresIn: '1h' }))"
```

Gunakan token yang terhasil:

```bash
curl http://localhost:3000/api/users -H "Authorization: Bearer <token>"
```

Dalam aplikasi sebenar, keluarkan token selepas pengguna berjaya log masuk. Jangan gunakan arahan jana token ujian ini sebagai endpoint awam.

## Struktur

```text
my-express-app/
├── src/
│   ├── config/database.js
│   ├── routes/index.js
│   ├── controllers/userController.js
│   ├── services/userService.js
│   ├── queries/userQuery.js
│   ├── middlewares/authMiddleware.js
│   ├── middlewares/errorMiddleware.js
│   ├── app.js
│   └── server.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```