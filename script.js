const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d');

canvas.width = innerWidth -100
canvas.height = innerHeight-100 
window.addEventListener('resize', () =>{
    canvas.width = innerWidth -20;
    canvas.height = innerHeight -20;


})


const gravity = 2
const keys= {
    right: {
        isPressed: false
    },
    left: {
        isPressed: false
    }
}

class Player {
    constructor(){
        this.position =  {
            x: 100,
            y: 200,
        }
        this.width = 50
        this.height = 50
        
        this.velocity = {
            x: 0,
            y: 1
        }
    }
    draw (){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        }
        else {
            this.velocity.y = 0
        }

        if(keys.right.isPressed){
            this.position.x += 10
        }
        if(keys.left.isPressed){
            this.position.x -= 10
        }

    }
}

class Platform {
    constructor(){
        this.width = 200
        this.height = 20 
        this.updatePosition()
        window.addEventListener('resize', this.updatePosition.bind(this))
    }

    updatePosition(){
        this.position = {
            x: canvas.width/2 - this.width/2,
            y: canvas.height/2
        }
    }

    draw() {
        c.fillStyle = 'dodgerblue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.updatePosition()
        this.draw()

   
    }
}
const player = new Player()
const platform = new Platform()



function animate() {
    requestAnimationFrame(animate)

    c.clearRect(0,0, canvas.width, canvas.height)
    player.update()
    platform.update()

}


addEventListener('keydown', (key) => {
    switch (key.keyCode) {
        case 65:
            //move left
            console.log('Left')
            keys.left.isPressed = true
            break;
        case 83: 
            //move down
            console.log('down')
            break;
        case 68:
            //move right
            console.log('right')
            keys.right.isPressed = true
            break;
        case 87: 
            //move up
            console.log('up')
            player.velocity.y -= 40;
    

    }
})

addEventListener('keyup', (key) => {
    switch (key.keyCode) {
        case 65:
            //move left
            console.log('Left')
            keys.left.isPressed = false
            break;
        case 83: 
            //move down
            console.log('down')
            break;
        case 68:
            //move right
            console.log('right')
            keys.right.isPressed = false
            break;
        case 87: 
            //move up
            console.log('up')

    

    }
})

animate()
