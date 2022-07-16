var score = 0;
var hero = {   // kahraminimizin oyuna nereden baslayacagini gosterir
		x: 300,
		y: 600
	}

var enemies = [{x: 50, y:50}, {x: 450, y:250}, {x: 800, y:150}];  // ruh emicilerin hangi noktalardan gosterilecegini bir dizi icerisinde tuttum

var bullets = [];

function displayHero(){ // kahramanimiz seb sayfasinda gosterime girer
	document.getElementById('hero').style['top'] = hero.y + "px"; 
	document.getElementById('hero').style['left'] = hero.x + "px";
}

function displayEnemies(){
	var output = ''; // bos degisken
	for(var i=0; i<enemies.length; i++){ // bu, düşman dizisinden geçip aşağıdakileri yapan bir for döngüsü oluşturur.
		output += "<div class='enemy1' style='top:"+enemies[i].y+"px; left:"+enemies[i].x+"px;'></div>"; //  sol ve üst stil değişkenlerini değiştirdik, böylece bunun yerine yukarıdaki enemies dizisinden gelen değerler görüntülendi. Aslinda bu sekilde statik bir görüntüyü alıp, her düşmanın konumunu bir dizide saklayip ve ardından bu diziyi çağırıp ve görüntüleri yaziyoruz. Bu aslında düşman imajımızı artık manipüle edebileceğimiz nesnelere dönüştürdü.
	}
	document.getElementById('enemies').innerHTML = output; 
	// console.log(output);
}

function moveEnemies(){
	for(var i=0; i<enemies.length; i++){
		enemies[i].y += 5;

		if(enemies[i].y > 540){
			enemies[i].y = 0;
			enemies[i].x = Math.random()*500;
		}
	}
}

function moveBullets(){
	for(var i=0; i<bullets.length; i++){
		bullets[i].y -= 5;

		if (bullets[i].y<0){
			bullets[i] = bullets[bullets.length-1];
			bullets.pop();
		}
	}
}


function displayBullets(){
	var output = '';
	for(var i=0; i<bullets.length; i++){
		output += "<div class='bullet' style='top:"+bullets[i].y+"px; left:"+bullets[i].x+"px;'></div>"; 
		}
		document.getElementById('bullets').innerHTML = output;
	}
	
function displayScore(){
	document.getElementById('score').innerHTML = score;	
}

function gameLoop(){
	displayHero();
	moveEnemies();
	displayEnemies();
	moveBullets();
	displayBullets();
	detectCollision();
	displayScore();
}

function detectCollision(){
	for(var i=0; i<bullets.length; i++){
		for(var j=0; j<enemies.length; j++){

			if( Math.abs(bullets[i].x - enemies[j].x) < 10 && Math.abs(bullets[i].y - enemies[j].y) < 10) {
				console.log('bullet', i, 'and enemy',j, 'collided');
				score += 10;
			}
		}		
	}
};
 
setInterval(gameLoop, 20); // Her 100Ms de gameLoop olmasi icin

document.onkeydown = function(a) {  
	
	if(a.keyCode == 37){ //  left
		hero.x -= 10; // kahramanımızı hareket ettirir. Bunu aşağıda x ve y ekseni boyunca tüm yönler için yapıyoruz (yukarı, aşağı, sol, sağ ).
	} else if(a.keyCode == 39){ //  right
		hero.x += 10;
	}
	if(a.keyCode == 38){ //  up
		hero.y -= 10;
	} else if (a.keyCode == 40){ //  down
		hero.y += 10;
	} else if (a.keyCode == 32){ // space 
		bullets.push({x: hero.x+6, y: hero.y-15});
		displayBullets();
	}
	displayHero(); 
}

displayHero(); // kahramani goster
displayEnemies(); // ruhemicileri goster