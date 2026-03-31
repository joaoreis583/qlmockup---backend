
# SUBIR CONTAINER
docker run -d \
  --name qlmockup-postgres \
  -e POSTGRES_USER=qlmockup_user \
  -e POSTGRES_PASSWORD=qlmockup_pass \
  -e POSTGRES_DB=qlmockup \
  -p 5432:5432 \
  -v qlmockup-data:/var/lib/postgresql/data \
  postgres:15
