let playerHP = 50;
let opponentHP = 50;
let history = []; // ประวัติการเล่น

function playCard(playerChoice) {
  if (playerHP <= 0 || opponentHP <= 0) return; // ถ้าผลเกมจบแล้ว ไม่ให้เล่นใหม่

  const choices = ["rock", "paper", "scissors"];
  const opponentChoice = choices[Math.floor(Math.random() * 3)]; // สุ่มการ์ดคู่ต่อสู้

  // แสดงการ์ดของผู้เล่น
  document.getElementById("player-card").innerHTML = `<p>คุณเลือก: ${getChoiceIcon(playerChoice)}</p>
    <div class="cards">
      <button onclick="playCard('rock')">🪨 ค้อน</button>
      <button onclick="playCard('paper')">📄 กระดาษ</button>
      <button onclick="playCard('scissors')">✂️ กรรไกร</button>
    </div>`;

  // เริ่มนับถอยหลัง
  startCountdown(() => {
    // แสดงการ์ดคู่ต่อสู้
    document.getElementById("opponent-card-content").textContent = `คู่ต่อสู้เลือก: ${getChoiceIcon(opponentChoice)}`;

    // ตรวจสอบผลแพ้ชนะ
    const result = determineWinner(playerChoice, opponentChoice);

    let resultMessage = "";
    let damage = 0;

    if (result === "win") {
      damage = rollDice();
      opponentHP -= damage;
      if (opponentHP < 0) opponentHP = 0;
      resultMessage = `คุณชนะ! คู่ต่อสู้เสียพลังชีวิต ${damage} หน่วย`;
    } else if (result === "lose") {
      damage = rollDice();
      playerHP -= damage;
      if (playerHP < 0) playerHP = 0;
      resultMessage = `คุณแพ้! คุณเสียพลังชีวิต ${damage} หน่วย`;
    } else {
      resultMessage = "เสมอกัน! ไม่มีใครเสียพลังชีวิต";
    }

    // อัปเดต HP และข้อความผลลัพธ์
    document.getElementById("opponent-hp").textContent = opponentHP;
    document.getElementById("player-hp").textContent = playerHP;
    document.getElementById("result").textContent = resultMessage;

    // บันทึกประวัติการเล่น
    history.push({
      playerChoice: playerChoice,
      opponentChoice: opponentChoice,
      result: resultMessage,
      damage: damage
    });
    updateHistory();

    // ตรวจสอบการจบเกม
    if (playerHP === 0) {
      alert("คุณแพ้! เกมจบแล้ว");
      resetGame(); // เริ่มเกมใหม่หลังจากแพ้
    } else if (opponentHP === 0) {
      alert("คุณชนะ! เกมจบแล้ว");
      resetGame(); // เริ่มเกมใหม่หลังจากชนะ
    }
  });
}

function startCountdown(callback) {
  let countdown = 3;
  const countdownElement = document.getElementById("countdown");
  countdownElement.textContent = countdown;

  const interval = setInterval(() => {
    countdown -= 1;
    if (countdown === 0) {
      clearInterval(interval);
      countdownElement.textContent = "เปิดการ์ด!";
      callback(); // เรียกฟังก์ชันเปิดการ์ด
    } else {
      countdownElement.textContent = countdown;
    }
  }, 1000);
}

function determineWinner(player, opponent) {
  if (player === opponent) return "tie";
  if (
    (player === "rock" && opponent === "scissors") ||
    (player === "paper" && opponent === "rock") ||
    (player === "scissors" && opponent === "paper")
  ) {
    return "win";
  }
  return "lose";
}

function rollDice() {
  const die1 = Math.floor(Math.random() * 6) + 1;
  const die2 = Math.floor(Math.random() * 6) + 1;
  return die1 + die2;
}

function resetGame() {
  playerHP = 50;
  opponentHP = 50;
  document.getElementById("player-hp").textContent = playerHP;
  document.getElementById("opponent-hp").textContent = opponentHP;
  document.getElementById("result").textContent = "";
  document.getElementById("player-card").innerHTML = `<p>การ์ดของคุณ</p>
    <div class="cards">
      <button onclick="playCard('rock')">🪨 ค้อน</button>
      <button onclick="playCard('paper')">📄 กระดาษ</button>
      <button onclick="playCard('scissors')">✂️ กรรไกร</button>
    </div>`;
  document.getElementById("opponent-card-content").textContent = "การ์ดของคู่ต่อสู้จะเปิดเผยที่นี่";
  document.getElementById("countdown").textContent = "เลือกการ์ด...";
  history = []; // ล้างประวัติการเล่น
  updateHistory();
}

function updateHistory() {
  const historyList = document.getElementById("history-list");
  const row = document.createElement("tr");

  const roundCell = document.createElement("td");
  roundCell.textContent = history.length;
  row.appendChild(roundCell);

  const playerChoiceCell = document.createElement("td");
  playerChoiceCell.textContent = getChoiceIcon(history[history.length - 1].playerChoice);
  row.appendChild(playerChoiceCell);

  const opponentChoiceCell = document.createElement("td");
  opponentChoiceCell.textContent = getChoiceIcon(history[history.length - 1].opponentChoice);
  row.appendChild(opponentChoiceCell);

  const resultCell = document.createElement("td");
  resultCell.textContent = history[history.length - 1].result;
  row.appendChild(resultCell);

  const damageCell = document.createElement("td");
  damageCell.textContent = history[history.length - 1].damage ? history[history.length - 1].damage : "0";
  row.appendChild(damageCell);

  // เพิ่มแถวใหม่ที่ตำแหน่งแรก
  historyList.insertBefore(row, historyList.firstChild);
}

function getChoiceIcon(choice) {
  if (choice === "rock") return "🪨 ค้อน";
  if (choice === "paper") return "📄 กระดาษ";
  if (choice === "scissors") return "✂️ กรรไกร";
  return "";
}
