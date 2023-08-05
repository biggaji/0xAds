#! /bin/bash

sudo docker compose down

# sudo docker compose build --no-cache

sudo docker compose up --build -d

# sudo docker exec -it "0xads-adserver-1" /bin/ash

# npx prisma db push

# exit

sudo docker ps

sudo docker compose logs