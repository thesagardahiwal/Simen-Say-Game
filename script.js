let gameSeq = [];
let userSeq = [];

let btns = ['red','green','yellow','purple'];

let score = document.querySelector("#score");
let started = false;
let level = 0;
let point = 0;
let h4 = document.querySelector('h4');
document.addEventListener('keypress', function(){
    console.log("Working!");
    if(started == false){
        console.log("Game is Started");
        started = true;

        levelUp();
    }
})
function highScore(){
    
    if (point <= level){
        point = level;
    }
    score.textContent = point;
}

function btnFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    },250);

}
function userPress(btn){
    btn.classList.add('userflash');
    setTimeout(function(){
        btn.classList.remove('userflash');
    },250);

}
function ansChecker(idx){
    
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){

            setTimeout(levelUp,1000);
        }

    }else{
        h4.innerHTML = `Game Over!,Your <b>Score ${level}</b> <br>Press any key to restart game.`;
        highScore()
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = "white";
        },250);
        document.addEventListener('keypress', restart);
    }
}
function levelUp(){

    userSeq = [];
    level++;
    h4.innerText = level;

    let randomInx = Math.floor(Math.random()*3);
    let randomClass = btns[randomInx];
    let randomBtn = document.querySelector(`.${randomClass}`);
    
    gameSeq.push(randomBtn.getAttribute('id'));
    console.log(gameSeq);   
    btnFlash(randomBtn);
}
function butnPress(){
    let btn = this;
    userPress(btn);
    let userColor = btn.getAttribute('id');
    userSeq.push(userColor);
    console.log(userSeq);
    ansChecker(userSeq.length-1);
}

let allButns = document.querySelectorAll(".btns");
for(butn of allButns){
   
    butn.addEventListener('click', butnPress);

}
function restart(){
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
    started = true;

    levelUp();

}