let container = document.getElementById( 'cont' );
let scoreDiv = document.createElement("div");
scoreDiv.innerHTML = "YOUR SCORE : 0"
container.parentNode.insertBefore(scoreDiv,container);

let click = 0;
let score = 0;

let int = setInterval( function() {

    if (score === 5){
        scoreDiv.parentNode.removeChild(container);
        clearInterval(int);
        let win = document.createElement("div");
        win.innerHTML = "Congratulations! YOU WIN!"
        scoreDiv.parentNode.replaceChild(win,scoreDiv);
    }

    let circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');

    let y = (Math.floor(Math.random() * 900) + 50).toString()
    let x = (Math.floor(Math.random() * 900) + 50).toString()
    circle.setAttributeNS(null, 'cy', y);
    circle.setAttributeNS(null, 'cx', x);
    circle.setAttributeNS(null, 'r', "45");
    circle.setAttributeNS(null, 'style', 'fill: black; stroke: blue; stroke-width: 3px;' );
    container.appendChild(circle);

    circle.addEventListener("click",
        function (event) {
            click = 1;
            score += 1;
            scoreDiv.innerHTML = "YOUR SCORE : " + score;
            circle.remove();
        }
    )

    setTimeout( function() {
        if (click === 0) score -= 1
        click = 0;
        scoreDiv.innerHTML = "YOUR SCORE : " + score;
        circle.remove();
    },2000);



    },2000);
