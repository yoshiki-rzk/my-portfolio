const typing = document.getElementById("typing");
const w = document.getElementById("word");
const w2 = document.getElementById("word2");
const w3 = document.getElementById("word3");
const w4 = document.getElementById("word4");
const jiko = document.getElementById("jiko");
const yomi = document.getElementById("yomi");
const score = document.getElementById("score");

typing.onclick = function () {
  w.textContent = "bokunonamaehasadayoshikidesu";
  w2.textContent = "aoyamagakuinndaigakunosannnennseidesu";
  w3.textContent = "syumihaeigakannsyoudesu";
  w4.textContent = "sukinamanngahawannpi-sudesu";
  yomi.style.cssText = "line-height:6ex; margin-top : -30px;";
  jiko.style.cssText = "line-height: 6ex; margin-top : -300px;";
  typing.disabled = true;

  gameStart();
};

var list = [
  "bokunonamaehasadayoshikidesu",
  "aoyamagakuinndaigakunosannnennseidesu",
  "syumihaeigakannsyoudesu",
  "sukinamanngahawannpi-sudesu",
];

var correct;
var mistake;
var char_num = 0;
var word_char;
var count = 0;
var gameover;
var startTime;
var endTime;
var saitan = 100000000000;

function gameStart() {
  score.style.display = "none";

  gameover = false;
  mistake = 0;
  correct = 0;
  count = 0;
  char_num = 0;
  startTime = performance.now(); // 開始時間
}

function charInsort() {
  word_char = list[count].charAt(char_num); //char_num番目の文字
}

function finish() {
  endTime = performance.now(); // 終了時間

  var scores = Math.round((endTime - startTime) / 10) / 100;
  if (saitan > scores) saitan = scores;

  score.style.cssText = "";
  score.innerHTML =
    "最短時間:" +
    saitan +
    "秒" +
    "&emsp; &emsp;記録:" +
    scores +
    "秒" +
    "&emsp; &emsp; 正タイプ数:" +
    correct +
    "&emsp; &emsp;ミスタイプ数:" +
    mistake +
    "&emsp; &emsp;正答率" +
    Math.round((correct / (correct + mistake)) * 1000) / 10 +
    "%";
  mistake = 0;
  correct = 0;
  count = -1;
  char_num = 0;
}
document.onkeydown = function (e) {
  //onkeyupだとなんか遅い
  if (e.keyCode == 189) {
    keyStr = "-"; //-が反応しなかったから
  } else {
    var keyStr = String.fromCharCode(e.keyCode);
    keyStr = keyStr.toLowerCase();
  }
  charInsort();

  if (count == 3) {
    if (keyStr == word_char) {
      word4.innerHTML =
        "<span style='color: red;'>" +
        list[count].substr(0, char_num + 1) +
        "</span>" +
        list[count].substr(char_num + 1, list[count].length);
      char_num++;
      correct++;
    } else {
      mistake++;
    }
    if (char_num == list[count].length) {
      typing.disabled = false;
      gameover = true;

      finish();
    }
  }
  if (count == 2) {
    if (keyStr == word_char) {
      word3.innerHTML =
        "<span style='color: red;'>" +
        list[count].substr(0, char_num + 1) +
        "</span>" +
        list[count].substr(char_num + 1, list[count].length);
      char_num++;
      correct++;
    } else {
      mistake++;
    }
    if (char_num == list[count].length) {
      count++;
      char_num = 0;
    }
  }

  if (count == 1) {
    if (keyStr == word_char) {
      word2.innerHTML =
        "<span style='color: red;'>" +
        list[count].substr(0, char_num + 1) +
        "</span>" +
        list[count].substr(char_num + 1, list[count].length);
      char_num++;
      correct++;
      console.log(char_num);
    } else {
      mistake++;
    }
    if (char_num == list[count].length) {
      count++;
      char_num = 0;
    }
  }

  if (count == 0) {
    if (keyStr == word_char) {
      word.innerHTML =
        "<span style='color: red;'>" +
        list[count].substr(0, char_num + 1) +
        "</span>" +
        list[count].substr(char_num + 1, list[count].length); //打った文字を赤くする
      char_num++;
      correct++;
    } else {
      mistake++;
    }
    if (char_num == list[count].length) {
      count++;
      char_num = 0;
    }
  }
};
