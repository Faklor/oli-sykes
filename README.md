_______________________________________________________

> УСТАНОВКА![#f03c15]
_______________________________________________________
1. Скачайте с репозитория файл docker-compose.yaml
  или создайте в любом удобном вам месте файл с расширением .yaml
  и поместите в него следующий код:
_______________________________________________________
```
version: '3.8'

services:
  db:
    container_name: mysqldb
    image: mysql:8.0
    restart: unless-stopped
    networks:
      - net
    environment: 
      MYSQL_ROOT_PASSWORD: 123
      MYSQL_DATABASE: test
    ports:
      - 6033:3306
    expose:
      - 6033
    volumes:
      - datavolume:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin" ,"ping", "-h", db, "-uroot", "-p123"]
      interval: 5s
      timeout: 5s
      start_period: 20s
      retries: 5

  server:
    image: ghcr.io/faklor/server:latest
    container_name: server
    networks:
      - net
    environment:
      DB_NAME: test
      DB_USER: root
      DB_PASSWORD: 123
      DB_HOST: db
      DB_PORT: 3306
      TIMEZONE: "+03:00"
    depends_on:
      db:
        condition: service_healthy 
    ports:
      - 5000:5000
    healthcheck:
      test: curl --fail http://server:5000/api/album/get || exit 1
      interval: 5s
      retries: 5
      start_period: 5s
      timeout: 5s

  client:
    image: ghcr.io/faklor/client:latest
    container_name: client
    environment:
      SERVER_HOST: http://server:5000
    networks:
      - net
    ports:
      - 3000:3000 
    depends_on:
      server:
        condition: service_healthy  
        
volumes:
  datavolume:

networks:
  net:
    driver: bridge
```
_______________________________________________________
2. Запустите Docker
3. Откройте консоль в месте где содержиться ранее созданный или скачанный файл docker-compose.yaml
4. Выполните команду в консоли: docker compose up -d
5. Откройте Docker и проверьте наличия контейнера oli-sykes
   должен содержать папку oli-sykes в ней папки:
   client
   server
   mysqldb

   если что-то не создалось или же что-то не запускается
   1.перейдите в Docker
   2.удалите контейнер и его содержимое во вкладке Containers не удаля ничего из вкладок Images и Volumes
   3.вернитесь в консоль и введите снова команду: docker compose up -d

