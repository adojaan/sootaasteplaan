(() => {
  // ============ LOGGING CONFIGURATION ============
  const loggingConfig = {
    enabled: true,  // Set to false to disable logging
    endpoint: 'https://sootaasteplaan.metsamang.natmuseum.ut.ee/log.php',  // URL of your PHP logging script (legacy)
    dropLogEndpoint: 'https://sootaasteplaan.metsamang.natmuseum.ut.ee/droplog.php'  // URL for new drop logging
  };
  // ================================================

  // ============ KIOSK MODE CONFIGURATION ============
  const kioskConfig = {
    enabled: true,  // Set to false to disable kiosk protections
    backdoorHoldTime: 3000  // Hold reset button for 3 seconds to exit kiosk
  };
  // ==================================================

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
      "title": "Ära unusta mõttevahetust!",
      "subtitle": "Suhelge ja tehke koostööd erinevate huvigruppidega, keda taastamistööd vahetult mõjutavad.",
      "info": "<img align='right' src='assets/images/6v1.jpg' class='modalimg'><p>Taastamistööde juures tuleb arvestada paljude huvigruppide kogemuste, teadmiste ning arvamustega. Kaasamiseks on palju erinevaid viise – alates koosolekutest, küsitlusuuringutest, üks-ühele vestluste ja matkadeni, õppepäevadest talguteni, seminaridest veebihääletusteni. Isegi kui kõik ei ole taastamise poolt, aitab suhtlemine välja selgitada erinevaid soove ja vajadusi, millega taastamistöödel arvestada, näiteks millised kraavid, teed ja kohad maastikul on eriliselt olulised ning mille senine kasutusviis peaks säilima. Oluline on pidev suhtlus erinevate osapooltega kogu taastamistegevuse jooksul. </p>",
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
    "incorrect": "Proovi veel.",
    "wrongDrop": [
      "Kisub väheke rappa",
      "Uups! See läks veidi metsa",
      "Mitte päris nii…",
      "Proovi uuesti!"
    ]
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
    lastFeedbackResult: null,
    screensaverInterval: null,
    gameCompleted: false,
    welcomeInactivityTimer: null,
    // Drop tracking for statistics
    dropLog: [],         // Array of {card, slot, result, fromSlot} objects
    totalDrops: 0,       // All drop attempts on slots (correct + incorrect)
    correctDrops: 0,     // Drops that were validated as correct
    incorrectDrops: 0,   // Drops that were validated as incorrect
    failedDrops: 0       // Drops in placeholder column that missed slots
  };

  const infoModal = document.getElementById('info-modal');
  const confirmModal = document.getElementById('confirm-modal');
  const feedbackModal = document.getElementById('feedback-modal');
  const inactivityModal = document.getElementById('inactivity-modal');
  const resetModal = document.getElementById('reset-modal');
  const feedbackToast = document.getElementById('feedback-toast');

  // Screensaver elements
  const screensaver = document.getElementById('screensaver');
  const screensaverTitle = document.getElementById('screensaver-title');

  // Welcome / start screen
  const welcomeScreen = document.getElementById('welcome-screen');
  const startBtn = document.getElementById('start-btn');

  const infoTitleEl = document.getElementById('info-modal-title');
  const infoSubtitleEl = document.getElementById('info-modal-subtitle');
  const infoBodyEl = document.getElementById('info-modal-body');
  const feedbackMessageEl = document.getElementById('feedback-message');

  document.getElementById('confirm-order').addEventListener('click', () => {
    closeModal(confirmModal);
    // Submit statistics and show the communication modal
    sendLog('confirm');
    sendDropLog('confirm');
    showCompletionModalAndAnimateArrows(() => {
      // Callback no longer used - modal stays open until button click
    });
  });

  document
    .getElementById('feedback-restart')
    .addEventListener('click', () => {
      closeModal(feedbackModal);
      resetGame();
    });

  // Handler for "Tagasi algusse" button in completion modal (info-modal)
  document
    .getElementById('info-restart')
    .addEventListener('click', () => {
      // resetGame() will handle sending statistics if completionModalOpen is true
      // Just call resetGame which handles everything
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

  // Reset button: click opens reset modal, long-press is secret backdoor to exit kiosk
  const resetBtn = document.getElementById('reset-btn');
  let resetBtnBackdoorTimer = null;
  resetBtn.addEventListener('pointerdown', (e) => {
    if (kioskConfig.enabled) {
      resetBtnBackdoorTimer = setTimeout(async () => {
        if (confirm('Väljuda kioskirežiimist? / Exit kiosk mode?')) {
          // Exit fullscreen first, then navigate away
          if (document.fullscreenElement) {
            try {
              await document.exitFullscreen();
            } catch (_) {}
          }
          // Small delay to ensure fullscreen exit completes
          setTimeout(() => {
            window.open('about:blank', '_self');
          }, 100);
        }
      }, kioskConfig.backdoorHoldTime);
    }
  });
  resetBtn.addEventListener('pointerup', () => {
    if (resetBtnBackdoorTimer) {
      clearTimeout(resetBtnBackdoorTimer);
      resetBtnBackdoorTimer = null;
    }
  });
  resetBtn.addEventListener('pointercancel', () => clearTimeout(resetBtnBackdoorTimer));
  resetBtn.addEventListener('pointerleave', () => clearTimeout(resetBtnBackdoorTimer));
  resetBtn.addEventListener('click', () => {
    openModal(resetModal);
  });

  document.getElementById('reset-confirm').addEventListener('click', () => {
    closeModal(resetModal);
    resetGame();
  });

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (!confirmBtn.disabled) {
        openModal(confirmModal);
      }
    });
  }

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
      resetWelcomeInactivityIfOnWelcome();
      dismissScreensaver();
    },
    true
  );
  document.addEventListener(
    'keydown',
    () => {
      registerActivity();
      resetWelcomeInactivityIfOnWelcome();
      dismissScreensaver();
    },
    true
  );
  
  // Dismiss screensaver on mouse movement, but only after a short delay
  // to prevent accidental dismissal on page load
  let screensaverReady = false;
  setTimeout(() => {
    screensaverReady = true;
  }, 500);
  
  document.addEventListener(
    'mousemove',
    () => {
      if (screensaverReady) {
        dismissScreensaver();
        resetWelcomeInactivityIfOnWelcome();
      }
    },
    true
  );

  // Helper to reset welcome inactivity timer if user is on welcome screen
  function resetWelcomeInactivityIfOnWelcome() {
    if (welcomeScreen && welcomeScreen.getAttribute('aria-hidden') === 'false') {
      startWelcomeInactivityTimer();
    }
  }

  console.log('Script loaded');
  console.log('gameData:', gameData);

  setupPlaceholders();
  // Hide interactive parts of the game until user starts (keep background visible)
  document.getElementById('cards-container').classList.add('hidden');
  document.getElementById('placeholder-column').classList.add('hidden');

  // ============ SCREENSAVER FUNCTIONS ============
  function initScreensaver() {
    screensaver.setAttribute('aria-hidden', 'false');
    screensaver.style.display = 'flex';
    positionScreensaverTitle();
    // Change position every 10 seconds
    state.screensaverInterval = setInterval(() => {
      fadeAndRepositionTitle();
    }, 10000);
  }

  function positionScreensaverTitle() {
    const padding = 50;
    const maxX = window.innerWidth - screensaverTitle.offsetWidth - padding;
    const maxY = window.innerHeight - screensaverTitle.offsetHeight - padding;
    const x = Math.random() * Math.max(maxX, padding) + padding / 2;
    const y = Math.random() * Math.max(maxY, padding) + padding / 2;
    screensaverTitle.style.left = `${x}px`;
    screensaverTitle.style.top = `${y}px`;
  }

  function fadeAndRepositionTitle() {
    screensaverTitle.classList.add('fade-out');
    setTimeout(() => {
      positionScreensaverTitle();
      screensaverTitle.classList.remove('fade-out');
    }, 1000); // Wait for fade out, then reposition and fade in
  }

  function dismissScreensaver() {
    if (screensaver.getAttribute('aria-hidden') === 'true') return;
    clearInterval(state.screensaverInterval);
    state.screensaverInterval = null;
    screensaver.setAttribute('aria-hidden', 'true');
    screensaver.style.display = 'none';
    showWelcome();
  }

  function showScreensaver() {
    // Clear welcome inactivity timer if running
    clearWelcomeInactivityTimer();
    // Hide welcome screen if visible
    if (welcomeScreen) {
      welcomeScreen.setAttribute('aria-hidden', 'true');
      welcomeScreen.style.display = 'none';
    }
    // Hide game areas
    document.getElementById('cards-container').classList.add('hidden');
    document.getElementById('placeholder-column').classList.add('hidden');
    initScreensaver();
  }
  // ================================================

  // Show welcome screen until user clicks Alusta
  function hideWelcome() {
    clearWelcomeInactivityTimer();
    if (welcomeScreen) {
      welcomeScreen.setAttribute('aria-hidden', 'true');
      welcomeScreen.style.display = 'none';
    }
    // Reveal interactive areas (keep game container visible so background shows)
    document.getElementById('cards-container').classList.remove('hidden');
    document.getElementById('placeholder-column').classList.remove('hidden');
  }

  function showWelcome() {
    if (welcomeScreen) {
      welcomeScreen.setAttribute('aria-hidden', 'false');
      welcomeScreen.style.display = 'flex';
    }
    // Hide interactive areas but keep the main container (and its background) visible
    document.getElementById('cards-container').classList.add('hidden');
    document.getElementById('placeholder-column').classList.add('hidden');
    // Start welcome screen inactivity timer - return to screensaver after 60 seconds
    startWelcomeInactivityTimer();
  }

  function startWelcomeInactivityTimer() {
    clearTimeout(state.welcomeInactivityTimer);
    state.welcomeInactivityTimer = setTimeout(() => {
      // If still on welcome screen, go back to screensaver
      if (welcomeScreen && welcomeScreen.getAttribute('aria-hidden') === 'false') {
        showScreensaver();
      }
    }, 60000); // 60 seconds
  }

  function clearWelcomeInactivityTimer() {
    clearTimeout(state.welcomeInactivityTimer);
    state.welcomeInactivityTimer = null;
  }

  // Initialize screensaver on page load
  initScreensaver();

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      hideWelcome();
      initializeGame();
    });
  } else {
    // Fallback: if no start button, initialize immediately
    initializeGame();
  }

  // Debug helper: expose test functions to console
  window.testGame = {
    // Place a card by id into a slot by index (0-based) - bypasses validation for testing only
    placeCard: (cardId, slotIndex) => {
      const cardEntry = state.cards.get(cardId);
      if (!cardEntry) {
        console.error('Card not found:', cardId);
        return false;
      }
      placeCardInSlot(cardEntry.node, slotIndex);
      return true;
    },
    // Test correct order - places all cards in correct positions sequentially
    testCorrect: () => {
      const correctOrder = [
        'tahame_taastada', 'kes_on_omanik', 'mis_on_lugu', 'palju_raha', 'milline_praegu',
        'arvuti_mudel', 'taastamiskava', 'ehitusprojekt', 'teoks_tegemine', 'jarelevalve'
      ];
      correctOrder.forEach((id, index) => {
        window.testGame.placeCard(id, index);
        // Also log the drop for testing
        logDrop(id, index, 'correct', null);
      });
      // Trigger completion check after all cards placed
      checkCompletion();
    },
    // Reset the game
    reset: () => resetGame(),
    // Show screensaver
    showScreensaver: () => showScreensaver(),
    // Trigger final animation manually (for testing)
    triggerFinalAnimation: () => {
      animateSpecialCardToAllArrows(() => {
        console.log('Final animation complete');
        sendLog('confirm');
        sendDropLog('confirm');
        // feedbackMessageEl.textContent = state.data.feedback.correct || 'Correct!';
        openModal(feedbackModal);
      });
    },
    // Get current slot contents
    getSlots: () => {
      return placeholders.map((slot, i) => ({ index: i, cardId: slot.dataset.cardId || null }));
    }
  };
  console.log('Test helpers: testGame.testCorrect(), testGame.reset(), testGame.showScreensaver(), testGame.triggerFinalAnimation(), testGame.getSlots()');

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

    // Filter out special card - it will only be shown as modal on completion
    const visibleElements = elements.filter(element => !element.special);
    
    // Store special card data for later use in completion animation
    const specialElement = elements.find(element => element.special);
    if (specialElement) {
      state.specialCardData = specialElement;
    }

    // Scatter cards randomly, avoiding overlap
    const cardCount = visibleElements.length;
    const padding = 24;
    const containerW = Math.max(cardsContainer.clientWidth, 600);
    const containerH = Math.max(cardsContainer.clientHeight, 520);
    const cardW = 180;
    const cardH = 110;
    const minDist = 40; // Minimum distance between card centers
    const placed = [];
    visibleElements.forEach((element) => {
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
    const cardId = card.dataset.id;

    // Determine target at the moment of drop
    const path = document.elementsFromPoint(clientX, clientY);
    const slotTarget = path.find((el) => el.classList && el.classList.contains('placeholder-slot'));
    const arrowTarget = path.find((el) => el.classList && el.classList.contains('arrow-indicator'));
    // Do NOT clear positioning yet; we need the fixed rect for accurate pool placement.
    card.classList.remove('dragging');
    card.style.pointerEvents = '';

    let dropped = false;

    // Special card cannot be dropped anywhere - it animates automatically after completion
    if (isSpecial) {
      snapToPoolPosition(card);
      dropped = true;
    } else if (slotTarget) {
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
            // Validate both positions after swap - tracking happens inside validateDropPosition
            validateDropPosition(card, targetIndex, originSlotIndex);
            validateDropPosition(occupant, originSlotIndex, targetIndex);
          }
        } else {
          // Temporarily place card to validate
          placeCardInSlot(card, targetIndex);
          dropped = true;
          // Validate this drop - if wrong, card will be returned to pool
          // Tracking happens inside validateDropPosition
          validateDropPosition(card, targetIndex, originSlotIndex);
        }
      }
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
        // Dropped in left column but not on valid slot/arrow - this is a FAILED drop
        // Log the failed drop attempt
        logDrop(cardId, null, 'fail', originSlotIndex);
        returnCardToPool(card);
      } else {
        // Dropped elsewhere (pool or outside), snap to previous pool position
        // This is not a failed drop - user just moved card within the pool
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

  // Validate if a card is in a correct position according to validation rules
  // fromSlot: the slot the card came from (null if from pool)
  function validateDropPosition(card, slotIndex, fromSlot = null) {
    if (!state.data) return true;
    
    const ids = placeholders.map((slot) => slot.dataset.cardId);
    const cardId = card.dataset.id;
    const { validationRules = {} } = state.data;
    const phases = validationRules.phases || [];

    let isValid = true;

    // Helper: get the conditional phase to check branch commitment
    const conditionalPhase = phases.find(p => p.conditional);
    const oneOfPhase = phases.find(p => p.oneOf);
    
    // Helper: determine which branch is committed based on cards in conditional positions
    // excludeSlot: slot to ignore (used when the card is already placed there during validation)
    function getCommittedBranch(excludeSlot = null) {
      if (!conditionalPhase || !oneOfPhase) return null;
      const conditionalPositions = conditionalPhase.positions;
      const oneOfCards = oneOfPhase.oneOf; // ["tahame_taastada", "mis_on_lugu"]
      
      for (const pos of conditionalPositions) {
        if (pos === excludeSlot) continue; // Skip the slot we're currently validating
        const cardInPos = ids[pos];
        if (oneOfCards.includes(cardInPos)) {
          // One of the "oneOf" cards is in positions 1-4, this commits us to a branch
          // If "tahame_taastada" is in 1-4, position 0 must be "mis_on_lugu" (else branch)
          // If "mis_on_lugu" is in 1-4, position 0 must be "tahame_taastada" (then branch)
          return cardInPos === conditionalPhase.conditional.if.equals ? 'else' : 'then';
        }
      }
      return null; // No commitment yet
    }

    // Find which phase this slot belongs to
    for (const phase of phases) {
      const { positions, oneOf, mustBe, mustContainAll, anyOrder, conditional } = phase;

      if (!positions.includes(slotIndex)) continue;

      if (oneOf) {
        // Position must have one of the allowed values
        if (!oneOf.includes(cardId)) {
          isValid = false;
        } else {
          // Also check if we're committed to a specific branch based on cards in slots 1-4
          // Don't exclude any slot here since we're validating slot 0
          const committedBranch = getCommittedBranch();
          if (committedBranch) {
            // We're committed - only one of the oneOf values is valid now
            if (conditionalPhase) {
              const requiredForThen = conditionalPhase.conditional.if.equals; // "tahame_taastada"
              if (committedBranch === 'then' && cardId !== requiredForThen) {
                isValid = false;
              } else if (committedBranch === 'else' && cardId === requiredForThen) {
                isValid = false;
              }
            }
          }
        }
      } else if (mustBe) {
        // Single position must be exact value
        if (cardId !== mustBe) {
          isValid = false;
        }
      } else if (mustContainAll && anyOrder) {
        // For anyOrder positions, check if this card is one of the allowed ones
        if (!mustContainAll.includes(cardId)) {
          isValid = false;
        }
      } else if (conditional) {
        // IMPORTANT: If placing a oneOf card in slots 1-4, check that another oneOf card isn't already there
        if (oneOfPhase && oneOfPhase.oneOf.includes(cardId)) {
          // This card belongs in slot 0, but user is trying to put it in slots 1-4
          // Check if another oneOf card is already in slots 1-4 (exclude current slot)
          const committedBranch = getCommittedBranch(slotIndex);
          if (committedBranch !== null) {
            // Another oneOf card is already in slots 1-4 - can't place this one here too!
            isValid = false;
          }
        }
        
        if (isValid) {
          // Conditional validation based on another position
          const conditionMet = ids[conditional.if.position] === conditional.if.equals;
          const rule = conditionMet ? conditional.then : conditional.else;
          
          // If we're validating a slot that depends on position 0, and position 0 is not filled yet,
          // we need to check what's already in slots 1-4 to determine which branch is valid
          if (ids[conditional.if.position] === '' || ids[conditional.if.position] === undefined) {
            // Position 0 not filled - check which branch we might be committed to
            // Exclude current slot since the card is already placed there
            const committedBranch = getCommittedBranch(slotIndex);
            
            if (committedBranch === 'then') {
              // Committed to "then" branch - only allow cards from that branch
              if (!conditional.then.mustContainAll.includes(cardId)) {
                isValid = false;
              }
            } else if (committedBranch === 'else') {
              // Committed to "else" branch - only allow cards from that branch
              if (!conditional.else.mustContainAll.includes(cardId)) {
                isValid = false;
              }
            } else {
              // Not committed yet - allow cards from either branch
              const validInThen = conditional.then.mustContainAll.includes(cardId);
              const validInElse = conditional.else.mustContainAll.includes(cardId);
              if (!validInThen && !validInElse) {
                isValid = false;
              }
            }
          } else if (rule.mustContainAll) {
            // Check if card is in the allowed list for current condition
            if (!rule.mustContainAll.includes(cardId)) {
              isValid = false;
            }
          }
        }
      }
      break; // Found the phase for this slot
    }

    // Log the drop attempt (correct or incorrect)
    const result = isValid ? 'correct' : 'incorrect';
    logDrop(cardId, slotIndex, result, fromSlot);

    if (!isValid) {
      // Wrong position - show feedback
      showWrongDropFeedback(card, slotIndex);
    }

    return isValid;
  }

  // Log a drop attempt for statistics
  function logDrop(cardId, slot, result, fromSlot) {
    // Track the drop
    state.dropLog.push({
      card: cardId,
      slot: slot,
      result: result,
      fromSlot: fromSlot
    });
    
    // Update counters
    if (result === 'correct') {
      state.totalDrops++;
      state.correctDrops++;
    } else if (result === 'incorrect') {
      state.totalDrops++;
      state.incorrectDrops++;
    } else if (result === 'fail') {
      state.failedDrops++;
    }
  }

  function showWrongDropFeedback(card, slotIndex) {
    const slot = placeholders[slotIndex];
    
    // Add red border to slot - will be removed after card animation completes
    slot.classList.add('wrong-blink');

    // Remove card from slot data immediately
    removeCardFromSlot(card, slotIndex);
    
    // Animate card back to pool
    animateCardBackToPool(card, () => {
      // Remove red border after card has returned to pool
      slot.classList.remove('wrong-blink');
    });

    // Show toast with random feedback message
    const feedbackMessages = state.data.feedback.wrongDrop || [
      "Kisub väheke rappa",
      "Uups! See läks veidi metsa", 
      "Mitte päris nii…",
      "Proovi uuesti!"
    ];
    const randomMessage = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
    showToast(randomMessage);
  }

  function animateCardBackToPool(card, onComplete) {
    // Get current position of card in slot
    const startRect = card.getBoundingClientRect();
    
    // Calculate target position in pool (random position avoiding overlap)
    const padding = 24;
    const containerRect = cardsContainer.getBoundingClientRect();
    const containerW = Math.max(containerRect.width, 600);
    const containerH = Math.max(containerRect.height, 520);
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
    let targetLeft, targetTop, ok;
    do {
      targetLeft = Math.random() * (containerW - cardW - 2 * padding) + padding;
      targetTop = Math.random() * (containerH - cardH - 2 * padding) + padding;
      ok = placed.every(([x, y]) => {
        const dx = x - targetLeft;
        const dy = y - targetTop;
        return Math.sqrt(dx * dx + dy * dy) > cardW - minDist;
      });
      tries++;
    } while (!ok && tries < 50);
    
    // Move card to body for animation
    card.style.position = 'fixed';
    card.style.left = `${startRect.left}px`;
    card.style.top = `${startRect.top}px`;
    card.style.width = `${startRect.width}px`;
    card.style.height = `${startRect.height}px`;
    card.style.margin = '0';
    card.style.zIndex = '9999';
    card.style.transition = 'left 0.5s ease-out, top 0.5s ease-out, width 0.5s ease-out, height 0.5s ease-out';
    document.body.appendChild(card);
    
    // Calculate absolute target position
    const targetX = containerRect.left + targetLeft;
    const targetY = containerRect.top + targetTop;
    
    // Force reflow
    card.getBoundingClientRect();
    
    // Animate to target
    requestAnimationFrame(() => {
      card.style.left = `${targetX}px`;
      card.style.top = `${targetY}px`;
      card.style.width = '';
      card.style.height = '';
    });
    
    // After animation, finalize card position in pool
    setTimeout(() => {
      card.style.transition = '';
      card.style.position = 'absolute';
      card.style.left = `${targetLeft}px`;
      card.style.top = `${targetTop}px`;
      card.style.zIndex = '';
      card.style.margin = '';
      card.dataset.slotIndex = '';
      card.dataset.poolLeft = String(targetLeft);
      card.dataset.poolTop = String(targetTop);
      cardsContainer.appendChild(card);
      
      if (onComplete) onComplete();
    }, 550);
  }

  function showToast(message) {
    feedbackToast.textContent = message;
    feedbackToast.classList.add('visible');
    feedbackToast.setAttribute('aria-hidden', 'false');
    
    setTimeout(() => {
      feedbackToast.classList.remove('visible');
      feedbackToast.setAttribute('aria-hidden', 'true');
    }, 3500);
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

    // Special card cannot be dropped on arrows anymore - it animates automatically after completion
    if (card.dataset.special === 'true') {
      // No highlighting for special card
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
        // No longer auto-apply comm class - will be done in final animation
      } else {
        arrow.classList.remove('active');
        arrow.classList.remove('comm');
      }
    });
  }

  function showCompletionModalAndAnimateArrows(onComplete) {
    // Get the special card data (communication card)
    const specialElement = state.specialCardData;
    if (!specialElement) {
      onComplete();
      return;
    }

    // Show the info modal with special card content
    infoTitleEl.textContent = specialElement.title;
    infoSubtitleEl.textContent = specialElement.subtitle;
    infoBodyEl.innerHTML = specialElement.info;
    
    // Show the restart button in info modal for completion
    const infoModalActions = document.getElementById('info-modal-actions');
    if (infoModalActions) {
      infoModalActions.style.display = 'flex';
    }
    
    // Hide the close button during completion
    const closeBtn = infoModal.querySelector('.close-btn');
    if (closeBtn) {
      closeBtn.style.display = 'none';
    }
    
    openModal(infoModal);
    
    // Store that this is completion modal (so we can close it on reset)
    state.completionModalOpen = true;
    
    // Store the completion callback for later use
    state.completionCallback = onComplete;

    // Apply comm class to all active arrows immediately (no flying animation)
    const activeArrows = arrows.filter(arrow => arrow.classList.contains('active'));
    activeArrows.forEach((arrow) => {
      arrow.classList.add('comm');
    });

    /* COMMENTED OUT: Flying arrow animation - may restore later
    // After 4 seconds of displaying the modal, start the arrow animation
    setTimeout(() => {
      // Get the modal position for arrow origin
      const modalContent = infoModal.querySelector('.modal-content');
      const modalRect = modalContent.getBoundingClientRect();
      const modalCenterX = modalRect.left + modalRect.width / 2;
      const modalBottom = modalRect.bottom;

      // Get all active arrows (arrows between filled slots)
      const activeArrows = arrows.filter(arrow => arrow.classList.contains('active'));

      // Create animated arrows for each target
      activeArrows.forEach((targetArrow, index) => {
        const arrowRect = targetArrow.getBoundingClientRect();
        
        // Create a simple downward arrow element
        const animatedArrow = document.createElement('div');
        animatedArrow.className = 'flying-arrow';
        animatedArrow.innerHTML = '↓';
        animatedArrow.style.position = 'fixed';
        animatedArrow.style.left = `${modalCenterX - 15}px`;
        animatedArrow.style.top = `${modalBottom + 10}px`;
        animatedArrow.style.fontSize = '30px';
        animatedArrow.style.color = '#e67e22';
        animatedArrow.style.fontWeight = 'bold';
        animatedArrow.style.zIndex = '10000';
        animatedArrow.style.pointerEvents = 'none';
        animatedArrow.style.opacity = '1';
        animatedArrow.style.transition = 'left 1.2s ease-in-out, top 1.2s ease-in-out, opacity 0.3s ease-in-out';
        animatedArrow.style.willChange = 'left, top, opacity';
        animatedArrow.style.textShadow = '0 2px 4px rgba(0,0,0,0.3)';
        document.body.appendChild(animatedArrow);

        // Force reflow
        animatedArrow.getBoundingClientRect();

        // Calculate target position (center of the arrow indicator)
        const targetX = arrowRect.left + arrowRect.width / 2 - 15;
        const targetY = arrowRect.top + arrowRect.height / 2 - 15;

        // Animate to arrow with slight delay based on index for visual effect
        setTimeout(() => {
          animatedArrow.style.left = `${targetX}px`;
          animatedArrow.style.top = `${targetY}px`;
        }, index * 100);

        // Apply comm class to arrow and remove animated element after animation
        setTimeout(() => {
          targetArrow.classList.add('comm');
          animatedArrow.style.opacity = '0';
        }, 1400 + index * 100);

        // Remove the element after fade out
        setTimeout(() => {
          animatedArrow.remove();
        }, 1700 + index * 100);
      });

      // Close the modal and call completion callback after all animations done
      setTimeout(() => {
        closeModal(infoModal);
        state.completionModalOpen = false;
        onComplete();
      }, 2000 + activeArrows.length * 100);
      
    }, 4000); // 4 seconds of displaying modal before animation
    */
    
    // Modal stays open - user must click "Tagasi algusse" button or inactivity reset
  }

  // Keep old function names for backwards compatibility
  function animateSpecialCardToAllArrows(onComplete) {
    showCompletionModalAndAnimateArrows(onComplete);
  }

  // Keep old function for backwards compatibility but redirect to new one
  function animateSpecialCardToArrow(arrow, onComplete) {
    // This function is no longer used for individual arrows
    // Kept for backwards compatibility
    onComplete();
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
    
    // Don't show confirm button - we validate each drop now
    if (confirmBtn) confirmBtn.style.display = 'none';

    if (allFilled && !state.gameCompleted) {
      // All slots are filled - since we validate each drop, if we get here all are correct
      state.gameCompleted = true;
      state.lastFeedbackResult = 'correct';
      
      // Show the "Valmis!" confirm modal first, let user review their order
      // Statistics will be sent when user clicks "Kinnita" button
      setTimeout(() => {
        openModal(confirmModal);
      }, 500);
    }

    if (!allFilled) {
      state.gameCompleted = false;
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
    sendDropLog('confirm');
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
    // Stats are now sent when user clicks "Kinnita" button, not here
    // Only send on inactivity reset if game was completed but not yet confirmed
    // (This case is handled by inactivity modal logic, not here)
    
    closeModal(confirmModal);
    closeModal(feedbackModal);
    closeModal(inactivityModal);
    closeModal(resetModal);
    closeModal(infoModal); // Close info modal if open (e.g., during completion animation)
    
    // Reset info modal state (hide restart button, show close button)
    const infoModalActions = document.getElementById('info-modal-actions');
    if (infoModalActions) {
      infoModalActions.style.display = 'none';
    }
    const closeBtn = infoModal.querySelector('.close-btn');
    if (closeBtn) {
      closeBtn.style.display = '';
    }
    
    state.completionModalOpen = false; // Reset completion modal state
    clearTimeout(state.inactivityGraceTimer);
    state.inactivityGraceTimer = null;
    
    // Remove any flying arrows that might be in progress
    document.querySelectorAll('.flying-arrow').forEach(arrow => arrow.remove());

    placeholders.forEach((slot, index) => {
      const card = slot.querySelector('.card');
      if (card) {
        slot.removeChild(card);
        cardsContainer.appendChild(card);
        card.dataset.slotIndex = '';
        card.style.visibility = 'visible'; // Ensure card is visible
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

    if (confirmBtn) confirmBtn.disabled = true;
    state.previouslyComplete = false;
    state.hasInteracted = false;
    state.firstInteractionTime = null;
    state.lastFeedbackResult = null;
    state.gameCompleted = false;
    // Reset drop tracking for new session
    state.dropLog = [];
    state.totalDrops = 0;
    state.correctDrops = 0;
    state.incorrectDrops = 0;
    state.failedDrops = 0;
    registerActivity();
    // After resetting, show the screensaver
    showScreensaver();
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
      sendDropLog('inactivity_reset');
      // Hard reload to pick up any git pull changes (fresh CSS, JS, HTML)
      window.location.reload(true);
    }, 10000);
  }

  // ============ KIOSK MODE PROTECTIONS ============
  function initKioskProtections() {
    if (!kioskConfig.enabled) return;

    // Disable right-click context menu
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });

    // Prevent text selection via long-press on touch
    document.addEventListener('selectstart', (e) => {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
      }
    });

    // Prevent navigation gestures (swipe back/forward)
    document.addEventListener('touchstart', (e) => {
      // Allow only if touch is not at edges (where swipe-to-navigate triggers)
      const touch = e.touches[0];
      const edgeThreshold = 30;
      if (touch.clientX < edgeThreshold || touch.clientX > window.innerWidth - edgeThreshold) {
        // Near edge - could be navigation gesture, but we can't fully prevent it
        // The CSS touch-action: none on body helps more
      }
    }, { passive: true });

    // Prevent page from being refreshed via pull-to-refresh
    document.body.style.overscrollBehavior = 'none';

    // Request fullscreen on first interaction (optional, for non-kiosk-flag launch)
    document.addEventListener('click', function enterFullscreen() {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
      document.removeEventListener('click', enterFullscreen);
    }, { once: true });
  }

  // Initialize kiosk protections immediately
  initKioskProtections();
  // ================================================

  // ============ LOGGING FUNCTIONS ============
  // Legacy logging function (for old statistics)
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

  // New drop logging function (for detailed drop statistics)
  function sendDropLog(trigger) {
    if (!loggingConfig.enabled) return;
    if (!navigator.onLine) return;
    if (!state.hasInteracted) return;

    const now = Date.now();
    const usageTimeSeconds = state.firstInteractionTime 
      ? Math.round((now - state.firstInteractionTime) / 1000)
      : 0;

    const payload = {
      datetime: new Date().toISOString(),
      trigger: trigger,  // 'confirm' or 'inactivity_reset'
      total_drops: state.totalDrops,
      correct_drops: state.correctDrops,
      incorrect_drops: state.incorrectDrops,
      failed_drops: state.failedDrops,
      drops: state.dropLog,  // Array of {card, slot, result, fromSlot}
      usage_time_seconds: usageTimeSeconds
    };

    // Fire and forget - don't wait for response, don't show errors
    fetch(loggingConfig.dropLogEndpoint, {
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
