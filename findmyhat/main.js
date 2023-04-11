
const prompt = require('prompt-sync')({ sigint: true });
const clear = require('clear-screen');


const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const height = 10; //row
const width = 10; //col

let currCharRow = 0;
let currCharCol = 0;


const field = [[]];

function generateField() {

  for (let row = 0; row < height; row++) {

    field[row] = [];


    for (let col = 0; col < width; col++) {
      // Default is all field
      // check for probability to generate a field or a hole
      // Math.random() 
      /*
      1) generate a random number between 0 -9
      2) check if the random number < 2 then we will generate a hole (+-30%)
      3) check if the random number >=2 then we will generate a field(+-700%)
  
  
      */
      let prob = Math.floor(Math.random() * 10);
      if (prob < 3) {

        field[row][col] = hole;

      }else {

        field[row][col] = fieldCharacter;
        
      }

    }
  }

  // Display the character to (0,0)
  field[currCharRow][currCharCol] = pathCharacter;

  // Display the Hat in random position
  // randomise the row and col
  let row = (Math.floor(Math.random() * 10));
  let col = (Math.floor(Math.random() * 10));
  field[row][col] = hat;




}//end of generate function



function print() {

  clear();

  const displayString = field.map(row => {
    return row.join('');
  }).join('\n');
  console.log(displayString);


}


function askQuestion() {

  // prompt user to move the Char
  const getInput = prompt('Which Way? ').toLowerCase();

  // Check if user key in u, d, l , r 
  switch (getInput) {

    case "u":
      //  move up --
      currCharRow--;
      break;

    case "d":
      // move down ++
      currCharRow++;
      break;

    case "l":
      // move left --
      currCharCol--;
      break;

    case "r":
      // move right - example to move right
      currCharCol++;
      break;

    default:
      console.log("Please enter u,d,l,r");
      break;
  }

}

function startGame() {

  let isPlaying = true;

  while (isPlaying) { //(isPlaying == true)

    print();
    askQuestion();// get up down left right
  

    // check if win or lose or continue
    // example of falling into a hole

    if (currCharRow < 0||currCharRow >=height||currCharCol < 0||currCharCol >=width){
    
     
      console.log('Out of bounds - Game End');

      isPlaying = false;
    }else if (field[currCharRow][currCharCol] == hole) {

      console.log('Sorry, you fell down a hole!');
      isPlaying = false;

    } else if (field[currCharRow][currCharCol] == hat) {

      console.log('Congrats, you found your hat!');
      isPlaying = false;


    } else {
      field[currCharRow][currCharCol] = pathCharacter;
    }
  }

}
generateField();
startGame();









