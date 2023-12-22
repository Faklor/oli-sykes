_______________________________________________________

> **УСТАНОВКА**  
_______________________________________________________
1. Скачайте с репозитория файл docker-compose.yaml
  или создайте в любом удобном вам месте файл docker-compose.yaml
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
      start_period: 5s
      retries: 50

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
      test: curl --fail http://server:5000/api/album/get
      interval: 5s
      timeout: 5s
      start_period: 5s
      retries: 10

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
5. Откройте Docker и проверьте наличие и запуск контейнера, он должен содержать папку в которой: 
    1.client, 
    2.server, 
    3.mysqldb, 

    если что-то не создалось или же что-то не запускается:
    1.перейдите в Docker 
    2.удалите контейнер и его содержимое во вкладке Containers не удаля ничего из вкладок Images и Volumes
    3.вернитесь в консоль и введите снова команду: docker compose up -d
6. Перейдите в веб-браузер и введите в адресную строку: localhost:3000
_______________________________________________________
 
> **ПРОСМОТР**  
_______________________________________________________

Вас приветствует сайт oli-sykes - этот сайт является блогом
для солиста Олли Сайкса группы Bring me the horizon 
для атоматизации его жизнедеятельности в формате песен группы
- Условия 
1. Очистите localtorage
2. Зайдите в режиме инкогнито или отключите расширения веб-браузера

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

1. music.js - компонент со всей логикой страницы
2. slyder.js - прокручиваемый спикок существующих альбомов, по нажатию на альбом пользователь переходит на роут конкретного альбова с песнями связанными с этим альбомом
3. song.js - компонет с музыкой и ее данными
4. /components/like.js - компонент с "лайк","кол-во  лайков","отправить комментарий" и ниже "комментарии пользователей",поставить лайк или же отправить комментарий может только авторизированный пользователь, если нет при нажатии на "лайк" или же "отправить комментарий" пользователя перекинет на страницу авторизации
5. /components/video.js содержит iframe API сайта: youTube и данные о видио

</details>



<details>
<summary>Страница с постами(Blog page)</summary>

Содержит созданные администратором посты, если ввести в url страницы:
- '/blog/1' - отобразиться 1 пост
- '/blog/2' - отобразиться 2 поста
- ...
- '/blog/n' - отобразиться n постов

</details>


<details>
<summary>Страница авторизации, регистрации, личного кабинета, админ панели(User page)</summary>

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

<details>
<summary>Динамичность веб-страниц & отрисовка</summary>

1. навигационное меню
```javascript



const NavMenu = props =>{
    //=================navigate==========================
    const navigate = useNavigate()
    const location = useLocation()
    //=================state=============================
    const [check, setCheck] = useState(false)
    //-------redux-----------------------
    let selector = useSelector(selectItems)
    let selectorUser = useSelector(selectUser)
    const dispatch = useDispatch()
    //================default-values=====================

    let defaultList = [
        {
            img:home,
            name:'Home'
        },
        {
            img:music,
            name:'Music'
        },
        {
            img:blog,
            name:'Blog'
        },
        {
            img:user,
            name:'User'
        }
    ]
    //------------------------------------------------------------------------
    let index = defaultList.findIndex(el=>location.pathname.match(/\/\w+\/*/)[0] === `/${el.name}`|| location.pathname.match(/\/\w+\/*/)[0] === `/${el.name}/`)
    let a = defaultList[0]
    defaultList[0] = defaultList[index]
    defaultList[index] = a
    selector = defaultList

    if(selectorUser !== null){
        let a = selectorUser.name.split('')
        if(a.length > 5){
            a = a[0]+a[1]+a[2]+a[3]+'...'
        }
        

        defaultList.forEach((i, key)=>{
            if(i.name === 'User'){
               defaultList.splice(key,1,{...selectorUser, name:a})
            }
        })
        

        //image
    }

    //------------------------------------------------------------------------
    //===================================================
    useEffect(()=>{
        dispatch(setDefaultImage(user))
        //-------------navClick--------------------------
        window.onclick = (e)=>{
            let a = e.target.className
            if(a !== "item"){
                animateBarUnCheck()
                setCheck(false)
            }

        }

    },[dispatch, selectorUser])
    //=====================render======================== 
    const items = selector.map((i, index)=>{
        
        return <Item {...i} key={index} getCheck={()=>getCheck(index)}/>
    })
    //======================function=====================
    function getCheck(index){
        if(check){
            setCheck(false)
            animateBarUnCheck()
        }
        else{
            setCheck(true)
            animateBarCheck()
        }
        //==========replace_item==============
        let a = selector[0]
        selector[0] = selector[index]
        selector[index] = a
        //-----------navigate-----------------
        
        if(selector[0] !== selector[index]){
            if(selector[0].name !== "Home" && selector[0].name !== "Music" && selector[0].name !== "Blog"){
                if(selectorUser !== null && selectorUser.role === "USER"){
                    
                    return navigate ('../User/'+selectorUser.name)
                }
                else if(selectorUser !== null && selectorUser.role === "ADMIN"){
                    return navigate ('../User/dashboard/graph')
                }
                else{
                    return navigate('../User/signIn')
                }
                
                
            }
            //selector[0].name === "User" || copyDefaulList[3].name != selectorUser.name)
           
            return  navigate('../'+selector[0].name)
            
            
            
        }
        //====================================
    }
    //===================================================
   

    return(
        <div className="navMenu"> 
            {items}
        </div>
        
    )
}

export default NavMenu
```
Реализовано оно так:
1. импортируются нужные инструменты:
  стили
  изначальные картинки
  созданные анимации
  данные redux:  состояние меню и состояние пользователя
  хуки для навигации по роутам
2. для начала создается массив с исходным состоянием навигационного меню и в последующем передает свои значения в переменную redux 
3. срабатывают исключения касаемо того авторизирован пользователь или же нет
4. useEffect следит за каждым изменением авторизации
5. по нажатию на пункты меню выполняется изменение состояния меню, выполняется анимация и затем если пользователь нажал не на исходное сстояние меню то его перекидывает на выбранный пунк этого меню


2. Страница с музыкой
```javascript
useEffect(()=>{
        songAll()
        .then(res=>{
            setArraySongs(res.data.songs)
            setVideo('http://www.youtube.com/embed/'+res.data.songs[0].url)
            setIdSong(res.data.songs[0].id)

            setListLikes(res.data.songs[0].song_likes)
            setArrayCommnet(res.data.songs[0].song_comments)

            if(selectorUser!== null){
                getLikeVisible(selectorUser.id, res.data.songs[0].id)
                .then(res=>{
                    //console.log(res.data.like)
                    if(res.data.like === true){
                        setLiked(true)
                       
                    }
                    else{
                        setLiked(false)
                    }
                })
            }
            
            
        })
        .catch(e=>{

        })

        albums()
        .then(res=>{
            
            if(albumsName){
                setArrayAlbums([])
                
                
                //
                res.data.albums.forEach(element => {
                    if(albumsName ===  element.title){
                        oneAlbum(element.id)
                        .then(res=>{
                            setArraySongs(res.data.songs)
                            setVideo('http://www.youtube.com/embed/'+res.data.songs[0].url)
                            setIdSong(res.data.songs[0].id)
                            
                        })
                    }    
                })
                
            }
            else{
                setArrayAlbums(res.data.albums)
                
            }
        })
        .catch(e=>{

        })
        
        
    }, [albumsName, selectorUser])

    //slyder
    export default function Slyder(props){
    //===============state============================

    
    return(
        <Link to={{
            pathname:`${props.title}`
        }}>
        <div className='album' onClick={()=>props.getAlbum(props.id)}>
            
            <img src={props.img} alt='album'/>
            <h2>{props.title}</h2> 
        </div> 
        </Link>
    )
}
```
1. UseEffect, используя get-зпросы, задает изначальные данные страницы и при изменении их меняет,а именно если пользователь взаимодействует с компонентом Slyder то его перекидывает на страницу с конкретным альбомом и музыкой связанной с этим альбомом

```javascript
function play(url, id, comment, like){
        setVideo('http://www.youtube.com/embed/'+url)
        setIdSong(id)

        setListLikes(like)
        songAll()
        
        .then(res=>{
            const index  = res.data.songs.findIndex(song=>song.id===id)
            setArrayCommnet(res.data.songs[index].song_comments)
            
        })
       
        
        if(selectorUser !== null){
            getLikeVisible(selectorUser.id, id)
            .then(res=>{
                //console.log(res.data.like)
                if(res.data.like === true){
                    setLiked(true)
                   
                }
                else{
                    setLiked(false)
                }
                
                
                
            })  
        }

        
    }
    //video
    export default function Video(props){
   
    return (
        <iframe className="ytplayer" 
        type="text/html" 
        style={{width:"640px", height:"360px"}}
        src={props.url}
        title="frameVideo" 
        frameBorder={0}/>
    )
}
```
2. функция обеспецивающая изменение с данными связанными с данными открытой песни, при нажатии на кнопку компоент video изменяет состояние отрисовки, комппоент хранит frame API YouTube

```javascript
  function sendComment(id,text){ 
        if(selectorUser !== null){
            addComment(text,selectorUser.id,idSong)
            .then(res=>{
                songAll()
                .then(res=>{
                    const index  = res.data.songs.findIndex(song=>song.id===id)
                    setArrayCommnet(res.data.songs[index].song_comments)
                })
            })
            
            
        }
        else{
            return navigate('../User/signIn')
        }
        
    }
```
3. если пользователь не авторизирован его отправить на страницу авторизации, если авторизирован он может оправить коменнтарий по конкретной песни

```javascript
//music
function likeAdd(idSong){
        if(selectorUser !== null){
            addLike(selectorUser.id, idSong)
            .then(res=>{
                setLiked(true)
                songAll()
                .then(res=>{
                    const index  = res.data.songs.findIndex(song=>song.id===idSong)
                    setListLikes(res.data.songs[index].song_likes)
                })
            }) 
        }
        else{
            return navigate('../User/signIn')
        }
    }
    function deleteLiked(idSong){
        deleteLike(selectorUser.id, idSong)
        .then(res=>{
            setLiked(false)
            songAll()
                .then(res=>{
                    const index  = res.data.songs.findIndex(song=>song.id===idSong)
                    setListLikes(res.data.songs[index].song_likes)
                })
        })
    }
  //like
  export default function Like({idSong,likes,comment,sendComment,likeAdd,deleteLiked,listLikes}){
    //===================redux===========================
    
    //===================state===========================
    const [text, setText] = useState('')
    //===================navigate========================
    

    return(
        <>
        <div className="like">
            <div>
            {likes?<ReactSVG src={likeChecked} onClick={()=>deleteLiked(idSong)}/>: <ReactSVG src={like}  onClick={()=>likeAdd(idSong)} />}
            <h1>{listLikes}</h1>
            </div>
            <input defaultValue={''} onChange={(e)=>setText(e.target.value)} placeholder="Enter comment"/>
            <button onClick={()=>sendComment(idSong, text)}>send Comment</button>
            
        </div>
        <div className="allComments">
        {comment.map((i,index)=>{
            return <div className="comment" key={index}>
                <div className="userCommnet">
                    <img src={`data:${i.user.contentType};base64,${i.user.imageBase64}` || user} alt="commentUser"/>
                    <h2>{i.user.name}</h2>
                </div>
                <textarea disabled value={i.comment}></textarea>
                {/* <h1>{i.comment}</h1> */}
            </div>
        })}
        </div>
        </>
    )
}
```
4. если пользователь не авторизирован то его перенаправит на страницу авторизации, если авторизирован то он имеет возможность оценить песню, поставив лайк и данные о песни сразу же обновлятся, если он хочет убрать лайт то он  просто кликает на него еще один раз, при взаиможействии пользователя с лайком или комментарием он передет данные в компонент like в котором выполняются условия отрисовки


3. страница авторизации 
```javascript
useEffect(()=>{
        loginOpacity1()
        if(selectorUser !== null){
            if(selectorUser.role === "ADMIN"){
                return navigate('../dashboard/graph')
            }
            else{
                return navigate('../User/')
            }
            
        }
         

        
    }) 
     function getUser(e){
  
        if(props.status[4] === "login"){
            
            signIn(emailHook, lockHook)
            .then(res=>{
                if(res.data.error){
                   
                    let array = []
                    Object.keys(res.data.error).map(error=>{
                        
                       return array.push(error+ ' : ' + res.data.error[error].msg)
                    })
                    setEr(array)
                    
                }
                else if(res.data.loggedIn === false){
                    let array = [`${res.data.message}`]
                    
                    setEr(array)
                }
                else{
                    
                    dispatch(setStateUser(res.data.user))
                    
                }
            })
            .catch(e=>{
                let array = [`${e}`]
                setEr(array)
            })
        }
        //error
        export default function Error({errors}){
    
    const setErrors = errors.map((error, key)=>{
        return <p className="error" key={key}>{error}</p>
    })  

    return(
        <>
            {setErrors}
        </>
    )
}
```
1. cначала мы определяем авторизирован пользователь или нет, если да то его перекидывет на роут, который соответсвует его роли, если USER то в личный каинет, если ADMIN то в админ панель, если пользователь не авторизирован то он может это сделать введя свои данные в поля заполнения данных и затем нажав кнопку входа реализуется ответ сервера, если данные соответсуют имеющимя в базе то он авторизируется, если нет то ему выдается ответ неудовлетворяющих условий, который отрисовывается в компоенте Error


4. страница администрирования
```javascript
//index.js
 { path: 'dashboard', element:<PrivateDash component={<Dashboard/>}/>, children:[
        {path: 'graph', element:<DashGraph/>},
        {path: 'users', element:<Users/>,},
        {path: 'music', element:<Songs/>},
        {path: 'blogs', element:<Posts/>},
        {path: 'albums', element:<Albums/>},
        {path: ':userName', element:<Cabinet/>},
      ]},
    //dashboard
    <DashNav/>
            <div className='dashboard'>
                <Outlet/>
            </div>

    //реализация 
    //hocDash
    const HocSong = ({lable,method,titles,addItem, deleteItemMethod,editItem})=> (Companent)=>{
    return function Comnponent(){
        //===================state===========================
        const [allAlbums,  setAllAlbums] = useState([])


        useEffect(()=>{
           
            albums()
            .then(res=>{
                setAllAlbums(res.data.albums)
            })
            .catch(e=>{

            })

        },[])
        
         
       
        return <Companent 
            lable={lable} 
            method={method} 
            titles={titles} 
            addItem={addItem} 
            albums={allAlbums} 
            deleteItemMethod={deleteItemMethod} 
            editItem={editItem}
        />
 
        
    } 
    
}
```
1. немного расскажу про реализацию роутов, сначала обьявляется роут 'dashboard/' в компоненте index.js,  а к нему дочерние роуты, определять дочерние роуты на может тэг Outlet созданные уже в компоненте dashboard
2. так как у нас компоненты в админ панель буквально одинаковые и имеют одну и туже логику,то был реализован шаблонный- компонент и компонент высшего порядка 
3. компонент высшего порядка принимает в себя функции связанные с добавлением/ удалением/ реадктированием и отображением данных в бд и таблицах, он служит лишь для принятия данных и отображения этих данных в существующем компоненте dash.js
```javascript
const DashUsers = ({lable,method,titles,addItem,deleteItemMethod, albums,editItem}) =>{
  return(
        <>
            <table className='dashUsers'>
                <thead>
                    <tr>
                        {titles.map((i,index)=>{
                            return <th key={index}>{i}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {setVisibleEdit()}
                    {setVisibleAdd()}
                    {/* //render */}
                    {setEditofArray()}
                    <Outlet/>
                </tbody>
            </table>
        </>
    )
    //addData
    function setVisibleAdd(){
        if(lable === "users"){
            return
        }
        else{
            if(add){
                return <tr>
                    <td><button className='add' onClick={()=>setAdd(false)}>Cancel</button></td>
                    <td><input value={in1} onChange={(e)=>setIn1(e.target.value)}/></td>
                    <td><input value={in2} onChange={(e)=>setIn2(e.target.value)}/></td>
                    <td>{lable==="songs" &&<select onChange={(e)=>setSelect(e.target.value)}> 
                            {albums.map((i,index)=>{
                              
                                return <option value={i.id} key={index}>{i.title} </option>
                                
                                                               
                            })}
                        </select>}
                        {lable ==="posts"&&
                        <textarea value={textAr} onChange={(e)=>setTextAr(e.target.value)}/>}
                    </td>
                    <td></td>
                    <td><button className='add' onClick={()=>{
                        if(lable ==="posts"){
                            addItem(in1,textAr,in2).then(res=>method().then(res=>setArray(res.data[lable])))
                        }
                        else{addItem(in1,in2,select).then(res=>method().then(res=>setArray(res.data[lable])))}}}>Add</button></td>
                    
                </tr>
            }
            return <tr><td><button className='add' onClick={()=>setAdd(true)}>Add New</button></td></tr>
        }
    }
  //deleteData
  function deleteMethod(index, id){
        deleteItem(index)
        deleteItemMethod(id)
        
    }
```
4. dash принимает значения которые были переданны в него и исходя из этих данных выполняет отрисовку таблиц
5. добавление данных осуществляет функция SetVisivleAdd вначале она определяет состояние открытия этого поля и соответсвующей отрисовки содержимого, при раскрытом поле и добавлении данных, отправляется запрос на сервер для изменения и происходит добавленное поля,которое сразу же отобразиться в таблице, так же образом реализованно редактирование
6. функция на удаление deleteMethod отправляет запрос на сервер и удаляет выбранную данную, после чего отрисовка не изменяется, но выполяется анимация deleteItem


</details>

<details>
<summary>Навигация в приложении</summary>

навигациия в приложении осуществляется с помощью npm react-router 
1. вначале создаются роуты в матринском компоненте
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
//===========================================================================
//личный кабинет 
export default function Cabinet(){
    //-----------------redux--------------------------
    const selectorUser = useSelector(selectUser)
    const dispatch = useDispatch()
    //================navigate========================
    const navigate = useNavigate()
    const location = useLocation()
    let { userName } = useParams()
    //==================state=========================
    //================================================ 
   

    useEffect(()=>{
        if(selectorUser === null){
            
           return navigate('../User/signIn')
        }
        else{
            return navigate('../'+selectorUser.name)
        }
    },[navigate, selectorUser])
    
    //================function========================
    function outAccount(){ 
        if(selectorUser.role === "ADMIN"){
            const loc = '/User/'+location.pathname.match(/\/\w+$/)[0].replace('/','')
            if(location.pathname === loc){
                dispatch(setStateUser(null))
                return navigate('../signIn')
            }
            dispatch(setStateUser(null))
            return navigate('../../signIn')
        }
        dispatch(setStateUser(null))
        return navigate('../signIn')
        
    }
    
    //===============render-function==================
    function render(){
        if(userName !== selectorUser.name){
            return <h1 className='cabinet'>User not Found</h1>
        }
        return <Content {...selectorUser} />
    }
    

    return(
        <>
            {render()}
            <button className='logOut' onClick={outAccount}>Log out</button>
        </>
    )
} 
//===========================================================================

//привтный роут  
import { useSelector } from "react-redux"
import {
    selectUser
} from './store/nowUser'
import { Navigate } from "react-router-dom"

export default function PrivateRoute({component}){
    const select = useSelector(selectUser)
  
    return select? <>{component}</> :  <Navigate to='/Home'/>
}
```
2. далее осуществляется переход по ним с помощью хуков useNavigate или ссылок для перехода Link
3. некоторые роуты содержать дополнительные дочерние роуты, способность понимания находится ли пользователь на дочерних роутах осуществляется с помощью тега Outlet занесенного в материнский компонент роута по отношению к его дочерним, а так же в некоторых случаях созданы исключения с помощью хука useLocation и таже использование хука useParams позваляет нам определять чтто именно должно быть в дочернем роуте если он я вляется динамическим, в пример соответсвует реализация личного кабинета пользователя, если он находится в нем то соответсвенно дочерний роут принимает значение его login  
4. так же реализованны приватные роуты на которые можно зайти выполняя определенные условия, в данном случае это понятие авторизирован пользователь или же нет, если да то выполнятся соотвествующая отрисовка компонента
5. на странице /Blog реализован компонент который отображает определнное кол-во, если ввести в рут соответвующую цифру кол-во компонентов которые вы хотите увидель, то столко компонентов и отобразится даже если копонентов меньше чем надо, они отобразатся только с пустми значениями, это поределяет useEffect, при отображении он создает массив и если useParams имеет какоето занчение то он отображает массив с эти занчением
```javascript
useEffect(()=>{
        blogs()
            .then(res=>{
                
                if(numberPosts){
                    let newArray = []
                    for(let i=0; i<numberPosts;i++){
                        
                        newArray.push(res.data.posts[i])
                    }
                    
                    setArray(newArray)
                }
                else{
                    setArray(res.data.posts)
                }
                
            })
            .catch(e=>{
    
            })
        
        
    },[numberPosts, array.length])
```

</details>

<details>
<summary>Адаптация</summary>

Реализованна с помощью медиа-запросов, которые описанны в стилях каждого компонента, в конце файла, например один из них 
```scss

@media screen and (max-width : 1000px){
    .home{
        .writer{
            &:nth-child(2){
                font-size: 64px;
                color:#fff;
                margin: 3.5em 0 0 1em;
            }
            &:nth-child(3){
                font-size: 40px;
                color:#C2C2C2;
                margin: 1em 0 0 1em;
            }
        }
        div{
            h3{
                font-size: 40px;
                color:#999999; 
                margin: 2em 0 0 1em;
                display: none;
        
            }
            div{
                svg{
                    margin-left: 6em;
                }
            }
        }
    }
}
```

</details>

<details>
<summary>Коммуникации и модель данных</summary>

1. Существует реализованный сервер, созданный мной, с баззой данных в папке server, от него зависит все данные, которые отображаются на сайте, взаимосвязь между сервером и клентом осуществленна с помощью npm axios и все запросы хранятся в src/components/ axiosRoiterPosts & axiosRouterGet 
```javascript
//===========================Post==============================
//user
//--------------------------signIn-----------------------------
const signIn =async (email, password) => await axios.post('http://localhost:5000/api/login',{email:email, password:password})
//--------------------------signUp-----------------------------
const signUp =async (email,login, password) => await axios.post('http://localhost:5000/api/registration',{email:email,name:login, password:password})
//--------------------------editImg----------------------------
const editImg =async (formData) => await axios.post('http://localhost:5000/api/image', formData)
//--------------------------deleteUser-------------------------
const deleteUser =async () => await axios.post()

//song
//--------------------------addSong----------------------------
const addSong =async (title, url, albumId) => await axios.post('http://localhost:5000/api/song/create',{title:title,url:url,albumId:albumId})
//--------------------------deleteSong-------------------------
const deleteSong =async (id) => await axios.post('http://localhost:5000/api/song/delete',{id:id})
//--------------------------edit--Song-------------------------
const editSong =async (id, title, url, albumId) => await axios.post('http://localhost:5000/api/song/update',{id:id,title:title,url:url,albumId:albumId})
//--------------------------addLike----------------------------
const addLike =async (userId,songId)=> await axios.post('http://localhost:5000/api/song/like',{userId:userId, songId:songId})
//--------------------------deleteLike----------------------------
const deleteLike =async (userId,songId)=> await axios.post('http://localhost:5000/api/song/unlike',{userId:userId, songId:songId})
//---------------------------like------------------------------
const getLikeVisible =async (userId,songId) => await axios.post('http://localhost:5000/api/song/getlike',{userId:userId,songId:songId})
//---------------------------commnet---------------------------
const addComment=async (comment,userId, songId)  => await axios.post('http://localhost:5000/api/song/comment',{comment:comment,userId:userId,songId:songId})

//album
//------------------------addAlbum-----------------------------
const addAlbum =async (title, url) => await axios.post('http://localhost:5000/api/album/create',{title:title,img:url})
//------------------------updateAlbum--------------------------
const updateAlbum =async (id,title, url) => await axios.post('http://localhost:5000/api/album/update',{id:id,title:title,img:url})
//------------------------deleteAlbum--------------------------
const deleteAlbum =async (id) => await axios.post('http://localhost:5000/api/album/delete',{id:id})

//post
//------------------------addPost------------------------------
const addPost =async (title, text, url) => await axios.post('http://localhost:5000/api/post/create',{title:title,description:text,img:url})
//------------------------updatePost---------------------------
const updatePost =async (id,title, text, url) => await axios.post('http://localhost:5000/api/post/update',{id:id,title:title,description:text,img:url})
//------------------------deletePost---------------------------
const deletePost =async (id) => await axios.post('http://localhost:5000/api/post/delete',{id:id})
//==================export=====================================

```
2. модель данных представленна в src/store/store.js, которая содержит в себе переменную user, хранящее свое значение в localStorage и принимацющая значение функции из npm redux-persist, это сделанно для постоянного хранения данных о пользователе, можно было бы выдавать Token с сервера например jwt,
```javascript
const persistConfig = {
  key: 'root',
  storage
}
 
 
const persistedReducer = persistReducer(persistConfig, nowUser)

//========================================================================
const store = configureStore({
  reducer: {
    //user + localStorage
    user:persistedReducer,
    //navMenu
    nowPointMenu: setPointMenu,
    editAccount: editAccount,
    //dashboard
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})
//========================================================================
```
3. nowPointMenu хранит значение состояния меню, навигационное меню отображает состояние выбранной страницы на которой находится пользователь, EditAccount хранит состояние панели редактирования аккаунта в личном кабинете
4. они принимаю значения компонентом реализованных с помощью npm @redux/toolkit для отображения и изменения созданного состояния

</details>


<details>
<summary>Сборка проекта</summary>

собрать проект можно следуя следующей инструкции: 
1. создания базы данных использову СУБД прописав команду create table test и введя данных для подлючения к ней в server/.env
2. включение сервера, перейся в server и выполнив в консоли команду mpm start
3. включение клиент-части, перейдся в client и выполнив в консоли команду npm start

Но и был реализован современный подход к сборке проекта с использованием docker для реализации такого подхода вам нужен всего лишь приложение docker и файл с данными о проекте docker-compose.yaml для запуска вам нужно выполнить в консоли команду docker compose up -d где храниться этот файл, а так же должен быть открыт docker
</details>