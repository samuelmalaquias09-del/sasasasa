/* ==========================================
   CONFIGURAÇÃO DO WHATSAPP
========================================== */

const WHATSAPP = "554388083342";


/* ==========================================
   WHATSAPP
========================================== */

document
  .querySelectorAll(".js-whatsapp")
  .forEach((link) => {

    link.addEventListener("click", (event) => {

      event.preventDefault();

      const message =
        link.dataset.message ||
        "Olá! Vi o site da Eli Pinturas e gostaria de solicitar um orçamento.";

      const url =
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );

    });

  });


/* ==========================================
   MENU MOBILE
========================================== */

const menuButton =
  document.querySelector(".menu-toggle");

const navLinks =
  document.querySelector(".nav-links");


if (menuButton && navLinks) {

  menuButton.addEventListener("click", () => {

    const open =
      navLinks.classList.toggle("is-open");

    menuButton.setAttribute(
      "aria-expanded",
      String(open)
    );

  });

}


navLinks
  ?.querySelectorAll("a")
  .forEach((link) => {

    link.addEventListener("click", () => {

      navLinks.classList.remove(
        "is-open"
      );

    });

  });


/* ==========================================
   GALERIA / LIGHTBOX
========================================== */

const modal =
  document.querySelector(".modal");

const modalImg =
  modal?.querySelector("img");

const modalCaption =
  modal?.querySelector("figcaption");


document
  .querySelectorAll(".project")
  .forEach((project) => {

    project.addEventListener("click", () => {

      modalImg.src =
        project.dataset.image;

      modalImg.alt =
        project.dataset.title;

      modalCaption.textContent =
        project.dataset.title;

      modal.classList.add(
        "is-open"
      );

      modal.setAttribute(
        "aria-hidden",
        "false"
      );

    });

  });


/* ==========================================
   FECHAR MODAL
========================================== */

function closeModal() {

  modal?.classList.remove(
    "is-open"
  );

  modal?.setAttribute(
    "aria-hidden",
    "true"
  );

}


modal
  ?.querySelector(".modal-close")
  ?.addEventListener(
    "click",
    closeModal
  );


modal?.addEventListener(
  "click",
  (event) => {

    if (
      event.target === modal
    ) {
      closeModal();
    }

  }
);


document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {
      closeModal();
    }

  }
);


/* ==========================================
   ANIMAÇÕES DE ENTRADA
========================================== */

const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.animate(

              [
                {
                  opacity: 0,
                  transform:
                    "translateY(18px)"
                },

                {
                  opacity: 1,
                  transform:
                    "translateY(0)"
                }

              ],

              {
                duration: 550,

                easing:
                  "cubic-bezier(.2,.7,.2,1)",

                fill: "forwards"
              }

            );

            revealObserver.unobserve(
              entry.target
            );

          }

        }
      );

    },

    {
      threshold: 0.12
    }

  );


document
  .querySelectorAll(
    ".service-card, .process-item, .project, .intro-grid"
  )
  .forEach((element) => {

    element.style.opacity = "0";

    revealObserver.observe(
      element
    );

  });