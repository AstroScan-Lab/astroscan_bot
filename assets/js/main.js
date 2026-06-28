(function(){
    "use strict";
    const ZODIACS = [
      { id:"rat", nameEn:"Rat", nameRu:"Крыса", nameEs:"Rata", nameHi:"चूहा", element:"water", triangle:0 },
      { id:"ox", nameEn:"Ox", nameRu:"Бык", nameEs:"Buey", nameHi:"बैल", element:"earth", triangle:1 },
      { id:"tiger", nameEn:"Tiger", nameRu:"Тигр", nameEs:"Tigre", nameHi:"बाघ", element:"wood", triangle:2 },
      { id:"rabbit", nameEn:"Rabbit", nameRu:"Кролик", nameEs:"Conejo", nameHi:"खरगोश", element:"wood", triangle:3 },
      { id:"dragon", nameEn:"Dragon", nameRu:"Дракон", nameEs:"Dragón", nameHi:"ड्रैगन", element:"fire", triangle:0 },
      { id:"snake", nameEn:"Snake", nameRu:"Змея", nameEs:"Serpiente", nameHi:"साँप", element:"fire", triangle:1 },
      { id:"horse", nameEn:"Horse", nameRu:"Лошадь", nameEs:"Caballo", nameHi:"घोड़ा", element:"fire", triangle:2 },
      { id:"goat", nameEn:"Goat", nameRu:"Коза", nameEs:"Cabra", nameHi:"बकरी", element:"earth", triangle:3 },
      { id:"monkey", nameEn:"Monkey", nameRu:"Обезьяна", nameEs:"Mono", nameHi:"बंदर", element:"metal", triangle:0 },
      { id:"rooster", nameEn:"Rooster", nameRu:"Петух", nameEs:"Gallo", nameHi:"मुर्गा", element:"metal", triangle:1 },
      { id:"dog", nameEn:"Dog", nameRu:"Собака", nameEs:"Perro", nameHi:"कुत्ता", element:"earth", triangle:2 },
      { id:"pig", nameEn:"Pig", nameRu:"Свинья", nameEs:"Cerdo", nameHi:"सुअर", element:"water", triangle:3 }
    ];
    const ELEMENT_NAMES = {
      water: { en: 'Water', ru: 'Вода', es: 'Agua', hi: 'जल' },
      earth: { en: 'Earth', ru: 'Земля', es: 'Tierra', hi: 'पृथ्वी' },
      wood: { en: 'Wood', ru: 'Дерево', es: 'Madera', hi: 'काष्ठ' },
      fire: { en: 'Fire', ru: 'Огонь', es: 'Fuego', hi: 'अग्नि' },
      metal: { en: 'Metal', ru: 'Металл', es: 'Metal', hi: 'धातु' }
    };
    const ARCHETYPES = [
      { id:"strategist", nameEn:"Strategist", nameRu:"Стратег", nameEs:"Estratega", nameHi:"रणनीतिकार", descEn:"Analytical, future-oriented planner", descRu:"Аналитик, планирует наперёд", descEs:"Planificador analítico", descHi:"विश्लेषणात्मक, भविष्य-उन्मुख योजनाकार" },
      { id:"diplomat", nameEn:"Diplomat", nameRu:"Дипломат", nameEs:"Diplomático", nameHi:"राजनयिक", descEn:"Seeks harmony, empathetic", descRu:"Ищет гармонию, эмпатичен", descEs:"Busca armonía, empático", descHi:"सद्भाव चाहता है, सहानुभूतिपूर्ण" },
      { id:"explorer", nameEn:"Explorer", nameRu:"Искатель", nameEs:"Explorador", nameHi:"अन्वेषक", descEn:"Spontaneous, loves novelty", descRu:"Спонтанный, любит новизну", descEs:"Espontáneo, ama la novedad", descHi:"सहज, नवीनता पसंद करता है" },
      { id:"guardian", nameEn:"Guardian", nameRu:"Хранитель", nameEs:"Guardián", nameHi:"संरक्षक", descEn:"Protective, loyal", descRu:"Заботливый, верный", descEs:"Protector, leal", descHi:"सुरक्षात्मक, वफादार" },
      { id:"innovator", nameEn:"Innovator", nameRu:"Новатор", nameEs:"Innovador", nameHi:"अन्वेषक", descEn:"Creative, non-conformist", descRu:"Креативный, нестандартный", descEs:"Creativo, inconformista", descHi:"रचनात्मक, गैर-अनुरूपतावादी" },
      { id:"stabilizer", nameEn:"Stabilizer", nameRu:"Стабилизатор", nameEs:"Estabilizador", nameHi:"स्थिरकर्ता", descEn:"Practical, detail-oriented", descRu:"Практичный, внимательный", descEs:"Práctico, detallista", descHi:"व्यावहारिक, विस्तार-उन्मुख" },
      { id:"visionary", nameEn:"Visionary", nameRu:"Визионер", nameEs:"Visionario", nameHi:"दूरदर्शी", descEn:"Big picture, inspirational", descRu:"Видит общую картину", descEs:"Visionario, inspirador", descHi:"बड़ी तस्वीर, प्रेरणादायक" },
      { id:"connector", nameEn:"Connector", nameRu:"Связной", nameEs:"Conector", nameHi:"संयोजक", descEn:"Social, builds networks", descRu:"Общительный, создаёт связи", descEs:"Social, construye redes", descHi:"सामाजिक, नेटवर्क बनाता है" }
    ];
    const zodiacToArchetype = { rat:0, ox:5, tiger:2, rabbit:1, dragon:4, snake:6, horse:3, goat:7, monkey:0, rooster:5, dog:1, pig:7 };
    const QUESTIONS = [
      { textEn:"When facing a difficult decision, you typically:", textRu:"Когда перед вами сложный выбор, вы обычно:", textEs:"Ante una decisión difícil, normalmente:", textHi:"जब एक कठिन निर्णय का सामना करना पड़ता है, तो आप आमतौर पर:", 
        optionsEn:["Analyze pros and cons","Trust your gut","Consult friends","Avoid deciding"],
        optionsRu:["Анализирую за и против","Доверяю интуиции","Советуюсь с друзьями","Избегаю решения"],
        optionsEs:["Analizo pros y contras","Confío en mi instinto","Consulto amigos","Evito decidir"],
        optionsHi:["फायदे और नुकसान का विश्लेषण करें","अपने अंतर्ज्ञान पर भरोसा करें","दोस्तों से सलाह लें","निर्णय लेने से बचें"],
        weights:[[0,0,2,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,2,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,2,0,0,0],[2,0,0,0,0,0,0,0,0,0,0,0]] },
      { textEn:"How do you react to sudden changes?", textRu:"Как вы реагируете на внезапные изменения?", textEs:"¿Cómo reaccionas ante cambios repentinos?", textHi:"अचानक परिवर्तनों पर आप कैसे प्रतिक्रिया करते हैं?", 
        optionsEn:["Embrace them","Get stressed but adapt","Prefer structure","Go with the flow"],
        optionsRu:["Принимаю с энтузиазмом","Стресс, но адаптируюсь","Предпочитаю структуру","Плыву по течению"],
        optionsEs:["Los acepto","Me estreso pero me adapto","Prefiero estructura","Me dejo llevar"],
        optionsHi:["उन्हें गले लगाओ","तनावग्रस्त हो जाओ लेकिन अनुकूलन करो","संरचना पसंद करो","प्रवाह के साथ चलो"],
        weights:[[0,0,2,0,0,0,2,0,0,0,0,0],[0,0,0,0,2,0,0,0,0,0,0,0],[2,0,0,0,0,0,0,0,0,2,0,0],[0,0,0,2,0,0,0,0,0,0,0,2]] },
      { textEn:"In a team project, you usually:", textRu:"В командном проекте вы обычно:", textEs:"En un proyecto de equipo, normalmente:", textHi:"एक टीम प्रोजेक्ट में, आप आमतौर पर:", 
        optionsEn:["Take the lead","Support others","Generate ideas","Mediate"],
        optionsRu:["Беру на себя лидерство","Поддерживаю других","Генерирую идеи","Выступаю посредником"],
        optionsEs:["Tomo el liderazgo","Apoyo a otros","Genero ideas","Medio"],
        optionsHi:["नेतृत्व लें","दूसरों का समर्थन करें","विचार उत्पन्न करें","मध्यस्थता करें"],
        weights:[[0,0,0,0,2,0,0,0,0,0,0,0],[2,0,0,0,0,0,0,2,0,0,0,0],[0,0,0,0,0,0,0,0,2,0,0,0],[0,0,0,2,0,0,0,0,0,0,0,2]] },
      { textEn:"Your ideal weekend is:", textRu:"Ваши идеальные выходные:", textEs:"Tu fin de semana ideal es:", textHi:"आपका आदर्श सप्ताहांत है:", 
        optionsEn:["Adventure","Relaxing at home","Socializing","Personal project"],
        optionsRu:["Приключения","Отдых дома","Общение с друзьями","Личный проект"],
        optionsEs:["Aventura","Relajarme en casa","Socializar","Proyecto personal"],
        optionsHi:["साहसिक कार्य","घर पर आराम करना","मेलजोल","व्यक्तिगत परियोजना"],
        weights:[[0,0,2,0,0,0,2,0,0,0,0,0],[2,0,0,0,0,0,0,2,0,0,0,0],[0,0,0,0,0,0,0,0,2,0,2,0],[0,2,0,0,0,2,0,0,0,0,0,0]] },
      { textEn:"When someone criticizes you, you:", textRu:"Когда вас критикуют, вы:", textEs:"Cuando te critican, tú:", textHi:"जब कोई आपकी आलोचना करता है, तो आप:", 
        optionsEn:["Analyze if it's fair","Feel hurt but learn","Defend yourself","Ignore it"],
        optionsRu:["Анализирую справедливость","Обижаюсь, но учусь","Защищаюсь","Игнорирую"],
        optionsEs:["Analizo si es justo","Me duele pero aprendo","Me defiendo","Lo ignoro"],
        optionsHi:["विश्लेषण करें कि क्या यह उचित है","आहत महसूस करें लेकिन सीखें","अपना बचाव करें","अनदेखा करें"],
        weights:[[0,0,0,0,0,2,0,0,0,0,0,0],[0,0,0,2,0,0,0,0,0,0,0,2],[0,0,2,0,0,0,2,0,0,0,0,0],[2,0,0,0,0,0,0,0,0,2,0,0]] },
      { textEn:"Your communication style is:", textRu:"Ваш стиль общения:", textEs:"Tu estilo de comunicación es:", textHi:"आपकी संचार शैली है:", 
        optionsEn:["Direct","Warm","Humorous","Reserved"],
        optionsRu:["Прямой","Тёплый","С юмором","Сдержанный"],
        optionsEs:["Directo","Cálido","Humorístico","Reservado"],
        optionsHi:["प्रत्यक्ष","गर्मजोशी","हास्यपूर्ण","आरक्षित"],
        weights:[[0,0,0,0,2,0,0,0,0,0,0,0],[0,0,0,2,0,0,0,0,0,0,0,2],[0,0,0,0,0,0,0,0,2,0,2,0],[2,0,0,0,0,2,0,0,0,0,0,0]] },
      { textEn:"What drives you most?", textRu:"Что вами движет больше всего?", textEs:"¿Qué te motiva más?", textHi:"आपको सबसे अधिक क्या प्रेरित करता है?", 
        optionsEn:["Success","Security","Freedom","Helping others"],
        optionsRu:["Успех","Безопасность","Свобода","Помощь другим"],
        optionsEs:["Éxito","Seguridad","Libertad","Ayudar a otros"],
        optionsHi:["सफलता","सुरक्षा","स्वतंत्रता","दूसरों की मदद करना"],
        weights:[[0,0,0,0,2,0,0,0,0,0,0,0],[2,0,0,0,0,0,0,2,0,0,0,0],[0,0,2,0,0,0,2,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,2,0]] },
      { textEn:"In a conflict, you tend to:", textRu:"В конфликте вы склонны:", textEs:"En un conflicto, tiendes a:", textHi:"एक संघर्ष में, आप की प्रवृत्ति होती है:", 
        optionsEn:["Confront directly","Seek compromise","Avoid the issue","Use humor"],
        optionsRu:["Прямо конфронтировать","Искать компромисс","Избегать","Использовать юмор"],
        optionsEs:["Confrontar directamente","Buscar compromiso","Evitar el problema","Usar humor"],
        optionsHi:["सीधे सामना करें","समझौता चाहें","मुद्दे से बचें","हास्य का प्रयोग करें"],
        weights:[[0,0,2,0,0,0,0,0,0,0,0,0],[0,0,0,2,0,0,0,0,0,0,0,2],[2,0,0,0,0,2,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,2,0,2,0]] },
      { textEn:"How do you recharge energy?", textRu:"Как вы восстанавливаете энергию?", textEs:"¿Cómo recargas energía?", textHi:"आप ऊर्जा कैसे पुनः प्राप्त करते हैं?", 
        optionsEn:["Being alone","Socializing","Physical activity","Creative hobbies"],
        optionsRu:["В одиночестве","Общаясь с людьми","Физическая активность","Творчество"],
        optionsEs:["Estando solo","Socializando","Actividad física","Pasatiempos creativos"],
        optionsHi:["अकेले रहना","मेलजोल","शारीरिक गतिविधि","रचनात्मक शौक"],
        weights:[[2,0,0,0,0,2,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,2,0,2,0],[0,0,2,0,0,0,2,0,0,0,0,0],[0,0,0,2,0,0,0,0,0,0,0,2]] },
      { textEn:"Your approach to rules is:", textRu:"Ваше отношение к правилам:", textEs:"Tu actitud hacia las reglas es:", textHi:"नियमों के प्रति आपका दृष्टिकोण है:", 
        optionsEn:["Follow strictly","Bend when needed","Question authority","Ignore if limiting"],
        optionsRu:["Строго соблюдаю","Обхожу при необходимости","Подвергаю сомнению","Игнорирую, если мешают"],
        optionsEs:["Sigo estrictamente","Las doblo si es necesario","Cuestiono la autoridad","Ignoro si limitan"],
        optionsHi:["सख्ती से पालन करें","आवश्यकता पड़ने पर मोड़ें","प्राधिकरण पर सवाल उठाएं","सीमित होने पर अनदेखा करें"],
        weights:[[2,0,0,0,0,0,0,0,0,2,0,0],[0,0,0,0,0,0,0,0,2,0,0,0],[0,0,2,0,0,0,2,0,0,0,0,0],[0,0,0,2,0,0,0,0,0,0,0,2]] }
    ];
    const LANGS = ['en','ru','hi','es'];
    const LANG_NAMES = { en:'English', ru:'Русский', hi:'हिन्दी', es:'Español' };
    let currentLang = 'en';
    function showToast(message, duration) {
      duration = duration || 3000;
      let container = document.querySelector('.toast-container');
      if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        container.setAttribute('role', 'region');
        container.setAttribute('aria-label', 'Notifications');
        document.body.appendChild(container);
      }
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-live', 'polite');
      toast.textContent = message;
      container.appendChild(toast);
      requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('visible')));
      setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
      }, duration);
    }
    const translations = {
      en: {
        ctaFooter: '⚡ GET FULL REPORT IN TELEGRAM',
        next: 'Next',
        result: 'See result',
        compatCheck: 'Check compatibility',
        share: 'Share',
        love: 'Love',
        friendship: 'Friendship',
        work: 'Work',
        greatHarmony: 'Great harmony!',
        goodPotential: 'Good potential, work on communication',
        challenging: 'Challenging but growth possible',
        dynamicCTATitle: 'Want a personalized report?',
        dynamicCTAText: 'We use Swiss Ephemeris to calculate your full natal chart. Get a detailed PDF report in our Telegram bot! Not sure yet? You can check sample PDF reports first and see for yourself.',
        dynamicCTABtn: '⚡ GET MY FULL AUDIT',
        selectPartner: 'Select partner sign',
        techTitle: '📡 Technology &amp; Astrological Traditions',
        techDesc: '<strong>AstroScan uses the Western tropical zodiac</strong> and professional Swiss Ephemeris v2.10. But how does your chart look in other systems?',
        westernVedic: '🌍 Western vs. Vedic (Jyotish)',
        westernVedicDesc: 'Western astrology focuses on the tropical zodiac (seasons), while Vedic astrology uses the sidereal zodiac (fixed stars). The difference is about 24° (Ayanamsha).',
        starsTitle: '⭐️ Telegram Stars',
        starsDesc: 'Spend XTR for lifetime access to audits. 200 Stars ≈ $2.80 USD.',
        forPros: '🧑‍🏫 For Professionals',
        forProsDesc: 'Generate white‑label reports in 2 minutes.',
        chooseAnalysis: '⚡ Choose Analysis',
        natal: '🌌 Natal',
        natalDesc: 'Sun, Moon, Rising',
        compat: '💞 Compat',
        compatDesc: 'Synastry',
        career: '💰 Career',
        careerDesc: 'Career &amp; Finance',
        child: '🧸 Child',
        childDesc: 'Child\'s Chart',
        faqTitle: '❓ FAQ',
        faqMoonQ: '🌙 Why does my Moon sign feel different from my personality?',
        faqMoonA: 'The Moon represents your subconscious — inner reactions and emotions that may not align with your conscious self. Your Moon sign complements your surface personality, revealing a deeper layer of your psyche.',
        faqMathQ: '🧮 Is astrology math or magic?',
        faqMathA: 'Planetary positions are calculated with high scientific precision using Swiss Ephemeris. The interpretation is a symbolic model that helps you understand yourself better.',
        faqZodiacQ: '🤔 How does the test determine my sign without my birth date?',
        faqZodiacA: 'We use 10 questions about your behavior in different life situations. Your answers are compared to unique psychological patterns of the 12 Chinese zodiac signs. This creates your "behavioral code" — no personal data needed.',
        faqCompatQ: '💑 How accurate is Chinese zodiac compatibility analysis?',
        faqCompatA: 'Our algorithm combines traditional Chinese compatibility triangles with the natural elements of the signs. For deeper synastry analysis (based on birth dates), use our Telegram bot.',
        faqWesternVedicQ: '🔭 What is the difference between Western and Vedic astrology?',
        faqWesternVedicA: 'Western astrology uses the tropical zodiac (based on seasons), while Vedic (Jyotish) uses the sidereal zodiac (fixed stars). The difference is about 24°. In our bot, you can get a full natal chart in the Western tradition.',
        faqFreeQ: '🆓 Is this truly free and reliable?',
        faqFreeA: 'Yes! The test, result, and basic compatibility are completely free and require no registration. We do not store any personal data on our servers — all information remains locally in your browser.',
        mercuryTracker: '📡 Mercury Retrograde Tracker',
        mercuryDesc: 'How strongly do you feel Mercury retrograde today? (0–10)',
        save: 'Save',
        copyLink: 'Copy link and share your result!',
        zcResultPrefix: 'You were born in the Year of the ',
        zcElementLabel: 'Element',
        zcCta: 'Want a full personality breakdown? Take the free archetype test above ↑'
      },
      ru: {
        ctaFooter: '⚡ ПОЛУЧИТЬ ПОЛНЫЙ РАЗБОР В TELEGRAM',
        next: 'Далее',
        result: 'Узнать результат',
        compatCheck: 'Проверить совместимость',
        share: 'Поделиться',
        love: 'Любовь',
        friendship: 'Дружба',
        work: 'Работа',
        greatHarmony: 'Отличная гармония!',
        goodPotential: 'Хороший потенциал, работайте над общением',
        challenging: 'Сложно, но возможен рост',
        dynamicCTATitle: 'Хотите персонализированный отчёт?',
        dynamicCTAText: 'Мы используем Швейцарские эфемериды для расчёта вашей полной натальной карты. Получите подробный PDF-отчёт в нашем Telegram-боте! Не уверены? Сначала можете посмотреть примеры отчётов и убедиться сами.',
        dynamicCTABtn: '⚡ ПОЛУЧИТЬ ПОЛНЫЙ АУДИТ',
        selectPartner: 'Выберите знак партнёра',
        techTitle: '📡 Технологии и астрологические традиции',
        techDesc: '<strong>AstroScan использует западный тропический зодиак</strong> и профессиональные швейцарские эфемериды Swiss Ephemeris v2.10. Но как ваша карта выглядит в других системах?',
        westernVedic: '🌍 Западная vs. Ведическая (Джйотиш)',
        westernVedicDesc: 'Западная астрология опирается на тропический зодиак (привязанный к временам года), тогда как ведическая использует сидерический зодиак (фиксированные звёзды). Разница составляет около 24° (Айанамша).',
        starsTitle: '⭐️ Telegram Stars',
        starsDesc: 'Потратьте XTR на пожизненный доступ к аудитам. 200 Звёзд ≈ 250-300 руб.',
        forPros: '🧑‍🏫 Для астрологов',
        forProsDesc: 'Генерируйте white‑label отчёты за 2 минуты.',
        chooseAnalysis: '⚡ Выберите анализ',
        natal: '🌌 Натальная',
        natalDesc: 'Солнце, Луна, Асцендент',
        compat: '💞 Совместимость',
        compatDesc: 'Синастрия',
        career: '💰 Карьера',
        careerDesc: 'Карьера и финансы',
        child: '🧸 Детская',
        childDesc: 'Детская карта',
        faqTitle: '❓ Часто задаваемые вопросы',
        faqMoonQ: '🌙 Почему мой лунный знак иногда кажется непохожим на меня?',
        faqMoonA: 'Луна отражает наше подсознание — внутренние реакции и эмоции, которые не всегда совпадают с тем, как мы осознаём себя. Ваш лунный знак дополняет сознательную личность, показывая более глубокий срез вашего «я».',
        faqMathQ: '🧮 Астрология — это математика или магия?',
        faqMathA: 'Позиции планет вычисляются с высокой научной точностью на основе астрономических таблиц (Swiss Ephemeris). Интерпретация — это символическая модель, помогающая лучше понять себя.',
        faqZodiacQ: '🤔 Как тест определяет мой знак без даты рождения?',
        faqZodiacA: 'Мы используем 10 вопросов о вашем поведении в разных жизненных ситуациях. Ответы сравниваются с уникальными психологическими паттернами 12 знаков китайского зодиака. Это ваш «поведенческий код», для которого не нужны личные данные.',
        faqCompatQ: '💑 Насколько точен анализ совместимости по восточному календарю?',
        faqCompatA: 'Наш алгоритм учитывает как традиционные «треугольники совместимости» китайской астрологии, так и взаимодействие природных стихий знаков. Для углублённого анализа синастрии (по датам рождения) воспользуйтесь нашим Telegram-ботом.',
        faqWesternVedicQ: '🔭 Чем отличается западная астрология от ведической?',
        faqWesternVedicA: 'Западная система опирается на тропический зодиак (привязанный к временам года), а ведическая (Джйотиш) — на сидерический (точное положение звёзд). Разница между ними составляет около 24°. В нашем боте можно получить натальную карту по западной системе, а также сравнить её с другими подходами на уровне описаний.',
        faqFreeQ: '🆓 Это действительно бесплатно и надёжно?',
        faqFreeA: 'Да! Тест, результат и базовая совместимость полностью бесплатны и не требуют регистрации. Мы не храним ваши персональные данные на серверах — вся информация остаётся локально в вашем браузере.',
        mercuryTracker: '📡 Трекер ретроградного Меркурия',
        mercuryDesc: 'Насколько сильно вы ощущаете влияние ретроградного Меркурия сегодня? (0–10)',
        save: 'Сохранить',
        copyLink: 'Скопируйте ссылку и поделитесь результатом!',
        zcResultPrefix: 'Вы родились в год ',
        zcElementLabel: 'Элемент',
        zcCta: 'Хотите полный разбор личности? Пройдите бесплатный тест на архетип выше ↑'
      },
      hi: {
        ctaFooter: '⚡ टेलीग्राम में पूरी रिपोर्ट प्राप्त करें',
        next: 'अगला',
        result: 'परिणाम देखें',
        compatCheck: 'अनुकूलता जांचें',
        share: 'शेयर करें',
        love: 'प्रेम',
        friendship: 'मित्रता',
        work: 'कार्य',
        greatHarmony: 'बहुत अच्छा सामंजस्य!',
        goodPotential: 'अच्छी संभावना, संचार पर काम करें',
        challenging: 'चुनौतीपूर्ण लेकिन विकास संभव',
        dynamicCTATitle: 'एक व्यक्तिगत रिपोर्ट चाहिए?',
        dynamicCTAText: 'हम आपकी पूरी जन्म कुंडली की गणना करने के लिए स्विस एफेमेरिस का उपयोग करते हैं। हमारे टेलीग्राम बॉट में एक विस्तृत पीडीएफ रिपोर्ट प्राप्त करें! अभी तय नहीं कर पाए? पहले नमूना रिपोर्ट देख लें और खुद देखकर तय करें।',
        dynamicCTABtn: '⚡ मेरा पूरा ऑडिट प्राप्त करें',
        selectPartner: 'साथी का चिन्ह चुनें',
        techTitle: '📡 प्रौद्योगिकी और ज्योतिषीय परंपराएं',
        techDesc: '<strong>AstroScan पश्चिमी उष्णकटिबंधीय राशि चक्र</strong> और पेशेवर स्विस एफेमेरिस v2.10 का उपयोग करता है। लेकिन अन्य प्रणालियों में आपका चार्ट कैसा दिखता है?',
        westernVedic: '🌍 पश्चिमी बनाम वैदिक (ज्योतिष)',
        westernVedicDesc: 'पश्चिमी ज्योतिष उष्णकटिबंधीय राशि चक्र (मौसम) पर केंद्रित है, जबकि वैदिक ज्योतिष नाक्षत्र राशि चक्र (स्थिर तारे) का उपयोग करता है। अंतर लगभग 24° (अयनांश) है।',
        starsTitle: '⭐️ टेलीग्राम स्टार्स',
        starsDesc: 'ऑडिट तक आजीवन पहुंच के लिए XTR खर्च करें। 200 स्टार्स ≈ $2.80 USD।',
        forPros: '🧑‍🏫 पेशेवरों के लिए',
        forProsDesc: '2 मिनट में व्हाइट-लेबल रिपोर्ट तैयार करें।',
        chooseAnalysis: '⚡ विश्लेषण चुनें',
        natal: '🌌 जन्म कुंडली',
        natalDesc: 'सूर्य, चंद्रमा, लग्न',
        compat: '💞 अनुकूलता',
        compatDesc: 'सिनेस्ट्री',
        career: '💰 करियर',
        careerDesc: 'करियर और वित्त',
        child: '🧸 बच्चा',
        childDesc: 'बच्चे की कुंडली',
        faqTitle: '❓ सामान्य प्रश्न',
        faqMoonQ: '🌙 मेरा चंद्र राशिफल मेरे व्यक्तित्व से अलग क्यों लगता है?',
        faqMoonA: 'चंद्रमा आपके अवचेतन मन को दर्शाता है - आंतरिक प्रतिक्रियाएं और भावनाएं, जो हमेशा आपके सचेत व्यक्तित्व से मेल नहीं खातीं। आपका चंद्र राशिफल आपके व्यक्तित्व की गहरी परतों को उजागर करता है।',
        faqMathQ: '🧮 क्या ज्योतिष गणित है या जादू?',
        faqMathA: 'ग्रहों की स्थिति की गणना स्विस एफेमेरिस जैसे वैज्ञानिक उपकरणों से की जाती है। व्याख्या एक प्रतीकात्मक मॉडल है जो आत्म-समझ में मदद करती है।',
        faqZodiacQ: '🤔 बिना जन्मतिथि के यह टेस्ट मेरी राशि कैसे जान लेता है?',
        faqZodiacA: 'हम आपके व्यवहार पर 10 प्रश्न पूछते हैं। आपके उत्तरों की तुलना 12 चीनी राशियों के अद्वितीय मनोवैज्ञानिक पैटर्न से की जाती है। यह आपका "व्यवहार कोड" है, जिसके लिए किसी व्यक्तिगत डेटा की आवश्यकता नहीं है।',
        faqCompatQ: '💑 चीनी राशिफल के अनुसार अनुकूलता विश्लेषण कितना सटीक है?',
        faqCompatA: 'हमारा एल्गोरिदम चीनी ज्योतिष के पारंपरिक "अनुकूलता त्रिकोण" और राशियों के प्राकृतिक तत्वों दोनों का उपयोग करता है। अधिक गहन विश्लेषण के लिए, हमारे टेलीग्राम बॉट का उपयोग करें।',
        faqWesternVedicQ: '🔭 पश्चिमी और वैदिक ज्योतिष में क्या अंतर है?',
        faqWesternVedicA: 'पश्चिमी ज्योतिष उष्णकटिबंधीय राशि चक्र (मौसम आधारित) का उपयोग करता है, जबकि वैदिक (ज्योतिष) नाक्षत्र राशि चक्र (स्थिर तारों) का। इसमें लगभग 24° का अंतर होता है। हमारे बॉट में आप पश्चिमी परंपरा में जन्म कुंडली प्राप्त कर सकते हैं।',
        faqFreeQ: '🆓 क्या यह वास्तव में मुफ़्त और विश्वसनीय है?',
        faqFreeA: 'हाँ! यह परीक्षण, परिणाम और बुनियादी अनुकूलता पूरी तरह से मुफ़्त है और इसके लिए किसी पंजीकरण की आवश्यकता नहीं है। हम आपका कोई भी व्यक्तिगत डेटा अपने सर्वर पर संग्रहीत नहीं करते हैं - सारी जानकारी आपके ब्राउज़र में स्थानीय रूप से रहती है।',
        mercuryTracker: '📡 बुध वक्री ट्रैकर',
        mercuryDesc: 'आज आप बुध के वक्री होने का कितना प्रभाव महसूस कर रहे हैं? (0–10)',
        save: 'सहेजें',
        copyLink: 'लिंक कॉपी करें और अपना परिणाम साझा करें!',
        zcResultPrefix: 'आपका जन्म वर्ष है ',
        zcElementLabel: 'तत्व',
        zcCta: 'पूरा व्यक्तित्व विश्लेषण चाहते हैं? ऊपर मुफ़्त आर्कटाइप टेस्ट लें ↑'
      },
      es: {
        ctaFooter: '⚡ OBTÉN INFORME COMPLETO EN TELEGRAM',
        next: 'Siguiente',
        result: 'Ver resultado',
        compatCheck: 'Ver compatibilidad',
        share: 'Compartir',
        love: 'Amor',
        friendship: 'Amistad',
        work: 'Trabajo',
        greatHarmony: '¡Gran armonía!',
        goodPotential: 'Buen potencial, trabaja en la comunicación',
        challenging: 'Difícil pero posible crecimiento',
        dynamicCTATitle: '¿Quieres un informe personalizado?',
        dynamicCTAText: 'Usamos Swiss Ephemeris para calcular tu carta natal completa. ¡Obtén un informe PDF detallado en nuestro bot de Telegram! ¿No estás seguro? Primero puedes ver ejemplos de informes y comprobarlo tú mismo.',
        dynamicCTABtn: '⚡ OBTENER MI AUDITORÍA COMPLETA',
        selectPartner: 'Elige el signo de tu pareja',
        techTitle: '📡 Tecnología y Tradiciones Astrológicas',
        techDesc: '<strong>AstroScan utiliza el zodíaco tropical occidental</strong> y las efemérides suizas profesionales Swiss Ephemeris v2.10. Pero, ¿cómo se ve tu carta en otros sistemas?',
        westernVedic: '🌍 Occidental vs. Védica (Jyotish)',
        westernVedicDesc: 'La astrología occidental se basa en el zodíaco tropical (estaciones), mientras que la védica utiliza el zodíaco sideral (estrellas fijas). La diferencia es de unos 24° (Ayanamsha).',
        starsTitle: '⭐️ Estrellas de Telegram',
        starsDesc: 'Gasta XTR para acceso de por vida a auditorías. 200 Estrellas ≈ $2.80 USD.',
        forPros: '🧑‍🏫 Para Profesionales',
        forProsDesc: 'Genera informes white‑label en 2 minutos.',
        chooseAnalysis: '⚡ Elige Análisis',
        natal: '🌌 Natal',
        natalDesc: 'Sol, Luna, Ascendente',
        compat: '💞 Compatibilidad',
        compatDesc: 'Sinastría',
        career: '💰 Carrera',
        careerDesc: 'Carrera y Finanzas',
        child: '🧸 Infantil',
        childDesc: 'Carta Infantil',
        faqTitle: '❓ Preguntas Frecuentes',
        faqMoonQ: '🌙 ¿Por qué mi signo lunar se siente diferente a mi personalidad?',
        faqMoonA: 'La Luna representa tu subconsciente: reacciones y emociones internas que pueden no alinearse con tu yo consciente. Tu signo lunar complementa tu personalidad superficial, revelando una capa más profunda.',
        faqMathQ: '🧮 ¿Es la astrología matemática o magia?',
        faqMathA: 'Las posiciones planetarias se calculan con precisión científica utilizando Swiss Ephemeris. La interpretación es un modelo simbólico que te ayuda a comprenderte mejor.',
        faqZodiacQ: '🤔 ¿Cómo determina el test mi signo sin mi fecha de nacimiento?',
        faqZodiacA: 'Usamos 10 preguntas sobre tu comportamiento en diferentes situaciones. Tus respuestas se comparan con patrones psicológicos únicos de los 12 signos del zodíaco chino. Esto crea tu "código de comportamiento", sin necesidad de datos personales.',
        faqCompatQ: '💑 ¿Qué tan preciso es el análisis de compatibilidad del zodíaco chino?',
        faqCompatA: 'Nuestro algoritmo combina triángulos de compatibilidad chinos tradicionales con los elementos naturales de los signos. Para un análisis de sinastría más profundo (basado en fechas de nacimiento), usa nuestro bot de Telegram.',
        faqWesternVedicQ: '🔭 ¿Cuál es la diferencia entre la astrología occidental y la védica?',
        faqWesternVedicA: 'La astrología occidental utiliza el zodíaco tropical (basado en estaciones), mientras que la védica (Jyotish) utiliza el zodíaco sideral (estrellas fijas). La diferencia es de unos 24°. En nuestro bot, puedes obtener una carta natal en la tradición occidental.',
        faqFreeQ: '🆓 ¿Es esto realmente gratis y fiable?',
        faqFreeA: '¡Sí! El test, el resultado y la compatibilidad básica son completamente gratis y no requieren registro. No almacenamos ningún dato personal en nuestros servidores; todo permanece localmente en tu navegador.',
        mercuryTracker: '📡 Rastreador de Mercurio retrógrado',
        mercuryDesc: '¿Cuánto sientes la influencia de Mercurio retrógrado hoy? (0–10)',
        save: 'Guardar',
        copyLink: '¡Copia el enlace y comparte tu resultado!',
        zcResultPrefix: 'Naciste en el Año del ',
        zcElementLabel: 'Elemento',
        zcCta: '¿Quieres un análisis completo de personalidad? Haz el test de arquetipo gratis arriba ↑'
      },
    };
    function setLang(lang) {
      currentLang = lang;
      document.body.className = document.body.className.replace(/lang-\w+/g,'');
      document.body.classList.add(`lang-${lang}`);
      localStorage.setItem('astroscan_lang', lang);
      const canonicalUrl = lang === 'en' 
          ? 'https://astroscan-lab.github.io/astroscan_bot/' 
          : `https://astroscan-lab.github.io/astroscan_bot/${lang}/`;
      document.querySelector('link[rel="canonical"]').setAttribute('href', canonicalUrl);
      document.documentElement.lang = lang;
      const url = new URL(window.location);
      if (lang === 'en') url.searchParams.delete('lang');
      else url.searchParams.set('lang', lang);
      window.history.replaceState(null, '', url);
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      document.getElementById(`lang-${lang}`)?.classList.add('active');
      const t = translations[lang];
      document.getElementById('cta-footer').textContent = t.ctaFooter;
      if (!window.currentQuizState) renderApp();
      else if (window.currentQuizState === 'quiz') renderApp();
      else if (window.currentQuizState === 'result') renderResult();
      renderZodiacCalcResult();
    }
    function detectLang() {
      // Each deployed page is genuinely single-language (baked by build.py from
      // template.html), so data-forced-lang is authoritative — content for any
      // other language doesn't exist in this page's DOM.
      const forced = document.documentElement.getAttribute('data-forced-lang');
      return (forced && LANGS.includes(forced)) ? forced : 'en';
    }
    function buildLangBar() {
      const bar = document.getElementById('lang-bar');
      LANGS.forEach(l => {
        const btn = document.createElement('button');
        btn.id = `lang-${l}`;
        btn.className = 'lang-btn';
        btn.textContent = LANG_NAMES[l];
        btn.dataset.lang = l;
        btn.setAttribute('aria-label', `Switch to ${LANG_NAMES[l]}`);
        btn.onclick = () => {
          window.location.href = l === 'en'
            ? 'https://astroscan-lab.github.io/astroscan_bot/'
            : `https://astroscan-lab.github.io/astroscan_bot/${l}/`;
        };
        bar.appendChild(btn);
      });
      setLang(detectLang());
    }
    let userScores = new Array(12).fill(0);
    let currentQuestion = 0;
    let answers = [];
    let userZodiac = null;
    let userArchetype = null;
    let partnerSign = 'rat';
    let context = 'love';
    function getZodiacName(z) { return z[`name${currentLang.charAt(0).toUpperCase()+currentLang.slice(1)}`] || z.nameEn; }
    function getElementName(elementKey) { return (ELEMENT_NAMES[elementKey] && ELEMENT_NAMES[elementKey][currentLang]) || ELEMENT_NAMES[elementKey].en; }
    function zodiacByYear(year) {
      const idx = ((year - 1900) % 12 + 12) % 12;
      return ZODIACS[idx];
    }
    function renderZodiacCalcResult() {
      const input = document.getElementById('zcYearInput');
      const out = document.getElementById('zcResult');
      if (!input || !out) return;
      const year = parseInt(input.value, 10);
      if (!year || year < 1900 || year > 2026) { out.textContent = ''; return; }
      const z = zodiacByYear(year);
      out.textContent = '';
      userZodiac = z.id;
      userArchetype = zodiacToArchetype[userZodiac];
      window.currentQuizState = 'result';
      renderResult();
      showGlobalCTA();
      document.getElementById('appRoot').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    function bindZodiacCalculator() {
      const btn = document.getElementById('zcCalcBtn');
      const input = document.getElementById('zcYearInput');
      if (!btn || !input) return;
      btn.addEventListener('click', renderZodiacCalcResult);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') renderZodiacCalcResult(); });
    }
    function getArchetypeName(a) { return a[`name${currentLang.charAt(0).toUpperCase()+currentLang.slice(1)}`] || a.nameEn; }
    function getArchetypeDesc(a) { return a[`desc${currentLang.charAt(0).toUpperCase()+currentLang.slice(1)}`] || a.descEn; }
    function compatibilityScore(sign1, sign2, ctx) {
      const z1 = ZODIACS.find(z=>z.id===sign1);
      const z2 = ZODIACS.find(z=>z.id===sign2);
      if(!z1||!z2) return 0;
      let triangleBonus = (z1.triangle === z2.triangle) ? 0.6 : (Math.abs(z1.triangle - z2.triangle) === 2 ? 0.2 : 0.4);
      const harmony = { water:["wood"], wood:["fire"], fire:["earth"], earth:["metal"], metal:["water"] };
      let elementBonus = harmony[z1.element]?.includes(z2.element) ? 0.4 : (z1.element===z2.element ? 0.3 : 0.1);
      let base = (triangleBonus + elementBonus) * 100;
      if(ctx==="friendship") base += 5;
      if(ctx==="work") base += (z1.triangle===z2.triangle?10:-5);
      return Math.min(99, Math.max(15, Math.round(base)));
    }
    function finishTest() {
      let maxIdx = userScores.reduce((iMax, x, i, arr)=> x > arr[iMax] ? i : iMax, 0);
      userZodiac = ZODIACS[maxIdx].id;
      userArchetype = zodiacToArchetype[userZodiac];
      window.currentQuizState = 'result';
      renderResult();
      showGlobalCTA();
      showDynamicCTA();
    }
    function showGlobalCTA() { document.getElementById('global-cta-bar').classList.add('visible'); }
    function showDynamicCTA() {
      const t = translations[currentLang];
      const container = document.getElementById('dynamic-cta');
      if (!container) return;
      container.innerHTML = `
        <div class="result-card" style="border-left-color: #fbbf24;">
          <h3 style="color: #fbbf24; margin-bottom: 0.5rem;">${t.dynamicCTATitle}</h3>
          <p style="margin-bottom: 1rem;">${t.dynamicCTAText}</p>
          <a href="https://t.me/ASTROSCAN_BOT" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-block;">${t.dynamicCTABtn}</a>
        </div>
      `;
    }
    function renderApp() {
      const app = document.getElementById('appRoot');
      if (!userZodiac) {
        if (currentQuestion < QUESTIONS.length) {
          const q = QUESTIONS[currentQuestion];
          const t = translations[currentLang];
          const questionText = q[`text${currentLang.charAt(0).toUpperCase()+currentLang.slice(1)}`] || q.textEn;
          const options = q[`options${currentLang.charAt(0).toUpperCase()+currentLang.slice(1)}`] || q.optionsEn;
          const optsHtml = options.map((opt, idx) => `<button class="option-btn" data-opt="${idx}" type="button" role="radio" aria-checked="false">${opt}</button>`).join('');
          app.innerHTML = `
            <div class="card">
              <div class="progress-bar"><div class="progress-fill" style="width:${(currentQuestion/QUESTIONS.length)*100}%"></div></div>
              <div class="question-text" id="questionLabel">${questionText}</div>
              <div class="options" role="radiogroup" aria-labelledby="questionLabel">${optsHtml}</div>
              <button class="btn-primary" id="nextBtn">${currentQuestion === QUESTIONS.length-1 ? t.result : t.next}</button>
            </div>`;
          document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              document.querySelectorAll('.option-btn').forEach(b => { b.classList.remove('selected'); b.setAttribute('aria-checked', 'false'); });
              btn.classList.add('selected');
              btn.setAttribute('aria-checked', 'true');
              answers[currentQuestion] = parseInt(btn.dataset.opt);
            });
          });
          document.getElementById('nextBtn').addEventListener('click', () => {
            if (answers[currentQuestion] === undefined) return;
            const weights = QUESTIONS[currentQuestion].weights[answers[currentQuestion]];
            for (let i=0; i<12; i++) userScores[i] += weights[i];
            if (currentQuestion + 1 < QUESTIONS.length) { currentQuestion++; renderApp(); }
            else { finishTest(); }
          });
          window.currentQuizState = 'quiz';
        } else { finishTest(); }
      } else { renderResult(); }
    }
    function drawCompatCard(zodiacName, archName, scoreText) {
      return new Promise((resolve) => {
        const W = 1200, H = 630;
        const canvas = document.createElement('canvas');
        canvas.width = W; canvas.height = H;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#0a0718';
        ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = '#b76eff';
        ctx.lineWidth = 6;
        ctx.strokeRect(20, 20, W - 40, H - 40);
        ctx.fillStyle = '#b9b0d9';
        ctx.font = '600 30px system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('AstroScan', 70, 95);
        ctx.fillStyle = '#f0eaff';
        ctx.font = '700 46px system-ui, sans-serif';
        let title = zodiacName + ' · ' + archName;
        const maxW = W - 140;
        while (ctx.measureText(title).width > maxW && title.length > 4) { title = title.slice(0, -2); }
        ctx.fillText(title, 70, 190);
        ctx.fillStyle = '#b76eff';
        ctx.font = '700 140px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(scoreText, W / 2, 400);
        ctx.fillStyle = '#b9b0d9';
        ctx.font = '400 24px system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('astroscan-lab.github.io/astroscan_bot', 70, H - 55);
        canvas.toBlob((blob) => resolve(blob), 'image/png');
      });
    }
    function renderResult() {
      const app = document.getElementById('appRoot');
      const zodiac = ZODIACS.find(z => z.id === userZodiac);
      const arch = ARCHETYPES[userArchetype];
      const t = translations[currentLang];
      const partnerOptions = ZODIACS.map(z => `<option value="${z.id}">${getZodiacName(z)}</option>`).join('');
      const compat = compatibilityScore(userZodiac, partnerSign, context);
      app.innerHTML = `
        <div class="card">
          <h2 style="color: var(--text-light); background: none; -webkit-text-fill-color: currentColor; border-left: 5px solid var(--accent-primary); padding-left: 1.2rem;">${getZodiacName(zodiac)} – ${getArchetypeName(arch)}</h2>
          <p style="margin-bottom: 1rem;">${getArchetypeDesc(arch)}</p>
          <hr style="margin:1rem 0; border-color:var(--border-dim);">
          <label style="display: block; margin-bottom: 0.5rem;">${t.selectPartner}</label>
          <select id="partnerSelect" style="width: 100%; padding: 0.8rem; background: rgba(10,7,24,0.7); border: 1px solid var(--border-dim); border-radius: 2rem; color: var(--text-light);">${partnerOptions}</select>
          <div class="context-tabs">
            <button class="context-tab ${context==='love'?'active':''}" data-ctx="love">${t.love}</button>
            <button class="context-tab ${context==='friendship'?'active':''}" data-ctx="friendship">${t.friendship}</button>
            <button class="context-tab ${context==='work'?'active':''}" data-ctx="work">${t.work}</button>
          </div>
          <div id="compatDisplay" class="text-center" aria-live="polite">
            <div class="compat-score">${compat}%</div>
            <p>${compat>70 ? t.greatHarmony : compat>40 ? t.goodPotential : t.challenging}</p>
          </div>
          <button class="btn-primary" id="checkCompat">${t.compatCheck}</button>
          <div id="dynamic-cta"></div>
          <button class="btn-secondary" id="shareBtn" style="margin-left: 0;">${t.share}</button>
        </div>
        <div class="card">
          <h3>${t.mercuryTracker}</h3>
          <p>${t.mercuryDesc}</p>
          <input type="range" id="mercurySlider" min="0" max="10" value="5" class="tracker-slider">
          <div id="trackerValue">5</div>
          <button id="saveTracker" class="btn-secondary">${t.save}</button>
          <div id="trackerChart"></div>
        </div>`;
      document.getElementById('partnerSelect').value = partnerSign;
      document.getElementById('checkCompat').addEventListener('click', () => {
        partnerSign = document.getElementById('partnerSelect').value;
        const newCompat = compatibilityScore(userZodiac, partnerSign, context);
        document.getElementById('compatDisplay').innerHTML = `<div class="compat-score">${newCompat}%</div><p>${newCompat>70 ? t.greatHarmony : newCompat>40 ? t.goodPotential : t.challenging}</p>`;
      });
      document.querySelectorAll('.context-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          context = tab.dataset.ctx;
          document.querySelectorAll('.context-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const newCompat = compatibilityScore(userZodiac, partnerSign, context);
          document.getElementById('compatDisplay').innerHTML = `<div class="compat-score">${newCompat}%</div><p>${newCompat>70 ? t.greatHarmony : newCompat>40 ? t.goodPotential : t.challenging}</p>`;
        });
      });
      document.getElementById('shareBtn').addEventListener('click', async () => {
        const scoreEl = document.querySelector('#compatDisplay .compat-score');
        const scoreText = scoreEl ? scoreEl.textContent : compat + '%';
        try {
          const blob = await drawCompatCard(getZodiacName(zodiac), getArchetypeName(arch), scoreText);
          const file = new File([blob], 'astroscan-result.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: 'AstroScan', text: window.location.href });
            return;
          }
          if (navigator.share) { await navigator.share({ title: 'AstroScan Result', url: window.location.href }); return; }
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url; a.download = 'astroscan-result.png';
          document.body.appendChild(a); a.click(); document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch (e) {
          if (navigator.share) { navigator.share({ title: 'AstroScan Result', url: window.location.href }); }
          else { showToast(t.copyLink); }
        }
      });
      function getTrackerData() {
        try { return JSON.parse(localStorage.getItem('astro_tracker') || '{}'); } catch(e) { localStorage.removeItem('astro_tracker'); return {}; }
      }
      let trackerData = getTrackerData();
      function updateTrackerUI() {
        let today = new Date().toISOString().slice(0,10);
        let val = trackerData[today] || 5;
        document.getElementById('mercurySlider').value = val;
        document.getElementById('trackerValue').innerText = val;
        let chartHtml = '<div class="chart-bars">';
        for(let i=6;i>=0;i--){
          let d = new Date(); d.setDate(d.getDate()-i);
          let key = d.toISOString().slice(0,10);
          let score = trackerData[key] || 0;
          let height = score * 6 + 10;
          chartHtml += `<div class="chart-bar"><div class="bar-fill" style="height:${height}px"></div><div class="bar-label">${key.slice(5)}</div></div>`;
        }
        chartHtml += '</div>';
        document.getElementById('trackerChart').innerHTML = chartHtml;
      }
      document.getElementById('mercurySlider').oninput = (e) => document.getElementById('trackerValue').innerText = e.target.value;
      document.getElementById('saveTracker').onclick = () => {
        let today = new Date().toISOString().slice(0,10);
        trackerData[today] = parseInt(document.getElementById('mercurySlider').value);
        localStorage.setItem('astro_tracker', JSON.stringify(trackerData));
        updateTrackerUI();
      };
      updateTrackerUI();
      showDynamicCTA();
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('fade-up')) entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '100px', threshold: 0.1 });
    function init() {
      buildLangBar();
      renderApp();
      bindZodiacCalculator();
      const sections = document.querySelectorAll('.card:not(#appRoot .card)');
      sections.forEach(section => {
        if (!section.classList.contains('fade-up')) section.classList.add('fade-up');
        observer.observe(section);
      });
    }
    init();
  })();
