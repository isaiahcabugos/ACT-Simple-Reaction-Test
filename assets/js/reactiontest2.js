let canvas2 = document.getElementById('canvas2');
let canvas_parent_rapid = document.querySelector('.canvas-parent-rapid');

let startRapid = document.getElementById('startRapid');
let time_text_rapid = document.getElementById('time-text-rapid');

let limit = 5

let GameStatusRapid = {
    STOP: 1,
    START: 2,
}

let statusR = GameStatusRapid.STOP;

startRapid.addEventListener('click', start_game_rapid);

async function start_game_rapid() {
    let cycles = 0;
    time_text_rapid.innerHTML = "...awaiting time";

    do {
        let change_time_r = get_random_time(1, 8);
        let end_time_r = change_time_r + 3000;
        canvas.style.background = "rgb(232, 70, 70)";

        await timeout1_function(change_time_r);
        await timeout2_function(end_time_r);

        cycles += 1;
    } while (cycles < limit)

    end_game();
    
}