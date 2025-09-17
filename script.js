document.addEventListener('DOMContentLoaded', () => {
    const landingPage = document.getElementById('landingPage');
    const openButton = document.getElementById('openButton');
    const mainContent = document.getElementById('mainContent');
    const birthdaySong = document.getElementById('birthdaySong');
    const flipCard = document.getElementById('flipCard');
    const confettiButton = document.getElementById('confettiButton');

    // Fungsi untuk memunculkan konfeti
    function triggerConfetti() {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }
            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }
    
    // Event Listener untuk tombol "Buka Sekarang"
    openButton.addEventListener('click', () => {
        // Efek fade out untuk halaman pembuka
        landingPage.style.opacity = '0';
        landingPage.style.transform = 'scale(0.8)';

        // Tunggu transisi selesai
        setTimeout(() => {
            landingPage.style.display = 'none';

            // Tampilkan konten utama
            mainContent.classList.add('visible');

            // Putar musik dan mulai konfeti
            birthdaySong.play().catch(error => {
                // Browser modern sering memblokir autoplay, ini untuk jaga-jaga
                console.log("Autoplay ditolak oleh browser. Interaksi pengguna diperlukan.");
            });
            triggerConfetti();
        }, 500); // 500ms sesuai durasi transisi di CSS
    });

    // Event Listener untuk membalik kartu
    flipCard.addEventListener('click', () => {
        flipCard.classList.toggle('flipped');
    });

    // Event Listener untuk tombol konfeti tambahan
    confettiButton.addEventListener('click', () => {
        const end = Date.now() + (2 * 1000);
        // Tembakkan konfeti dari tengah layar
        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    });
});