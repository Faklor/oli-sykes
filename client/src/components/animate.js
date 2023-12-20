import anime from 'animejs'


//======================NAV==========================
const animateBarCheck = ()=>{
    
    anime({
        targets: '.item',
        
        width:'7em',
        translateY: function(el, i) {
          return 100 * i
        },
        translateX: function(el, i) {
          return anime.random(0, 10) * i
        },
        rotate: [function(el, i) { return anime.random(-360, 360)*i },0],
        duration: function() { return anime.random(100, 200) },
        delay: function() { return anime.random(10, 100) },
        opacity:1,
        complete: function(anim) {
            anim.animatables.forEach(el => {
                el.target.children[1].style.opacity = '1'
            })
            
        }
    })
    
    
}
const animateBarUnCheck = ()=>{
    
    anime({
        targets: '.item',
        
        width:'2em',
        translateY: function(el, i) {
          return 0 * i
        },
        translateX: function(el, i) {
          return 0 * i
        },
        rotate:[function(el, i) { return anime.random(-360, 360)*i }],
        duration: function() { return anime.random(10, 100) },
        delay: function() { return anime.random(10, 100) },
        opacity:function(el,i,l){return (l-i)-3},
        complete: function(anim) {
            anim.animatables.forEach(el => {
                el.target.children[1].style.opacity = '0'
            })
            
            
        }
    })
    
   
}
//======================User=========================
const loginOpacity1 = ()=>{
    anime({
        targets:'.sign',
        opacity:1,
        translateX:-150,
    })
}
//=======================dashboard===================
const dashContent = ()=>{
    anime({
        targets:'.dashboard',
        translateY: [360,0],
        scale: [0.25,1],
        duration: 500,
        opacity:[0,1],
        easing: 'easeInOutExpo',
        delay:100,
    })
}
const deleteItem = index=>{
    anime({
        targets:'.tableItem',
        translateX:function(el, i){
             
            if(i === index){
                return  -1500
            }

        },
        translateY:[function(el, i){
            if(i !== index && i > index){
                return "-=61"
            }
            
        }],
        //margin:20,
        easing: 'easeInOutExpo',
        opacity:function(el, i){
            if(i === index){
                return  0
            }
        },
    })
}
//=========================Like=======================
const setLike = ()=>{
    anime({
        targets:'.likePath',
        fill:'#EE88A3',
    })
}
export {
    animateBarCheck,
    animateBarUnCheck,
    //-------------------
    loginOpacity1,
    //-------------------
    dashContent,
    deleteItem,
    //-------------------
    setLike,
}
//===================================================
