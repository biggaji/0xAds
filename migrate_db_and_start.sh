#! /bin/ash

npx prisma db push
pm2-runtime index.js