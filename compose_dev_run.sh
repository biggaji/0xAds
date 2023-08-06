#! /bin/bash

sudo docker compose down

sudo docker compose up --build -d

sudo docker ps

sudo docker compose logs