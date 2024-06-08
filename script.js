const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider input"),
    keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
    audio = new Audio(`tunes/a.wav`); // by default, audio src is "a" tune

    const colors = {
        a: "#FFA07A", // Light Salmon
        w: "#FFB6C1", // Light Pink
        s: "#87CEEB" , // sky blue
        e: "#E6A8D7", // Light Orchid
        d: "#FFB7DD", // Light Pale Violet Red
        f: "#FFDAB9", // Peach Puff
        t: "#FFCCCB", // Light Coral
        g: "#FFA07A", // Light Salmon
        y: "#FFD700", // Light Gold
        h: "#FFFFE0", // Light Yellow
        u: "#FFFF99", // Light Yellow
        j: "#F0E68C", // Light Khaki
        k: "#FF9966", // Atomic Tangerine
        o: "#90EE90", // Light Green
        l: "#99FF99", // Light Lime
        p: "#66CDAA", // Medium Aquamarine
        ";": "#AFEEEE" // Pale Turquoise
    };
    
const playTune = (key) => {
    audio.src = `tunes/${key}.wav`; // passing audio src based on key pressed
    audio.play(); // playing audio

    const clickedKey = document.querySelector(`[data-key="${key}"]`); // getting clicked key element
    clickedKey.classList.add("active"); // adding active class to the clicked key element
    setTimeout(() => { // removing active class after 150 ms from the clicked key element
        clickedKey.classList.remove("active");
    }, 150);

    changeBackgroundColor(key); // Change background color
};

const changeBackgroundColor = (key) => {
    document.body.style.backgroundColor = colors[key] || "#E3F2FD";
};

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key); // adding data-key value to the allKeys array
    // calling playTune function with passing data-key value as an argument
    key.addEventListener("click", () => playTune(key.dataset.key));
});

const handleVolume = (e) => {
    audio.volume = e.target.value; // passing the range slider value as an audio volume
};

const showHideKeys = () => {
    // toggling hide class from each key on the checkbox click
    pianoKeys.forEach(key => key.classList.toggle("hide"));
};

const pressedKey = (e) => {
    // if the pressed key is in the allKeys array, only call the playTune function
    if (allKeys.includes(e.key)) playTune(e.key);
};

document.addEventListener("DOMContentLoaded", () => {
    const rotateScreenDiv = document.getElementById('rotate-screen');
    
    function checkOrientation() {
        if (window.innerHeight > window.innerWidth) {
            rotateScreenDiv.classList.remove('d-none');
        } else {
            rotateScreenDiv.classList.add('d-none');
        }
    }

    window.addEventListener('resize', checkOrientation);
    checkOrientation();
});

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
