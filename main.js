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
        speed:3,
        traffic:3
    };

    function getQuantityElements(heightElement){
        return document.documentElement.clientHeight / heightElement + 1;
    }

    function startGame(){
        start.classList.add('hide');
        gameArea.innerHTML = '';

        for (let i = 0; i < getQuantityElements(100); i++) {
            const line = document.createElement('div');
            line.classList.add('line');
            line.style.top = (i * 75) +'px';
            line.y = i * 100;
            gameArea.appendChild(line);


        }

        for (let i =0; i < getQuantityElements(100 * setting.traffic); i++){
            const enemy = document.createElement('div');
            enemy.classList.add('enemy');
            enemy.y = -100 * setting.traffic * (i + 1);



            enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
            enemy.style.top = enemy.y + 'px';
            enemy.style.background = 'transparent url(./image/enemy2.png) center / cover no-repeat';
            gameArea.appendChild(enemy);
        }
        setting.score = 0;
        setting.start = true;
        gameArea.appendChild(car);

        car.style.left = gameArea.offsetWidth/2 - car.offsetWidth/2;
        car.style.top = 'auto';
        car.style.bottom = '10px';

        setting.x = car.offsetLeft;
        setting.y = car.offsetTop;
        requestAnimationFrame(playGame);
    }
    function playGame(){
        /*console.log('Play game!');*/
        
        if (setting.start === true){
            setting.score += setting.speed;
            /*score.textContent = 'SCORE' + setting.score;*/
            score.innerHTML = 'SCORE<br>' + setting.score;
           moveRoad();
           moveEnemy();
            if(keys.ArrowLeft === true && setting.x > 0){
                setting.x -= setting.speed; // setting.x = setting.x - setting.speed;//
            }
            if(keys.ArrowRight === true && setting.x < (gameArea.offsetWidth - 50)){
                setting.x += setting.speed;
            }
            if(keys.ArrowUp === true && setting.y > 0){
                setting.y -= setting.speed;
            }
            if(keys.ArrowDown === true && setting.y < (gameArea.offsetHeight - car.offsetHeight)){
                setting.y += setting.speed;
            }

            car.style.left = setting.x + 'px';
            car.style.top = setting.y + 'px';

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
    function moveRoad(){
        let lines = document.querySelectorAll('.line');
        lines.forEach(function(line){
            /*console.log(item or i); */
        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if(line.y >=document.documentElement.clientHeight){
            line.y = -100;
        }
        })
    }

    function moveEnemy(){
        let enemy = document.querySelectorAll('.enemy');

        enemy.forEach(function(item){
            let carRect = car.getBoundingClientRect();
            let enemyRect = item.getBoundingClientRect();

             if (carRect.top <= enemyRect.bottom &&
              carRect.right >= enemyRect.left &&
              carRect.left <= enemyRect.right &&
              carRect.bottom >= enemyRect.top) {
                  setting.start = false;
                  console.log('CarAccident');
                  start.classList.remove('hide');
                  start.style.top = score.offsetHeight;
              }

            item.y += setting.speed / 2;
            item.style.top = item.y + 'px';
            if (item.y >= document.documentElement.clientHeight){
                item.y = -100 * setting.traffic;
                item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
            }
        });
    }