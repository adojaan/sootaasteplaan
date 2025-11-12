(() => {
  const DATA_URL = 'data.json';
  const FALLBACK_DATA = {
    elements: [
      {
        id: 'understand_context',
        title: 'Understand Context',
        subtitle: 'Gather background information',
        info:
          '<p>Engage with stakeholders and review the existing documentation to fully understand the current situation. Capture any constraints, assumptions, and desired outcomes.</p><ul><li>Interview subject matter experts</li><li>Review historical reports</li><li>List constraints and opportunities</li></ul>',
        special: false
      },
      {
        id: 'define_goal',
        title: 'Define Goal',
        subtitle: 'Clarify the target state',
        info:
          '<p>Translate stakeholder needs into a clear, measurable goal. Ensure everyone agrees on what success looks like.</p>',
        special: false
      },
      {
        id: 'map_process',
        title: 'Map Process',
        subtitle: 'Visualise the workflow',
        info:
          '<p>Create a step-by-step view of the current process. Identify inputs, outputs, decision points, and responsible roles.</p>',
        special: false
      },
      {
        id: 'identify_gaps',
        title: 'Identify Gaps',
        subtitle: 'Spot weaknesses and risks',
        info:
          '<p>Compare the current process with the desired outcome to find inefficiencies, bottlenecks, or missing capabilities.</p>',
        special: false
      },
      {
        id: 'prioritise_actions',
        title: 'Prioritise Actions',
        subtitle: 'Rank improvements',
        info:
          '<p>Evaluate the impact, effort, and urgency of each identified gap. Agree on the order in which actions should be taken.</p>',
        special: false
      },
      {
        id: 'design_solutions',
        title: 'Design Solutions',
        subtitle: 'Craft actionable changes',
        info:
          '<p>Co-create detailed solution options with the implementation team. Document requirements, dependencies, and expected benefits.</p>',
        special: false
      },
      {
        id: 'plan_implementation',
        title: 'Plan Implementation',
        subtitle: 'Prepare delivery roadmap',
        info:
          '<p>Break down the selected solution into tasks, allocate owners, and establish a realistic timeline with milestones.</p>',
        special: false
      },
      {
        id: 'execute_changes',
        title: 'Execute Changes',
        subtitle: 'Roll out improvements',
        info:
          '<p>Coordinate the delivery team to implement the plan. Track progress, remove blockers, and manage risks.</p>',
        special: false
      },
      {
        id: 'measure_results',
        title: 'Measure Results',
        subtitle: 'Evaluate outcomes',
        info:
          '<p>Assess the impact of the implemented changes using predefined metrics. Capture lessons learned to inform future initiatives.</p>',
        special: false
      },
      {
        id: 'communication',
        title: 'Continuous Communication',
        subtitle: 'Enable feedback loops',
        info:
          '<p><strong>Suhtlus</strong> happens throughout the entire initiative. Share updates, collect feedback, and ensure transparency between every pair of steps.</p><p>Drop this card onto the arrows to emphasise when communication is required. You can apply it to multiple arrows.</p>',
        special: true
      }
    ],
    correctOrders: [
      [
        'understand_context',
        'define_goal',
        'map_process',
        'identify_gaps',
        'prioritise_actions',
        'design_solutions',
        'plan_implementation',
        'execute_changes',
        'measure_results'
      ]
    ],
    partialOrders: [
      {
        order: [
          'understand_context',
          'define_goal',
          'map_process',
          'prioritise_actions',
          'identify_gaps',
          'design_solutions',
          'plan_implementation',
          'execute_changes',
          'measure_results'
        ],
        feedback:
          'Check the middle of the process: identify the gaps before you prioritise what to do about them.'
      },
      {
        order: [
          'understand_context',
          'define_goal',
          'map_process',
          'identify_gaps',
          'prioritise_actions',
          'plan_implementation',
          'design_solutions',
          'execute_changes',
          'measure_results'
        ],
        feedback: 'Design the detailed solution before committing to the delivery plan.'
      }
    ],
    feedback: {
      correct: 'Correct! You have arranged all steps in the right order.',
      partial: 'The order is partially correct. Some steps are out of place.',
      incorrect: 'That order is not correct. Please try again.'
    }
  };
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
        if (!data || !Array.isArray(data.elements)) {
          throw new Error('data.json is missing the "elements" array');
        }
        handleDataLoaded(data, false);
      })
      .catch((error) => {
        console.warn('Falling back to bundled data after load failure.', error);
        handleDataLoaded(structuredCloneSafe(FALLBACK_DATA), true);
      });
  }

  function structuredCloneSafe(value) {
    if (typeof structuredClone === 'function') {
      return structuredClone(value);
    }
    return JSON.parse(JSON.stringify(value));
  }

  function handleDataLoaded(data, usedFallback) {
    state.data = data;
    createCards(data.elements);
    resetInactivityTimer();
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

  // Attempt pointer capture; not critical if it fails.
  try { card.setPointerCapture(event.pointerId); } catch (_) {}

    const originSlotIndex = card.dataset.slotIndex
      ? parseInt(card.dataset.slotIndex, 10)
      : null;

    // Record start rect BEFORE any DOM mutation so we can anchor to the visual origin
    const startRect = card.getBoundingClientRect();
    const offsetX = event.clientX - startRect.left;
    const offsetY = event.clientY - startRect.top;

    if (originSlotIndex !== null && !Number.isNaN(originSlotIndex)) {
      // Remove from slot after measuring so the rect doesn't collapse to 0,0
      removeCardFromSlot(card, originSlotIndex);
    }

    // Move card to body to ensure it's above everything, anchored at original pos
    card.style.position = 'fixed';
    card.style.left = `${startRect.left}px`;
    card.style.top = `${startRect.top}px`;
    card.style.margin = '0';
    // Let it take natural size first, then lock it to avoid reflow during drag
    card.style.width = '';
    card.style.height = '';
    document.body.appendChild(card);
    const naturalRect = card.getBoundingClientRect();
    card.style.width = `${naturalRect.width}px`;
    card.style.height = `${naturalRect.height}px`;

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

  document.addEventListener('pointermove', handlePointerMove, true);
  document.addEventListener('pointerup', handlePointerUp, true);
  document.addEventListener('pointercancel', handlePointerCancel, true);
  document.addEventListener('keydown', handleDragKeyDown, true);
  }

  function handlePointerMove(event) {
    if (!state.drag) return;
    const { card, offsetX, offsetY } = state.drag;

    const newLeft = event.clientX - offsetX;
    const newTop = event.clientY - offsetY;

    card.style.left = `${newLeft}px`;
    card.style.top = `${newTop}px`;

    highlightDropTarget(event.clientX, event.clientY, card);

    registerActivity();
  }

  function handlePointerUp(event) {
    if (!state.drag) return;
    const { card } = state.drag;
    try { card.releasePointerCapture(event.pointerId); } catch (_) {}
    document.removeEventListener('pointermove', handlePointerMove, true);
    document.removeEventListener('pointerup', handlePointerUp, true);
    document.removeEventListener('pointercancel', handlePointerCancel, true);
    document.removeEventListener('keydown', handleDragKeyDown, true);
    finalizeDrop(event.clientX, event.clientY);
  }

  function handlePointerCancel(event) {
    if (!state.drag) return;
    const { card, originSlotIndex } = state.drag;
    try { card.releasePointerCapture(event.pointerId); } catch (_) {}
    document.removeEventListener('pointermove', handlePointerMove, true);
    document.removeEventListener('pointerup', handlePointerUp, true);
    document.removeEventListener('pointercancel', handlePointerCancel, true);
    document.removeEventListener('keydown', handleDragKeyDown, true);

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

  function handleDragKeyDown(e) {
    if (!state.drag) return;
    if (e.key === 'Escape') {
      // Synthesise a cancel
      handlePointerCancel({ pointerId: 0 });
    }
  }

  function finalizeDrop(clientX, clientY) {
    const { card, originSlotIndex } = state.drag;
    const isSpecial = card.dataset.special === 'true';

    // Determine target at the moment of drop
    const path = document.elementsFromPoint(clientX, clientY);
    const slotTarget = path.find((el) => el.classList && el.classList.contains('placeholder-slot'));
    const arrowTarget = path.find((el) => el.classList && el.classList.contains('arrow-indicator'));
    // Do NOT clear positioning yet; we need the fixed rect for accurate pool placement.
    card.classList.remove('dragging');
    card.style.pointerEvents = '';

    let dropped = false;

    if (!isSpecial && slotTarget) {
      const targetIndex = parseInt(slotTarget.dataset.index, 10);
      if (Number.isInteger(targetIndex)) {
        const slotFilled = Boolean(slotTarget.dataset.cardId);
        if (slotFilled && originSlotIndex === null) {
          // From pool to filled slot: disallow, snap back
          snapToPoolPosition(card);
          dropped = true;
        } else if (slotFilled && originSlotIndex !== null) {
          const occupant = slotTarget.querySelector('.card');
          if (occupant) {
            slotTarget.removeChild(occupant);
            placeCardInSlot(card, targetIndex);
            placeCardInSlot(occupant, originSlotIndex);
            dropped = true;
          }
        } else {
          placeCardInSlot(card, targetIndex);
          dropped = true;
        }
      }
    } else if (isSpecial && arrowTarget && arrowTarget.classList.contains('active')) {
      arrowTarget.classList.add('comm');
      snapToPoolPosition(card);
      dropped = true;
    }

    if (!dropped) {
      storePoolPosition(card);
    }

    // After the card has been placed (slot or pool), any inline drag sizing can be cleared.
    if (!card.dataset.slotIndex) {
      // Card ended in pool (absolute) -> sizing already normalized in helpers.
    } else {
      // In slot: ensure no stale drag dimensions remain.
      card.style.width = '';
      card.style.height = '';
      card.style.margin = '';
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
    card.style.width = '';
    card.style.height = '';
    card.style.margin = '';
    card.dataset.slotIndex = '';
    cardsContainer.appendChild(card);
  }

  function storePoolPosition(card) {
    // Compute position relative to the pool container
    const containerRect = cardsContainer.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const relLeft = cardRect.left - containerRect.left + cardsContainer.scrollLeft;
    const relTop = cardRect.top - containerRect.top + cardsContainer.scrollTop;

    card.dataset.poolLeft = String(Math.max(0, relLeft));
    card.dataset.poolTop = String(Math.max(0, relTop));
    card.style.position = 'absolute';
    card.style.left = `${relLeft}px`;
    card.style.top = `${relTop}px`;
    card.style.width = '';
    card.style.height = '';
    card.style.margin = '';
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
