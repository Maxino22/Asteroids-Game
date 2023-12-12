const canvas = document.getElementById('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')



class Player{
    constructor({ position, velocity}){
     this.position = position
     this.velocity = velocity 
     this.rotation = 0
    }

  draw(){
    ctx.save()

    ctx.translate(this.position.x, this.position.y)
    ctx.rotate(this.rotation)
    ctx.translate(-this.position.x, -this.position.y)

    ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2, false)
    ctx.fillStyle = 'red'
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(this.position.x + 30, this.position.y)
    ctx.lineTo(this.position.x - 10, this.position.y - 10)
    ctx.lineTo(this.position.x - 10, this.position.y + 10)
    ctx.closePath()

    ctx.strokeStyle = 'white'
    ctx.stroke()
    ctx.restore()
  }


  update(){
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

}

const player = new Player({ 
  position: { x: canvas.width / 2, y: canvas.height / 2}, 
  velocity: { x: 0, y: 0} })



const keys = {
  w:{
    pressed: false
  },
  a:{
    pressed: false
  },
  d:{
    pressed: false
  }
}

const SPEED = 3
const ROTATIONSPEED = 0.05
function animate(){
  window.requestAnimationFrame(animate)
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  player.update()


 if (keys.w.pressed){
  player.velocity.x = Math.cos(player.rotation) * SPEED
  player.velocity.y = Math.sin(player.rotation) * SPEED
 } else if (!keys.w.pressed){
  player.velocity.x *= 0.88
  player.velocity.y *= 0.88
  
 }

 if (keys.d.pressed) player.rotation += ROTATIONSPEED
   else if (keys.a.pressed) player.rotation -= ROTATIONSPEED
}



animate()

window.addEventListener('keydown', (e) => {
  switch(e.code){
    case 'KeyW':
    keys.w.pressed = true
      break
    case 'KeyA':
    keys.a.pressed = true
    console.log(keys);

      break
    case 'KeyD':
    keys.d.pressed = true
      break
  }

})


window.addEventListener('keyup', (e) => {
  switch(e.code){
    case 'KeyW':
    keys.w.pressed = false
      break
    case 'KeyA':
    keys.a.pressed = false

      break
    case 'KeyD':
    keys.d.pressed = false
      break
  }

})

