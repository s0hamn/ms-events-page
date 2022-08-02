const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
let hue = 60;
var nparticles = 150;

if(window.innerWidth < 600){
    nparticles = 50
}
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: undefined,
  y: undefined,
};

// canvas.addEventListener('mousemove', (event)=>{
//     mouse.x = event.x;
//     mouse.y = event.y;

//     for(let i = 0; i< 5; i++){
//         particlesArray.push(new Particle())
//     }
// })

class Particle{
    constructor(){
        this.x = Math.random()*canvas.width
        this.y = Math.random()*canvas.height
        this.speedX = Math.random() * 1-0.5;
        this.speedY = Math.random() * 1 - 0.5
        this.size = Math.random() * 5 + 1;
    }

    update(){

        this.x += this.speedX
    this.y += this.speedY
    }
    draw(){
        ctx.fillStyle = 'hsl(' + hue + ', 50%, 50%)'
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.size,0,Math.PI * 2)
        ctx.fill()
    }
}

const init = ()=>{
    for(let i = 0;i < nparticles; i++){
        particlesArray.push(new Particle())
        
    }
    
    console.log(particlesArray)
}
init()
const handleParticles = ()=>{
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update()
        particlesArray[i].draw()

        

        for(let j = i; j< particlesArray.length; j++){
            const dx = particlesArray[i].x - particlesArray[j].x
            const dy = particlesArray[i].y - particlesArray[j].y

            const distance = Math.sqrt(dx * dx + dy * dy)

            if(distance < 100){
                ctx.beginPath()
                ctx.strokeStyle = 'hsl(' + hue + ', 100%, 50%)'
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
                ctx.stroke()
            }
            
        }

        if (particlesArray[i].x > canvas.width || particlesArray[i].x < 0) {
            particlesArray[i].speedX = -particlesArray[i].speedX;
          } else if (particlesArray[i].y > canvas.height || particlesArray[i].y < 0) {
            particlesArray[i].speedY = -particlesArray[i].speedY;
          }

    }
}

const animate = ()=>{

    ctx.clearRect(0, 0 , canvas.width, canvas.height)
    handleParticles()
    hue+= 0.2;
    requestAnimationFrame(animate)
}

animate()
