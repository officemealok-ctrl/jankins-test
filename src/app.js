const express = require('express');
const app = express();

app.use(express.json());

// Root endpoint: Pro Virtual Harmonium Web Application
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Pro Harmonium - Professional Virtual Indian Harmonium</title>
  <meta name="description" content="Play authentic Indian Harmonium online with Web Audio API sound synthesis, multi-octave playable keyboard, drone switches, and Raag scale highlighters.">
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet">

  <style>
    :root {
      --bg-gradient: radial-gradient(circle at 50% 20%, #1e1b18 0%, #0a0908 100%);
      --wood-primary: linear-gradient(180deg, #4a150b 0%, #2b0b05 100%);
      --wood-dark: #190502;
      --wood-border: #6d2417;
      --gold-accent: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
      --gold-metallic: linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%);
      --brass-knob: radial-gradient(circle at 30% 30%, #ffd700, #b8860b 70%, #5c4033);
      --ivory-key: linear-gradient(180deg, #ffffff 0%, #f3eede 85%, #e2d7be 100%);
      --ivory-key-active: linear-gradient(180deg, #e6dcc8 0%, #d4c2a1 100%);
      --ebony-key: linear-gradient(180deg, #2d2d2d 0%, #151515 85%, #050505 100%);
      --ebony-key-active: linear-gradient(180deg, #444 0%, #222 100%);
      --glow-teal: #00f2fe;
      --glow-gold: #ffb703;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }

    body {
      font-family: 'Outfit', sans-serif;
      background: var(--bg-gradient);
      color: #f8fafc;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 16px;
      overflow-x: hidden;
    }

    /* Mobile Rotate Prompt Banner */
    .rotate-banner {
      display: none;
      width: 100%;
      max-width: 1200px;
      background: linear-gradient(135deg, #d97706, #b45309);
      color: white;
      padding: 12px 16px;
      border-radius: 12px;
      margin-bottom: 12px;
      text-align: center;
      font-weight: 600;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(217, 119, 6, 0.4);
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    @media (max-width: 900px) and (orientation: portrait) {
      .rotate-banner {
        display: flex;
      }
    }

    header {
      text-align: center;
      margin-bottom: 16px;
      position: relative;
    }

    header h1 {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      background: var(--gold-metallic);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 1px;
      text-shadow: 0 4px 20px rgba(191, 149, 63, 0.3);
    }

    header p {
      font-size: 0.9rem;
      color: #a8a29e;
      margin-top: 2px;
      font-weight: 300;
    }

    /* Main Harmonium Container */
    .harmonium-cabinet {
      width: 100%;
      max-width: 1200px;
      background: var(--wood-primary);
      border: 5px solid var(--wood-border);
      border-radius: 20px;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8), inset 0 2px 5px rgba(255, 255, 255, 0.2);
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      position: relative;
    }

    /* Brass Trim Header */
    .brass-strip {
      height: 6px;
      background: var(--gold-metallic);
      border-radius: 3px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }

    /* Control Panel Bay */
    .control-bay {
      background: rgba(15, 10, 8, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(12px);
      border-radius: 14px;
      padding: 16px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .control-title {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #d6d3d1;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .control-title::before {
      content: '';
      display: inline-block;
      width: 6px;
      height: 6px;
      background: var(--glow-gold);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--glow-gold);
    }

    /* Custom Controls */
    select, button, input[type="range"] {
      font-family: inherit;
    }

    .styled-select {
      background: #1c1917;
      color: #f5f5f4;
      border: 1px solid #44403c;
      padding: 10px 12px;
      border-radius: 8px;
      font-size: 0.85rem;
      outline: none;
      cursor: pointer;
      transition: all 0.2s;
    }

    .styled-select:hover {
      border-color: #78716c;
    }

    .btn-action {
      background: linear-gradient(135deg, #d97706, #b45309);
      color: white;
      border: none;
      padding: 10px 14px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .btn-action:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(217, 119, 6, 0.5);
    }

    .btn-action:active {
      transform: translateY(0);
    }

    .btn-secondary {
      background: #292524;
      border: 1px solid #44403c;
      color: #e7e5e4;
      box-shadow: none;
    }

    .btn-secondary:hover {
      background: #383533;
    }

    .btn-danger {
      background: linear-gradient(135deg, #dc2626, #991b1b);
    }

    /* Slider styling */
    .slider-container {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .styled-slider {
      flex: 1;
      -webkit-appearance: none;
      height: 6px;
      border-radius: 3px;
      background: #44403c;
      outline: none;
    }

    .styled-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--gold-metallic);
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
    }

    /* Drone Switches Section */
    .drone-rack {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      justify-content: space-between;
    }

    .drone-btn {
      flex: 1;
      min-width: 40px;
      height: 38px;
      background: #1c1917;
      border: 1px solid #44403c;
      border-radius: 6px;
      color: #a8a29e;
      font-weight: 600;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .drone-btn.active {
      background: var(--gold-metallic);
      color: #1c1917;
      font-weight: 800;
      border-color: #fbbf24;
      box-shadow: 0 0 12px rgba(251, 191, 36, 0.6);
    }

    /* Bellows Visualizer */
    .bellows-section {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(0, 0, 0, 0.4);
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .pressure-meter {
      width: 80px;
      height: 10px;
      background: #292524;
      border-radius: 5px;
      overflow: hidden;
      border: 1px solid #44403c;
    }

    .pressure-fill {
      height: 100%;
      width: 80%;
      background: linear-gradient(90deg, #10b981, #f59e0b, #ef4444);
      transition: width 0.1s linear;
    }

    /* Mobile Octave Selector Bar */
    .octave-selector-bar {
      display: flex;
      gap: 6px;
      margin-bottom: 8px;
      overflow-x: auto;
      padding-bottom: 4px;
    }

    .octave-tab {
      flex: 1;
      min-width: 90px;
      padding: 8px 10px;
      background: #1c1917;
      border: 1px solid #44403c;
      color: #d6d3d1;
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      text-align: center;
      white-space: nowrap;
      transition: all 0.2s;
    }

    .octave-tab.active {
      background: var(--gold-metallic);
      color: #1c1917;
      font-weight: 800;
      border-color: #f59e0b;
      box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
    }

    /* KEYBOARD SECTION */
    .keyboard-wrapper {
      position: relative;
      background: #0f0a08;
      padding: 14px 10px 10px;
      border-radius: 14px;
      border: 2px solid #3b1710;
      box-shadow: inset 0 10px 20px rgba(0, 0, 0, 0.9);
      overflow-x: auto;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
    }

    .keyboard-scroll {
      display: flex;
      position: relative;
      min-width: 960px;
      justify-content: flex-start;
      padding-bottom: 6px;
    }

    .keys-container {
      display: flex;
      position: relative;
      height: 230px;
      touch-action: none;
    }

    /* Key Styling */
    .key {
      position: relative;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      padding-bottom: 10px;
      border-radius: 0 0 6px 6px;
      transition: background 0.05s, transform 0.05s, box-shadow 0.05s;
    }

    .white-key {
      width: 44px;
      height: 220px;
      background: var(--ivory-key);
      border: 1px solid #aaa;
      border-top: none;
      margin-right: 2px;
      z-index: 1;
      color: #444;
      box-shadow: inset 0 -8px 0 #c2b59b, 0 4px 6px rgba(0,0,0,0.4);
    }

    .white-key.active, .white-key:active {
      background: var(--ivory-key-active);
      transform: translateY(4px);
      box-shadow: inset 0 -2px 0 #b3a58b, 0 2px 3px rgba(0,0,0,0.6);
    }

    .black-key {
      width: 28px;
      height: 130px;
      background: var(--ebony-key);
      margin-left: -14px;
      margin-right: -14px;
      z-index: 2;
      color: #aaa;
      border-radius: 0 0 4px 4px;
      box-shadow: inset 0 -6px 0 #000, 0 5px 8px rgba(0,0,0,0.8);
    }

    .black-key.active, .black-key:active {
      background: var(--ebony-key-active);
      transform: translateY(4px);
      box-shadow: inset 0 -2px 0 #000, 0 2px 4px rgba(0,0,0,0.9);
    }

    /* Key Labels */
    .swar-label {
      font-weight: 700;
      font-size: 0.85rem;
    }

    .note-label {
      font-size: 0.65rem;
      opacity: 0.75;
      margin-top: 2px;
    }

    .kbd-shortcut {
      font-size: 0.55rem;
      background: rgba(0, 0, 0, 0.15);
      padding: 1px 4px;
      border-radius: 3px;
      margin-top: 4px;
      font-weight: 600;
    }

    .black-key .kbd-shortcut {
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
    }

    /* Highlight for Raag notes */
    .key.raag-highlight::before {
      content: '';
      position: absolute;
      top: 10px;
      width: 10px;
      height: 10px;
      background: var(--glow-gold);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--glow-gold);
    }

    /* Footer info */
    footer {
      margin-top: 20px;
      text-align: center;
      font-size: 0.85rem;
      color: #78716c;
      display: flex;
      gap: 16px;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
    }

    footer a {
      color: #d97706;
      text-decoration: none;
    }

    /* Mobile Responsive Optimizations */
    @media (max-width: 768px) {
      body { padding: 8px; }
      header h1 { font-size: 1.8rem; }
      .harmonium-cabinet { padding: 12px; gap: 12px; }
      .control-bay { grid-template-columns: 1fr; padding: 12px; }
      .white-key { width: 42px; height: 190px; }
      .black-key { width: 26px; height: 115px; margin-left: -13px; margin-right: -13px; }
    }

    /* Full Landscape Mode for Phone Screen */
    @media (max-height: 500px) and (orientation: landscape) {
      body { padding: 4px; }
      header { margin-bottom: 6px; }
      header h1 { font-size: 1.4rem; }
      header p { display: none; }
      .control-bay { display: none; } /* Hide control bay in landscape to maximize keys */
      .harmonium-cabinet { padding: 8px; }
      .white-key { height: 190px; width: 40px; }
      .black-key { height: 110px; width: 26px; }
    }
  </style>
</head>
<body>

  <!-- Mobile Landscape Banner -->
  <div class="rotate-banner" id="rotateBanner">
    <span>📱 Turn phone sideways to **Landscape Mode** for best key experience!</span>
    <button class="btn-action" style="padding:4px 10px; font-size:0.75rem;" onclick="toggleFullscreen()">🔄 Rotate / Fullscreen</button>
  </div>

  <header>
    <h1>PRO HARMONIUM</h1>
    <p>Authentic Indian Classical Virtual Harmonium • Dual Reed Synthesis Engine</p>
  </header>

  <main class="harmonium-cabinet">
    <div class="brass-strip"></div>

    <!-- Control Panel -->
    <div class="control-bay">
      
      <!-- Bellows & Volume Control -->
      <div class="control-group">
        <div class="control-title">Master Volume & Bellows</div>
        <div class="slider-container">
          <input type="range" id="volumeSlider" class="styled-slider" min="0" max="100" value="80">
          <span id="volumeVal" style="font-size:0.85rem; width:30px;">80%</span>
        </div>
        <div class="bellows-section" id="bellowsDisplay">
          <button class="btn-action" id="pumpBtn">💨 Pump Air (Space)</button>
          <div class="pressure-meter" title="Bellows Air Pressure">
            <div class="pressure-fill" id="pressureFill"></div>
          </div>
        </div>
      </div>

      <!-- Reed Stop Preset & Tuning -->
      <div class="control-group">
        <div class="control-title">Reed Stops & Acoustics</div>
        <select id="reedStopSelect" class="styled-select">
          <option value="maleFemale">Male + Female Stops (Standard Concert)</option>
          <option value="maleOnly">Male Reed (Warm Deep Tone)</option>
          <option value="femaleOnly">Female Reed (Bright High Tone)</option>
          <option value="tripleOrgan">Triple Reed + Bass (Full Organ)</option>
        </select>
        <div style="display:flex; gap:10px; margin-top:4px;">
          <select id="reverbSelect" class="styled-select" style="flex:1;">
            <option value="dry">Dry Chamber</option>
            <option value="hall" selected>Temple Hall Reverb</option>
            <option value="cathedral">Grand Acoustic</option>
          </select>
        </div>
      </div>

      <!-- Raag Scale Assistant -->
      <div class="control-group">
        <div class="control-title">Raag Scale Assistant</div>
        <select id="raagSelect" class="styled-select">
          <option value="all">Free Playing (All Notes)</option>
          <option value="bhairav">Raag Bhairav (Sa re Ga Ma Pa dha Ni)</option>
          <option value="yaman">Raag Yaman (Sa Re Ga Ma' Pa Dha Ni)</option>
          <option value="bhairavi">Raag Bhairavi (Sa re ga Ma Pa dha ni)</option>
          <option value="kafi">Raag Kafi (Sa Re ga Ma Pa Dha ni)</option>
          <option value="bilawal">Raag Bilawal (All Shuddh Swars)</option>
          <option value="darbari">Raag Darbari (Sa Re ga Ma Pa dha ni)</option>
        </select>
      </div>

      <!-- Session Recording & Rhythm -->
      <div class="control-group">
        <div class="control-title">Recorder & Rhythm</div>
        <div style="display:flex; gap:8px;">
          <button class="btn-action" id="recordBtn" style="flex:1;">🔴 Record</button>
          <button class="btn-action btn-secondary" id="playRecBtn" style="flex:1;" disabled>▶ Play</button>
        </div>
        <div style="display:flex; gap:8px; margin-top:4px;">
          <button class="btn-action btn-secondary" id="tanpuraBtn" style="flex:1;">🥁 Metronome (Teental)</button>
        </div>
      </div>

    </div>

    <!-- Drone Switches (Sur Drones) -->
    <div class="control-group" style="background: rgba(0,0,0,0.3); padding: 10px 14px; border-radius: 10px;">
      <div class="control-title" style="margin-bottom:6px;">Continuous Drone Switches (Sur Swar)</div>
      <div class="drone-rack" id="droneRack">
        <!-- Buttons injected dynamically -->
      </div>
    </div>

    <!-- Mobile Octave Quick Jump Bar -->
    <div class="octave-selector-bar">
      <div class="octave-tab active" onclick="scrollToOctave(0, this)">All 3 Octaves</div>
      <div class="octave-tab" onclick="scrollToOctave(1, this)">Mandra (Lower)</div>
      <div class="octave-tab" onclick="scrollToOctave(2, this)">Madhya (Middle)</div>
      <div class="octave-tab" onclick="scrollToOctave(3, this)">Taar (Higher)</div>
    </div>

    <!-- Playable Harmonium Keyboard -->
    <div class="keyboard-wrapper" id="keyboardWrapper">
      <div class="keyboard-scroll">
        <div class="keys-container" id="harmoniumKeyboard">
          <!-- 39 Keys injected via JS -->
        </div>
      </div>
    </div>

    <div class="brass-strip"></div>
  </main>

  <footer>
    <span>Jenkins & Docker CI/CD Verified</span>
    <span>•</span>
    <a href="/api/health" target="_blank">API Health</a>
    <span>•</span>
    <a href="/api/info" target="_blank">System Info</a>
  </footer>

  <script>
    // Audio Context Setup
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;
    let masterGain = null;
    let reverbNode = null;

    // Air pressure state
    let airPressure = 90;
    let isPumping = false;
    let activeNodes = {};
    let activeDrones = {};
    let currentTouchedKey = null;

    // Recording State
    let mediaRecorder = null;
    let recordedChunks = [];
    let audioBlob = null;
    let isRecording = false;

    // Rhythm Assist State
    let metronomeInterval = null;
    let isMetronomeOn = false;

    // Swar Notation definitions for 3 octaves (39 keys)
    const baseSwars = [
      { name: 'Sa', type: 'S', western: 'C', isBlack: false },
      { name: 're', type: 'K', western: 'C#', isBlack: true },
      { name: 'Re', type: 'S', western: 'D', isBlack: false },
      { name: 'ga', type: 'K', western: 'D#', isBlack: true },
      { name: 'Ga', type: 'S', western: 'E', isBlack: false },
      { name: 'Ma', type: 'S', western: 'F', isBlack: false },
      { name: "Ma'", type: 'T', western: 'F#', isBlack: true },
      { name: 'Pa', type: 'S', western: 'G', isBlack: false },
      { name: 'dha', type: 'K', western: 'G#', isBlack: true },
      { name: 'Dha', type: 'S', western: 'A', isBlack: false },
      { name: 'ni', type: 'K', western: 'A#', isBlack: true },
      { name: 'Ni', type: 'S', western: 'B', isBlack: false }
    ];

    const keyboardShortcuts = [
      'z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm', // Mandra Saptak
      'q', '2', 'w', '3', 'e', 'r', '5', 't', '6', 'y', '7', 'u', // Madhya Saptak
      'i', '9', 'o', '0', 'p', '[', '=', ']', 'a', 'l', ';', "'"  // Taar Saptak
    ];

    const keysData = [];
    const baseFreq = 130.81; // C3 frequency

    for (let i = 0; i < 39; i++) {
      const octaveIdx = Math.floor(i / 12);
      const noteIdx = i % 12;
      const swarInfo = baseSwars[noteIdx];
      const freq = baseFreq * Math.pow(2, i / 12);
      const octaveSymbol = octaveIdx === 0 ? '̣' : (octaveIdx === 2 ? '̇' : '');

      keysData.push({
        index: i,
        swar: swarInfo.name + octaveSymbol,
        westernNote: swarInfo.western + (octaveIdx + 3),
        baseNote: swarInfo.name,
        freq: freq,
        isBlack: swarInfo.isBlack,
        shortcut: keyboardShortcuts[i] || ''
      });
    }

    const raagPresets = {
      bhairav: ['Sa', 're', 'Ga', 'Ma', 'Pa', 'dha', 'Ni'],
      yaman: ['Sa', 'Re', 'Ga', "Ma'", 'Pa', 'Dha', 'Ni'],
      bhairavi: ['Sa', 're', 'ga', 'Ma', 'Pa', 'dha', 'ni'],
      kafi: ['Sa', 'Re', 'ga', 'Ma', 'Pa', 'Dha', 'ni'],
      bilawal: ['Sa', 'Re', 'Ga', 'Ma', 'Pa', 'Dha', 'Ni'],
      darbari: ['Sa', 'Re', 'ga', 'Ma', 'Pa', 'dha', 'ni']
    };

    function initAudio() {
      if (!audioCtx) {
        audioCtx = new AudioContext();
        masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0.8, audioCtx.currentTime);

        reverbNode = audioCtx.createConvolver();
        createReverbImpulse();

        masterGain.connect(audioCtx.destination);
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }

    function createReverbImpulse() {
      const sampleRate = audioCtx.sampleRate;
      const length = sampleRate * 1.5;
      const impulse = audioCtx.createBuffer(2, length, sampleRate);
      for (let channel = 0; channel < 2; channel++) {
        const channelData = impulse.getChannelData(channel);
        for (let i = 0; i < length; i++) {
          channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.5);
        }
      }
      reverbNode.buffer = impulse;
      reverbNode.connect(masterGain);
    }

    function playNote(keyIndex) {
      initAudio();
      if (activeNodes[keyIndex]) return;

      if (navigator.vibrate) navigator.vibrate(12);

      const keyData = keysData[keyIndex];
      const freq = keyData.freq;
      const reedPreset = document.getElementById('reedStopSelect').value;

      const oscNodes = [];
      const noteGain = audioCtx.createGain();
      const pressureVol = Math.max(0.2, airPressure / 100);
      
      noteGain.gain.setValueAtTime(0, audioCtx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.4 * pressureVol, audioCtx.currentTime + 0.05);

      if (reedPreset === 'maleFemale' || reedPreset === 'maleOnly' || reedPreset === 'tripleOrgan') {
        const maleOsc = audioCtx.createOscillator();
        maleOsc.type = 'sawtooth';
        maleOsc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        maleOsc.connect(noteGain);
        maleOsc.start();
        oscNodes.push(maleOsc);
      }

      if (reedPreset === 'maleFemale' || reedPreset === 'femaleOnly' || reedPreset === 'tripleOrgan') {
        const femaleOsc = audioCtx.createOscillator();
        femaleOsc.type = 'square';
        femaleOsc.frequency.setValueAtTime(freq * 2, audioCtx.currentTime);
        femaleOsc.connect(noteGain);
        femaleOsc.start();
        oscNodes.push(femaleOsc);
      }

      if (reedPreset === 'tripleOrgan') {
        const bassOsc = audioCtx.createOscillator();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(freq * 0.5, audioCtx.currentTime);
        bassOsc.connect(noteGain);
        bassOsc.start();
        oscNodes.push(bassOsc);
      }

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, audioCtx.currentTime);
      noteGain.connect(filter);

      const reverbSetting = document.getElementById('reverbSelect').value;
      if (reverbSetting !== 'dry') {
        filter.connect(reverbNode);
      } else {
        filter.connect(masterGain);
      }

      activeNodes[keyIndex] = { oscs: oscNodes, gain: noteGain, filter: filter };
      const keyElem = document.getElementById('key-' + keyIndex);
      if (keyElem) keyElem.classList.add('active');
    }

    function stopNote(keyIndex) {
      if (!activeNodes[keyIndex]) return;
      const nodeData = activeNodes[keyIndex];
      nodeData.gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

      setTimeout(() => {
        nodeData.oscs.forEach(osc => osc.stop());
        delete activeNodes[keyIndex];
      }, 100);

      const keyElem = document.getElementById('key-' + keyIndex);
      if (keyElem) keyElem.classList.remove('active');
    }

    // Build Keyboard UI
    const keyboardElem = document.getElementById('harmoniumKeyboard');
    keysData.forEach((key, idx) => {
      const keyDiv = document.createElement('div');
      keyDiv.id = 'key-' + idx;
      keyDiv.className = 'key ' + (key.isBlack ? 'black-key' : 'white-key');
      keyDiv.dataset.index = idx;
      
      keyDiv.innerHTML = \`
        <span class="swar-label">\${key.swar}</span>
        <span class="note-label">\${key.westernNote}</span>
        <span class="kbd-shortcut">\${key.shortcut.toUpperCase()}</span>
      \`;

      // Mouse Events
      keyDiv.addEventListener('mousedown', (e) => { e.preventDefault(); playNote(idx); });
      keyDiv.addEventListener('mouseup', () => stopNote(idx));
      keyDiv.addEventListener('mouseleave', () => stopNote(idx));

      keyboardElem.appendChild(keyDiv);
    });

    // Touch Glissando Handler (Slide across keys seamlessly on mobile)
    const keyboardContainer = document.getElementById('harmoniumKeyboard');
    
    function getTouchKeyIndex(touch) {
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target) {
        const keyElem = target.closest('.key');
        if (keyElem && keyElem.dataset.index !== undefined) {
          return parseInt(keyElem.dataset.index, 10);
        }
      }
      return null;
    }

    keyboardContainer.addEventListener('touchstart', (e) => {
      e.preventDefault();
      for (let i = 0; i < e.touches.length; i++) {
        const keyIdx = getTouchKeyIndex(e.touches[i]);
        if (keyIdx !== null) playNote(keyIdx);
      }
    });

    keyboardContainer.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const currentActiveIndices = new Set();
      for (let i = 0; i < e.touches.length; i++) {
        const keyIdx = getTouchKeyIndex(e.touches[i]);
        if (keyIdx !== null) {
          currentActiveIndices.add(keyIdx);
          playNote(keyIdx);
        }
      }
      // Stop keys no longer under finger
      Object.keys(activeNodes).forEach(idx => {
        if (!currentActiveIndices.has(parseInt(idx, 10))) {
          stopNote(idx);
        }
      });
    });

    keyboardContainer.addEventListener('touchend', (e) => {
      e.preventDefault();
      Object.keys(activeNodes).forEach(idx => stopNote(idx));
    });

    // Scroll to Octave Helper
    function scrollToOctave(octaveNum, tabElem) {
      document.querySelectorAll('.octave-tab').forEach(t => t.classList.remove('active'));
      if (tabElem) tabElem.classList.add('active');

      const wrapper = document.getElementById('keyboardWrapper');
      if (octaveNum === 0) {
        wrapper.scrollLeft = 0;
      } else {
        const keyIndex = (octaveNum - 1) * 12;
        const targetKey = document.getElementById('key-' + keyIndex);
        if (targetKey) {
          wrapper.scrollLeft = targetKey.offsetLeft - 20;
        }
      }
    }

    // Toggle Fullscreen & Landscape helper
    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
        if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock('landscape').catch(() => {});
        }
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }

    // Drone Switches Setup
    const droneRackElem = document.getElementById('droneRack');
    baseSwars.forEach(swar => {
      const btn = document.createElement('button');
      btn.className = 'drone-btn';
      btn.innerText = swar.western;

      btn.addEventListener('click', () => {
        initAudio();
        if (activeDrones[swar.western]) {
          activeDrones[swar.western].gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
          setTimeout(() => {
            activeDrones[swar.western].osc.stop();
            delete activeDrones[swar.western];
          }, 300);
          btn.classList.remove('active');
        } else {
          const freq = 130.81 * Math.pow(2, baseSwars.indexOf(swar) / 12);
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq * 0.5, audioCtx.currentTime);
          gain.gain.setValueAtTime(0, audioCtx.currentTime);
          gain.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.5);

          osc.connect(gain);
          gain.connect(masterGain);
          osc.start();

          activeDrones[swar.western] = { osc, gain };
          btn.classList.add('active');
        }
      });
      droneRackElem.appendChild(btn);
    });

    // Bellows Air Pressure Decay loop
    setInterval(() => {
      if (!isPumping && airPressure > 40) {
        airPressure -= 1.5;
        document.getElementById('pressureFill').style.width = airPressure + '%';
      }
    }, 200);

    function pumpAir() {
      airPressure = Math.min(100, airPressure + 20);
      document.getElementById('pressureFill').style.width = airPressure + '%';
      const bellows = document.getElementById('bellowsDisplay');
      bellows.classList.add('bellows-active');
      setTimeout(() => bellows.classList.remove('bellows-active'), 500);
    }

    document.getElementById('pumpBtn').addEventListener('click', pumpAir);

    // QWERTY Keyboard Listeners
    const shortcutMap = {};
    keysData.forEach(k => { if (k.shortcut) shortcutMap[k.shortcut.toLowerCase()] = k.index; });

    window.addEventListener('keydown', (e) => {
      if (e.repeat) return;
      if (e.code === 'Space') {
        e.preventDefault();
        pumpAir();
        return;
      }
      const key = e.key.toLowerCase();
      if (shortcutMap[key] !== undefined) playNote(shortcutMap[key]);
    });

    window.addEventListener('keyup', (e) => {
      const key = e.key.toLowerCase();
      if (shortcutMap[key] !== undefined) stopNote(shortcutMap[key]);
    });

    // Raag Highlighter Logic
    document.getElementById('raagSelect').addEventListener('change', (e) => {
      const selectedRaag = e.target.value;
      const allowedNotes = raagPresets[selectedRaag] || null;

      keysData.forEach((k, idx) => {
        const keyElem = document.getElementById('key-' + idx);
        if (!allowedNotes) {
          keyElem.classList.remove('raag-highlight');
        } else if (allowedNotes.includes(k.baseNote)) {
          keyElem.classList.add('raag-highlight');
        } else {
          keyElem.classList.remove('raag-highlight');
        }
      });
    });

    // Volume Control
    document.getElementById('volumeSlider').addEventListener('input', (e) => {
      const val = e.target.value;
      document.getElementById('volumeVal').innerText = val + '%';
      if (masterGain) masterGain.gain.setValueAtTime(val / 100, audioCtx.currentTime);
    });

    // Recording Controls
    const recordBtn = document.getElementById('recordBtn');
    const playRecBtn = document.getElementById('playRecBtn');

    recordBtn.addEventListener('click', () => {
      initAudio();
      if (!isRecording) {
        const dest = audioCtx.createMediaStreamDestination();
        masterGain.connect(dest);
        mediaRecorder = new MediaRecorder(dest.stream);
        recordedChunks = [];

        mediaRecorder.ondataavailable = e => recordedChunks.push(e.data);
        mediaRecorder.onstop = () => {
          audioBlob = new Blob(recordedChunks, { type: 'audio/webm' });
          playRecBtn.disabled = false;
        };

        mediaRecorder.start();
        isRecording = true;
        recordBtn.innerText = '⏹ Stop Rec';
        recordBtn.classList.add('btn-danger');
      } else {
        mediaRecorder.stop();
        isRecording = false;
        recordBtn.innerText = '🔴 Record';
        recordBtn.classList.remove('btn-danger');
      }
    });

    playRecBtn.addEventListener('click', () => {
      if (audioBlob) {
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      }
    });

    // Metronome / Rhythm Assist
    document.getElementById('tanpuraBtn').addEventListener('click', () => {
      initAudio();
      const btn = document.getElementById('tanpuraBtn');
      if (isMetronomeOn) {
        clearInterval(metronomeInterval);
        isMetronomeOn = false;
        btn.innerText = '🥁 Metronome (Teental)';
        btn.classList.add('btn-secondary');
      } else {
        isMetronomeOn = true;
        btn.innerText = '⏹ Stop Rhythm';
        btn.classList.remove('btn-secondary');

        let beat = 0;
        metronomeInterval = setInterval(() => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.frequency.setValueAtTime(beat % 4 === 0 ? 800 : 400, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.1);
          beat = (beat + 1) % 16;
        }, 375);
      }
    });
  </script>
</body>
</html>
  `);
});

// Health check endpoint (Preserved for Docker & Jenkins tests)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    message: 'Jenkins Docker Test App is running smoothly',
    timestamp: new Date().toISOString()
  });
});

// Information endpoint (Preserved for Docker & Jenkins tests)
app.get('/api/info', (req, res) => {
  res.status(200).json({
    appName: 'jenkins-docker-test-app',
    version: '1.0.0',
    repository: 'https://github.com/officemealok-ctrl/jankins-test',
    jenkinsUrl: 'http://35.154.117.52:8080/',
    environment: process.env.NODE_ENV || 'development'
  });
});

module.exports = app;
