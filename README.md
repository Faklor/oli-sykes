<<<<<<< HEAD
_______________________________________________________

> **УСТАНОВКА**  
_______________________________________________________
1. Скачайте с репозитория файл docker-compose.yaml
  или создайте в любом удобном вам месте файл с расширением .yaml
  и поместите в него следующий код:  
_______________________________________________________
```javascript
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
<<<<<<< HEAD
5. Откройте Docker и проверьте наличие и запуск контейнера oli-sykes должен содержать папку oli-sykes в ней папки: 
    1.client, 
    2.server, 
    3.mysqldb, 

    если что-то не создалось или же что-то не запускается:
    1.перейдите в Docker 
    2.удалите контейнер и его содержимое во вкладке Containers не удаля ничего из вкладок Images и Volumes
    3.вернитесь в консоль и введите снова команду: docker compose up -d
=======
5. Откройте Docker и проверьте наличие и запуск контейнера oli-sykes должен содержать папку oli-sykes в ней папки: client, server, mysqldb, если что-то не создалось или же что-то не запускается:
    -перейдите в Docker 
    -удалите контейнер и его содержимое во вкладке Containers не удаля ничего из вкладок Images и Volumes
    -вернитесь в консоль и введите снова команду: docker compose up -d
>>>>>>> cfc9be7f59c01c6e0ea802b2afe6692e2f566bb9
6. Перейдите в веб-браузер и введите в адресную строку: localhost:3000
_______________________________________________________
 
> **ПРОСМОТР**  
_______________________________________________________
<<<<<<< HEAD
=======

>>>>>>> cfc9be7f59c01c6e0ea802b2afe6692e2f566bb9
Вас приветствует сайт oli-sykes - этот сайт является блогом
для солиста Олли Сайкса группы Bring me the horizon 
для атоматизации его жизнедеятельности в формате песен группы

<details>
<summary>Содержимое папки client/src</summary>
<<<<<<< HEAD

1. Папка components содержит компоненты, которые используются на всех страницах: 
    анимации:animate.js с использованием npm - animejs  
    запросы на сервер: axiosRouterGet, axiosRouterPost с использованием npm axios
    шапка сайта:header.js
    навигационное меню:navMneu.js

2. Папки home, music, blog, user содержат страницы сайта и их компоненты
3. Папка res содержит ресурсы проекта
4. Папка store содержит компоненты:
    store.js содержащий данные с использованием npm react-redux:
```javascript
    reducer: {
        user:persistedReducer,
        nowPointMenu: setPointMenu,
        editAccount: editAccount,
    },
```
Здесь обьявлены 3 переменные:
1. user принимает данные о авторизированном пользователе и хранит эти данные в localstorage, организованно это с помощью npm redux-persist
2. nowPointMenu принимает данные о выбранной странице в навигационном меню и принимает значение компанента из папки store организованного с использованием npm @reduxjs/toolkit 
3. editAccount принимает данные о редактировании авторизированного аккаунта

А так же в client/src содержиться:
1. PrivetRoute.js компонент отображающий приватные роуты
2. PrivetDash.js компонент отображающий приватный роут отдельно для админ панели
3. index.js содержит все роуты и их содержимые компоненты с использованием npm react-router
```javascript
const router = createBrowserRouter([
  { path:'/', element:<Navigate to='/Home' replace={true}/> },
  { path: "/Home", element: <Home/> },
  { path:'/Music', element:<Music/>,
    children:[
      {
        path:':albumsName', element:<></>,
      }
    ]  
  },
  { path: "/Blog", element: <Blog/>,children:[
    {path:":numberPosts"}
  ]},
  //---------------------User-------------------------------
  { path: "/User", element:<User/>,
    children:[
      { path: ':userName', element:<PrivateRoute component={<Cabinet/>}/> },
      { path: 'signIn', element:<SignIn status={['Login','SignIn', 'Create Account', 'signUp','login']}/>},
      { path: 'signUp', element:<SignUp/> },
      { path: 'dashboard', element:<PrivateDash component={<Dashboard/>}/>, children:[
        {path: 'graph', element:<DashGraph/>},
        {path: 'users', element:<Users/>, children:[
          { path:':item',  element:<Dash/> }
        ]},
        {path: 'music', element:<Songs/>},
        {path: 'blogs', element:<Posts/>},
        {path: 'albums', element:<Albums/>},
        {path: ':userName', element:<Cabinet/>},
      ]},
    ]
  },
  
])
```
- роут '/Home' компонент home.js
- роут '/Music' компонент music.js и дочерний роут конкретного(выбранного пользователем) альбома
- роут '/Blog' компонент blog.js и дочерний роут с количеством отображаемых постом на нем
- роут '/User' компонент user.js и дочерние роуты:
    ':userName'- Приватный роут личного кабинета на который нельзя перейти неавторезированному пользователю
    'signIn'- авторизация 
    'signUp'- регистрация 
    'dashboard'- приватная админ панель и ее дочерние роуты:
        '/graph'- панель графиков
        '/users'- панель существущих пользователей
        '/music'- панель существующей музыки
        '/blogs'- панель существующих постов
        '/albums'- панель существующий альбомов
        ':userName'- личный кабинет Админа
</details>

<details>
<summary>Изначальная страница(Home page)</summary>
Home page это - landing page, на ней содержатся компоненты: 

1. textWriting.js отвечающая за визуальное написание текста, при открытии страницы 
2. parallaxContent.js отвечающая за отображение контента, при паралакс-прокрутке страницы с использованием npm @react-spring/parallax
3. header.js && navMenu.js - навигация по сайту, фиксированные компаненты, которые содержаться на всех страницах

</details>
=======
 1. Папки home, music, blog, user они содержат страницы сайта и их компоненты
 2. Папка components содержит компоненты, которые используются на всех страницах: анимации, запросы на сервер, шапка сайта и навигационное меню  

</details>
_______________________________________________________

<details>
<summary>Изначальная страница(Home page)</summary>


</details>
_______________________________________________________
>>>>>>> cfc9be7f59c01c6e0ea802b2afe6692e2f566bb9

<details>
<summary>Страница с музыкой(Music page)</summary>

<<<<<<< HEAD
1. music.js - компонент со всей логикой страницы
2. slyder.js - прокручиваемый спикок существующих альбомов, по нажатию на альбом пользователь переходит на роут конкретного альбова с песнями связанными с этим альбомом
3. song.js - компонет с музыкой и ее данными
4. /components/like.js - компонент с "лайк","кол-во  лайков","отправить комментарий" и ниже "комментарии пользователей",поставить лайк или же отправить комментарий может только авторизированный пользователь, если нет при нажатии на "лайк" или же "отправить комментарий" пользователя перекинет на страницу авторизации
5. /components/video.js содержит iframe API сайта: youTube и данные о видио

</details>
=======

</details>
_______________________________________________________
>>>>>>> cfc9be7f59c01c6e0ea802b2afe6692e2f566bb9

<details>
<summary>Страница с постами(Blog page)</summary>

<<<<<<< HEAD
Содержит созданные администратором посты, если ввести в url страницы:
- '/blog/1' - отобразиться 1 пост
- '/blog/2' - отобразиться 2 поста
- ...
- '/blog/n' - отобразиться n постов

</details>
=======

</details>
_______________________________________________________
>>>>>>> cfc9be7f59c01c6e0ea802b2afe6692e2f566bb9

<details>
<summary>Страница авторизации, регистрации, личного кабинета, админ панели(User page)</summary>

<<<<<<< HEAD
1. user.js - основная страница
2. signIn.js - авторизация, при авторизации в навигационом меню пункт "User" изменит свое значение на login пользователя
    error.js - валидация на ошибки, при неправльнов вводе данных
3. hoc/HocSing.js - компонент высшего порядка - регистрация, после успешной регистрации пользователь сразу же авторизируется
    поля при регистрации:
    login: у каждого пользователя индивидуальный, нельзя повторять
    email: нельзя регистрировать уже зарегестрированную почту
    password: минимум 4 символа
4. сabinet.js - доступент только авторизированному пользователю - это личный кабинет пользователя с его небольшой информацией
    content.js - контент с информаацией пользователя в личном кабинете, а так же с возможностью загрузки картинки пользователя формата jpg и размер не более 50 кб, по нажатию на кнопку "EditImgage" отобразиться 2 кнопки: первая загружает картинку и если каринка соотвествует требованиям изложенным ранее, то картинка сразу же измениться в личном кабинете, а так же в навигационном меню.И кнопка "log out" - выйти с аккаунта(разлогиниться)
    существующие аккаунты:
    email: Alexey@mail.ru, fikluss@mail.ru, ombus@mail.ru, sergey@mail.ru, aran@mail.ru, ulti@mail.ru
    password: 1111 - такой пароль у всех пользователей
5. dashboard.js - что бы войти в админ панель необходимо авторизироваться под пользователем с ролью ADMIN(администратор), c уже существующим таким аккаунтом:
    email: oly@mail.ru
    password: 2351
    после авторизации как ADMIN пользователя перекидывает на админ панель, здесь содержаться компоненты 
    components/dashNav.js - навигационная панель на админ панели 
    components/dashGraph.js - графики 
    все остальные компаненты реализованный по следующей структуре:


```javascript
const Users = hocDash({lable:'users',method:users, 
titles:['id','login','email','created','lastEdit','delete']})(Dash)
const Songs = hocDash({lable:'songs',method:songAll,
titles:['id','title','video Id','album','created','delete'],addItem:addSong, deleteItemMethod:deleteSong, editItem:editSong})(Dash)
const Albums = hocDash({lable:'albums',method:albums, 
titles:['id','title','imageUrl','created','lastEdit','delete'],addItem:addAlbum, deleteItemMethod:deleteAlbum,editItem:updateAlbum})(Dash)
const Posts = hocDash({lable:'posts',method:blogs, 
titles:['id','title','imageUrl','created','lastEdit','delete'],addItem:addPost, deleteItemMethod:deletePost,editItem:updatePost})(Dash)
```
1. components/dash.js - шаблон, который принимает функции и в котором содержится таблица с реализацией логики добавления/удаления/редактирования/отображения
2. hoc/hocDash - компонент всшего порядка, принимающий 
    lable: название
    method: функция на отображение данных
    titles: заголовки таблицы
    addItem: фунция на добавление
    deleteItemMethod: функция на удаление
    editItem: функция на редактирование
    и шаблон 

Удаление:
1. нажмите на кнопку "delete", напротив поля которое хотите удалить, произойдет анимация и элемент удалиться

Добавление:
1. нажмите на кнопку "addItem"
2. в раскрывшемся поле введите данные согласно title таблицы, а затем нажмите кнопку "add" и сразу же увидите добавленное поле
3. нажмите "cancel" если хотите закрыть раскрывщееся поле

Редактирование:
1. нажмите конпку "editItem" 
2. выберите какое поле вы хотите редактировать
3. измените значения котрые вы хотите изменить если значение одно то на остальные поля в данной линии просто нажмите и замем нажмите кнопку "edit", зачения сразу же изменятся 
4. нажмите снопку "cancel" что бы снова отобразить список без полей изменения
 
</details>
=======

</details>
>>>>>>> cfc9be7f59c01c6e0ea802b2afe6692e2f566bb9
=======
_______________________________________________________

> **УСТАНОВКА**  
_______________________________________________________
1. Скачайте с репозитория файл docker-compose.yaml
  или создайте в любом удобном вам месте файл с расширением .yaml
  и поместите в него следующий код:  
_______________________________________________________
```javascript
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
<<<<<<< HEAD
5. Откройте Docker и проверьте наличие и запуск контейнера oli-sykes должен содержать папку oli-sykes в ней папки: 
    1.client, 
    2.server, 
    3.mysqldb, 

    если что-то не создалось или же что-то не запускается:
    1.перейдите в Docker 
    2.удалите контейнер и его содержимое во вкладке Containers не удаля ничего из вкладок Images и Volumes
    3.вернитесь в консоль и введите снова команду: docker compose up -d
=======
5. Откройте Docker и проверьте наличие и запуск контейнера oli-sykes должен содержать папку oli-sykes в ней папки: client, server, mysqldb, если что-то не создалось или же что-то не запускается:
    -перейдите в Docker 
    -удалите контейнер и его содержимое во вкладке Containers не удаля ничего из вкладок Images и Volumes
    -вернитесь в консоль и введите снова команду: docker compose up -d
6. Перейдите в веб-браузер и введите в адресную строку: localhost:3000
_______________________________________________________
 
> **ПРОСМОТР**  
_______________________________________________________
Вас приветствует сайт oli-sykes - этот сайт является блогом
для солиста Олли Сайкса группы Bring me the horizon 
для атоматизации его жизнедеятельности в формате песен группы

<details>
<summary>Содержимое папки client/src</summary>

1. Папка components содержит компоненты, которые используются на всех страницах: 
    анимации:animate.js с использованием npm - animejs  
    запросы на сервер: axiosRouterGet, axiosRouterPost с использованием npm axios
    шапка сайта:header.js
    навигационное меню:navMneu.js

2. Папки home, music, blog, user содержат страницы сайта и их компоненты
3. Папка res содержит ресурсы проекта
4. Папка store содержит компоненты:
    store.js содержащий данные с использованием npm react-redux:
```javascript
    reducer: {
        user:persistedReducer,
        nowPointMenu: setPointMenu,
        editAccount: editAccount,
    },
```
Здесь обьявлены 3 переменные:
1. user принимает данные о авторизированном пользователе и хранит эти данные в localstorage, организованно это с помощью npm redux-persist
2. nowPointMenu принимает данные о выбранной странице в навигационном меню и принимает значение компанента из папки store организованного с использованием npm @reduxjs/toolkit 
3. editAccount принимает данные о редактировании авторизированного аккаунта

А так же в client/src содержиться:
1. PrivetRoute.js компонент отображающий приватные роуты
2. PrivetDash.js компонент отображающий приватный роут отдельно для админ панели
3. index.js содержит все роуты и их содержимые компоненты с использованием npm react-router
```javascript
const router = createBrowserRouter([
  { path:'/', element:<Navigate to='/Home' replace={true}/> },
  { path: "/Home", element: <Home/> },
  { path:'/Music', element:<Music/>,
    children:[
      {
        path:':albumsName', element:<></>,
      }
    ]  
  },
  { path: "/Blog", element: <Blog/>,children:[
    {path:":numberPosts"}
  ]},
  //---------------------User-------------------------------
  { path: "/User", element:<User/>,
    children:[
      { path: ':userName', element:<PrivateRoute component={<Cabinet/>}/> },
      { path: 'signIn', element:<SignIn status={['Login','SignIn', 'Create Account', 'signUp','login']}/>},
      { path: 'signUp', element:<SignUp/> },
      { path: 'dashboard', element:<PrivateDash component={<Dashboard/>}/>, children:[
        {path: 'graph', element:<DashGraph/>},
        {path: 'users', element:<Users/>, children:[
          { path:':item',  element:<Dash/> }
        ]},
        {path: 'music', element:<Songs/>},
        {path: 'blogs', element:<Posts/>},
        {path: 'albums', element:<Albums/>},
        {path: ':userName', element:<Cabinet/>},
      ]},
    ]
  },
  
])
```
- роут '/Home' компонент home.js
- роут '/Music' компонент music.js и дочерний роут конкретного(выбранного пользователем) альбома
- роут '/Blog' компонент blog.js и дочерний роут с количеством отображаемых постом на нем
- роут '/User' компонент user.js и дочерние роуты:
    ':userName'- Приватный роут личного кабинета на который нельзя перейти неавторезированному пользователю
    'signIn'- авторизация 
    'signUp'- регистрация 
    'dashboard'- приватная админ панель и ее дочерние роуты:
        '/graph'- панель графиков
        '/users'- панель существущих пользователей
        '/music'- панель существующей музыки
        '/blogs'- панель существующих постов
        '/albums'- панель существующий альбомов
        ':userName'- личный кабинет Админа
</details>

<details>
<summary>Изначальная страница(Home page)</summary>
Home page это - landing page, на ней содержатся компоненты: 

1. textWriting.js отвечающая за визуальное написание текста, при открытии страницы 
2. parallaxContent.js отвечающая за отображение контента, при паралакс-прокрутке страницы с использованием npm @react-spring/parallax
3. header.js && navMenu.js - навигация по сайту, фиксированные компаненты, которые содержаться на всех страницах

</details>


<details>
<summary>Страница с музыкой(Music page)</summary>

<<<<<<< HEAD
1. music.js - компонент со всей логикой страницы
2. slyder.js - прокручиваемый спикок существующих альбомов, по нажатию на альбом пользователь переходит на роут конкретного альбова с песнями связанными с этим альбомом
3. song.js - компонет с музыкой и ее данными
4. /components/like.js - компонент с "лайк","кол-во  лайков","отправить комментарий" и ниже "комментарии пользователей",поставить лайк или же отправить комментарий может только авторизированный пользователь, если нет при нажатии на "лайк" или же "отправить комментарий" пользователя перекинет на страницу авторизации
5. /components/video.js содержит iframe API сайта: youTube и данные о видио

</details>


<details>
<summary>Страница с постами(Blog page)</summary>

<<<<<<< HEAD
Содержит созданные администратором посты, если ввести в url страницы:
- '/blog/1' - отобразиться 1 пост
- '/blog/2' - отобразиться 2 поста
- ...
- '/blog/n' - отобразиться n постов

</details>


<details>
<summary>Страница авторизации, регистрации, личного кабинета, админ панели(User page)</summary>

<<<<<<< HEAD
1. user.js - основная страница
2. signIn.js - авторизация, при авторизации в навигационом меню пункт "User" изменит свое значение на login пользователя
    error.js - валидация на ошибки, при неправльнов вводе данных
3. hoc/HocSing.js - компонент высшего порядка - регистрация, после успешной регистрации пользователь сразу же авторизируется
    поля при регистрации:
    login: у каждого пользователя индивидуальный, нельзя повторять
    email: нельзя регистрировать уже зарегестрированную почту
    password: минимум 4 символа
4. сabinet.js - доступент только авторизированному пользователю - это личный кабинет пользователя с его небольшой информацией
    content.js - контент с информаацией пользователя в личном кабинете, а так же с возможностью загрузки картинки пользователя формата jpg и размер не более 50 кб, по нажатию на кнопку "EditImgage" отобразиться 2 кнопки: первая загружает картинку и если каринка соотвествует требованиям изложенным ранее, то картинка сразу же измениться в личном кабинете, а так же в навигационном меню.И кнопка "log out" - выйти с аккаунта(разлогиниться)
    существующие аккаунты:
    email: Alexey@mail.ru, fikluss@mail.ru, ombus@mail.ru, sergey@mail.ru, aran@mail.ru, ulti@mail.ru
    password: 1111 - такой пароль у всех пользователей
5. dashboard.js - что бы войти в админ панель необходимо авторизироваться под пользователем с ролью ADMIN(администратор), c уже существующим таким аккаунтом:
    email: oly@mail.ru
    password: 2351
    после авторизации как ADMIN пользователя перекидывает на админ панель, здесь содержаться компоненты 
    components/dashNav.js - навигационная панель на админ панели 
    components/dashGraph.js - графики 
    все остальные компаненты реализованный по следующей структуре:


```javascript
const Users = hocDash({lable:'users',method:users, 
titles:['id','login','email','created','lastEdit','delete']})(Dash)
const Songs = hocDash({lable:'songs',method:songAll,
titles:['id','title','video Id','album','created','delete'],addItem:addSong, deleteItemMethod:deleteSong, editItem:editSong})(Dash)
const Albums = hocDash({lable:'albums',method:albums, 
titles:['id','title','imageUrl','created','lastEdit','delete'],addItem:addAlbum, deleteItemMethod:deleteAlbum,editItem:updateAlbum})(Dash)
const Posts = hocDash({lable:'posts',method:blogs, 
titles:['id','title','imageUrl','created','lastEdit','delete'],addItem:addPost, deleteItemMethod:deletePost,editItem:updatePost})(Dash)
```
1. components/dash.js - шаблон, который принимает функции и в котором содержится таблица с реализацией логики добавления/удаления/редактирования/отображения
2. hoc/hocDash - компонент всшего порядка, принимающий 
    lable: название
    method: функция на отображение данных
    titles: заголовки таблицы
    addItem: фунция на добавление
    deleteItemMethod: функция на удаление
    editItem: функция на редактирование
    и шаблон 

Удаление:
1. нажмите на кнопку "delete", напротив поля которое хотите удалить, произойдет анимация и элемент удалиться

Добавление:
1. нажмите на кнопку "addItem"
2. в раскрывшемся поле введите данные согласно title таблицы, а затем нажмите кнопку "add" и сразу же увидите добавленное поле
3. нажмите "cancel" если хотите закрыть раскрывщееся поле

Редактирование:
1. нажмите конпку "editItem" 
2. выберите какое поле вы хотите редактировать
3. измените значения котрые вы хотите изменить если значение одно то на остальные поля в данной линии просто нажмите и замем нажмите кнопку "edit", зачения сразу же изменятся 
4. нажмите снопку "cancel" что бы снова отобразить список без полей изменения
 
</details>

>>>>>>> 23f894818531c2cfb47d3106abeae97486cd302e
