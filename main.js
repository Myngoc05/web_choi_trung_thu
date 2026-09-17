

  const BG = {
    welcome: "image/buc1.png",       // Ảnh nền cho màn hình bắt đầu
    wheel: "image/Vongquay.png",     // Ảnh nền cho màn hình vòng quay
    q0: "image/ththach1.png",        // Ảnh cho câu hỏi 1 (ví dụ)
    q1: "image/ththach2.png",
    q2: "image/ththach3.png",
    q3: "image/ththach4.png",
    q4: "image/ththach5.png",
    q5: "image/ththach6.png",
    complete: "image/Hoanthanh.png",
    reward: "image/chucmung.png"
  };

  const QUESTIONS = [
    { bg:"q0", badge:"Thử thách 1", theme:"Ngày Trung Thu", mascot:"sym-cuoi", showBanner:false,
      q:"Tết Trung Thu được tổ chức vào ngày nào?",
      options:["Rằm tháng Giêng","Rằm tháng Tư","Rằm tháng Tám","Rằm tháng Mười"],
      correct:2,
      explain:"Chính xác! Trung Thu chính là ngày Rằm tháng Tám âm lịch đó!" },
    { bg:"q1", badge:"Thử thách 2", theme:"Bạn của cung trăng", mascot:"sym-hang", showBanner:false,
      q:"Hai nhân vật được nhắc đến nhiều trong ngày Tết Trung Thu là ai?",
      options:["Chị Hằng và Thỏ Ngọc","Chú Cuội và Thỏ Ngọc","Chú Cuội và Chị Hằng","Ông Địa và Thần Tài"],
      correct:2,
      explain:"Đúng rồi! Chú Cuội và Chị Hằng là hai nhân vật quen thuộc gắn liền với đêm Trung Thu!" },
    { bg:"q2", badge:"Thử thách 3", theme:"Cây đa của Chú Cuội", mascot:"sym-tree", showBanner:false,
      q:"Sự tích Chú Cuội gắn liền với cây gì?",
      options:["Cây sung","Cây đa","Cây bồ đề","Cây tre"],
      correct:1,
      explain:"Giỏi quá! Chú Cuội thường được kể là ngồi dưới gốc cây đa trên cung trăng đó!" },
    { bg:"q3", badge:"Thử thách 4", theme:"Ai lên mặt trăng?", mascot:"sym-cuoi", showBanner:true,
      q:"Theo truyện cổ tích, ai là người Việt Nam đầu tiên lên mặt trăng?",
      options:["Chị Hằng","Chú Cuội","Thiên Lôi","Thỏ Ngọc"],
      correct:1,
      explain:"Chính xác! Trong câu chuyện dân gian, Chú Cuội vì níu cây đa mà bay lên cung trăng!" },
    { bg:"q4", badge:"Thử thách 5", theme:"Bí mật Mặt Trăng", mascot:"sym-rabbit", showBanner:false,
      q:"Mặt Trăng quay xong một vòng quanh Trái Đất mất khoảng bao lâu?",
      options:["29 ngày","30 ngày","31 ngày","7 ngày"],
      correct:0,
      explain:"Đúng rồi! Một vòng quay của Mặt Trăng quanh Trái Đất mất khoảng 29 ngày." },
    { bg:"q5", badge:"Thử thách 6", theme:"Trung Thu vui nhất!", mascot:"sym-rabbit", showBanner:false,
      q:"Trung Thu vui nhất khi được làm gì?",
      options:["Rước đèn","Ăn bánh","Chơi cùng bạn bè","Tất cả đáp án trên"],
      correct:3,
      explain:"CHÍNH XÁC! Trung Thu là để cùng nhau vui chơi, rước đèn, ăn bánh và tạo thật nhiều kỷ niệm!" }
  ];
  const LETTERS = ["A","B","C","D"];
  const TOTAL = QUESTIONS.length;
  const CONFETTI_COLORS = ['#f6c453','#e8734a','#f2a9c7','#3ea883','#7a5fd6','#3aa0e0'];

  //=================================================
  // Vị trí bảng câu hỏi được "may đo" theo từng ảnh thử thách,
  // để tránh che nhân vật / khung chữ có sẵn trong ảnh nền.
  // Ứng với thứ tự QUESTIONS (không phụ thuộc số sao, vì câu hỏi ra ngẫu nhiên).
  const QUESTION_POSITIONS = [
  // Vòng 1 (0 sao): Giữa, dưới cùng (vị trí mặc định ban đầu)
   
  { top: 'auto', bottom: '10%', left: '47%', right: 'auto', transform: 'translateX(-50%)' }, // Vòng 1
  { top: 'auto', bottom: '15%', left: '30%', right: 'auto', transform: 'translateX(-50%)' },             // Vòng 2
  { top: 'auto', bottom: '20%', left: '40%', right: 'auto', transform: 'translateX(-50%)' },             // Vòng 3
  { top: 'auto', bottom: '20%', left: '50%', right: 'auto', transform: 'translateX(-50%)' }, // Vòng 4
  { top: 'auto', bottom: '10%', left: '45%', right: 'auto', transform: 'translateX(-50%)' }, // Vòng 5
  { top: 'auto', bottom: '20%', left: '35%', right: 'auto', transform: 'translateX(-50%)' } // Vòng 6
];

 function applyQuestionPosition(idx){
  const wrap = document.querySelector('#screen-question .sheet-wrap');
  if(!wrap) return;

  // Xóa các class cũ có thể gây xung đột
  wrap.classList.remove('pos-bottom','pos-bottom-low','pos-top','pos-middle','align-left','align-right','align-center');
  
  // Lấy tọa độ tương ứng với câu hỏi
  const pos = QUESTION_POSITIONS[idx] || QUESTION_POSITIONS[0];
  
  // Áp dụng CSS trực tiếp
  wrap.style.position = 'fixed'; 
  wrap.style.top = pos.top;
  wrap.style.bottom = pos.bottom;
  wrap.style.left = pos.left;
  wrap.style.right = pos.right;
  wrap.style.transform = pos.transform;
}

  let state = { stars:0, usedFlags: QUESTIONS.map(()=>false), currentIndex:null, wheelRotation:0 };
  let bgToggle = false;

  function setBackground(key){
    const showLayer = document.getElementById(bgToggle ? 'bg-a' : 'bg-b');
    const hideLayer = document.getElementById(bgToggle ? 'bg-b' : 'bg-a');
    if(key && BG[key]){
      showLayer.style.backgroundImage = "url('"+BG[key]+"')";
      showLayer.classList.add('active');
      hideLayer.classList.remove('active');
    } else {
      showLayer.classList.remove('active');
      hideLayer.classList.remove('active');
    }
    bgToggle = !bgToggle;
  }

  function mascotSVG(symId){
    return '<svg viewBox="0 0 100 100"><use href="#'+symId+'" width="100" height="100"/></svg>';
  }

  function showScreen(name, bgKey){
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    document.getElementById('screen-'+name).classList.add('active');
    setBackground(bgKey);
    window.scrollTo(0,0);
  }

  function startGame(){
    Sound.startMusic();
    Sound.click();
    showScreen('wheel','wheel');
    updateWheelUI();
  }

  function updateWheelUI(){
    document.getElementById('wheel-progress').textContent = state.stars + '/' + TOTAL;
    const btn = document.getElementById('spin-btn');
    const hint = document.getElementById('wheel-hint');
    if(state.stars === 0){
      btn.textContent = 'Quay Ngay 🎡';
      hint.textContent = 'Mỗi lần quay, em sẽ nhận được một câu hỏi bí mật. Trả lời đúng để thu thập Ngôi Sao Trung Thu nhé!';
    } else if(state.stars === TOTAL - 1){
      btn.textContent = 'Quay Lần Cuối 🎡';
      hint.textContent = 'Chỉ còn 1 ngôi sao nữa thôi, cố lên nào!';
    } else {
      btn.textContent = 'Quay Tiếp 🎡';
      hint.textContent = 'Tuyệt vời! Quay tiếp để tìm câu hỏi mới nhé!';
    }
  }

  function pickUnusedIndex(){
    const remaining = state.usedFlags.map((u,i)=>u?null:i).filter(i=>i!==null);
    return remaining[Math.floor(Math.random()*remaining.length)];
  }

  const SPIN_DURATION = 4000; // phải khớp với transition của #wheel-disc trong style.css

  function spinWheel(){
    const btn = document.getElementById('spin-btn');
    const frame = document.getElementById('wheel-frame');
    btn.disabled = true;
    frame.classList.add('spinning');
    const disc = document.getElementById('wheel-disc');
    state.wheelRotation += 360*5 + Math.floor(Math.random()*360);
    disc.style.transform = 'rotate(' + state.wheelRotation + 'deg)';
    Sound.spin();

    setTimeout(()=>{
      btn.disabled = false;
      frame.classList.remove('spinning');
      const rect = frame.getBoundingClientRect();
      confettiBurst(rect.left+rect.width/2, rect.top+rect.height/2, 20);
      state.currentIndex = pickUnusedIndex();
      loadQuestion(state.currentIndex);
      applyQuestionPosition(state.currentIndex);
      showScreen('question', QUESTIONS[state.currentIndex].bg);
    }, SPIN_DURATION);
  }

  function positionWheelIcons(){
    const r = 70;
    for(let i=0;i<6;i++){
      const angle = (i*60 + 30) * Math.PI/180;
      const el = document.getElementById('wi'+i);
      const x = Math.sin(angle)*r;
      const y = -Math.cos(angle)*r;
      el.style.transform = 'translate('+x+'px,'+y+'px)';
    }
  }

  function buildSparkleRing(){
    const ring = document.getElementById('sparkle-ring');
    const icons = ['✨','⭐','✨','🌟','✨','⭐','✨','🌟'];
    const count = icons.length;
    const r = 128;
    icons.forEach((ic,i)=>{
      const span = document.createElement('span');
      span.textContent = ic;
      const angle = (i/count)*360;
      span.style.transform = 'rotate('+angle+'deg) translate('+r+'px) rotate(-'+angle+'deg)';
      ring.appendChild(span);
    });
  }

  function loadQuestion(idx){
    const item = QUESTIONS[idx];
    document.getElementById('q-progress').textContent = state.stars + '/' + TOTAL;
    document.getElementById('q-text').textContent = item.q;
    document.getElementById('q-retry').textContent = '';
    const banner = document.getElementById('q-banner');
    if(item.showBanner){
      banner.innerHTML = '<div class="eyebrow-ribbon">'+item.badge+'</div><div class="q-theme">'+item.theme+'</div>';
    } else {
      banner.innerHTML = '';
    }
    const wrap = document.getElementById('q-options');
    wrap.innerHTML = '';
    item.options.forEach((opt, i)=>{
      const div = document.createElement('div');
      div.className = 'option';
      div.innerHTML = '<span class="letter">'+LETTERS[i]+'</span><span>'+opt+'</span>';
      div.onclick = ()=>selectOption(i, div);
      wrap.appendChild(div);
    });
  }

  function selectOption(i, el){
    const item = QUESTIONS[state.currentIndex];
    if(i === item.correct){
      el.classList.add('correct');
      document.querySelectorAll('#q-options .option').forEach(o=>o.classList.add('disabled'));
      state.usedFlags[state.currentIndex] = true;
      state.stars += 1;
      const rect = el.getBoundingClientRect();
      confettiBurst(rect.left+rect.width/2, rect.top+rect.height/2, 22);
      Sound.correct();
      setTimeout(()=>showFeedback(item), 550);
    } else {
      el.classList.add('wrong');
      el.classList.add('disabled');
      document.getElementById('q-retry').textContent = 'Chưa đúng, thử lại nhé!';
      Sound.wrong();
    }
  }

  function showFeedback(item){
    document.getElementById('fb-progress').textContent = '('+state.stars+'/'+TOTAL+')';
    document.getElementById('fb-explain').textContent = item.explain;
    document.getElementById('fb-mascot').innerHTML = mascotSVG(item.mascot);
    const btn = document.getElementById('fb-continue-btn');
    btn.textContent = state.stars >= TOTAL ? 'Xem kết quả 🏆' : 'Quay tiếp 🎡';
    showScreen('feedback', null);
  }

  function afterFeedback(){
    Sound.click();
    if(state.stars >= TOTAL){
      showScreen('complete','complete');
      Sound.win();
      setTimeout(()=>confettiBurst(window.innerWidth/2, 120, 40), 150);
      setTimeout(()=>confettiBurst(window.innerWidth*0.25, 160, 24), 450);
      setTimeout(()=>confettiBurst(window.innerWidth*0.75, 160, 24), 700);
    } else {
      updateWheelUI();
      showScreen('wheel','wheel');
    }
  }

  function resetGame(){
    // Reset lại dữ liệu trò chơi
    state = { stars:0, usedFlags: QUESTIONS.map(()=>false), currentIndex:null, wheelRotation:0 };
    
    // Tìm và ẩn tấm ảnh có sẵn (nếu người chơi đã bấm xem trước đó)
    const img = document.getElementById('my-prepared-image');
    const note = document.getElementById('save-note');
    if(img) img.style.display = 'none';
    if(note) note.style.display = 'none';
    
    // Quay về màn hình Welcome
    showScreen('welcome','welcome');
  }

  function makeStars(){
    const sky = document.getElementById('sky');
    for(let i=0;i<50;i++){
      const d = document.createElement('div');
      d.className = 'star-dot';
      const size = 2 + Math.random()*2.5;
      d.style.width = size+'px'; d.style.height = size+'px';
      d.style.left = Math.random()*100 + 'vw'; d.style.top = Math.random()*70 + 'vh';
      d.style.animationDuration = (2.2 + Math.random()*2.6) + 's';
      d.style.animationDelay = (Math.random()*3) + 's';
      sky.appendChild(d);
    }
  }

  function makeFireflies(){
    const wrap = document.getElementById('fireflies');
    for(let i=0;i<14;i++){
      const f = document.createElement('div');
      f.className = 'firefly';
      const size = 3 + Math.random()*4;
      f.style.width = size+'px'; f.style.height = size+'px';
      f.style.left = Math.random()*100 + 'vw'; f.style.top = (60 + Math.random()*35) + 'vh';
      f.style.animationDuration = (7 + Math.random()*7) + 's';
      f.style.animationDelay = (Math.random()*8) + 's';
      wrap.appendChild(f);
    }
  }

  function confettiBurst(x, y, count){
    for(let i=0;i<count;i++){
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.left = x+'px'; el.style.top = y+'px';
      el.style.background = CONFETTI_COLORS[Math.floor(Math.random()*CONFETTI_COLORS.length)];
      const angle = Math.random()*Math.PI*2;
      const dist = 60 + Math.random()*140;
      const dx = Math.cos(angle)*dist;
      const dy = Math.sin(angle)*dist - 40;
      const rot = Math.random()*720-360;
      el.style.setProperty('--dx', dx+'px');
      el.style.setProperty('--dy', dy+'px');
      el.style.setProperty('--rot', rot+'deg');
      el.style.animationDuration = (0.9+Math.random()*0.7)+'s';
      if(Math.random()>0.5){ el.style.borderRadius = '50%'; }
      document.body.appendChild(el);
      setTimeout(()=>el.remove(), 1700);
    }
  }

  // Khai báo danh sách các file ảnh bạn đã chuẩn bị sẵn
const DANH_SACH_ANH_THUONG = [
  "image/chucmung2.png",
  "image/camon1.png",
  "image/camon2.png",
  "image/camon3.png",
  "image/camon4.png",
  "image/ket.png",
  "image/camon5.png"
  // Bạn cứ copy tên file ảnh của bạn thay vào đây, bao nhiêu ảnh cũng được
];

function showPreparedImage() {
  if (typeof Sound !== 'undefined') Sound.click(); // Âm thanh nút bấm
  
  const img = document.getElementById('my-prepared-image');
  const note = document.getElementById('save-note');
  
  // Lấy ngẫu nhiên 1 ảnh từ danh sách
  const randomIndex = Math.floor(Math.random() * DANH_SACH_ANH_THUONG.length);
  const randomImageSrc = DANH_SACH_ANH_THUONG[randomIndex];
  
  // Gán đường dẫn ảnh mới vào thẻ img
  img.src = randomImageSrc;
  
  // Hiển thị ảnh và lời nhắc
  img.style.display = 'block';
  note.style.display = 'block';
}

  // THÊM HÀM NÀY ĐỂ NÚT TẮT ẢNH HOẠT ĐỘNG
  function closeCapture() {
    const modal = document.getElementById('capture-modal');
    if(modal) modal.style.display = 'none';
  }
  function wrapText(ctx, text, x, y, maxWidth, lineHeight){
    const words = text.split(' ');
    let line = '';
    for(let n=0;n<words.length;n++){
      const testLine = line + words[n] + ' ';
      if(ctx.measureText(testLine).width > maxWidth && n > 0){
        ctx.fillText(line, x, y); line = words[n] + ' '; y += lineHeight;
      } else { line = testLine; }
    }
    ctx.fillText(line, x, y);
  }

  async function captureMoment(){
    drawCaptureCanvas();
    const canvas = document.getElementById('capture-canvas');
    canvas.toBlob(async (blob)=>{
      let downloads = null;
      try{ if(window.claude && window.claude.use){ downloads = await window.claude.use('downloads'); } }catch(e){ downloads = null; }
      if(downloads){
        try{ await downloads.save({ filename:'trung-thu-cua-em.png', data: blob }); return; }catch(e){}
      }
      const url = URL.createObjectURL(blob);
      const img = document.getElementById('capture-preview');
      img.src = url; img.style.display = 'block';
      document.getElementById('capture-note').style.display = 'block';
    }, 'image/png');
  }

  //=================================================
  // ÂM THANH & NHẠC NỀN (Web Audio API - không cần file mp3)
  //=================================================
  const Sound = (function(){
    let ctx = null, enabled = true, musicOn = false, musicTimer = null, musicMaster = null;

    function getCtx(){
      if(!ctx){ ctx = new (window.AudioContext || window.webkitAudioContext)(); }
      if(ctx.state === 'suspended'){ ctx.resume(); }
      return ctx;
    }

    function tone(freq, start, dur, type, gain){
      if(!enabled) return;
      try{
        const c = getCtx();
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = type || 'sine';
        osc.frequency.value = freq;
        g.gain.value = 0;
        osc.connect(g); g.connect(c.destination);
        const t0 = c.currentTime + Math.max(0,start);
        g.gain.linearRampToValueAtTime(gain||0.15, t0+0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t0+dur);
        osc.start(t0); osc.stop(t0+dur+0.05);
      }catch(e){}
    }

    function spin(){ for(let i=0;i<12;i++){ tone(560-i*22, i*0.13, 0.09,'square',0.05); } }
    function click(){ tone(700,0,0.07,'square',0.07); }
    function correct(){ [523.25,659.25,783.99,1046.5].forEach((f,i)=>tone(f,i*0.09,0.22,'triangle',0.16)); }
    function wrong(){ tone(220,0,0.18,'sawtooth',0.13); tone(160,0.12,0.22,'sawtooth',0.11); }
    function win(){ [523.25,659.25,783.99,1046.5,1318.5].forEach((f,i)=>tone(f,i*0.12,0.32,'triangle',0.18)); }
    function startMusic(){
      if(musicOn || !enabled) return;
      musicOn = true;
      const audioEl = document.getElementById('bg-music');
      if(audioEl) {
          audioEl.volume = 0.4; // Chỉnh âm lượng nhạc mp3 (từ 0.0 đến 1.0)
          audioEl.play().catch(e => console.log('Chưa thể phát nhạc tự động', e));
      }
    }
    
    function stopMusic(){
      musicOn = false;
      const audioEl = document.getElementById('bg-music');
      if(audioEl) audioEl.pause();
    }
    function toggle(){
      enabled = !enabled;
      if(!enabled){ stopMusic(); } else { startMusic(); }
      return enabled;
    }
    return { spin, click, correct, wrong, win, startMusic, stopMusic, toggle };
  })();

  function toggleSound(){
    const on = Sound.toggle();
    const btn = document.getElementById('sound-toggle');
    if(btn) btn.textContent = on ? '🔊' : '🔇';
  }

  //=================================================
  // TRANG TRÍ CHUYỂN ĐỘNG: đèn lồng trôi + sao băng
  //=================================================
  function makeLanterns(){
    const wrap = document.getElementById('lanterns');
    if(!wrap) return;
    const icons = ['🏮','🏮','🏮','🏮','🏮'];
    icons.forEach((ic, i)=>{
      const el = document.createElement('div');
      el.className = 'lantern-deco';
      el.textContent = ic;
      el.style.left = (8 + i*20 + Math.random()*8) + 'vw';
      el.style.animationDuration = (3.2 + Math.random()*1.6) + 's, ' + (26 + Math.random()*14) + 's';
      el.style.animationDelay = (Math.random()*4) + 's, ' + (Math.random()*20) + 's';
      wrap.appendChild(el);
    });
  }

  function spawnShootingStar(){
    const wrap = document.getElementById('shooting-stars');
    if(!wrap) return;
    const el = document.createElement('div');
    el.className = 'shooting-star';
    el.style.left = (20 + Math.random()*60) + 'vw';
    el.style.top = (5 + Math.random()*25) + 'vh';
    wrap.appendChild(el);
    setTimeout(()=>el.remove(), 1500);
  }

  function startShootingStars(){
    setInterval(()=>{ if(Math.random() < 0.8) spawnShootingStar(); }, 6000 + Math.random()*3000);
  }

  positionWheelIcons();
  buildSparkleRing();
  makeStars();
  makeFireflies();
  makeLanterns();
  startShootingStars();
  setBackground('welcome');


