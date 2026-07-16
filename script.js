'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const byId = (id) => document.getElementById(id);

  const year = byId('current-year');
  if (year) year.textContent = new Date().getFullYear();

  const dateEl = byId('current-date');
  const timeEl = byId('current-time');

  if (dateEl && timeEl) {
    const updateClock = () => {
      const now = new Date();

      const dateText = new Intl.DateTimeFormat('lt-LT', {
        timeZone: 'Europe/Vilnius',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }).format(now);

      dateEl.textContent =
        dateText.charAt(0).toUpperCase() + dateText.slice(1);

      timeEl.textContent = new Intl.DateTimeFormat('lt-LT', {
        timeZone: 'Europe/Vilnius',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(now);
    };

    updateClock();
    setInterval(updateClock, 1000);
  }

  const progress = byId('reading-progress');
  const backToTop = byId('back-to-top');

  const updateScrollUi = () => {
    const maxScroll =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    if (progress) {
      const percent =
        maxScroll > 0
          ? (window.scrollY / maxScroll) * 100
          : 0;

      progress.style.width =
        `${Math.min(100, Math.max(0, percent))}%`;
    }

    if (backToTop) {
      backToTop.classList.toggle(
        'is-visible',
        window.scrollY > 550
      );
    }
  };

  updateScrollUi();

  window.addEventListener(
    'scroll',
    updateScrollUi,
    { passive: true }
  );

  window.addEventListener(
    'resize',
    updateScrollUi
  );

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  const menuButton =
    byId('mobile-menu-button');

  const navigation =
    byId('main-navigation');

  if (menuButton && navigation) {
    const closeMenu = () => {
      navigation.classList.remove('is-open');

      menuButton.setAttribute(
        'aria-expanded',
        'false'
      );

      menuButton.setAttribute(
        'aria-label',
        'Atidaryti meniu'
      );

      menuButton.textContent = '☰';
    };

    menuButton.addEventListener('click', () => {
      const open =
        navigation.classList.toggle('is-open');

      menuButton.setAttribute(
        'aria-expanded',
        String(open)
      );

      menuButton.setAttribute(
        'aria-label',
        open
          ? 'Uždaryti meniu'
          : 'Atidaryti meniu'
      );

      menuButton.textContent =
        open ? '×' : '☰';
    });

    navigation
      .querySelectorAll('a')
      .forEach((link) => {
        link.addEventListener(
          'click',
          closeMenu
        );
      });

    document.addEventListener(
      'click',
      (event) => {
        const clickedInsideNavigation =
          navigation.contains(event.target);

        const clickedMenuButton =
          menuButton.contains(event.target);

        if (
          !clickedInsideNavigation &&
          !clickedMenuButton
        ) {
          closeMenu();
        }
      }
    );

    document.addEventListener(
      'keydown',
      (event) => {
        if (event.key === 'Escape') {
          closeMenu();
        }
      }
    );

    window.addEventListener(
      'resize',
      () => {
        if (window.innerWidth > 1120) {
          closeMenu();
        }
      }
    );
  }

  const copyButton =
    byId('copy-email-button');

  const copyMessage =
    byId('copy-confirmation');

  if (copyButton) {
    copyButton.addEventListener(
      'click',
      async () => {
        const email =
          'kaubariskiobendruomene@gmail.com';

        try {
          if (
            navigator.clipboard &&
            window.isSecureContext
          ) {
            await navigator.clipboard.writeText(
              email
            );
          } else {
            const field =
              document.createElement('textarea');

            field.value = email;
            field.style.position = 'fixed';
            field.style.left = '-9999px';

            document.body.appendChild(field);

            field.select();
            document.execCommand('copy');

            field.remove();
          }

          if (copyMessage) {
            copyMessage.textContent =
              'El. pašto adresas nukopijuotas.';
          }
        } catch (error) {
          console.error(error);

          if (copyMessage) {
            copyMessage.textContent =
              `El. paštas: ${email}`;
          }
        }

        setTimeout(() => {
          if (copyMessage) {
            copyMessage.textContent = '';
          }
        }, 4000);
      }
    );
  }

  const lightbox =
    byId('image-lightbox');

  const lightboxImage =
    byId('lightbox-image');

  const closeLightbox =
    byId('close-lightbox');

  if (
    lightbox &&
    lightboxImage &&
    closeLightbox
  ) {
    const close = () => {
      lightbox.hidden = true;

      document.body.style.overflow = '';

      lightboxImage.src = '';
    };

    document
      .querySelectorAll('.gallery-item img')
      .forEach((image) => {
        const button =
          image.closest('.gallery-item');

        if (!button) {
          return;
        }

        button.addEventListener(
          'click',
          () => {
            lightboxImage.src =
              image.currentSrc || image.src;

            lightboxImage.alt =
              image.alt ||
              'Padidinta nuotrauka';

            lightbox.hidden = false;

            document.body.style.overflow =
              'hidden';

            closeLightbox.focus();
          }
        );
      });

    closeLightbox.addEventListener(
      'click',
      close
    );

    lightbox.addEventListener(
      'click',
      (event) => {
        if (event.target === lightbox) {
          close();
        }
      }
    );

    document.addEventListener(
      'keydown',
      (event) => {
        if (
          event.key === 'Escape' &&
          !lightbox.hidden
        ) {
          close();
        }
      }
    );
  }

  const setupForm = ({
    formId,
    frameId,
    buttonId,
    messageId,
    sendingText,
    successText
  }) => {
    const form = byId(formId);
    const frame = byId(frameId);
    const button = byId(buttonId);
    const message = byId(messageId);

    if (
      !form ||
      !frame ||
      !button ||
      !message
    ) {
      return;
    }

    let sending = false;
    let timer = null;

    const originalButtonText =
      button.textContent.trim();

    const showMessage = (
      text,
      className
    ) => {
      message.textContent = text;

      message.classList.remove(
        'is-loading',
        'is-success',
        'is-error'
      );

      if (className) {
        message.classList.add(className);
      }
    };

    const finish = () => {
      sending = false;

      button.disabled = false;

      button.textContent =
        originalButtonText;

      if (timer) {
        clearTimeout(timer);
      }

      timer = null;
    };

    form.addEventListener(
      'submit',
      (event) => {
        if (sending) {
          event.preventDefault();
          return;
        }

        if (!form.checkValidity()) {
          event.preventDefault();

          form.reportValidity();

          return;
        }

        if (!navigator.onLine) {
          event.preventDefault();

          showMessage(
            'Nėra interneto ryšio. Patikrinkite ryšį ir bandykite dar kartą.',
            'is-error'
          );

          return;
        }

        sending = true;

        button.disabled = true;

        button.textContent =
          sendingText;

        showMessage(
          'Duomenys siunčiami. Prašome palaukti…',
          'is-loading'
        );

        timer = setTimeout(() => {
          if (!sending) {
            return;
          }

          finish();

          showMessage(
            'Atsakymo iš sistemos negauta. Patikrinkite interneto ryšį ir pabandykite dar kartą.',
            'is-error'
          );
        }, 30000);
      }
    );

    frame.addEventListener(
      'load',
      () => {
        if (!sending) {
          return;
        }

        finish();

        form.reset();

        showMessage(
          successText,
          'is-success'
        );

        message.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    );
  };

  setupForm({
    formId:
      'bagazinturgio-registration-form',

    frameId:
      'registration-response-frame',

    buttonId:
      'registration-submit-button',

    messageId:
      'registration-form-message',

    sendingText:
      'Registracija siunčiama…',

    successText:
      'Registracija sėkmingai pateikta. Duomenys perduoti renginio organizatorei.'
  });

  setupForm({
    formId:
      'membership-application-form',

    frameId:
      'membership-response-frame',

    buttonId:
      'membership-submit-button',

    messageId:
      'membership-form-message',

    sendingText:
      'Paraiška siunčiama…',

    successText:
      'Jūsų paraiška gauta. Bendruomenės atstovai su jumis susisieks ir pateiks pasirašyti oficialų narystės prašymą.'
  });

  document
    .querySelectorAll('a[href="#"]')
    .forEach((link) => {
      link.addEventListener(
        'click',
        (event) => {
          event.preventDefault();
        }
      );
    });
});
