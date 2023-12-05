// Naughty Notifier Styles
const naughtyNotifierStyles = `
  #naughty-notifier {
    text-align: center;
    margin: 20px;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #4caf50;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #4caf50;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

// Apply Naughty Notifier Styles
const styleElement = document.createElement('style');
styleElement.innerHTML = naughtyNotifierStyles;
document.head.appendChild(styleElement);

// Naughty Notifier JavaScript
document.addEventListener('DOMContentLoaded', function () {
  const audio = new Audio('/media/YouSuffer.mp3');
  const toggleSwitch = document.getElementById('toggleSwitch');
  const naughtyCounterTextElement = document.getElementById('naughtyCounterText');
  const naughtyCounterElement = document.getElementById('naughtyCounter');
  let naughtyCounter = Math.floor(Math.random() * 900000) + 100000; // Random number between 100k and 1 million
  let isSoundOn = false;

  function startCheck() {
    let isSoundOn = toggleSwitch.checked;
    if (isSoundOn) {
      playSoundWithRandomInterval();
    } else {
      stopSound();
  }};
  startCheck();

  toggleSwitch.addEventListener('change', function () {
    isSoundOn = toggleSwitch.checked;
    if (isSoundOn) {
      playSoundWithRandomInterval();
    } else {
      stopSound();
    }
  });

  function playSoundWithRandomInterval() {
    if (isSoundOn) {
      const randomInterval = Math.floor(Math.random() * 30000); // Random interval between 0 and 30 seconds
      setTimeout(function () {
        if (isSoundOn) {
          audio.play();
        } else {
          stopSound();
        }
        updateNaughtyCounter();
        playSoundWithRandomInterval(); // Continue playing with a new random interval
      }, randomInterval);
    }
  }

  function stopSound() {
    audio.pause();
    audio.currentTime = 0;
  }

  function updateNaughtyCounter() {
    naughtyCounter += 50; // Increment by 50
    naughtyCounterElement.textContent = naughtyCounter;
  }
});
