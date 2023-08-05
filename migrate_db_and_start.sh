#! /bin/ash

# npx prisma generate
npx prisma db push
pm2-runtime index.js