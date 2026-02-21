const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

// ส่วนของหน้าเว็บ (HTML/CSS/Client-side JS)
const htmlContent = `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>EA Ai-formula - 100% Confidence System</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@600&display=swap" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" />
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: "Noto Sans Thai", sans-serif; font-weight: 600; }
    body { background: linear-gradient(135deg, #18151c 60%, #3e04db 100%); color: #fff; min-height: 100vh; padding-top: 20px; }
    .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
    .title { text-align: center; font-size: 2.5rem; margin-bottom: 30px; color: #d64bff; text-shadow: 0 0 18px #d64bff, 0 0 40px #3e04db; letter-spacing: 2px; }
    .api-form { background: linear-gradient(135deg, #201033 80%, #d64bff 100%); border: 2px solid #3f027f; border-radius: 18px; padding: 28px; margin-bottom: 30px; max-width: 800px; margin-left: auto; margin-right: auto; box-shadow: 0 4px 24px #3e04db44; }
    .form-row { display: flex; gap: 15px; margin-bottom: 15px; }
    .form-group { flex: 1; }
    .form-group label { display: block; margin-bottom: 5px; color: #bbb; }
    .form-group input { width: 100%; padding: 10px; border-radius: 8px; border: 2px solid #3f027f; background-color: #120f16; color: white; }
    .btn-fetch { width: 100%; padding: 14px; background: linear-gradient(90deg, #d64bff 60%, #3e04db 100%); color: white; border: none; border-radius: 12px; cursor: pointer; margin-bottom: 10px; font-size: 1.2em; box-shadow: 0 2px 8px #3e04db44; transition: transform 0.2s; }
    .btn-fetch:hover { transform: scale(1.04); background: linear-gradient(90deg, #3e04db 60%, #d64bff 100%); }
    .btn-toggle { width: 100%; padding: 14px; background: #444; color: white; border: none; border-radius: 12px; cursor: pointer; font-size: 1.2em; transition: background 0.2s; }
    .btn-toggle.active { background: linear-gradient(90deg, #af0000 60%, #ff0000 100%); }
    .api-timer { text-align: center; margin-top: 15px; display: flex; justify-content: center; align-items: center; gap: 10px; }
    .timer-circle { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #ffa500; color: #000; font-size: 1.2rem; }
    .api-info { display: flex; justify-content: space-between; gap: 10px; margin-top: 20px; }
    .api-info-item { background-color: #120f16; padding: 10px; border-radius: 8px; flex: 1; text-align: center; border: 1px solid #3f027f; }
    .api-info-value { color: #ffec99; font-size: 1.1rem; }
    .pattern-card-container { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-bottom: 30px; }
    .pattern-card { background: linear-gradient(135deg, #201033 80%, #3e04db 100%); border: 2px solid #3f027f; border-radius: 18px; padding: 24px; width: 270px; text-align: center; transition: 0.3s; box-shadow: 0 2px 12px #3e04db44; }
    .pattern-card.best { border-color: #00ff00; box-shadow: 0 0 25px #00ff00aa, 0 0 15px #3e04db44; }
    .pattern-next-btn { display: inline-block; padding: 10px 25px; border-radius: 8px; font-size: 1.5rem; margin: 10px 0; background: #333; min-width: 80px; }
    .pattern-next-btn.P { background: linear-gradient(to right, #0037b4, #0069d4); }
    .pattern-next-btn.B { background: linear-gradient(to right, #810000, #af0000); }
    .pattern-percent { font-size: 1.2rem; color: #00ff00; }
    .btn-confidence-box { text-align: center; margin-bottom: 30px; }
    #apiGuideBtn { padding: 15px 30px; font-size: 1.3rem; border-radius: 50px; border: none; color: #fff; background: linear-gradient(to right, #ff9900, #ff6600); cursor: default; }
    .confident-active { background: linear-gradient(to right, #00c853, #b2ff59) !important; box-shadow: 0 0 25px #00ff00; color: #000 !important; animation: pulse 1s infinite; }
    .score-panel { background: linear-gradient(135deg, #120f16 80%, #3e04db 100%); border: 2px solid #3f027f; border-radius: 18px; padding: 24px; min-width: 320px; }
    .record-table { display: flex; overflow-x: auto; gap: 5px; padding-bottom: 10px; }
    .record-column { display: flex; flex-direction: column; gap: 5px; }
    .record-item { width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; font-size: 0.8rem; }
    .record-item.P { background: #0069d4; }
    .record-item.B { background: #af0000; }
    .record-item.T { background: #079c16; }
    @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
  </style>
</head>
<body>
<div class="container">
    <h1 class="title">EA PRO ANALYZER v2.0</h1>
    <div class="api-form">
        <div class="form-row">
            <div class="form-group"><label>Game Name</label><input type="text" id="gameName" value="sagame"></div>
            <div class="form-group"><label>Room Number</label><input type="text" id="roomNumber" value="D04"></div>
        </div>
        <div class="d-flex gap-2 mb-2">
            <button class="btn-fetch" id="fetchBtn" onclick="startAutoFetch()">🚀 เริ่มต้นดึงข้อมูล</button>
            <button class="btn-toggle" id="toggleBtn" onclick="toggleAutoFetch()">⏸️ หยุด</button>
        </div>
        <div class="api-timer">Next Sync: <div class="timer-circle" id="timer">--</div> sec</div>
        <div class="api-info">
            <div class="api-info-item"><div>Status</div><div class="api-info-value" id="apiStatus">-</div></div>
            <div class="api-info-item"><div>Round</div><div class="api-info-value" id="apiCurrentRound">-</div></div>
            <div class="api-info-item"><div>Accuracy</div><div class="api-info-value" id="apiAcc">-</div></div>
        </div>
    </div>
    <div class="btn-confidence-box"><button id="apiGuideBtn">🎯 API Guide ByAi: Waiting...</button></div>
    <div class="pattern-card-container">
        <div class="pattern-card best" id="patternCard0">
            <div style="color: #ffa500;">⭐ Pattern ที่แม่นที่สุด</div>
            <div class="pattern-next-btn" id="cardNext0">-</div>
            <div class="pattern-percent" id="cardPercent0">0%</div>
            <div id="cardInfo0" style="font-size: 0.9rem; color:#ffec99;">รอบที่ถูก: 0</div>
        </div>
    </div>
    <div class="score-panel"><div class="record-table" id="recordTable"></div></div>
</div>
<script>
    let isAutoFetching = false, fetchTimer = null, countdownTimer = null, fetchInterval = 5;
    function startAutoFetch() {
        if(isAutoFetching) return;
        isAutoFetching = true;
        document.getElementById("fetchBtn").disabled = true;
        document.getElementById("toggleBtn").classList.add("active");
        runFetchProcess();
        fetchTimer = setInterval(runFetchProcess, fetchInterval * 1000);
        startCountdown();
    }
    function toggleAutoFetch() {
        isAutoFetching = false;
        clearInterval(fetchTimer); clearInterval(countdownTimer);
        document.getElementById("fetchBtn").disabled = false;
        document.getElementById("toggleBtn").classList.remove("active");
    }
    function startCountdown() {
        let count = fetchInterval;
        countdownTimer = setInterval(() => {
            count--; if(count <= 0) count = fetchInterval;
            document.getElementById("timer").textContent = count;
        }, 1000);
    }
    async function runFetchProcess() {
        const game = document.getElementById("gameName").value;
        const room = document.getElementById("roomNumber").value;
        try {
            const res = await fetch(\`https://dasg1.hosting-ovezx.cloud/?game=\${game}&tablename=\${room}&_=\${Date.now()}\`);
            const data = await res.json();
            if(data.status === "ready") {
                document.getElementById("apiStatus").textContent = data.status;
                document.getElementById("apiCurrentRound").textContent = data.current_round;
                document.getElementById("apiAcc").textContent = data.accuracy_percent || "50%";
                processPattern(data.history_grid, data.next_guide);
            }
        } catch (e) { console.log("Fetch Error"); }
    }
    function processPattern(grid, nextGuide) {
        let dataList = [];
        grid.forEach(row => row.forEach(item => { if(item) dataList.push(item) }));
        const table = document.getElementById("recordTable");
        table.innerHTML = "";
        for (let i = 0; i < dataList.length; i += 6) {
            let col = document.createElement("div"); col.className = "record-column";
            dataList.slice(i, i + 6).forEach(item => {
                let div = document.createElement("div"); div.className = "record-item " + item;
                div.textContent = item; col.appendChild(div);
            });
            table.appendChild(col);
        }
        const next = nextGuide === "PLAYER" ? "P" : "B";
        document.getElementById("cardNext0").textContent = next;
        document.getElementById("cardNext0").className = "pattern-next-btn " + next;
        const btn = document.getElementById("apiGuideBtn");
        btn.innerHTML = "🎯 API GUIDE: " + nextGuide;
        btn.classList.add("confident-active");
    }
</script>
</body>
</html>
`;

// Route สำหรับแสดงหน้าเว็บ
app.get('/', (req, res) => {
    res.send(htmlContent);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
