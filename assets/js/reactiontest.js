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
context.fillText('Choose a game below to start!', canvas.width / 2, canvas.height / 2);

let startTraditional = document.getElementById('startTraditional');
let startRapid = document.getElementById('startRapid');
let startAccuracy = document.getElementById('startAccuracy');
let time_text = document.getElementById('time-text');
let time_text_rapid = document.getElementById('time-text-rapid');
let time_text_accuracy = document.getElementById('time-text-accuracy');

const controller = new AbortController();

let GameStatus = {
    STOP: 0,
    START1: 1,
    START2: 2,
    START3: 3,
}

let status = GameStatus.STOP;
var timeout1;
var timeout2;
var timeout3;
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

/* Called whenever the game ends */
function end_game() {
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    clearTimeout(timeout3);

    canvas.style.background = "rgb(0, 148, 255)";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "30px Open Sans Condensed";
    context.fillStyle = "rgb(0, 70, 20)";
    context.textAlign = "center";
    context.textBaseLine = "middle";
    context.fillText('Choose a game below!', canvas.width / 2, canvas.height / 2);
    startTraditional.innerHTML = "Start Game";
    startRapid.innerHTML = "Start Game";
    startAccuracy.innerHTML = "Start Game";
    status = GameStatus.STOP;
    console.log('game has ended');
}


/* Called when timer runs within alotted time (random time + 5seconds) */
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

                    play_clicks++;
                } else { console.log('bruh'); }
            }, { once: true } );
        
    }, time)
}

/* Called if player exceeds alotted time (random time + 5 s) */
function timeout2_function(time) {
    timeout2 = setTimeout(function () {
        end_game();
    }, time)
}


/* ===== Rapid Test Unfinished ===== */
async function rapid_function(loop) {
    var avg = 0;
    for (var i = 0; i < loop; i++) {
        let change_time = get_random_time(1, 5);
        let end_time = change_time + 3000;

        await timeout3_function(change_time, end_time);
    }
    end_game();
}

async function timeout3_function(time1, time2) {
    await delay(time1, time2);

    /*
    timeout3 = setTimeout(function () {
        canvas.style.background = "rgb(78, 197, 78)";
        let date1 = new Date();
        time_now = date1.getTime();


        canvas.addEventListener('click', function () {
            let date2 = new Date();
            time_later = date2.getTime();
            play_time = (time_later - time_now);

            if (play_clicks < 1) {
                time_text.innerHTML = play_time + " ms";

                play_clicks++;
            } else { console.log('bruh'); }

        });

    }, time) */
}

function delay(time1, time2) {
    let delayPromise = new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve("Success!")
        }, time1)
    })

    delayPromise.then((successMessage) => {
        console.log("Yay!" + successMessage)
    });
}
/* ===== End Rapid Test Section ===== */

/* ===== Accuracy Test Section ===== */

function drawCircle(ctx) {
    let circlex = get_random_time(0, canvas.width) / 1000;
    let circley = get_random_time(0, canvas.height) / 1000;

    if (circlex < 60) {
        circlex = 60;
    } else if (circlex > canvas.width - 60) {
        circlex = canvas.width - 60;
    }

    if (circley < 60) {
        circley = 60;
    } else if (circley > canvas.height - 60) {
        circley = canvas.height - 60;
    }
    console.log(circlex + ' ' + circley)
    ctx.beginPath();
    ctx.arc(circlex, circley, 60, 0, 2 * Math.PI);
    ctx.fill();
    return {
        cx: circlex,
        cy: circley
    }
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const xcoord = event.clientX - rect.left
    const ycoord = event.clientY - rect.top
    return {
        x: xcoord,
        y: ycoord
    }
}

function timeout4_function(time){
    timeout1 = setTimeout(function () {
        let date1 = new Date();
        time_now = date1.getTime();
        center = drawCircle(context);

        canvas.addEventListener('click', function (e) {
            mousePos = getCursorPosition(canvas, e);
            let date2 = new Date();
            time_later = date2.getTime();
            play_time = (time_later - time_now);

            if (mousePos.x < center.cx + 55 && mousePos.y < center.cy + 55) {
                time_text_accuracy.innerHTML = play_time + " ms";

                /* Records player's score in 'your times' section */
                $("#time_list ol").append('<li>' + play_time + ' ms</li>');

            } else { time_text_accuracy.innerHTML = "You didn't click the circle! Try Again."; }

        }, { once: true })
    }, time)
}

/* ===== End Accuracy Test Section ===== */

async function start_game(mode) {
    play_clicks = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    switch (mode) {
        case 2:
            console.log('case 2');
            canvas.style.background = "rgb(75, 75, 197)";
            status = GameStatus.START2;
            await rapid_function(5);
            break;

        case 3:
            context.fillText('Click the circle when it appears', canvas.width / 2, canvas.height / 2);
            console.log('case 3');
            canvas.style.background = "rgb(200, 75, 75)";
            let change_time_a = get_random_time(1, 6);
            let end_time_a = change_time_a + 4000;
            status = GameStatus.START3;
            timeout4_function(change_time_a);
            timeout2_function(end_time_a);
            break;

        default:

        case 1:
            context.fillText('Click in this area when the color changes', canvas.width / 2, canvas.height / 2);
            canvas.style.background = "rgb(206, 63, 63)";
            status = GameStatus.START1;
            let change_time = get_random_time(1, 8);
            let end_time = change_time + 5000;
            time_text.innerHTML = "...awaiting time";
            await timeout1_function(change_time);
            await timeout2_function(end_time);
    }
}

/* Adds listener for when player clicks on traditional start button */
startTraditional.addEventListener('click', function () {
    if (status == GameStatus.START1 || status == GameStatus.START2 || status == GameStatus.START3) {
        end_game();
    } else {
        start_game(1);
        this.innerHTML = "Stop Game";
    }
});


/* Adds listener for when player clicks on rapid start button */
startRapid.addEventListener('click', function () {
    if (status == GameStatus.START1 || status == GameStatus.START2 || status == GameStatus.START3) {
        end_game();
    } else {
        start_game(2);
        this.innerHTML = "Stop Game";
    }
});

/* Adds listener for when player clicks on accuracy start button */
startAccuracy.addEventListener('click', function () {
    if (status == GameStatus.START1 || status == GameStatus.START2 || status == GameStatus.START3) {
        end_game();
    } else {
        start_game(3);
        this.innerHTML = "Stop Game";
    }
});

/* Adds listener for when player clicks on canvas */
canvas.addEventListener('click', function () {
    if (status == GameStatus.START1) {
        console.log('game1 was in progress');
        time_text.innerHTML = "Too Early! Try Again.";
    } else if (status == GameStatus.START2) {
        console.log('game2 was in progress');
        time_text_rapid.innerHTML = "Too Early! Try Again.";
    } else if (status == GameStatus.START3) {
        console.log('game3 was in progress');
        time_text_accuracy.innerHTML = "Too Early! Try Again.";
    } else {
        time_text.innerHTML = "Try starting a game first!";
        time_text_rapid.innerHTML = "Try starting a game first!";
        time_text_accuracy.innerHTML = "Try starting a game first!";
    }
    end_game();
});