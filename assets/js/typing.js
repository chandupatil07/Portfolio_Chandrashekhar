const text = ["Data Engineer(Trainee)", "SQL & Power BI Developer", "Analytics Enthusiast"];
let index = 0, char = 0;
const el = document.getElementById("typing");

function type() {
  if (char < text[index].length) {
    el.innerHTML += text[index][char++];
    setTimeout(type, 80);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (char > 0) {
    el.innerHTML = text[index].substring(0, --char);
    setTimeout(erase, 40);
  } else {
    index = (index + 1) % text.length;
    setTimeout(type, 400);
  }
}

type();
