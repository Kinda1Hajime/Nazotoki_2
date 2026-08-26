//問題データ
const questions = [
// Q1
    {
        title:"青の問題",
        text:"",
        image:"images/q1.png",
        answers:["とい","問","トイ","問い"],//,""], 
        hint1:"図の中の右側と左側はセットだよ",
        hint2:"黄色の線は鏡"
    },
//Q2
    {
        title:"緑の問題",
        text:"",
        image:"images/q2.png",
        answers:["COUGH","cough"],//,""], 
        hint1:"漢字は何の数字と同じなのかな",
        hint2:"漢字の読み方が大切"
    },
//Q3
    {
        title:"赤の問題",
        text:"",
        image:"images/q3.png",
        answers:["BREAD","bread","Bread"],//,""], 
        hint1:"上と下は何で分かれてるかな(共通しているものを探そう)",
        hint2:"イラストの数が何かの文字数と一致してるよ"
    },
// //Q4
    {
        title:"黄の問題",
        text:"",
        image:"images/q4.png",
        answers:["C","c"],//,""], 
        hint1:"埋めてないところが文字になるよ",
        hint2:"a→i　まで"
    },
//Q6
    {
        title:"ヒント1にメッセージがあるよ",
        text:`
        `,
        image:"",
        answers:[], 
        hint1:'<img src="images/q5.png" class="hintImage">',
        hint2:"黄色の線ではかがみを使おう",
        isEnding:true
    }
];

//効果音
const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");

//ゲームの状態
let currentQuestion = 0;
let isWaiting = false;
// HTML要素
const game = document.getElementById("game");
const resultElement = document.getElementById("resultMessage");
const ending = document.getElementById("ending");
// 初期表示
addQuestion(0);

// 関数
function addQuestion(number){
    const question = questions[number];
    //回答欄を表示するか
    let answerHtml = "";
    if (question.answers.length > 0) {
        answerHtml = `
        <form onsubmit="checkAnswer(${number}); return false;">
            <input
                id="answer${number}"
                autocomplete="off"
                placeholder="答えを入力">
            <button type="submit">回答</button>
        </form>
        `;
    }

    game.innerHTML += `

    <div class="question ${question.isEnding ? "ending" : ""}">
    
    <h2>${question.title}</h2>
        ${question.text ? `<p>${question.text}</p>` : ""}
        ${question.image ? `<img src="${question.image}" class="questionImage">` : ""}
        ${answerHtml}
        <button onclick="showHint(${number},1)">
            ヒント1
        </button>
        <p id="hint1-${number}"></p>
        <button onclick="showHint(${number},2)">
            ヒント2
        </button>
        <p id="hint2-${number}"></p>
    </div>
    `;
}


function checkAnswer(number){
    console.log("checkAnswerが呼ばれた");
    const answerElement =
        document.getElementById(`answer${number}`);
    const userAnswer =
        answerElement.value.trim();
    if(questions[number].answers.includes(userAnswer)){
        resultElement.textContent = "正解！";
        resultElement.style.display = "block";
        correctSound.currentTime = 0;
        correctSound.play();
        answerElement.disabled = true;
        setTimeout(function(){
            resultElement.style.display = "none";
            if(number !== questions.length-1){
                addQuestion(number+1);
            }   
        },1000);
    }else{
        resultElement.textContent = "不正解";
        resultElement.style.display = "block";
        wrongSound.currentTime = 0;
        wrongSound.play();
        setTimeout(function(){
            resultElement.style.display = "none";
        },1000);
    }

}

function showHint(number,hintNumber){
    const question = questions[number];
    if(hintNumber === 1){
        document.getElementById(`hint1-${number}`).innerHTML =
            question.hint1;
    }else{
        document.getElementById(`hint2-${number}`).innerHTML =
            question.hint2;
    }

}