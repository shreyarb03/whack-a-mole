const holes = document.querySelectorAll('.hole');
const scoreEl = document.getElementById('score');
const mole = document.querySelectorAll('.mole');
let lastHole; 
let timeUp = false;
let score = 0;


function randomTime(t1, t2){
    return Math.round(Math.random() * (t2-t1)+t1);
}

function randomHole(holes){
    const index = Math.floor(Math.random() *  holes.length);
    const hole = holes[index];
    if (hole==lastHole){
        return(randomHole(holes));
    }
    lastHole = hole;
    return hole;
}

function peep(){
    const time = randomTime(500, 1000); //how long the mole peeps for
    const hole = randomHole(holes);  //getting random holes
    hole.classList.add('up');//moles popping up
    setTimeout(()=>{
        hole.classList.remove('up')//mole goes down
        if(timeUp !==true){
            peep();
        }
    }, time);
}

function startGame(){
    console.log("start")
    scoreEl.innerText = "Score: 0";
    timeUp = false;
    score = 0;
    peep();
    setTimeOut(() => timeUp = true, 20000)  //shows moles for 20 secs
}

function whack(e){
    score++;
    this.parentNode.classList.remove('up');
    scoreEl.innerText = "Score: "+score;
}
mole.forEach(mole => mole.addEventListener('click', whack))