// Isaiah Cabugos Reaction Test Code

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let canvas_parent = document.querySelector('.canvas-parent');
let time_list = document.getElementById('time_list');

let parent_height = canvas_parent.clientHeight;
let parent_width = canvas_parent.clientWidth;

canvas.height = parent_height;
canvas.width = parent_width;

context.font = "30px Open Sans Condensed";
context.fillStyle = "rgb(0, 70, 20)";
context.textAlign = "center";
context.textBaseLine = "middle";
context.fillText('Click in this area', canvas.width / 2, canvas.height / 2);

let startTraditional = document.getElementById('startTraditional');
let time_text = document.getElementById('time-text');

let GameStatus = {
    STOP: 1,
    START: 2,
}

let status = GameStatus.STOP;
var timeout1;
var timeout2;
let time_now;
let time_later;
let play_time;
let play_clicks = 0;
let player_records = 1;


/* Used To Get a Random Time */
function get_random_time(min, max) {
    let result = Math.floor(Math.random() * Math.floor(max)) + min;
    result = result * 1000;
    return result;
}

function end_game() {
    clearTimeout(timeout1);
    clearTimeout(timeout2);

    canvas.style.background = "rgb(0, 148, 255)";
    startTraditional.innerHTML = "Start Game";
    status = GameStatus.STOP;
    console.log('game has ended');
}


/* Called when player clicks within alotted time (random time + 5seconds) */
function timeout1_function(time) {
    timeout1 = setTimeout(function () {
        canvas.style.background = "rgb(78, 197, 78)";
        let date1 = new Date();
        time_now = date1.getTime();

        
            canvas.addEventListener('click', function () {
                let date2 = new Date();
                time_later = date2.getTime();
                play_time = (time_later - time_now);

                if (play_clicks < 1) {
                    time_text.innerHTML = play_time + " ms";

                    /* Records player's score in 'your times' section */
                    $("#time_list ol").append('<li>' + play_time + ' ms</li>');

                    play_clicks = play_clicks + 1;
                } else { console.log('bruh'); }
 
            });
        
    }, time)
}

/* Called if player exceeds alotted time (random time + 5 s) */
function timeout2_function(time) {
    timeout2 = setTimeout(function () {
        end_game();
    }, time)
}

async function start_game() {
    let change_time = get_random_time(1, 8);
    let end_time = change_time + 5000;
    play_clicks = 0;
    time_text.innerHTML = "...awaiting time";
    status = GameStatus.START;
    canvas.style.background = "rgb(206, 63, 63)";

    await timeout1_function( change_time );
    await timeout2_function( end_time );
}

/* Adds listener for when player clicks on start button */
startTraditional.addEventListener('click', function () {
    if (status === GameStatus.START) {
        end_game();
    } else {
        start_game();
        this.innerHTML = "Stop Game";
    }
});


/* Adds listener for when player clicks on canvas */
canvas.addEventListener('click', function () {
    if (status === GameStatus.START) {
        console.log('game was in progress');
        time_text.innerHTML = "Too Early! Try Again.";
    } else {
        console.log('game was not in progress');
        time_text.innerHTML = "Try starting the game first!";
    }
    end_game();
});