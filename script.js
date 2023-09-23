let title;
let vbar;
let nameAnimationFrames = [
    "",
    "B",
    "Br",
    "Bra",
    "Brad",
    "Brad ",
    "Brad P",
    "Brad Pa",
    "Brad Pat",
    "Brad Patr",
    "Brad Patra",
    "Brad Patras",
];

var nameAnimationFrameIndex = 0;
var vbarFlag = false;
var nameAnimIntervalId;

function playNameAnimation() {
    if (nameAnimationFrameIndex >= nameAnimationFrames.length) {
        vbar.innerHTML = vbarFlag ? " " : "&#9601;";
        vbarFlag = !vbarFlag;
        clearInterval(nameAnimIntervalId);
        nameAnimIntervalId = setInterval(playNameAnimation, 400)
    } else {
        title.innerHTML = nameAnimationFrames[nameAnimationFrameIndex];
        nameAnimationFrameIndex++;
    }
}

window.onload = (event) => {
    title = document.getElementById("name");
    vbar = document.getElementById("vbar");
    nameAnimIntervalId = setInterval(playNameAnimation, 50);
};
