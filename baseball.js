var body = document.body;
var title = document.createElement("h3");
body.append(title);

title.textContent = "4자리 숫자를 입력하세요.";

var form = document.createElement("form");
body.append(form);

var input = document.createElement("input");
form.append(input);
input.type = "text";
input.maxLength = 4;
var button = document.createElement("button");
form.append(button);
button.textContent = "제출";

var judge = document.createElement("h1");
body.append(judge);

var record = document.createElement("ol");
body.append(record);

function randomNum() {
  var array = [];

  while (array.length < 4) {
    let n = Math.floor(Math.random() * 10);

    //중복검사
    if (array.indexOf(n) < 0) {
      array.push(n);
    }

    //첫번째 자리 0 제외
    if (array[0] === 0) {
      array.shift();
    }
  }

  console.log("정답 : " + array);
  return array;
}

var qNum = randomNum();
var count = 0;

function handleInput(event) {
  event.preventDefault(); //새로고침 방지

  if (count > 10) {
    title.textContent = "게임 재시작을 원하면 새로고침을 눌러주세요.";
    return;
  }
  //사용자가 입력한 답 중복 검사
  for (var i = 0; i < 4; i++) {
    var arr = input.value.split("");
    var a = arr.pop();

    if (arr.indexOf(a) > -1) {
      console.log("중복발견");
      judge.textContent = "중복이 있습니다. 다시 입력하세요.";
      input.value = "";
      input.focus();
      return;
    } else {
      console.log("중복없음");
    }
  }

  var answer = input.value;
  console.log(answer);

  input.value = "";
  input.focus();

  if (answer === qNum.join("")) {
    //정답
    judge.textContent = `정답: ${answer} 딩 동 댕 !`;
    count = 11; //게임종료
  } else {
    //오답
    var strike = 0;
    var ball = 0;

    for (var i = 0; i < 4; i++) {
      if (Number(answer[i]) === qNum[i]) {
        console.log("strike!");
        strike++;
      } else if (qNum.indexOf(Number(answer[i])) > -1) {
        console.log("ball!");
        ball++;
      }
    }

    var text = `[${answer}] ${strike}S   ${ball}B`;
    judge.textContent = text;

    const li = document.createElement("li");
    li.innerText = text;
    record.appendChild(li);

    count++;
    title.textContent = `기회가 ${10 - count}번 남았습니다.`;

    if (count === 10) {
      count++;
      title.textContent = `모든 기회 종료`;
      judge.textContent = `정답은 ${qNum} 입니다!`;
    }
  }
}

form.addEventListener("submit", handleInput);
