(() => {
  const state = {
    a: 0,
    b: 0,
    answer: 0,
    unlocked: false,
  };

  const randFactor = () => Math.floor(Math.random() * 9) + 2; // 2–10

  function newQuestion() {
    state.a = randFactor();
    state.b = randFactor();
    state.answer = state.a * state.b;

    const question = document.getElementById('mathQuestion');
    const input = document.getElementById('mathAnswer');
    const message = document.getElementById('mathMessage');

    if (question) question.textContent = `${state.a} × ${state.b} = ?`;
    if (input) {
      input.value = '';
      input.disabled = false;
      setTimeout(() => input.focus(), 50);
    }
    if (message) {
      message.textContent = 'Ratkaise oikein, niin peli aukeaa 🎮';
      message.className = 'math-message';
    }
  }

  function checkAnswer(onSuccess) {
    if (state.unlocked) return;

    const input = document.getElementById('mathAnswer');
    const message = document.getElementById('mathMessage');
    const button = document.getElementById('mathCheck');
    const value = Number.parseInt(input?.value ?? '', 10);

    if (value === state.answer) {
      state.unlocked = true;
      if (message) {
        message.textContent = 'Oikein! 🎉 Peli alkaa!';
        message.className = 'math-message correct';
      }
      if (input) input.disabled = true;
      if (button) button.disabled = true;
      setTimeout(() => onSuccess?.(), 450);
      return;
    }

    if (message) {
      message.textContent = 'Ei ihan 😄 Yritä sama lasku uudestaan!';
      message.className = 'math-message wrong';
    }
    if (input) {
      input.select();
      input.focus();
    }
  }

  window.MathGate = {
    start(onSuccess) {
      const button = document.getElementById('mathCheck');
      const input = document.getElementById('mathAnswer');

      if (!button || !input) return;

      button.addEventListener('click', () => checkAnswer(onSuccess));
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          checkAnswer(onSuccess);
        }
      });

      newQuestion();
    },
  };
})();
