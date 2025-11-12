(() => {
  const DATA_URL = 'data.json';
  const cardsContainer = document.getElementById('cards-container');
  const placeholderColumn = document.getElementById('placeholder-column');
  const confirmBtn = document.getElementById('confirm-btn');

  const placeholders = Array.from(
    placeholderColumn.querySelectorAll('.placeholder-slot')
  );
  const arrows = Array.from(
    placeholderColumn.querySelectorAll('.arrow-indicator')
  );

  let state = {
    data: null,
    cards: new Map(),
    drag: null,
    inactivityTimer: null,
    inactivityGraceTimer: null,
    inactivityModalOpen: false,
    previouslyComplete: false
  };

  const infoModal = document.getElementById('info-modal');
  const confirmModal = document.getElementById('confirm-modal');
  const feedbackModal = document.getElementById('feedback-modal');
  const inactivityModal = document.getElementById('inactivity-modal');
  const resetModal = document.getElementById('reset-modal');

  const infoTitleEl = document.getElementById('info-modal-title');
  const infoSubtitleEl = document.getElementById('info-modal-subtitle');
  const infoBodyEl = document.getElementById('info-modal-body');
  const feedbackMessageEl = document.getElementById('feedback-message');

  document.getElementById('confirm-order').addEventListener('click', () => {
    closeModal(confirmModal);
    evaluateSequence();
  });

  document
    .getElementById('feedback-restart')
    .addEventListener('click', () => {
      closeModal(feedbackModal);
      resetGame();
    });

  document
    .getElementById('inactivity-continue')
    .addEventListener('click', () => {
      closeModal(inactivityModal);
      clearTimeout(state.inactivityGraceTimer);
      state.inactivityGraceTimer = null;
      state.inactivityModalOpen = false;
      resetInactivityTimer();
    });

  document.getElementById('inactivity-reset').addEventListener('click', () => {
    clearTimeout(state.inactivityGraceTimer);
    state.inactivityGraceTimer = null;
    closeModal(inactivityModal);
    state.inactivityModalOpen = false;
    resetGame();
  });

  document.getElementById('reset-btn').addEventListener('click', () => {
    openModal(resetModal);
  });

  document.getElementById('reset-confirm').addEventListener('click', () => {
    closeModal(resetModal);
    resetGame();
  });

  confirmBtn.addEventListener('click', () => {
    if (!confirmBtn.disabled) {
      openModal(confirmModal);
    }
  });

  document.querySelectorAll('[data-close]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const id = event.currentTarget.getAttribute('data-close');
      const modal = document.getElementById(id);
      if (modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener(
    'pointerdown',
    () => {
      registerActivity();
    },
    true
  );
  document.addEventListener(
    'keydown',
    () => {
      registerActivity();
    },
    true
  );

  setupPlaceholders();
  loadData();

  function setupPlaceholders() {
    placeholders.forEach((slot, index) => {
      slot.dataset.label = `Step ${index + 1}`;
      slot.dataset.cardId = '';
      slot.classList.add('empty');
    });
  }

  function loadData() {
    fetch(DATA_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load data.json');
        }
        return response.json();
      })
      .then((data) => {
        state.data = data;
        createCards(data.elements);
        resetInactivityTimer();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function createCards(elements) {
    cardsContainer.innerHTML = '';
    state.cards.clear();

    elements.forEach((element) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.id = element.id;
      card.dataset.special = element.special ? 'true' : 'false';
      card.dataset.slotIndex = '';
      card.tabIndex = 0;

      if (element.special) {
        card.classList.add('special');
      }

      const title = document.createElement('div');
      title.className = 'card-title';
      title.textContent = element.title;
      card.appendChild(title);

      const subtitle = document.createElement('div');
      subtitle.className = 'card-subtitle';
      subtitle.textContent = element.subtitle;
      card.appendChild(subtitle);

      const infoIcon = document.createElement('img');
      infoIcon.src = 'assets/icons/info.svg';
      infoIcon.alt = 'More information';
      infoIcon.className = 'info-icon';
      card.appendChild(infoIcon);

      card.addEventListener('pointerdown', handlePointerDown);
      card.addEventListener('pointerup', handlePointerUp);
      card.addEventListener('pointercancel', handlePointerCancel);

      infoIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        openInfoModal(element);
      });

      cardsContainer.appendChild(card);
      state.cards.set(element.id, {
        element,
        node: card
      });

      positionCardRandomly(card, true);
    });
  }

  function positionCardRandomly(card, setHome = false) {
    const padding = 16;
    const maxLeft = Math.max(
      padding,
      cardsContainer.clientWidth - card.offsetWidth - padding
    );
    const maxTop = Math.max(
      padding,
      Math.max(cardsContainer.clientHeight, 520) - card.offsetHeight - padding
    );

    const left = Math.random() * (maxLeft - padding) + padding;
    const top = Math.random() * (maxTop - padding) + padding;

    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
    card.style.position = 'absolute';

    if (setHome) {
      storePoolPosition(card);
    }
  }

  function handlePointerDown(event) {
    const card = event.currentTarget;
    const isInfo = event.target.classList.contains('info-icon');
    if (isInfo) {
      return;
    }

    event.preventDefault();
    registerActivity();

    if (isAnyModalOpen()) {
      return;
    }

    card.setPointerCapture(event.pointerId);

    const originSlotIndex = card.dataset.slotIndex
      ? parseInt(card.dataset.slotIndex, 10)
      : null;

    if (originSlotIndex !== null && !Number.isNaN(originSlotIndex)) {
      removeCardFromSlot(card, originSlotIndex);
    }

    const containerRect = cardsContainer.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const offsetX = event.clientX - cardRect.left;
    const offsetY = event.clientY - cardRect.top;

    if (!cardsContainer.contains(card)) {
      cardsContainer.appendChild(card);
    }

    card.style.width = `${cardRect.width}px`;
    card.style.height = `${cardRect.height}px`;
    card.style.position = 'absolute';
    card.style.left = `${cardRect.left - containerRect.left + cardsContainer.scrollLeft}px`;
    card.style.top = `${cardRect.top - containerRect.top + cardsContainer.scrollTop}px`;

    card.classList.add('dragging');
    card.style.pointerEvents = 'none';

    state.drag = {
      card,
      offsetX,
      offsetY,
      originSlotIndex,
      lastHoverSlot: null,
      lastHoverArrow: null
    };

    document.addEventListener('pointermove', handlePointerMove);
  }

  function handlePointerMove(event) {
    if (!state.drag) return;
    const { card, offsetX, offsetY } = state.drag;

    const newLeft = event.clientX - offsetX;
    const newTop = event.clientY - offsetY;

    const containerRect = cardsContainer.getBoundingClientRect();
    const relativeLeft = newLeft - containerRect.left + cardsContainer.scrollLeft;
    const relativeTop = newTop - containerRect.top + cardsContainer.scrollTop;

    card.style.left = `${relativeLeft}px`;
    card.style.top = `${relativeTop}px`;

    highlightDropTarget(event.clientX, event.clientY, card);

    registerActivity();
  }

  function handlePointerUp(event) {
    if (!state.drag) {
      return;
    }

    const { card } = state.drag;

    card.releasePointerCapture(event.pointerId);
    document.removeEventListener('pointermove', handlePointerMove);

    finalizeDrop(event.clientX, event.clientY);
  }

  function handlePointerCancel(event) {
    if (!state.drag) return;
    const { card, originSlotIndex } = state.drag;
    try {
      card.releasePointerCapture(event.pointerId);
    } catch (err) {
      /* ignore */
    }
    document.removeEventListener('pointermove', handlePointerMove);

    card.classList.remove('dragging');
    card.style.pointerEvents = '';
    card.style.width = '';
    card.style.height = '';

    if (originSlotIndex !== null && Number.isInteger(originSlotIndex)) {
      placeCardInSlot(card, originSlotIndex);
    } else {
      snapToPoolPosition(card);
    }

    clearHoverHighlights();
    state.drag = null;
  }

  function finalizeDrop(clientX, clientY) {
    const { card, originSlotIndex, lastHoverSlot, lastHoverArrow } = state.drag;
    const isSpecial = card.dataset.special === 'true';

    card.classList.remove('dragging');
    card.style.pointerEvents = '';
    card.style.width = '';
    card.style.height = '';

    let dropped = false;

    if (!isSpecial && lastHoverSlot) {
      const targetIndex = parseInt(lastHoverSlot.dataset.index, 10);
      if (Number.isInteger(targetIndex)) {
        if (lastHoverSlot.dataset.cardId && originSlotIndex === null) {
          // slot filled and card from pool -> revert to stored pool position
          snapToPoolPosition(card);
          dropped = true;
        } else if (lastHoverSlot.dataset.cardId && originSlotIndex !== null) {
          const occupant = lastHoverSlot.querySelector('.card');
          if (occupant) {
            lastHoverSlot.removeChild(occupant);
            placeCardInSlot(card, targetIndex);
            placeCardInSlot(occupant, originSlotIndex);
            dropped = true;
          }
        } else {
          placeCardInSlot(card, targetIndex);
          dropped = true;
        }
      }
    } else if (isSpecial && lastHoverArrow) {
      lastHoverArrow.classList.add('comm');
      dropped = true;
      snapToPoolPosition(card);
    }

    if (!dropped) {
      storePoolPosition(card);
    }

    clearHoverHighlights();
    state.drag = null;
    checkCompletion();
  }

  function highlightDropTarget(clientX, clientY, card) {
    clearHoverHighlights();

    const path = document.elementsFromPoint(clientX, clientY);
    const slotTarget = path.find((el) =>
      el.classList && el.classList.contains('placeholder-slot')
    );
    const arrowTarget = path.find((el) =>
      el.classList && el.classList.contains('arrow-indicator')
    );

    if (card.dataset.special === 'true') {
      if (arrowTarget && arrowTarget.classList.contains('active')) {
        arrowTarget.classList.add('hover');
        state.drag.lastHoverArrow = arrowTarget;
      }
      return;
    }

    if (!slotTarget) return;
    const slotCardId = slotTarget.dataset.cardId;
    const isFromSlot = state.drag.originSlotIndex !== null;

    if (!slotCardId || isFromSlot) {
      slotTarget.classList.add('highlight');
      state.drag.lastHoverSlot = slotTarget;
    }
  }

  function clearHoverHighlights() {
    placeholders.forEach((slot) => slot.classList.remove('highlight'));
    arrows.forEach((arrow) => arrow.classList.remove('hover'));
    if (state.drag) {
      state.drag.lastHoverSlot = null;
      state.drag.lastHoverArrow = null;
    }
  }

  function placeCardInSlot(card, slotIndex) {
    const slot = placeholders[slotIndex];
    if (!slot) return;

    slot.classList.remove('empty', 'highlight');
    slot.classList.add('filled');
    slot.dataset.cardId = card.dataset.id;

    card.dataset.slotIndex = String(slotIndex);
    card.style.position = 'static';
    card.style.left = '';
    card.style.top = '';
    card.style.pointerEvents = '';

    slot.appendChild(card);
    updateArrows();
  }

  function removeCardFromSlot(card, slotIndex) {
    const slot = placeholders[slotIndex];
    if (!slot) return;

    if (slot.contains(card)) {
      slot.removeChild(card);
    }

    slot.dataset.cardId = '';
    slot.classList.add('empty');
    slot.classList.remove('filled');
    card.dataset.slotIndex = '';
    updateArrows();
  }

  function updateArrows() {
    arrows.forEach((arrow, index) => {
      const first = placeholders[index];
      const second = placeholders[index + 1];
      const active = first && second && first.dataset.cardId && second.dataset.cardId;

      if (active) {
        arrow.classList.add('active');
      } else {
        arrow.classList.remove('active');
        arrow.classList.remove('comm');
      }
    });
  }

  function snapToPoolPosition(card) {
    const poolLeft = parseFloat(card.dataset.poolLeft || '0');
    const poolTop = parseFloat(card.dataset.poolTop || '0');
    card.style.left = `${poolLeft}px`;
    card.style.top = `${poolTop}px`;
    card.style.position = 'absolute';
    card.dataset.slotIndex = '';
    cardsContainer.appendChild(card);
  }

  function storePoolPosition(card) {
    const left = parseFloat(card.style.left || '0');
    const top = parseFloat(card.style.top || '0');
    card.dataset.poolLeft = Number.isNaN(left) ? '0' : String(left);
    card.dataset.poolTop = Number.isNaN(top) ? '0' : String(top);
    card.style.position = 'absolute';
    card.dataset.slotIndex = '';
    cardsContainer.appendChild(card);
  }

  function checkCompletion() {
    const allFilled = placeholders.every((slot) => slot.dataset.cardId);
    confirmBtn.disabled = !allFilled;

    if (allFilled && !state.previouslyComplete) {
      state.previouslyComplete = true;
      openModal(confirmModal);
    }

    if (!allFilled) {
      state.previouslyComplete = false;
    }
  }

  function evaluateSequence() {
    if (!state.data) return;
    const ids = placeholders.map((slot) => slot.dataset.cardId);
    const { correctOrders = [], partialOrders = [], feedback = {} } = state.data;

    let result = 'incorrect';
    let message = feedback.incorrect || 'That order is not correct. Please try again.';

    const isMatch = (arrA, arrB) =>
      arrA.length === arrB.length && arrA.every((value, index) => value === arrB[index]);

    const correctMatch = correctOrders.find((order) => isMatch(order, ids));
    if (correctMatch) {
      result = 'correct';
      message = feedback.correct || 'Correct! You have arranged all steps in the right order.';
    } else {
      const partialMatch = partialOrders.find((entry) => isMatch(entry.order, ids));
      if (partialMatch) {
        result = 'partial';
        message =
          partialMatch.feedback ||
          feedback.partial ||
          'The order is partially correct. Some steps are out of place.';
      }
    }

    feedbackMessageEl.textContent = message;
    openModal(feedbackModal);

    // Optional analytics payload placeholder
    if (navigator.onLine) {
      const payload = {
        timestamp: Date.now(),
        order: ids,
        result
      };

      // fetch('https://example.com/api/ordering-game', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // }).catch(() => {});
    }
  }

  function openInfoModal(element) {
    infoTitleEl.textContent = element.title;
    infoSubtitleEl.textContent = element.subtitle;
    infoBodyEl.innerHTML = element.info;
    openModal(infoModal);
  }

  function openModal(modal) {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
    if (modal === inactivityModal) {
      state.inactivityModalOpen = true;
    }
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    if (!isAnyModalOpen()) {
      document.body.classList.remove('modal-open');
    }
    if (modal === inactivityModal) {
      state.inactivityModalOpen = false;
    }
  }

  function isAnyModalOpen() {
    return (
      infoModal.getAttribute('aria-hidden') === 'false' ||
      confirmModal.getAttribute('aria-hidden') === 'false' ||
      feedbackModal.getAttribute('aria-hidden') === 'false' ||
      inactivityModal.getAttribute('aria-hidden') === 'false' ||
      resetModal.getAttribute('aria-hidden') === 'false'
    );
  }

  function resetGame() {
    closeModal(confirmModal);
    closeModal(feedbackModal);
    closeModal(inactivityModal);
    closeModal(resetModal);
    clearTimeout(state.inactivityGraceTimer);
    state.inactivityGraceTimer = null;

    placeholders.forEach((slot, index) => {
      const card = slot.querySelector('.card');
      if (card) {
        slot.removeChild(card);
        cardsContainer.appendChild(card);
        card.dataset.slotIndex = '';
      }
      slot.dataset.cardId = '';
      slot.classList.remove('filled');
      slot.classList.add('empty');
    });

    arrows.forEach((arrow) => {
      arrow.classList.remove('active', 'comm', 'hover');
    });

    state.cards.forEach(({ node }) => {
      positionCardRandomly(node, true);
    });

    confirmBtn.disabled = true;
    state.previouslyComplete = false;
    registerActivity();
  }

  function registerActivity() {
    resetInactivityTimer();
  }

  function resetInactivityTimer() {
    clearTimeout(state.inactivityTimer);
    if (state.inactivityModalOpen) return;
    state.inactivityTimer = setTimeout(() => {
      showInactivityModal();
    }, 60000);
  }

  function showInactivityModal() {
    state.inactivityTimer = null;
    openModal(inactivityModal);
    state.inactivityGraceTimer = setTimeout(() => {
      closeModal(inactivityModal);
      state.inactivityModalOpen = false;
      resetGame();
      state.inactivityGraceTimer = null;
    }, 10000);
  }
})();
