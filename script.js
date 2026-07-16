'use strict';

document.addEventListener('DOMContentLoaded', () => {
  nustatytiMetus();
  paleistiLaikrodi();
  paleistiSlinkimoElementus();
  paleistiMobilujiMeniu();
  paleistiElPastoKopijavima();
  paleistiGalerija();
  paleistiBagazinturgioForma();
  paleistiNarystesForma();
});

function pagalId(id) {
  return document.getElementById(id);
}

function nustatytiMetus() {
  const elementas = pagalId('current-year');

  if (elementas) {
    elementas.textContent = String(new Date().getFullYear());
  }
}

function paleistiLaikrodi() {
  const datosElementas = pagalId('current-date');
  const laikoElementas = pagalId('current-time');

  if (!datosElementas || !laikoElementas) {
    return;
  }

  const atnaujinti = () => {
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

  atnaujinti();

  window.setInterval(atnaujinti, 1000);
}

function paleistiSlinkimoElementus() {
  const progresoJuosta = pagalId('reading-progress');
  const virsausMygtukas = pagalId('back-to-top');

  const atnaujinti = () => {
    const galimasSlinkimas =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    if (progresoJuosta) {
      const procentai = galimasSlinkimas > 0
        ? (window.scrollY / galimasSlinkimas) * 100
        : 0;

      progresoJuosta.style.width =
        `${Math.min(100, Math.max(0, procentai))}%`;
    }

    if (virsausMygtukas) {
      virsausMygtukas.classList.toggle(
        'is-visible',
        window.scrollY > 550
      );
    }
  };

  atnaujinti();

  window.addEventListener('scroll', atnaujinti, {
    passive: true
  });

  window.addEventListener('resize', atnaujinti);

  if (virsausMygtukas) {
    virsausMygtukas.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

function paleistiMobilujiMeniu() {
  const mygtukas = pagalId('mobile-menu-button');
  const navigacija = pagalId('main-navigation');

  if (!mygtukas || !navigacija) {
    return;
  }

  const uzdaryti = () => {
    navigacija.classList.remove('is-open');

    mygtukas.setAttribute(
      'aria-expanded',
      'false'
    );

    mygtukas.setAttribute(
      'aria-label',
      'Atidaryti meniu'
    );

    mygtukas.textContent = '☰';
  };

  mygtukas.addEventListener('click', () => {
    const atidarytas =
      navigacija.classList.toggle('is-open');

    mygtukas.setAttribute(
      'aria-expanded',
      String(atidarytas)
    );

    mygtukas.setAttribute(
      'aria-label',
      atidarytas
        ? 'Uždaryti meniu'
        : 'Atidaryti meniu'
    );

    mygtukas.textContent =
      atidarytas ? '×' : '☰';
  });

  navigacija.querySelectorAll('a').forEach((nuoroda) => {
    nuoroda.addEventListener('click', uzdaryti);
  });

  document.addEventListener('click', (ivykis) => {
    const meniuViduje =
      navigacija.contains(ivykis.target);

    const mygtukoViduje =
      mygtukas.contains(ivykis.target);

    if (!meniuViduje && !mygtukoViduje) {
      uzdaryti();
    }
  });

  document.addEventListener('keydown', (ivykis) => {
    if (ivykis.key === 'Escape') {
      uzdaryti();
    }
  });
}

function paleistiElPastoKopijavima() {
  const mygtukas = pagalId('copy-email-button');
  const zinute = pagalId('copy-confirmation');

  if (!mygtukas) {
    return;
  }

  const elPastas =
    'kaubariskiobendruomene@gmail.com';

  mygtukas.addEventListener('click', async () => {
    try {
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(elPastas);
      } else {
        const laukas =
          document.createElement('textarea');

        laukas.value = elPastas;
        laukas.style.position = 'fixed';
        laukas.style.left = '-9999px';

        document.body.appendChild(laukas);

        laukas.select();

        document.execCommand('copy');

        laukas.remove();
      }

      if (zinute) {
        zinute.textContent =
          'El. pašto adresas nukopijuotas.';
      }
    } catch (klaida) {
      console.error(klaida);

      if (zinute) {
        zinute.textContent = elPastas;
      }
    }

    window.setTimeout(() => {
      if (zinute) {
        zinute.textContent = '';
      }
    }, 4000);
  });
}

function paleistiGalerija() {
  const langas = pagalId('image-lightbox');
  const nuotrauka = pagalId('lightbox-image');
  const uzdarymoMygtukas =
    pagalId('close-lightbox');

  if (!langas || !nuotrauka || !uzdarymoMygtukas) {
    return;
  }

  const uzdaryti = () => {
    langas.hidden = true;

    document.body.style.overflow = '';

    nuotrauka.src = '';
    nuotrauka.alt = '';
  };

  document
    .querySelectorAll('.gallery-item img')
    .forEach((vaizdas) => {
      const mygtukas =
        vaizdas.closest('.gallery-item');

      if (!mygtukas) {
        return;
      }

      mygtukas.addEventListener('click', () => {
        nuotrauka.src =
          vaizdas.currentSrc || vaizdas.src;

        nuotrauka.alt =
          vaizdas.alt || 'Padidinta nuotrauka';

        langas.hidden = false;

        document.body.style.overflow =
          'hidden';

        uzdarymoMygtukas.focus();
      });
    });

  uzdarymoMygtukas.addEventListener(
    'click',
    uzdaryti
  );

  langas.addEventListener('click', (ivykis) => {
    if (ivykis.target === langas) {
      uzdaryti();
    }
  });

  document.addEventListener('keydown', (ivykis) => {
    if (
      ivykis.key === 'Escape' &&
      !langas.hidden
    ) {
      uzdaryti();
    }
  });
}

function paleistiBagazinturgioForma() {
  paleistiForma({
    formosId: 'bagazinturgio-registration-form',
    iframeId: 'registration-response-frame',
    mygtukoId: 'registration-submit-button',
    zinutesId: 'registration-form-message',
    siuntimoTekstas: 'Registracija siunčiama…',
    sekmesTekstas: 'Registracija sėkmingai pateikta.'
  });
}

function paleistiNarystesForma() {
  paleistiForma({
    formosId: 'membership-application-form',
    iframeId: 'membership-response-frame',
    mygtukoId: 'membership-submit-button',
    zinutesId: 'membership-form-message',
    siuntimoTekstas: 'Paraiška siunčiama…',
    sekmesTekstas:
      'Paraiška gauta. Susisieksime dėl prašymo.'
  });
}

function paleistiForma(nustatymai) {
  const forma = pagalId(nustatymai.formosId);
  const iframe = pagalId(nustatymai.iframeId);
  const mygtukas = pagalId(nustatymai.mygtukoId);
  const zinute = pagalId(nustatymai.zinutesId);

  if (!forma || !iframe || !mygtukas || !zinute) {
    return;
  }

  let siunciama = false;
  let laikmatis = null;

  const pradinisTekstas =
    mygtukas.textContent.trim();

  const rodytiZinute = (tekstas, klase) => {
    zinute.textContent = tekstas;

    zinute.classList.remove(
      'is-loading',
      'is-success',
      'is-error'
    );

    if (klase) {
      zinute.classList.add(klase);
    }
  };

  const baigtiSiuntima = () => {
    siunciama = false;

    mygtukas.disabled = false;

    mygtukas.textContent =
      pradinisTekstas;

    if (laikmatis) {
      window.clearTimeout(laikmatis);
      laikmatis = null;
    }
  };

  forma.addEventListener('submit', (ivykis) => {
    if (siunciama) {
      ivykis.preventDefault();
      return;
    }

    if (!forma.checkValidity()) {
      ivykis.preventDefault();

      forma.reportValidity();

      return;
    }

    if (!navigator.onLine) {
      ivykis.preventDefault();

      rodytiZinute(
        'Nėra interneto ryšio.',
        'is-error'
      );

      return;
    }

    siunciama = true;

    mygtukas.disabled = true;

    mygtukas.textContent =
      nustatymai.siuntimoTekstas;

    rodytiZinute(
      'Duomenys siunčiami. Prašome palaukti…',
      'is-loading'
    );

    laikmatis = window.setTimeout(() => {
      if (!siunciama) {
        return;
      }

      baigtiSiuntima();

      rodytiZinute(
        'Sistema neatsakė. Bandykite dar kartą.',
        'is-error'
      );
    }, 30000);
  });

  iframe.addEventListener('load', () => {
    if (!siunciama) {
      return;
    }

    baigtiSiuntima();

    forma.reset();

    rodytiZinute(
      nustatymai.sekmesTekstas,
      'is-success'
    );
  });
}
