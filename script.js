document.addEventListener('DOMContentLoaded', () => {
    // Инициализация иконок
    lucide.createIcons();

    // --- 1. ДАННЫЕ ДЛЯ БАННЕРОВ ---
    const bannerData = [
        {
            title: "500 000 €",
            sub: "Пасхальный турнир от Endorphina!",
            img: "https://banda-prod-backend-client-bucket.s3.eu-central-1.amazonaws.com/banners/1775227610378_GRAND%20EASTER%20HEIST%20Tournament%20%281%29.png",
            btn: "УЧАСТВОВАТЬ"
        },
        {
            title: "750 FS",
            sub: "Забирай приветственный бонус на первый депозит!",
            img: "https://banda-prod-backend-client-bucket.s3.eu-central-1.amazonaws.com/banners/1728721451245_Welcome.png",
            btn: "ПОЛУЧИТЬ БОНУС"
        }
    ];

    // --- 2. ДАННЫЕ ДЛЯ РЯДОВ ИГР ---
    const rowConfigs = [
        { title: "Топ игры", id: "top", color: "cyan" },
        { title: "Новые игры", id: "new", color: "yellow" },
        { title: "Слоты", id: "slots", color: "purple" },
        { title: "Live казино", id: "live", color: "green" }
    ];

    const mockGames = [
        { name: "Gates of Olympus", provider: "Pragmatic", img: "http://static.photos/gaming/320x240/1" },
        { name: "Sweet Bonanza", provider: "Pragmatic", img: "http://static.photos/gaming/320x240/2" },
        { name: "Book of Dead", provider: "Play'n GO", img: "http://static.photos/gaming/320x240/3" },
        { name: "Sugar Rush", provider: "Pragmatic", img: "http://static.photos/gaming/320x240/4" },
        { name: "Razor Shark", provider: "Push Gaming", img: "http://static.photos/gaming/320x240/5" },
        { name: "The Dog House", provider: "Pragmatic", img: "http://static.photos/gaming/320x240/6" }
    ];

    // --- 3. ОТРИСОВКА БАННЕРОВ ---
    const sliderContainer = document.getElementById('slider-container');
    function renderBanners() {
        if (!sliderContainer) return;
        bannerData.forEach((b, i) => {
            const slide = document.createElement('div');
            slide.className = `absolute inset-0 w-full h-full transition-opacity duration-1000 ${i === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`;
            slide.innerHTML = `
                <img src="${b.img}" class="w-full h-full object-cover">
                <div class="absolute inset-0 banner-overlay flex flex-col justify-center px-8 md:px-16">
                    <h2 class="text-5xl md:text-7xl font-black text-cyan-400 mb-2 drop-shadow-2xl">${b.title}</h2>
                    <p class="text-lg md:text-2xl text-white/90 mb-8 max-w-md font-semibold">${b.sub}</p>
                    <button class="w-fit px-10 py-4 bg-cyan-500 text-black font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-cyan-500/30">
                        ${b.btn}
                    </button>
                </div>
            `;
            sliderContainer.appendChild(slide);
        });
    }

    // Логика слайдера
    let currentSlide = 0;
    function nextSlide() {
        const slides = sliderContainer.children;
        slides[currentSlide].classList.replace('opacity-100', 'opacity-0');
        slides[currentSlide].classList.replace('z-10', 'z-0');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.replace('opacity-0', 'opacity-100');
        slides[currentSlide].classList.replace('z-0', 'z-10');
    }
    setInterval(nextSlide, 6000);

    // --- 4. ОТРИСОВКА РЯДОВ ИГР ---
    const rowsGrid = document.getElementById('dynamic-rows');
    function renderRows() {
        if (!rowsGrid) return;
        
        rowConfigs.forEach(row => {
            const section = document.createElement('section');
            section.className = "animate-in";
            section.innerHTML = `
                <div class="flex items-center justify-between mb-5">
                    <h2 class="text-xl font-bold flex items-center gap-3">
                        <span class="w-1 h-6 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]"></span>
                        ${row.title}
                    </h2>
                    <button class="text-[10px] font-black text-gray-500 hover:text-white tracking-widest transition-colors">СМОТРЕТЬ ВСЕ</button>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    ${mockGames.map(game => `
                        <div class="game-card group rounded-2xl overflow-hidden cursor-pointer">
                            <div class="aspect-[4/3] relative">
                                <img src="${game.img}" class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                                    <div class="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-black shadow-lg shadow-cyan-500/40 transform scale-50 group-hover:scale-100 transition-transform">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="m7 3 14 9-14 9z"/></svg>
                                    </div>
                                </div>
                            </div>
                            <div class="p-3">
                                <h3 class="text-[11px] font-bold truncate text-gray-200">${game.name}</h3>
                                <p class="text-[9px] text-gray-500 font-bold uppercase mt-1 tracking-wider">${game.provider}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            rowsGrid.appendChild(section);
        });
    }

    // Запуск
    renderBanners();
    renderRows();

    // Мобильное меню (простой тоггл)
    const mobileBtn = document.getElementById('mobile-btn');
    mobileBtn?.addEventListener('click', () => {
        alert('Бро, тут будет выезжать меню как на мобилке!');
    });
});
