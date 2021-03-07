function q(el){ return document.querySelector(el) }
function makePlayerActive(n){
	for(var x=1; x<3; x++){
		q('.plr'+x).style.color='#555';
		q('.plr'+x).style.textShadow='none'
	}
	var colors = ['#ff3cb5','#45f1ff']
	q('.plr'+n).style.color = colors[n-1]
	q('.plr'+n).style.textShadow = `0 0 10px ${colors[n-1]}`
}
const tiles = q('.main-grid').children
var gameOver = false;
var gameWinner;
const players = ["X", "O"]
var currentMove = "X";
var board = [["","",""],
			 ["","",""],
			 ["","",""]]

Array.from(tiles).forEach(el => {
	var coordinates;
	el.classList.forEach(className => {
		if(className.includes('tn')){
			// We use .includes for searching if a substring is present in a string
			// or an element in an array || we use .contains for DOM elements
			coordinates = className.slice(2,4).split("")
			//  						  | |
			//					(incl)start end(excl)
			// .slice function used to get substring from a string 
		}
	})	
	el.addEventListener('click', function(){ 
		if(!gameOver && board[parseInt(coordinates[0])-1][parseInt(coordinates[1])-1] == ""){
			makeMove(coordinates) 
			// console.log(coordinates)
		}	
	})	

	// We are using Array.from(el) function here because we cannot iterate 
	// through a NodeList using .forEach function.
})
function makeMove(cord){
	var name;
	if(currentMove == "X"){ name='times' } else{ name='circle' }
	q(".tn"+cord[0]+cord[1]).innerHTML = `<i class="fas fa-${name} tile-el-${name}"></i>`
	board[parseInt(cord[0])-1][parseInt(cord[1]-1)] = currentMove
	if(currentMove == "X"){ 
		currentMove = "O"
		makePlayerActive(2)
	}
	else{ 
		currentMove = "X"
		makePlayerActive(1)
	}
	checkWin()
}
function checkWin(){
	console.table(board)
	for(var i=0; i<3; i++){
		if(!board[i].includes("") && board[i][0] == board[i][1] && board[i][1] == board[i][2]){
			gameOver = true
			gameWinner = board[i][1]
		}
		else if(board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != ""){
			gameOver = true
			gameWinner = board[0][i]
		}
		else if(board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[1][1] != ""){
			gameOver = true
			gameWinner = board[1][1]
		}
		else if(board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[1][1] != ""){
			gameOver = true
			gameWinner = board[1][1]
		}
		if(gameOver){
			var colors = ['#ff3cb5','#45f1ff']
			var name;
			var win;
			for(var j=1; j<3; j++){
				q('.plr'+j).style.color = colors[j-1]
				q('.plr'+j).style.textShadow = `0 0 10px ${colors[j-1]}`
			}
			if(gameWinner == "X"){name = 'circle'; win='times'} else{ name = 'times'; win='circle' }
			Array.from(document.querySelectorAll('.tile-el-'+name)).forEach(el => {
				el.style.color='#555'
				el.style.textShadow='none'
			})
			q('.game-winner').innerHTML = `<i class="fas fa-${win}"></i>`
			q('.game-winner').style = `color:${colors[players.indexOf(gameWinner)]}; text-shadow:0 0 10px ${colors[players.indexOf(gameWinner)]}`
			q('footer').style.display = 'block'
			console.log(`${gameWinner} wins the game.`)
		}
	}
}
makePlayerActive(1)
