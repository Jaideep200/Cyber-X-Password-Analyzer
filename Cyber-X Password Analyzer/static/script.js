const canvas =
document.getElementById("matrix");

const ctx =
canvas.getContext("2d");

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

const letters =
"01";

const fontSize = 14;

const columns =
canvas.width/fontSize;

const drops = [];

for(let x=0;x<columns;x++){

    drops[x]=1;
}

function draw(){

    ctx.fillStyle =
    "rgba(0,0,0,0.05)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle="#00ff99";

    ctx.font=
    fontSize+"px monospace";

    for(let i=0;i<drops.length;i++){

        const text =
        letters[
            Math.floor(
                Math.random()*letters.length
            )
        ];

        ctx.fillText(
            text,
            i*fontSize,
            drops[i]*fontSize
        );

        if(
            drops[i]*fontSize >
            canvas.height &&
            Math.random()>0.975
        ){

            drops[i]=0;
        }

        drops[i]++;
    }
}

setInterval(draw,33);

async function analyzePassword(){

    const password =
    document.getElementById(
        "password"
    ).value;

    const response =
    await fetch("/analyze",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            password
        })
    });

    const data =
    await response.json();

    document.getElementById(
        "strengthText"
    ).innerText =
    `STRENGTH : ${data.strength}`;

    document.getElementById(
        "entropy"
    ).innerText =
    `ENTROPY : ${data.entropy} bits`;

    document.getElementById(
        "breach"
    ).innerText =
    data.breach > 0
    ?
    `⚠ FOUND IN ${data.breach} BREACHES`
    :
    `✓ SAFE PASSWORD`;

    document.getElementById(
        "crackTime"
    ).innerText =
    `CRACK TIME : ${data.crack}`;

    document.getElementById(
        "suggestion"
    ).innerText =
    `AI SUGGESTION : ${data.suggestion}`;

    const width =
    (data.score/5)*100;

    const bar =
    document.getElementById(
        "strengthBar"
    );

    bar.style.width =
    `${width}%`;

    if(data.score <=2){

        bar.style.background="red";
    }

    else if(data.score <=4){

        bar.style.background="yellow";
    }

    else{

        bar.style.background="#00ff99";
    }
}