
const phrases = ["Events at Mindspark'22"];

const ht = document.querySelector(".headingText");
const fx = new TextScramble(ht);

let counter = 0;

const next = () => {
    fx.setText(phrases[counter])
};

next()