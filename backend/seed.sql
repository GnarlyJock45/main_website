-- Azwa | seed data (events + packages)
-- Only runs when tables are empty (Python init handles this).
-- IDs are stable and match the local seed in js/app.js so nothing shuffles
-- between the initial paint and the server hydration.

insert into events
  (id, title_ar, title_en, category, event_date, event_time, venue, district,
   distance_km, price, points, multiplier, image_url, image_pos, description,
   popular, nearby, map_query)
values
  -- ---------- Riyadh ----------
  (1,  'مباراة الهلال × النصر',       'Al Hilal × Al Nassr',         'sport',      '2026-07-25', '9:00 م',  'استاد المملكة أرينا',   'الرياض',    6.2, 150, 340, '3X', 'assets/events/hilal-nassr.jpg',      'center 35%', 'ديربي الرياض. أجواء استثنائية، هتافات ذهبية، وليلة كرة قدم لا تُنسى في استاد المملكة أرينا.', 1, 1, 'Kingdom Arena Riyadh'),
  (3,  'سينما VOX',                   'VOX Cinemas',                 'cinema',     '2026-07-18', '7:00 م',  'VOX Riyadh Park',        'الرياض',    2.3,  55,  90, '2X', 'assets/events/vox.jpg',              'center',     'استمتع بأحدث الأفلام العربية والعالمية بتجربة عرض متميزة، مع خصم 20% لأعضاء عزوة.', 1, 1, 'VOX Cinemas Riyadh Park Mall'),
  (4,  'سيكس فلاغز مدينة القدية',      'Six Flags Qiddiya City',      'themepark',  '2026-08-02', '4:00 م',  'مدينة القدية',           'القدية',  38.0, 170, 340, '3X', 'assets/events/six-flags.jpg',        'center',     'أكبر مدينة ألعاب في المنطقة تفتح أبوابها. أفعوانيات عالمية، عروض ترفيهية، ومغامرات لا تنتهي.', 1, 0, 'Six Flags Qiddiya City'),
  (5,  'أكواريبيا مدينة القدية',       'Aquarabia Qiddiya',           'water',      '2026-08-10', '2:00 م',  'مدينة القدية',           'القدية',  40.0, 130, 210, '2X', 'assets/events/qiddiya.png',          'center',     'مدينة الألعاب المائية الأكبر في الشرق الأوسط. زحاليق متطرفة، أمواج، ومسابح للعائلة.', 1, 0, 'Aquarabia Qiddiya City'),
  (7,  'BattleKart الرياض',            'BattleKart Riyadh',           'games',      '2026-07-22', '6:00 م',  'غرناطة مول',            'غرناطة',     5.8, 110, 150, '2X', 'assets/events/battlekart.jpg',       'center',     'كارتينج تفاعلي بتقنية الواقع المعزز — تحدَّ أصدقاءك في سباقات مبتكرة.', 1, 1, 'BattleKart Riyadh'),
  (8,  'سوبر بارك الرياض',             'SuperPark Riyadh',            'family',     '2026-07-20', '11:00 ص', 'خريص',                   'خريص',       8.4,  80, 100, '2X', null,                                  null,         'مدينة ألعاب داخلية للعائلة — أنشطة حركية، ملاعب، وتجارب تفاعلية للأطفال والكبار.', 0, 1, 'SuperPark Riyadh'),
  (9,  'SENSAS تجربة الحواس الخمس',    'SENSAS Experience',           'experience', '2026-08-05', '8:00 م',  'روف مول',                'الياسمين',   9.2, 120, 180, '2X', 'assets/events/sensas.jpg',           'center',     'رحلة حسية فريدة تُشغّل حواسك الخمس عبر ألغاز وتحديات في بيئات مصممة بعناية.', 0, 1, 'Roof Mall Riyadh'),
  (12, 'يلا بولينغ',                   'Yalla Bowling',               'games',      '2026-07-19', '7:00 م',  'غرناطة مول',            'غرناطة',     5.6,  60,  80, '2X', 'assets/events/bowling.jpg',          'center',     'أمسية بولينغ عائلية مع خصم 20% لأعضاء عزوة.', 0, 1, 'Granada Mall Riyadh'),
  -- ---------- KSA-wide ----------
  (20, 'تجربة صخرة الفيل، العلا',      'Elephant Rock, AlUla',        'experience', '2026-09-15', '5:00 م',  'صخرة الفيل',             'العلا',   1080.0, 220, 320, '3X', 'assets/events/alula-elephant-rock.jpg','center 55%', 'زيارة إلى معلم صخرة الفيل الشهير عند غروب الشمس مع جلسة قهوة عربية.', 1, 0, 'Elephant Rock AlUla'),
  (21, 'أمسية مرايا العلا',             'Maraya Concert Hall, AlUla',  'experience', '2026-11-20', '8:30 م',  'قاعة مرايا',             'العلا',   1080.0, 550, 900, '3X', 'assets/events/alula-maraya.jpg',      'center',     'حفل موسيقي داخل أكبر مبنى بواجهة مرآة في العالم، في قلب صحراء العلا.', 1, 0, 'Maraya Concert Hall AlUla'),
  (22, 'كورنيش جدة والنافورة',         'Jeddah Corniche',             'family',     '2026-08-14', '6:00 م',  'كورنيش جدة',             'جدة',      950.0,  30,  40, '2X', 'assets/events/jeddah-corniche.jpg',   'center',     'أمسية عائلية على الواجهة البحرية، وشاهد نافورة الملك فهد.', 1, 0, 'Jeddah Corniche'),
  (23, 'جدة التاريخية — البلد',        'Historic Jeddah (Al-Balad)',  'experience', '2026-09-05', '4:30 م',  'حي البلد',                'جدة',      950.0,  80, 130, '2X', 'assets/events/jeddah-al-balad.jpg',   'center',     'جولة إرشادية في الحيّ المُدرج ضمن التراث العالمي: البيوت الحجازية والرواشين والأزقة.', 0, 0, 'Al Balad Jeddah'),
  (24, 'عشاء تراس البجيري، الدرعية',    'Bujairi Terrace, Diriyah',    'food',       '2026-07-30', '7:30 م',  'تراس البجيري',           'الدرعية',   25.0, 180, 260, '2X', 'assets/events/diriyah-bujairi.jpg',   'center',     'عشاء نجدي معاصر بإطلالة على حي الطريف التاريخي في الدرعية.', 1, 1, 'Bujairi Terrace Diriyah'),
  (25, 'رحلة أبها وعسير',              'Abha & Aseer Highlands',      'experience', '2026-09-25', '8:00 ص',  'تلفريك أبها',            'أبها',     900.0, 320, 480, '3X', 'assets/events/abha-aseer.jpg',        'center',     'يوم كامل بين مرتفعات عسير والقرى المدرّجة، مع جولة تلفريك تُطل على الجبال الخضراء.', 0, 0, 'Abha Cable Car'),
  (26, 'حافة العالم',                  'Edge of the World',           'experience', '2026-10-10', '3:00 م',  'جبل فهرين',              'خارج الرياض', 95.0, 250, 400, '3X', 'assets/events/edge-of-world.jpg',    'center',     'رحلة بالدفع الرباعي إلى الحافة الشهيرة، مع غروب الشمس والعشاء في المخيم.', 1, 0, 'Edge of the World Riyadh'),
  (27, 'بوليفارد وورلد',                'Boulevard World, Riyadh',     'themepark',  '2026-07-28', '7:00 م',  'بوليفارد وورلد',         'الرياض',     5.0,  90, 130, '3X', 'assets/events/riyadh-boulevard.jpg', 'center',     'تنقّل بين مناطق العالم في ليلة واحدة — الصين، إسبانيا، اليونان، أمريكا — مع عروض حية ومطاعم.', 1, 1, 'Boulevard World Riyadh');


insert into packages
  (id, title_ar, title_en, description, price, points, multiplier,
   image_url, image_pos, cover_category, region, popular)
values
  (101, 'مغامرة العلا',                'AlUla Adventure',
        'باقة تجمع صخرة الفيل وأمسية مرايا — بسعر أقل من شرائهما منفصلين.',
        700.0, 1300, '3X',
        'assets/events/alula-elephant-rock.jpg', 'center 55%',
        'experience', 'AlUla', 1),
  (102, 'عطلة نهاية أسبوع في جدة',     'Jeddah Weekend',
        'يومان في جدة: نزهة على الكورنيش وجولة في البلد التاريخية.',
        100.0, 200, '2X',
        'assets/events/jeddah-corniche.jpg', 'center',
        'family', 'Jeddah', 1),
  (103, 'ثلاثية الرياض العائلية',       'Riyadh Family Trio',
        'يوم في سيكس فلاغز + سوبر بارك + جولة في بوليفارد وورلد. توفير على السعر الكامل.',
        300.0, 600, '3X',
        'assets/events/six-flags.jpg', 'center',
        'themepark', 'Riyadh', 1);


insert into package_items (package_id, event_id, position) values
  -- AlUla Adventure
  (101, 20, 1),  -- Elephant Rock
  (101, 21, 2),  -- Maraya
  -- Jeddah Weekend
  (102, 22, 1),  -- Corniche
  (102, 23, 2),  -- Al-Balad
  -- Riyadh Family Trio
  (103, 4,  1),  -- Six Flags
  (103, 8,  2),  -- SuperPark
  (103, 27, 3);  -- Boulevard World
