document.addEventListener('DOMContentLoaded', () => {
    const banners = [
        {
            id: 1,
            image: "image/1775227610378_GRAND%20EASTER%20HEIST%20Tournament%20%281%29.png",
            title: "500 000 €",
            subtitle: "Пасхальный турнир от Endorphina!"
        },
        {
            id: 2,
            image: "image/1763640463036_Fortune_Bags_Site_Promo_%28Banda%29.png",
            title: "Испытай Удачу",
            subtitle: "вместе с Fortune Bags!"
        },
        {
            id: 3,
            image: "image/1758107613594_New_games.png",
            title: "Свежак на районе!",
            subtitle: "Новые игры уже здесь!"
        },
        {
            id: 4,
            image: "image/1728721451245_Welcome.png",
            title: "750 ФС",
            subtitle: "Вот это приветственный БОНУС!"
        },
        {
            id: 5,
            image: "https://banda-prod-backend-client-bucket.s3.eu-central-1.amazonaws.com/banners/1728731135783_Wheel.png",
            title: "Колесо Фортуны",
            subtitle: "Крути колесо каждый день!"
        }
    ];

    const games = [
        { id: 1, name: "Gates of Olympus", provider: "Pragmatic", category: "slots", image: "image/1752687405755_320Volcanoes3.webp" },
        { id: 2, name: "Sweet Bonanza", provider: "Pragmatic", category: "slots", image: "image/Piggy.webp" },
        { id: 3, name: "Book of Dead", provider: "Play'n GO", category: "slots", image: "image/1769715461541_Pray20Six.webp" },
        { id: 4, name: "Razor Shark", provider: "Push Gaming", category: "slots", image: "image/Mummy.webp" },
        { id: 5, name: "Money Train 4", provider: "Relax", category: "new", image: "image/Raceday.webp" },
        { id: 6, name: "Roulette Live", provider: "Evolution", category: "live", image: "image/Eternal.webp" },
        { id: 7, name: "Blackjack VIP", provider: "Evolution", category: "live", image: "image/Floating+Dragon+Megaways.webp" },
        { id: 8, name: "Mega Wheel", provider: "Pragmatic", category: "live", image: "image/Princess+Suki.webp" },
        { id: 9, name: "Fruit Party", provider: "Pragmatic", category: "slots", image: "image/Santa+Mummy.webp" },
        { id: 10, name: "The Dog House", provider: "Pragmatic", category: "slots", image: "image/Treasures+of+Aztec.webp" },
        { id: 11, name: "Starburst", provider: "NetEnt", category: "slots", image: "image/Yakuza+Honor.webp" },
        { id: 12, name: "Gonzo's Quest", provider: "NetEnt", category: "slots", image: "image/1752687405755_320Volcanoes3.webp" },
        { id: 13, name: "Wolf Gold", provider: "Pragmatic", category: "slots", image: "image/1752687405755_320Volcanoes3.webp" },
        { id: 14, name: "Fire Joker", provider: "Play'n GO", category: "slots", image: "image/1752687405755_320Volcanoes3.webp" },
        { id: 15, name: "Bonanza", provider: "BTG", category: "slots", image: "image/1752687405755_320Volcanoes3.webp" },
        { id: 16, name: "Legacy of Dead", provider: "Play'n GO", category: "slots", image: "image/1752687405755_320Volcanoes3.webp" }
    ];
    let currentSlide = 0;
    let currentGameLimit = 6;
    const totalSlides = banners.length;
    function initSlider() {
        const sliderContainer = document.getElementById('hero-slider');
        const indicatorsContainer = document.getElementById('slider-indicators');
        
        if (!sliderContainer || !indicatorsContainer) return;

        sliderContainer.innerHTML = '';
        indicatorsContainer.innerHTML = '';

        banners.forEach((banner, index) => {
            const slide = document.createElement('div');
            slide.className = 'min-w-full h-full relative';
            slide.innerHTML = `
                <img src="${banner.image}" alt="${banner.title}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-banda-dark via-transparent to-transparent opacity-80"></div>
                <div class="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10">
                    <h2 class="text-3xl md:text-5xl font-extrabold mb-2 text-white drop-shadow-lg">${banner.title}</h2>
                    <p class="text-lg md:text-xl text-gray-200 mb-4 drop-shadow-md">${banner.subtitle}</p>
                </div>
            `;
            sliderContainer.appendChild(slide);

            const dot = document.createElement('button');
            dot.className = `w-2.5 h-2.5 rounded-full transition-all ${index === 0 ? 'bg-banda-primary w-6' : 'bg-white/50'}`;
            dot.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(dot);
        });
    }

    function updateSlider() {
        const sliderContainer = document.getElementById('hero-slider');
        const indicatorsContainer = document.getElementById('slider-indicators');
        if (!sliderContainer) return;

        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        if (indicatorsContainer) {
            Array.from(indicatorsContainer.children).forEach((dot, index) => {
                dot.className = index === currentSlide 
                    ? 'w-6 h-2.5 rounded-full bg-banda-primary transition-all' 
                    : 'w-2.5 h-2.5 rounded-full bg-white/50 transition-all';
            });
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }
    let slideInterval = setInterval(nextSlide, 5000);
    const heroSliderParent = document.getElementById('hero-slider')?.parentElement;
    if (heroSliderParent) {
        heroSliderParent.addEventListener('mouseenter', () => clearInterval(slideInterval));
        heroSliderParent.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 5000));
    }
    document.getElementById('next-slide')?.addEventListener('click', nextSlide);
    document.getElementById('prev-slide')?.addEventListener('click', prevSlide);
    function renderGames(limit) {
        const gamesGrid = document.getElementById('games-grid');
        if (!gamesGrid) return;
        
        gamesGrid.innerHTML = '';
        const gamesToShow = games.slice(0, limit);

        gamesToShow.forEach((game, index) => {
            const card = document.createElement('div');
            card.className = 'game-card group relative rounded-xl overflow-hidden bg-banda-card cursor-pointer border border-white/5 opacity-0';
            card.style.animation = `fadeIn 0.5s ease-out ${index * 0.05}s forwards`;

            card.innerHTML = `
                <div class="aspect-[4/3] overflow-hidden relative">
                    <img src="${game.image}" alt="${game.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                    <div class="play-overlay absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                        <button class="w-12 h-12 rounded-full bg-banda-primary text-banda-darker flex items-center justify-center mb-2 hover:scale-110 transition-transform shadow-lg shadow-orange-500/30">
                            <i data-lucide="play" class="fill-current w-5 h-5 ml-1"></i>
                        </button>
                        <span class="text-xs font-bold text-white">Играть</span>
                    </div>
                    <div class="absolute top-2 right-2">
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-black/70 text-white backdrop-blur-sm uppercase">${game.provider}</span>
                    </div>
                </div>
                <div class="p-3">
                    <h3 class="font-medium text-sm truncate text-gray-200 group-hover:text-banda-primary transition-colors">${game.name}</h3>
                </div>
            `;
            gamesGrid.appendChild(card);
        });
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    const loadMoreBtn = document.getElementById('load-more-games');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.innerHTML = '<div class="w-5 h-5 border-2 border-banda-primary border-t-transparent rounded-full animate-spin mx-auto"></div>';
            
            setTimeout(() => {
                currentGameLimit += 6;
                if (currentGameLimit >= games.length) {
                    currentGameLimit = games.length;
                    this.style.display = 'none';
                }
                renderGames(currentGameLimit);
                this.innerHTML = 'Показать еще';
            }, 600);
        });
    }

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMobileMenuBtn = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    function toggleMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.toggle('translate-x-full'); 
        mobileMenu.classList.toggle('translate-x-0');
        document.body.classList.toggle('overflow-hidden');
    }

    mobileMenuBtn?.addEventListener('click', toggleMenu);
    closeMobileMenuBtn?.addEventListener('click', toggleMenu);
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('py-2', 'shadow-2xl', 'bg-banda-darker/95');
            header.classList.remove('py-4');
        } else {
            header.classList.remove('py-2', 'shadow-2xl', 'bg-banda-darker/95');
            header.classList.add('py-4');
        }
    });

    initSlider();
    renderGames(currentGameLimit);
    
    if (window.lucide) {
        window.lucide.createIcons();
    }
});
