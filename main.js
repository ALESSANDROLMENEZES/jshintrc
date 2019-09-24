/*alert('Hello friends!');*/
/*let _hello = 3;
let $m2oney = 100;
let myBirdthday = '10 march';
//NO let my_snake_is_big; //
const pi=3.14;*/

const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');

car.classList.add('car');

    //console.log('Helloooo');//
    //console.log(score);//
    //console.dir(start); How did he get the list of proccesses of hte dir(start) element? //
/*
    start.onclick = function() {
        start.classList.add('hide');
    };
*/
    start.addEventListener('click', startGame);
    document.addEventListener('keydown', startRun);
    document.addEventListener('keyup', stopRun);

    const keys = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowRight: false,
        ArrowLeft: false
    };

    const setting = {
        start: false,
        score: 0,
        speed:3
    }

    function startGame(){
        start.classList.add('hide');
        setting.start = true;
        gameArea.appendChild(car);
        requestAnimationFrame(playGame);
    }
    function playGame(){
        console.log('Play game!');
        if (setting.start === true){
            requestAnimationFrame(playGame);
        }
    }

    function startRun(event){
        event.preventDefault();
        //console.log(event.key);//
        keys[event.key] = true;
    }

    function stopRun(even){
        event.preventDefault();
        //console.log(event.key);//
        keys[event.key] = false;
    }
