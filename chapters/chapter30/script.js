document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       CARD REVEAL
    ========================= */

    const cards =
        document.querySelectorAll(".point-card");


    cards.forEach((card, index) => {

        /* Staggered entrance */

        card.style.animationDelay =
            `${index * 0.05}s`;


        /* Click interaction */

        card.addEventListener("click", () => {

            card.classList.toggle("selected");

            createSparkles(card);

        });

    });


    /* =========================
       SPARKLE EFFECT
    ========================= */

    function createSparkles(card) {

        const rect =
            card.getBoundingClientRect();


        for (let i = 0; i < 8; i++) {

            const sparkle =
                document.createElement("span");

            sparkle.innerHTML = "✨";

            sparkle.style.position =
                "fixed";

            sparkle.style.left =
                `${rect.left + Math.random() * rect.width}px`;

            sparkle.style.top =
                `${rect.top + Math.random() * rect.height}px`;

            sparkle.style.fontSize =
                `${10 + Math.random() * 12}px`;

            sparkle.style.pointerEvents =
                "none";

            sparkle.style.zIndex = "9999";

            sparkle.style.transition =
                "all 1s ease";

            document.body.appendChild(
                sparkle
            );


            requestAnimationFrame(() => {

                sparkle.style.transform =
                    `translate(
                        ${(Math.random() - .5) * 100}px,
                        ${(Math.random() - .5) * 100}px
                    )`;

                sparkle.style.opacity = "0";

            });


            setTimeout(() => {

                sparkle.remove();

            }, 1000);

        }

    }


    /* =========================
       MUSIC
    ========================= */

    const music =
        document.getElementById(
            "musicPlayer"
        );


    if (music) {

        music.volume = 0.6;

    }


    /* =========================
       MOON INTERACTION
    ========================= */

    const moon =
        document.querySelector(".moon");


    if (moon) {

        moon.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "moon-active"
                );

            }
        );

    }


    /* =========================
       CONSOLE MESSAGE
    ========================= */

    console.log(
        "🌙✨ Chapter 30 is made for you ❤️"
    );

});