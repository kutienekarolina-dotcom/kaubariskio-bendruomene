'use strict';

/* =========================================================
   KAUBARIŠKIO BENDRUOMENĖS SVETAINĖ
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  nustatytiMetus();
  paleistiLietuvosLaikrodi();
  paleistiSkaitymoProgresa();
  paleistiGrizimoIVirsuMygtuka();
  paleistiMobilujiMeniu();
  paleistiElPastoKopijavima();
  paleistiNuotraukuGalerija();
  paleistiBagazinturgioRegistracija();
  paleistiNarystesParaiska();
  sutvarkytiTusciasNuorodas();
});


/* =========================================================
   METAI PORAŠTĖJE
   ========================================================= */

function nustatytiMetus() {
  const metuElementas = document.getElementById('current-year');

  if (!metuElementas) {
    return;
  }

  metuElementas.textContent = String(new Date().getFullYear());
}


/* =========================================================
   LIETUVOS DATA IR LAIKAS
   ========================================================= */

function paleistiLietuvosLaikrodi() {
  const datosElementas = document.getElementById('current-date');
  const laikoElementas = document.getElementById('current-time');

  if (!datosElementas || !laikoElementas) {
    return;
  }

  const atnaujintiLaika = () => {
    const dabar = new Date();

    const data = new Intl.DateTimeFormat('lt-LT', {
      timeZone: 'Europe/Vilnius',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(dabar);

    const laikas = new Intl.DateTimeFormat('lt-LT', {
      timeZone: 'Europe/Vilnius',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(dabar);

    datosElementas.textContent =
      data.charAt(0).toUpperCase() + data.slice(1);

    laikoElementas.textContent = laikas;
  };

  atnaujintiLaika();

  window.setInterval(atnaujintiLaika, 1000);
}


/* =========================================================
   SKAITYMO PROGRESO JUOSTA
   ========================================================= */

function paleistiSkaitymoProgresa() {
  const progresoJuosta =
    document.getElementById('reading-progress');

  if (!progresoJuosta) {
    return;
  }

  const atnaujintiProgresa = () => {
    const dokumentoAukstis =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const paslinkta = window.scrollY;

    const procentai =
      dokumentoAukstis > 0
        ? Math.min(
            100,
            Math.max(0, (paslinkta / dokumentoAukstis) * 100)
          )
        : 0;

    progresoJuosta.style.width = `${procentai}%`;
  };

  atnaujintiProgresa();

  window.addEventListener('scroll', atnaujintiProgresa, {
    passive: true
  });

  window.addEventListener('resize', atnaujintiProgresa);
}


/* =========================================================
   GRĮŽIMO Į VIRŠŲ MYGTUKAS
   ========================================================= */

function paleistiGrizimoIVirsuMygtuka() {
  const mygtukas = document.getElementById('back-to-top');

  if (!mygtukas) {
    return;
  }

  const atnaujintiMygtuka = () => {
    mygtukas.classList.toggle(
      'is-visible',
      window.scrollY > 550
    );
  };

  atnaujintiMygtuka();

  window.addEventListener('scroll', atnaujintiMygtuka, {
    passive: true
  });

  mygtukas.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


/* =========================================================
   MOBILUSIS MENIU
   ========================================================= */

function paleistiMobilujiMeniu() {
  const meniuMygtukas =
    document.getElementById('mobile-menu-button');

  const navigacija =
    document.getElementById('main-navigation');

  if (!meniuMygtukas || !navigacija) {
    return;
  }

  const uzdarytiMeniu = () => {
    navigacija.classList.remove('is-open');
    meniuMygtukas.setAttribute('aria-expanded', 'false');
    meniuMygtukas.textContent = '☰';
    meniuMygtukas.setAttribute(
      'aria-label',
      'Atidaryti meniu'
    );
  };

  const atidarytiMeniu = () => {
    navigacija.classList.add('is-open');
    meniuMygtukas.setAttribute('aria-expanded', 'true');
    meniuMygtukas.textContent = '×';
    meniuMygtukas.setAttribute(
      'aria-label',
      'Uždaryti meniu'
    );
  };

  meniuMygtukas.addEventListener('click', () => {
    const meniuAtidarytas =
      navigacija.classList.contains('is-open');

    if (meniuAtidarytas) {
      uzdarytiMeniu();
    } else {
      atidarytiMeniu();
    }
  });

  navigacija.querySelectorAll('a').forEach((nuoroda) => {
    nuoroda.addEventListener('click', uzdarytiMeniu);
  });

  document.addEventListener('click', (ivykis) => {
    const paspaustaMeniuViduje =
      navigacija.contains(ivykis.target);

    const paspaustasMeniuMygtukas =
      meniuMygtukas.contains(ivykis.target);

    if (
      !paspaustaMeniuViduje &&
      !paspaustasMeniuMygtukas
    ) {
      uzdarytiMeniu();
    }
  });

  document.addEventListener('keydown', (ivykis) => {
    if (ivykis.key === 'Escape') {
      uzdarytiMeniu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1120) {
      uzdarytiMeniu();
    }
  });
}


/* =========================================================
   EL. PAŠTO KOPIJAVIMAS
   ========================================================= */

function paleistiElPastoKopijavima() {
  const kopijavimoMygtukas =
    document.getElementById('copy-email-button');

  const patvirtinimoElementas =
    document.getElementById('copy-confirmation');

  if (!kopijavimoMygtukas) {
    return;
  }

  const elPastas =
    'kaubariskiobendruomene@gmail.com';

  kopijavimoMygtukas.addEventListener(
    'click',
    async () => {
      try {
        await nukopijuotiTeksta(elPastas);

        if (patvirtinimoElementas) {
          patvirtinimoElementas.textContent =
            'El. pašto adresas nukopijuotas.';
        }
      } catch (klaida) {
        console.error(
          'Nepavyko nukopijuoti el. pašto:',
          klaida
        );

        if (patvirtinimoElementas) {
          patvirtinimoElementas.textContent =
            `El. paštas: ${elPastas}`;
        }
      }

      window.setTimeout(() => {
        if (patvirtinimoElementas) {
          patvirtinimoElementas.textContent = '';
        }
      }, 4000);
    }
  );
}

async function nukopijuotiTeksta(tekstas) {
  if (
    navigator.clipboard &&
    window.isSecureContext
  ) {
    await navigator.clipboard.writeText(tekstas);
    return;
  }

  const laikinasLaukas =
    document.createElement('textarea');

  laikinasLaukas.value = tekstas;
  laikinasLaukas.setAttribute('readonly', '');
  laikinasLaukas.style.position = 'fixed';
  laikinasLaukas.style.left = '-9999px';

  document.body.appendChild(laikinasLaukas);

  laikinasLaukas.select();
  laikinasLaukas.setSelectionRange(
    0,
    laikinasLaukas.value.length
  );

  const pavyko = document.execCommand('copy');

  laikinasLaukas.remove();

  if (!pavyko) {
    throw new Error('Kopijavimo funkcija nepasiekiama.');
  }
}


/* =========================================================
   NUOTRAUKŲ GALERIJA
   ========================================================= */

function paleistiNuotraukuGalerija() {
  const galerijosElementai =
    document.querySelectorAll('.gallery-item img');

  const langas =
    document.getElementById('image-lightbox');

  const padidintaNuotrauka =
    document.getElementById('lightbox-image');

  const uzdarymoMygtukas =
    document.getElementById('close-lightbox');

  if (
    galerijosElementai.length === 0 ||
    !langas ||
    !padidintaNuotrauka ||
    !uzdarymoMygtukas
  ) {
    return;
  }

  let ankstesnisFokusoElementas = null;

  const atidarytiNuotrauka = (nuotrauka) => {
    ankstesnisFokusoElementas =
      document.activeElement;

    padidintaNuotrauka.src =
      nuotrauka.currentSrc || nuotrauka.src;

    padidintaNuotrauka.alt =
      nuotrauka.alt || 'Padidinta nuotrauka';

    langas.hidden = false;
    document.body.style.overflow = 'hidden';

    uzdarymoMygtukas.focus();
  };

  const uzdarytiNuotrauka = () => {
    langas.hidden = true;
    document.body.style.overflow = '';

    padidintaNuotrauka.src = '';
    padidintaNuotrauka.alt = '';

    if (
      ankstesnisFokusoElementas &&
      typeof ankstesnisFokusoElementas.focus ===
        'function'
    ) {
      ankstesnisFokusoElementas.focus();
    }
  };

  galerijosElementai.forEach((nuotrauka) => {
    const mygtukas =
      nuotrauka.closest('.gallery-item');

    if (!mygtukas) {
      return;
    }

    mygtukas.addEventListener('click', () => {
      atidarytiNuotrauka(nuotrauka);
    });
  });

  uzdarymoMygtukas.addEventListener(
    'click',
    uzdarytiNuotrauka
  );

  langas.addEventListener('click', (ivykis) => {
    if (ivykis.target === langas) {
      uzdarytiNuotrauka();
    }
  });

  document.addEventListener('keydown', (ivykis) => {
    if (
      ivykis.key === 'Escape' &&
      !langas.hidden
    ) {
      uzdarytiNuotrauka();
    }
  });
}


/* =========================================================
   BAGAŽINTURGIO REGISTRACIJA
   ========================================================= */

function paleistiBagazinturgioRegistracija() {
  paleistiSiunciamaForma({
    formosId: 'bagazinturgio-registration-form',
    iframeId: 'registration-response-frame',
    mygtukoId: 'registration-submit-button',
    zinutesId: 'registration-form-message',
    siuntimoTekstas: 'Registracija siunčiama…',
    sekmesTekstas:
      'Registracija sėkmingai pateikta. Duomenys perduoti renginio organizatorei.'
  });
}


/* =========================================================
   BENDRUOMENĖS NARYSTĖS PARAIŠKA
   ========================================================= */

function paleistiNarystesParaiska() {
  paleistiSiunciamaForma({
    formosId: 'membership-application-form',
    iframeId: 'membership-response-frame',
    mygtukoId: 'membership-submit-button',
    zinutesId: 'membership-form-message',
    siuntimoTekstas: 'Paraiška siunčiama…',
    sekmesTekstas:
      'Jūsų paraiška gauta. Bendruomenės atstovai su jumis susisieks ir pateiks pasirašyti oficialų narystės prašymą.'
  });
}


/* =========================================================
   BENDRA FORMŲ SIUNTIMO FUNKCIJA
   ========================================================= */

function paleistiSiunciamaForma(nustatymai) {
  const forma =
    document.getElementById(nustatymai.formosId);

  const atsakymoLangas =
    document.getElementById(nustatymai.iframeId);

  const pateikimoMygtukas =
    document.getElementById(nustatymai.mygtukoId);

  const zinutesElementas =
    document.getElementById(nustatymai.zinutesId);

  if (
    !forma ||
    !atsakymoLangas ||
    !pateikimoMygtukas ||
    !zinutesElementas
  ) {
    return;
  }

  let siuntimasVyksta = false;
  let laukimoLaikmatis = null;

  const pradinisMygtukoTekstas =
    pateikimoMygtukas.textContent.trim();

  const rodytiZinute = (tekstas, busena) => {
    zinutesElementas.textContent = tekstas;

    zinutesElementas.classList.remove(
      'is-loading',
      'is-success',
      'is-error'
    );

    if (busena) {
      zinutesElementas.classList.add(busena);
    }
  };

  const ijungtiMygtuka = () => {
    pateikimoMygtukas.disabled = false;
    pateikimoMygtukas.textContent =
      pradinisMygtukoTekstas;
  };

  const isjungtiMygtuka = () => {
    pateikimoMygtukas.disabled = true;
    pateikimoMygtukas.textContent =
      nustatymai.siuntimoTekstas;
  };

  forma.addEventListener('submit', (ivykis) => {
    if (siuntimasVyksta) {
      ivykis.preventDefault();
      return;
    }

    if (!forma.checkValidity()) {
      return;
    }

    if (!navigator.onLine) {
      ivykis.preventDefault();

      rodytiZinute(
        'Nėra interneto ryšio. Patikrinkite ryšį ir bandykite dar kartą.',
        'is-error'
      );

      return;
    }

    siuntimasVyksta = true;

    isjungtiMygtuka();

    rodytiZinute(
      'Duomenys siunčiami. Prašome palaukti…',
      'is-loading'
    );

    laukimoLaikmatis = window.setTimeout(() => {
      if (!siuntimasVyksta) {
        return;
      }

      siuntimasVyksta = false;

      ijungtiMygtuka();

      rodytiZinute(
        'Atsakymo iš sistemos negauta. Patikrinkite interneto ryšį ir pabandykite dar kartą.',
        'is-error'
      );
    }, 30000);
  });

  atsakymoLangas.addEventListener('load', () => {
    /*
     * Paslėptas langas gali būti įkeltas ir prieš
     * pateikiant formą, todėl tikriname, ar siuntimas vyko.
     */
    if (!siuntimasVyksta) {
      return;
    }

    siuntimasVyksta = false;

    if (laukimoLaikmatis) {
      window.clearTimeout(laukimoLaikmatis);
      laukimoLaikmatis = null;
    }

    ijungtiMygtuka();

    forma.reset();

    rodytiZinute(
      nustatymai.sekmesTekstas,
      'is-success'
    );

    zinutesElementas.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  });

  forma.addEventListener('input', () => {
    if (
      zinutesElementas.classList.contains('is-error')
    ) {
      rodytiZinute('', '');
    }
  });

  forma.addEventListener('change', () => {
    if (
      zinutesElementas.classList.contains('is-error')
    ) {
      rodytiZinute('', '');
    }
  });
}


/* =========================================================
   TUŠČIOS PAVYZDINĖS NUORODOS
   ========================================================= */

function sutvarkytiTusciasNuorodas() {
  const tusciosNuorodos =
    document.querySelectorAll('a[href="#"]');

  tusciosNuorodos.forEach((nuoroda) => {
    nuoroda.addEventListener('click', (ivykis) => {
      ivykis.preventDefault();
    });
  });
}
