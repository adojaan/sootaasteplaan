(() => {
  // ============ LOGGING CONFIGURATION ============
  const loggingConfig = {
    enabled: true,  // Set to false to disable logging
    endpoint: 'https://your-server.com/log.php'  // URL of your PHP logging script
  };
  // ================================================

  const gameData = {
  "elements": [
    {
      "id": "tahame_taastada",
      "title": "Tahaks soo taastada",
      "subtitle": "Kohalikud inimesed on üldiselt nõus, et kodulähedane soo tuleks taastada.",
      "info": "<img align='right' src='assets/images/1v1.jpg' class='modalimg'><p>Enne, kui turbaalal saab teha töid soo taastumiseks, on vaja uurida, planeerida, rääkida ja arutada, kuidas taastamistöödest oleks võimalikult palju kasu ja võimalikult vähe tüli.</p><p>Osa inimesi on ilmselt taastamistööde mõtte poolt, osa on vastu ja osal on ükskõik. Nõnda on taastamisel vaja arvestada nii kirjutatud kui ka kirjutamata reeglitega.</p><p>Kui külaelanikud on otsustanud taastamismõtetega edasi liikuda, tuleks luua näiteks mittetulundusühing või pöörduda mõne teise asutuse poole, kes saaks kogukonda aidata või esindada.</p>",
      "special": false,
      "autoComm": true
    },
    {
      "id": "kes_on_omanik",
      "title": "Kes on omanik?",
      "subtitle": "Enne tegevustega alustamist on vaja selgitada, kes on kuivendatud sooala omanik(ud).",
      "info": "<img align='right' src='assets/images/2v1.jpg' class='modalimg'><p>Üldiselt kuuluvad Eestis suuremad sooalad riigile. Sellisel juhul vastutab nende hooldamise ja kasutamise eest Riigimetsa Majandamise Keskus (RMK). Kui maa asub kaitsealal, tuleb kindlasti suhelda ka Keskkonnaametiga, kes on kaitseala valitseja. Kui aga tegemist on eramaaga, tuleb rääkida maaomanikuga. Vahel võib juhtuda, et maad kasutab rentnik (näiteks turbakaevanduse ettevõte) - sel juhul tuleb rääkida nii omaniku kui ka kasutajaga ehk rentnikuga.</p>",
      "special": false,
      "autoComm": true
    },
    {
      "id": "mis_on_lugu",
      "title": "Milline on ajalugu?",
      "subtitle": "Uurige vanu kaarte, pilte ja lugusid, et teada saada, milline oli kodulähedane sooala vanasti.",
      "info": "<img align='right' src='assets/images/3v1.jpg' class='modalimg'><p>Selleks, et paremini mõista, mis toimub maastikul praegu, on hea tunda selle koha ajalugu. Aastakümnete jooksul on inimesed muutnud maastikke väga palju. Kaevatud on kraave, rajatud teid ja hooneid. Neid muutusi ei saa eirata, sest vahepeal toimunu on mõjutanud nii taimestikku, loomastikku kui ka inimeste harjumusi ja ootusi. Soo lugu aitavad kokku panna vastused nendele küsimustele:</p><ul><li>millal ja kuhu kaevati kraavid?</li><li>kus oli enne kuivenduskraave lage ala ja kus kasvasid puud?</li><li>kus asusid taliteed või vanad rajad?</li><li>kas ja kui jah, siis kus asuvad selles soos inimeste jaoks olulised kohad (nt marjakohad, pelgupaigad)?</li></ul>",
      "special": false
    },
    {
      "id": "palju_raha",
      "title": "Kui palju on vaja raha?",
      "subtitle": "Koostage eelarve ja taotlege taastamistööde jaoks vajalik rahastus sobivatest fondidest.",
      "info": "<img align='right' src='assets/images/4v1.jpg' class='modalimg'><p>Kui maaomanikult on taastamisplaanidele esialgne nõusolek olemas, saab liikuda edasi järgmise sammuga - otsida taastamistööde jaoks rahastust. Kõige kallimad on projekteerimis- ja ehitustööd soos, mis maksavad 100-1000 eurot hektari kohta. Raha aga kulub ka uuringutele.</p><p>Tänapäeval tehakse enamik soode taastamistöid projektipõhiselt, mis tähendab, et tuleb järgida rahastusreegleid ja kinni pidada tähtaegadest.</p>",
      "special": false
    },
    {
      "id": "milline_praegu",
      "title": "Kes siin elavad?",
      "subtitle": "Tellige esmased uuringud taastatava ala loodusliku seisundi ja kultuuriloo kohta.",
      "info": "<img align='right' src='assets/images/5v1.jpg' class='modalimg'><p>Sageli küsitakse, kui kaugest ajast pärineva maastiku ilmet soovitakse taastada. Eesmärk ei olegi \"pöörata aega tagasi\". Eestis peetakse silmas ajavahemikku enne suuremahulisi kuivendustöid, mis toimusid alates 20. sajandi keskpaigast. Pärast seda muutus soomaastik kiiresti: kraave rajati palju ja sügavaid, mis mõjutas veetaset ja muutis sookooslused tundmatuseni.</p><p>Taastamise eesmärk on luua tingimused soo looduslikuks taastumiseks. Selleks on vaja teha mitmeid eeluuringuid ja välitöid. Näiteks käiakse läbi kõik kraavid, loendatakse liike, mõõdetakse veetaset ja hinnatakse koosluste seisundit.</p>",
      "special": false
    },
    {
      "id": "suhtlus",
      "title": "Mida inimesed arvavad?",
      "subtitle": "Tehke koostööd ja suhelge erinevate huvigruppidega, keda taastamistööd vahetult mõjutavad.",
      "info": "<img align='right' src='assets/images/6v1.jpg' class='modalimg'><p>Otsuse, kas üldse taastada või mitte, peaks üldjuhul tegema maaomanik. Samas tuleb taastamistööde juures arvestada paljude huvigruppide esindajate kogemuse, teadmiste ning arvamusega. Inimeste kaasamiseks on palju erinevaid viise - alates koosolekutest, küsitlusuuringutest, üks-ühele vestluste ja matkadeni, õppepäevadest talguteni, seminaridest veebihääletusteni.</p><p>Isegi kui kõik inimesed ei ole taastamise poolt, aitab suhtlemine välja selgitada nende soove, millega saab taastamistöödel arvestada - millised kraavid, teed, kohad maastikul on eriliselt olulised ja mille kasutusmugavus peaks säilima jmt).</p><p>Oluline on pidev suhtlus erinevate osapooltega kogu taastamistegevuse jooksul.</p><p>Pane see kaart noolte peale, et rõhutada, milliste sammude vahel on suhtlus eriti oluline. Saad seda rakendada mitme noole puhul.</p>",
      "special": true
    },
    {
      "id": "arvuti_mudel",
      "title": "Katseta virtuaalselt",
      "subtitle": "Koostage arvuti abil mudel, kuidas peaks soo taastumiseks vesi liikuma. Sealjuures ei tohi see mõjutada alasid, mis jäävad taastamisalast välja.",
      "info": "<img align='right' src='assets/images/7v1.jpg' class='modalimg'><p>Taastamisplaanides on vaja arvestada nii looduse kui ka inimeste vajadustega - vähemalt veerežiimi muutuse võib arvutis turvaliselt läbi mängida. Kõrgusmudelite abil saab näidata erinevate lahenduste mõju vee liikumisele ning plaanida taastamistööd võimalikult suure kasu ja väikese kahjuga. Lisaks kraavide täielikule sulgemisele saab ette näha ka veevoolu aeglustavaid lahendusi nagu ülevoolupaisud või sänge looduslikumaks kujundavaid voolusuunajaid.</p><p>Soo vajab taastumiseks veetaset, mis küündib maapinna lähedale. Samuti sõltub veetase sootüübist - lagesoodes on veetase kõrgemal kui soometsades. Suletud kraavide ümbruses ja muudes madalamates kohtades võivad tekkida väikesed madalad veekogud.</p>",
      "special": false
    },
    {
      "id": "taastamiskava",
      "title": "Taastamiskava koostamine",
      "subtitle": "Koostage kogutud andmete põhjal taastamiskava, mida saab hakata erinevate huvigruppidega läbi arutama.",
      "info": "<img align='right' src='assets/images/8v1.jpg' class='modalimg'><p>Taastamiskavas võetakse kokku seniste uurimistööde tulemused. Nende põhjal kujuneb parem ettekujutus, kus, mida ja kuidas muuta maastikus, et soo saaks hakata taastuma. Näiteks sisaldab taastamiskava ettepanekuid, milliste liikide elutingimusi soovitakse parandada, kus ja kuidas tõsta veetaset, millised sookooslused hakkavad taastamise järel kujunema või kuhu teha jalutusrada.</p>",
      "special": false,
      "autoComm": true
    },
    {
      "id": "ehitusprojekt",
      "title": "Ehitusprojekti tellimine",
      "subtitle": "Tellige taastamiskava põhjal töödele ehitusprojekt.",
      "info": "<img align='right' src='assets/images/9v1.jpg' class='modalimg'><p>Kui peale pikemaid või lühemaid aruteluringe on taastamiskava täiendatud, teevad insenerid uuringud ja koostavad ehitusprojekti, milles on kirjas, kuidas peavad paisud olema ehitatud. Samuti on vaja nuputada, kuidas ja kuhu pääseb ligi kopaga, aga kuhu vaid jalgsi - neid paise ei saa rajada masinate abil, vaid näiteks talgute korras käsitsi. Kui ehitusprojekt on valmis, tuleb see uuesti kooskõlastada erinevate osapooltega ja välja kuulutada taastamistööde hange.</p>",
      "special": false,
      "autoComm": true
    },
    {
      "id": "teoks_tegemine",
      "title": "Taastamistööd maastikul",
      "subtitle": "Ehitusprojekti põhjal rajatakse kraavidesse paisud.",
      "info": "<img align='right' src='assets/images/10v1.jpg' class='modalimg'><p>Põhiline taastamistegevus Eesti soodes on paisude rajamine kuivenduskraavidele, mida üldjuhul teevad sobivat tehnikat ja oskusi omavad ettevõtted. Väiksemaid töid saab teha ka talgute abil. Et masinad pääseksid õigetesse kohtadesse ligi, rajatakse neile liikumisteid ehk trasse, mille käigus püütakse võtta maha nii vähe puid, kui võimalik.</p><p>Paisu ehitamine näeb välja nagu hambaaugu parandus - esmalt puhastatakse kraavi põhi ja küljed mudast, taimedest ja nende juurtest ning ehitatakse ajutine veetõke, et paisu tegemise koht oleks ehitamise ajal korraks kuiv. Seejärel võtab kopp mitme meetri kauguselt turvast ning asetab kraavi põhja kuni pais on soovitud kõrgusega. Selleks, et vesi valguks kraavi süvendist ümbritsevale maapinnale, tehakse paisule kraavi pervele tiivad - pannakse kraavile justkui plaaster. Kõige lõpus kaetakse pais mätastega.</p>",
      "special": false,
      "autoComm": true
    },
    {
      "id": "jarelevalve",
      "title": "Mis saab edasi?",
      "subtitle": "Järgnevate aastate jooksul saab jälgida, kuidas soo hakkab taastuma.",
      "info": "<img align='right' src='assets/images/11v1.jpg' class='modalimg'><p>Mõne aasta jooksul kaovad maastikul taastamistööde jäljed ning ala võtab tasapisi soisema ilme. Uurimistööde käigus hinnatakse, kas näiteks soole iseloomulikud liigid on hakanud tagasi tulema, kuidas veetase aasta lõikes ühtlustub, kas vanadel turbakaevandusaladel kattub pinnas sootaimestikuga.</p><p>Väike osa kuivendamise järgselt kasvama hakanud puudest võivad hukkuda, kuid toitainete olemasolul tulevad asemele uued, kelle juurestik on kohanenud kõrge veetasemega. Osa metsa jääbki hõredam või tekivad ka lagedamad alad. Surnud puud pakuvad elupaika uutele liikidele, kes vajavadki lagupuitu. Ühtlasi väheneb üleujutuste oht, kuna soo hoiab ka sadudest tingitud liigvett paremini kinni. Tulekahju korral ei levi tuli märjas turbapinnases nii hõlpsasti. Taastuvat sood ja tema väärtusi saab näidata külalistele ja käia loomulikult nautimas eelkõige ise.</p>",
      "special": false
    }
  ],
  "validationRules": {
    "phases": [
      {
        "positions": [0],
        "oneOf": ["tahame_taastada", "mis_on_lugu"]
      },
      {
        "positions": [1, 2, 3, 4],
        "conditional": {
          "if": { "position": 0, "equals": "tahame_taastada" },
          "then": {
            "mustContainAll": ["kes_on_omanik", "mis_on_lugu", "palju_raha", "milline_praegu"],
            "anyOrder": true
          },
          "else": {
            "mustContainAll": ["tahame_taastada", "kes_on_omanik", "palju_raha", "milline_praegu"],
            "anyOrder": true
          }
        }
      },
      {
        "positions": [5, 6],
        "mustContainAll": ["arvuti_mudel", "taastamiskava"],
        "anyOrder": true
      },
      {
        "positions": [7],
        "mustBe": "ehitusprojekt"
      },
      {
        "positions": [8],
        "mustBe": "teoks_tegemine"
      },
      {
        "positions": [9],
        "mustBe": "jarelevalve"
      }
    ]
  },
  "feedback": {
    "correct": "Tundub, et oled soode taastamisega lähemalt kokku puutunud.",
    "partial": "Nuputa pisut veel, kas neid tegevusi on ikka võimalik teha sellises järjekorras.",
    "incorrect": "Proovi veel."
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
    previouslyComplete: false,
    hasInteracted: false,
    firstInteractionTime: null,
    lastFeedbackResult: null
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

  console.log('Script loaded');
  console.log('gameData:', gameData);
  
  setupPlaceholders();
  initializeGame();

  // Debug helper: expose test functions to console
  window.testGame = {
    // Place a card by id into a slot by index (0-based)
    placeCard: (cardId, slotIndex) => {
      const cardEntry = state.cards.get(cardId);
      if (!cardEntry) {
        console.error('Card not found:', cardId);
        return;
      }
      placeCardInSlot(cardEntry.node, slotIndex);
      checkCompletion();
    },
    // Place all cards in a specific order (array of card ids)
    placeAll: (cardIds) => {
      cardIds.forEach((id, index) => {
        if (id) window.testGame.placeCard(id, index);
      });
    },
    // Test correct order
    testCorrect: () => {
      window.testGame.placeAll([
        'tahame_taastada', 'kes_on_omanik', 'mis_on_lugu', 'palju_raha', 'milline_praegu',
        'arvuti_mudel', 'taastamiskava', 'ehitusprojekt', 'teoks_tegemine', 'jarelevalve'
      ]);
    },
    // Test with 1-2 mistakes (partial)
    testPartial: () => {
      window.testGame.placeAll([
        'tahame_taastada', 'kes_on_omanik', 'mis_on_lugu', 'palju_raha', 'milline_praegu',
        'taastamiskava', 'arvuti_mudel', 'teoks_tegemine', 'ehitusprojekt', 'jarelevalve'
      ]);
    },
    // Reset the game
    reset: () => resetGame(),
    // Trigger evaluation
    evaluate: () => evaluateSequence()
  };
  console.log('Test helpers available: testGame.testCorrect(), testGame.testPartial(), testGame.reset(), testGame.evaluate()');

  function setupPlaceholders() {
    console.log('setupPlaceholders called, placeholders:', placeholders.length);
    placeholders.forEach((slot, index) => {
      slot.dataset.label = `${index + 1}. samm`;
      slot.dataset.cardId = '';
      slot.classList.add('empty');
    });
  }

  function initializeGame() {
    console.log('initializeGame called');
    state.data = gameData;
    createCards(gameData.elements);
    resetInactivityTimer();
  }

  function createCards(elements) {
    console.log('createCards called with', elements.length, 'elements');
    cardsContainer.innerHTML = '';
    state.cards.clear();

    // Scatter cards randomly, avoiding overlap
    const cardCount = elements.length;
    const padding = 24;
    const containerW = Math.max(cardsContainer.clientWidth, 600);
    const containerH = Math.max(cardsContainer.clientHeight, 520);
    const cardW = 180;
    const cardH = 110;
    const minDist = 40; // Minimum distance between card centers
    const placed = [];
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

      // Try random positions, avoid overlap
      let tries = 0;
      let left, top, ok;
      do {
        left = Math.random() * (containerW - cardW - 2 * padding) + padding;
        top = Math.random() * (containerH - cardH - 2 * padding) + padding;
        ok = placed.every(([x, y]) => {
          const dx = x - left;
          const dy = y - top;
          return Math.sqrt(dx * dx + dy * dy) > cardW - minDist;
        });
        tries++;
      } while (!ok && tries < 50);
      placed.push([left, top]);
      card.style.left = `${left}px`;
      card.style.top = `${top}px`;
      card.style.position = 'absolute';
      storePoolPosition(card);
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
  // Mark that the user has interacted with the game
  if (!state.hasInteracted) {
    state.hasInteracted = true;
    state.firstInteractionTime = Date.now();
  }
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

  function returnCardToPool(card) {
    // Ensure card is moved to pool container with a random, non-overlapping position
    const padding = 24;
    const containerW = Math.max(cardsContainer.clientWidth, 600);
    const containerH = Math.max(cardsContainer.clientHeight, 520);
    const cardW = 180;
    const cardH = 110;
    const minDist = 40;
    
    // Get existing card positions in pool
    const placed = [];
    state.cards.forEach(({ node }) => {
      if (!node.dataset.slotIndex && node !== card) {
        const left = parseFloat(node.style.left || 0);
        const top = parseFloat(node.style.top || 0);
        placed.push([left, top]);
      }
    });
    
    // Find random position avoiding overlap
    let tries = 0;
    let left, top, ok;
    do {
      left = Math.random() * (containerW - cardW - 2 * padding) + padding;
      top = Math.random() * (containerH - cardH - 2 * padding) + padding;
      ok = placed.every(([x, y]) => {
        const dx = x - left;
        const dy = y - top;
        return Math.sqrt(dx * dx + dy * dy) > cardW - minDist;
      });
      tries++;
    } while (!ok && tries < 50);
    
    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
    card.style.position = 'absolute';
    card.style.width = '';
    card.style.height = '';
    card.style.margin = '';
    card.dataset.slotIndex = '';
    card.dataset.poolLeft = String(left);
    card.dataset.poolTop = String(top);
    cardsContainer.appendChild(card);
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
      state.hasInteracted = true;
      snapToPoolPosition(card);
      dropped = true;
    }

    if (!dropped) {
      // Check if drop happened inside the placeholder column
      const placeholderRect = placeholderColumn.getBoundingClientRect();
      if (
        clientX >= placeholderRect.left &&
        clientX <= placeholderRect.right &&
        clientY >= placeholderRect.top &&
        clientY <= placeholderRect.bottom
      ) {
        // Dropped in left column but not on valid slot/arrow - move to pool with random position
        returnCardToPool(card);
      } else {
        // Dropped elsewhere (pool or outside), snap to previous pool position
        storePoolPosition(card);
      }
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
    state.hasInteracted = true;
    resetInactivityTimer();
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
        // Auto-apply comm class if the card in first slot has autoComm enabled
        const cardId = first.dataset.cardId;
        const cardEntry = state.cards.get(cardId);
        if (cardEntry && cardEntry.element.autoComm && !arrow.classList.contains('comm')) {
          // Trigger flying animation before adding comm class
          animateSpecialCardToArrow(arrow, () => {
            arrow.classList.add('comm');
          });
        }
      } else {
        arrow.classList.remove('active');
        arrow.classList.remove('comm');
      }
    });
  }

  function animateSpecialCardToArrow(arrow, onComplete) {
    // Find the special card (suhtlus)
    const specialEntry = Array.from(state.cards.values()).find(
      (entry) => entry.element.special
    );
    if (!specialEntry) {
      onComplete();
      return;
    }

    const specialCard = specialEntry.node;
    const cardRect = specialCard.getBoundingClientRect();
    const arrowRect = arrow.getBoundingClientRect();

    // Create a clone for the animation
    const clone = specialCard.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.left = `${cardRect.left}px`;
    clone.style.top = `${cardRect.top}px`;
    clone.style.width = `${cardRect.width}px`;
    clone.style.height = `${cardRect.height}px`;
    clone.style.margin = '0';
    clone.style.zIndex = '9999';
    clone.style.pointerEvents = 'none';
    clone.style.transition = 'all 0.5s ease-in-out';
    clone.style.transformOrigin = 'center center';
    document.body.appendChild(clone);

    // Calculate target position (center of arrow)
    const targetX = arrowRect.left + arrowRect.width / 2 - cardRect.width / 2;
    const targetY = arrowRect.top + arrowRect.height / 2 - cardRect.height / 2;

    // Trigger animation on next frame
    requestAnimationFrame(() => {
      clone.style.left = `${targetX}px`;
      clone.style.top = `${targetY}px`;
      clone.style.transform = 'scale(0.1)';
      clone.style.opacity = '0.3';
    });

    // Clean up after animation
    clone.addEventListener('transitionend', function handler(e) {
      if (e.propertyName === 'transform') {
        clone.removeEventListener('transitionend', handler);
        clone.remove();
        onComplete();
      }
    });

    // Fallback in case transitionend doesn't fire
    setTimeout(() => {
      if (clone.parentNode) {
        clone.remove();
        onComplete();
      }
    }, 600);
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
    const { validationRules = {}, feedback = {} } = state.data;
    const phases = validationRules.phases || [];

    let mistakes = 0;

    // Validate each phase
    phases.forEach((phase) => {
      const { positions, oneOf, mustBe, mustContainAll, anyOrder, conditional } = phase;

      if (oneOf) {
        // Each position must have one of the allowed values
        positions.forEach((pos) => {
          if (!oneOf.includes(ids[pos])) {
            mistakes++;
          }
        });
      } else if (mustBe) {
        // Single position must be exact value
        positions.forEach((pos) => {
          if (ids[pos] !== mustBe) {
            mistakes++;
          }
        });
      } else if (mustContainAll) {
        // Positions must contain all specified values (in any order if anyOrder is true)
        const slotValues = positions.map((pos) => ids[pos]);
        mustContainAll.forEach((required) => {
          if (!slotValues.includes(required)) {
            mistakes++;
          }
        });
      } else if (conditional) {
        // Conditional validation based on another position
        const conditionMet = ids[conditional.if.position] === conditional.if.equals;
        const rule = conditionMet ? conditional.then : conditional.else;
        if (rule.mustContainAll) {
          const slotValues = positions.map((pos) => ids[pos]);
          rule.mustContainAll.forEach((required) => {
            if (!slotValues.includes(required)) {
              mistakes++;
            }
          });
        }
      }
    });

    let result;
    let message;

    if (mistakes === 0) {
      result = 'correct';
      message = feedback.correct || 'Correct!';
    } else if (mistakes <= 2) {
      result = 'partial';
      message = feedback.partial || 'Almost there, a few steps are out of place.';
    } else {
      result = 'incorrect';
      message = feedback.incorrect || 'Please try again.';
    }

    feedbackMessageEl.textContent = message;
    openModal(feedbackModal);

    // Store result and send log
    state.lastFeedbackResult = result;
    sendLog('confirm');
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

    // Scatter all cards randomly, avoiding overlap
    const cardCount = state.cards.size;
    const padding = 24;
    const containerW = Math.max(cardsContainer.clientWidth, 600);
    const containerH = Math.max(cardsContainer.clientHeight, 520);
    const cardW = 180;
    const cardH = 110;
    const minDist = 40;
    const placed = [];
    let i = 0;
    state.cards.forEach(({ node }) => {
      let tries = 0;
      let left, top, ok;
      do {
        left = Math.random() * (containerW - cardW - 2 * padding) + padding;
        top = Math.random() * (containerH - cardH - 2 * padding) + padding;
        ok = placed.every(([x, y]) => {
          const dx = x - left;
          const dy = y - top;
          return Math.sqrt(dx * dx + dy * dy) > cardW - minDist;
        });
        tries++;
      } while (!ok && tries < 50);
      placed.push([left, top]);
      node.style.left = `${left}px`;
      node.style.top = `${top}px`;
      node.style.position = 'absolute';
      storePoolPosition(node);
      i++;
    });

    confirmBtn.disabled = true;
    state.previouslyComplete = false;
    state.hasInteracted = false;
    state.firstInteractionTime = null;
    state.lastFeedbackResult = null;
    registerActivity();
  }

  function registerActivity() {
    resetInactivityTimer();
  }

  function resetInactivityTimer() {
    clearTimeout(state.inactivityTimer);
    if (state.inactivityModalOpen) return;
    // Do not schedule inactivity prompts until the user has interacted
    if (!state.hasInteracted) {
      return;
    }
    state.inactivityTimer = setTimeout(() => {
      showInactivityModal();
    }, 60000);
  }

  function showInactivityModal() {
    state.inactivityTimer = null;
    // If no interactions have happened since start/reset, do not show or auto-reset
    if (!state.hasInteracted) {
      return;
    }
    openModal(inactivityModal);
    state.inactivityGraceTimer = setTimeout(() => {
      closeModal(inactivityModal);
      state.inactivityModalOpen = false;
      // Log abandoned session before reset
      sendLog('inactivity_reset');
      resetGame();
      state.inactivityGraceTimer = null;
    }, 10000);
  }

  // ============ LOGGING FUNCTION ============
  function sendLog(trigger) {
    if (!loggingConfig.enabled) return;
    if (!navigator.onLine) return;
    if (!state.hasInteracted) return;

    const now = Date.now();
    const usageTimeSeconds = state.firstInteractionTime 
      ? Math.round((now - state.firstInteractionTime) / 1000)
      : 0;

    const slotIds = placeholders.map((slot) => slot.dataset.cardId || '');

    const payload = {
      datetime: new Date().toISOString(),
      trigger: trigger,  // 'confirm' or 'inactivity_reset'
      feedbackResult: state.lastFeedbackResult || 'none',
      slotIds: slotIds,
      usageTimeSeconds: usageTimeSeconds
    };

    // Fire and forget - don't wait for response, don't show errors
    fetch(loggingConfig.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true  // Ensure request completes even if page unloads
    }).catch(() => {
      // Silently ignore any errors
    });
  }
  // ==========================================
})();
