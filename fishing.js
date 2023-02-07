STOP = false;
let GOFISH = () => {
    const fish = document.querySelectorAll('.fishcaught')[0];
    if (fish.parentElement.parentElement.parentElement.parentElement.style.display == 'block') {
        $('.fishcaught').click();
    }
}
let x = setInterval(GOFISH, 100);

let CATCHFISH = () => {
    if (STOP == true) { return; }
    const f = $('img.fish.catch');
    if (f.length == 0) { setTimeout(CATCHFISH, 50); }
    else { f.click(); setTimeout(CATCHFISH, 200); }
}

let BUYFISH = () => {
    $.post(`https://farmrpg.com/worker.php?go=buyitem&id=18&qty=1000`, (data) => {
        console.log(`buy fish=${data}`);
    });
}



// clearInterval(x);
// https://farmrpg.com/worker.php?go=craftitem&id=500&qty=1
// https://farmrpg.com/worker.php?go=harvestall&id=106839
// https://farmrpg.com/worker.php?go=plantall&id=106839
