const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const menu = document.getElementById('menu')
const loseMenu = document.getElementById('loseMenu')
const soundBtns = Array.from(document.getElementsByClassName('sound'))
const volumeUp = document.getElementById('volumeUp')
const volumeDown = document.getElementById('volumeDown')

canvas.width = 1280
canvas.height = 600

canvas.style.backgroundColor = "black"

//Initializing The Image Variables

const platformImg = document.getElementById('platform')
const backgroundImg = document.getElementById('background')
const hillsImg = document.getElementById('hills')
const bookworm = document.getElementById('bookworm')
const platformTall = document.getElementById('platformTall')
const platformGold = document.getElementById('goldPlatform')
const playerImg = document.getElementById('Player')
const PlayerJump = document.getElementById('playerJump')


    // INITIALIZING LVL 2 ASSETS

    const platformImg2 = document.getElementById('platform2')
    const backgroundImg2 = document.getElementById('background2')
    const hillsImg2 = document.getElementById('hills2')
    const platformTall2 = document.getElementById('platformTall2')

    let currentPlayer = playerImg

    //INITIALZING LVL 3 ASSETS
    const platformImg3 = document.getElementById('platform3')
    const backgroundImg3= document.getElementById('background3')
    const hillsImg3 = document.getElementById('hills3')
    const platformTall3 = document.getElementById('platformTall3')

//Movement Constants // Physics Constants // Environment Variables
const gravity = 1;
let musicPlaying = true
let grounded = false;
let winAudioplaying = false
let currentLevel = 0
let win= false


//Sound Effects

let Music = new Audio('assets/bgmusic.mp3')
let sfx = [
    new Audio('assets/jump1.mp3'),
    new Audio('assets/jump2.mp3'),
    new Audio('assets/jump3.mp3'),
]

let scrollOffset = 0;

const keys = {
    right: {
        isPressed: false
    },
    left: {
        isPressed: false
    }
}

class Player {
    constructor() {
        this.position = {
            x: 50,
            y: 100,
        }
        this.width = 100
        this.height = 100
        this.moveSpeed = 20;

        this.velocity = {
            x: 0,
            y: 1
        }
        this.isOnGround = false;
    }

    draw(image) {
        c.fillStyle = 'red'
        // c.drawImage(playerImg,this.x, this.y)
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(image, this.position.x, this.position.y)
    }

    deathMsg() {
        c.fillStyle = 'blue'
        c.fillText('You Ded', 100, 100, 500)
    }

    update() {
        this.draw(currentPlayer)
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        }
        else {
            //    console.log('ded')

        }

    }
}
class Platform {
    constructor({ x, y }) {
        this.position = {
            x,
            y
        }
        this.width = platformImg.width
        this.height = platformImg.height
    }

    draw() {
        c.drawImage(platformImg, this.position.x, this.position.y)
    }
}

class goldPlat {
    constructor({ x, y }) {
        this.position = {
            x,
            y
        }
        this.width = platformGold.width
        this.height = platformGold.height
    }

    draw() {
        c.drawImage(platformGold, this.position.x, this.position.y)
    }
}


class GenericObject {
    constructor({ x, y }) {
        this.position = {
            x,
            y
        }
        this.width = backgroundImg.width
        this.height = backgroundImg.height;
    }

    draw(generic) {
        c.drawImage(generic, this.position.x, this.position.y)
    }
}

let player = new Player

let generics = [

    new GenericObject({ x: -1, y: -1 },),
    new GenericObject({ x: 30, y: 100 })
]

let platforms = [
    new Platform({ x: 0, y: 500 }),
    new Platform({ x: 500, y: 500 }),
    new Platform({ x: 1200, y: 200 }),
    new Platform({ x: 1200 * 2, y: 400 }),
    new Platform({ x: 1200 * 3, y: 500 }),
    new Platform({ x: 1200 * 4, y: 400 }),
    new Platform({ x: 1200 * 5, y: 200 }),
    new Platform({ x: 1200 * 6, y: 500 }),
    new Platform({ x: 1200 * 7.3, y: 500 }),
    new Platform({ x: 1200 * 8.4 + 100, y: 300 }),
    new Platform({ x: 1200 * 9.5 + 100, y: 100 }),
    new goldPlat({ x: 1200 * 11 + 200, y: 500 }),
]

function loadGenerics() {

    generics[0].draw(backgroundImg)
    generics[1].draw(hillsImg)
}

function loadGenericsLevel2() {

    generics[0].draw(backgroundImg2)
    generics[1].draw(hillsImg2)
}

function loadGenericsLevel3(){
    generics[0].draw(backgroundImg3)
    generics[1].draw(hillsImg3)
}

function init() {

    scrollOffset = 0
    player = new Player
    platforms = [

        new Platform({ x: 0, y: 500 }),
        new Platform({ x: 500, y: 500 }),
        new Platform({ x: 1200, y: 200 }),
        new Platform({ x: 1200 * 2, y: 400 }),
        new Platform({ x: 1200 * 3, y: 500 }),
        new Platform({ x: 1200 * 4, y: 400 }),
        new Platform({ x: 1200 * 5, y: 200 }),
        new Platform({ x: 1200 * 6, y: 500 }),
        new Platform({ x: 1200 * 7.3, y: 500 }),
        new Platform({ x: 1200 * 8.4 + 100, y: 300 }),
        new Platform({ x: 1200 * 9.5 + 100, y: 100 }),
        new goldPlat({ x: 1200 * 11 + 200, y: 500 }),

        // new Platform({x: 0, y: 500}),
        // new Platform({x: 900, y: 300}),
        // new Platform({x: 1800, y: 400}),
        // new Platform({x: 2500, y: 400}),
        // new Platform({x: 3800 , y: 500}),
        // new Platform({x: 4500 , y: 500}),
        // new Platform({x: 5200 , y: 500}),
        // new Platform({x: 6800 , y: 500}),
        // new Platform({x: 8200 , y: 300}),
        // new Platform({x: 9600 , y: 100}),
        // new goldPlat({x: 11480 , y: 500}),



    ]
    // function createPlatform(X,Y){
    //     new Platform({x: X, y: Y})
    // }

    generics = [

        new GenericObject({ x: -1, y: -1 },),
        new GenericObject({ x: 30, y: 100 })
    ]

}
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    // generics.forEach(generic => {
    //     generic.draw(backgroundImg)
    //     generic.draw(hillsImg)
    // })

    if (currentLevel === 0) {
        loadGenerics()
    }
    if (currentLevel === 1) {
        loadGenericsLevel2()
    }

    if(currentLevel === 2){
        loadGenericsLevel3()
    }



    platforms.forEach(platform => {
        platform.draw()
    })
    player.update()


    //MOVEMENTS 

    //Right
    if (keys.right.isPressed && player.position.x < 500) {
        player.velocity.x = player.moveSpeed;

    }
    else if ((keys.left.isPressed && player.position.x > 100)
        || (keys.left.isPressed && scrollOffset === 0 && player.position.x > 0)) {
        player.velocity.x = -player.moveSpeed
    }
    else {
        player.velocity.x = 0
    }
    if (keys.right.isPressed && player.position.x >= 500) {
        platforms.forEach(platform => {
            scrollOffset += player.moveSpeed / 100
            scrolloffset = Math.floor(scrollOffset)
            platform.draw()
            platform.position.x -= player.moveSpeed;
        })
        generics.forEach(genericObject => {
            genericObject.position.x -= player.moveSpeed / 3
        })

        //LEFT
    }
    else if (keys.left.isPressed && player.position.x <= 100 && scrollOffset > 0) {
        platforms.forEach(platform => {
            scrollOffset -= player.moveSpeed / 100;
            scrolloffset = Math.floor(scrollOffset)
            platform.position.x += player.moveSpeed;
        })

        generics.forEach(genericObject => {
            genericObject.position.x += player.moveSpeed / 3
        })
    }

    // if(ded){

    //     c.font= '50px sans-serif'
    //     c.fillText('You Died!', 500, 300,1000)
    //     setTimeout(()=>{
    //         ded = false;
    //     }, 2000)
    // }


    // console.log(scrollOffset)


    // Jump Mechancics
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
            player.isOnGround = true;
        }

        if (player.isOnGround) {
            currentPlayer = playerImg
        }
        if (!player.isOnGround) {
            currentPlayer = PlayerJump
        }

    })

    // WIN SCENARIO

    if (scrollOffset > 1570) {
        console.log('You Win')
        generics[0].position.x = 0
        winAudio()
        scrollOffset = 0
        currentLevel ++

        if(currentLevel === 1){
            level2()
        }
         if(currentLevel === 2){
            level3()
        }

       if(currentLevel === 3){
        winScenario()
       }

        console.log(currentLevel)
        console.log('level ' + currentLevel)
    }

    // LOSE SCENEARIO

    if (player.position.y > canvas.height) {
        loseScenario()
        player.position.y = 100
        currentLevel = 0
    }

    // console.log(player.isOnGround)

}





addEventListener('keydown', ({ keyCode }) => {

    switch (keyCode) {
        //Left Key
        case 65:
            keys.left.isPressed = true
            break;
        //Down Key
        case 83:
            // player.velocity.y += 5;
            break;
        //Right Key
        case 68:
            keys.right.isPressed = true
            break;
        //Up Key
        case 87:
            if (player.isOnGround == true) {
                player.velocity.y -= 25;
                let random = Math.floor(Math.random() * 3)
                // console.log(random) 
                sfx[random].play()

                player.isOnGround = false
            }
            break;
    }

})

addEventListener('keyup', ({ keyCode }) => {

    switch (keyCode) {
        //Left Key
        case 65:
            keys.left.isPressed = false
            break;
        //Down Key
        case 83:
            break;
        //Right Key
        case 68:
            keys.right.isPressed = false
            break;
        //Up Key
        case 87:
            // console.log('up')
            break;
    }

})



// console.log(backgroundImg)
// console.log(hillsImg)



//OLD WINSCANARIO


// function winScenario() { 
//     c.clearRect(0, 0, canvas.width, canvas.height)
//     fillStyle = 'red'
//     c.font = '80px IMPACT'
//     c.fillText('YOU WINN!!', canvas.width / 2, canvas.height / 2)
//     c.textAlign = 'center'
//     c.fillStyle = "white"
//     c.font = '40px Sans-serif'
//     c.fillText('I Was Too Lazy To Code a Play Again Button, Feel Free To Just Refresh The Page.', canvas.width / 2, canvas.height  - 200, 1100)
//     c.textAlign = 'center'
//     if (!winAudioplaying) {
//         FinalAudio()
//     }
// }
function FinalAudio(){
    new Audio('assets/FINAL.mp3').play()
}


function winAudio() {
    new Audio('assets/win.mp3').play()
    winAudioplaying = true
}

function loseScenario() {
    canvas.style.display = 'none'
    loseMenu.style.display = 'flex'
}

function tryAgain() {
    loseMenu.style.display = 'none'
    canvas.style.display = 'block'
    init()
}

function startGame() {
    menu.style.display = 'none'
    canvas.style.display = 'block'
    console.log('game Started')
    init()
    animate()
}


//BG MUSIC

audioPlayStartGame.addEventListener('click', () => {
    Music.play()
    musicPlaying = true;
})

function sound() {
    if (musicPlaying) {

        soundBtns.forEach(soundbtn => {
            soundbtn.src = 'assets/SoundOff.png'
        })
        musicPlaying = false;
        Music.pause()
    } else {
        soundBtns.forEach(soundbtn => {
            soundbtn.src = 'assets/SoundOn.png'
        })
        musicPlaying = true
        Music.play()
    }
}

function increaseVol() {
    if (Music.volume < 1) {
        Music.volume += 0.1
        console.log(Music.volume)
    }
}

function decreaseVol() {
    if (Music.volume > 0) {
        Music.volume -= 0.1
        console.log(Music.volume)
    }
}

function level2() {
    scrollOffset = 0
    player.position.y = 0
    class Level2Plats {
        constructor({ x, y }) {
            this.position = {
                x,
                y
            }
            this.width = platformImg2.width
            this.height = platformImg2.height
        }

        draw() {
            c.drawImage(platformImg2, this.position.x, this.position.y)
        }
    }

    platforms = [

        new Level2Plats({ x: 0, y: 120 }),
        new Level2Plats({ x: 500, y: 120 }),
        new Level2Plats({x: 1000, y: 400}),
        new Level2Plats({x: 2200, y: 100}),
        new Level2Plats({x: 3400, y: 500}),
        new Level2Plats({x: 4200, y: 200}),
        new Level2Plats({x: 5100, y: 100}),
        new Level2Plats({x: 7000, y: 500}),
        new Level2Plats({x: 7700, y: 300}),
        new Level2Plats({x: 8800, y: 500}),
        new Level2Plats({x: 10000, y: 300}),
        new Level2Plats({x: 10700, y: 100}),
        new goldPlat({x: 12500, y: 500}),

    ]
}


function level3(){
    scrollOffset = 0
    player.position.y = 0

    class Level3Plats {
        constructor({x,y}){
            this.position = {
                x,
                y
            }
            this.width = platformImg3.width
            this.height = platformImg3.height
        }
        
        draw(){
            c.drawImage(platformImg3, this.position.x, this.position.y)
        }
    }
    platforms = [

        new Level3Plats({ x: 0, y: 500 }),
        new Level3Plats({ x: 500, y: 500 }),
        new Level3Plats({x: 1000, y: 500}),
        new Level3Plats({x: 1500, y: 500}),
        new Level3Plats({x: 2000, y: 500}),
        new Level3Plats({x: 2500, y: 500}),
        new Level3Plats({x: 3000, y: 500}),
        new Level3Plats({x: 3500, y: 500}),
        new Level3Plats({x: 4000, y: 500}),
        new Level3Plats({x: 4500, y: 5500}),
        new Level3Plats({x: 5000, y: 500}),
        new Level3Plats({x: 5500, y: 500}),
        new Level3Plats({x: 6000, y: 500}),
        new Level3Plats({x: 6500, y: 500}),
        new Level3Plats({x: 700, y: 500}),
        new Level3Plats({x: 7600, y: 500}),
        new goldPlat({x: 9200, y: 500}),
        new goldPlat({x: 9700, y: 500})

    ]
}
function winScenario(){
document.body.innerHTML = " ";

document.body.innerHTML = `    <div class="socials">
<h3>Follow ShahBhai On Instagram</h3>
<p>@Oohsorry_</p>
<a href="https://www.instagram.com/oohsorry_/" target="_blank">
<i class="fa-brands fa-instagram"></i>
</a>
</div>`

let h1 = document.createElement('h1')

h1.innerText = "THANK YOU SOO MUCH FOR PLAYING MY GAME"

h1.style.color = "RED"
document.body.appendChild(h1)

let p = document.createElement('p')
p.innerText = "I Was Too Lazy To Code a Play Again Button, Feel Free To Just Refresh The Page."
p.style.color = 'dodgerblue'
document.body.appendChild(p)

Music.pause()
let audioPlaying;
if(!audioPlaying){
new Audio('assets/FINAL.mp3').play()
audioPlaying = true

}

}