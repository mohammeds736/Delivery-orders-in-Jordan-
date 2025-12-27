const DEMO_SEED = {
  settings: {
    restaurantName: "لقمان أبو صليح",
    isOpenNow: true,
    deliveryFeeJOD: 1.5,
    minOrderJOD: 8,
    workingHoursText: "12:00 ظهرًا - 12:00 ليلًا",
    countryLabel: "الأردن",
    cityLabel: "عمّان"
  },

  categories: [
    { id: "cat_deals", name: "عروض الدجاج (قطع)", isActive: true, sort: 1 },
    { id: "cat_shawarma", name: "شاورما", isActive: true, sort: 2 },
    { id: "cat_snacks", name: "سناكات", isActive: true, sort: 3 },
    { id: "cat_meals", name: "وجبات", isActive: true, sort: 4 },
    { id: "cat_sides", name: "المقبلات", isActive: true, sort: 5 }
  ],

  items: [
    // ===================== عروض الدجاج (قطع) =====================
    {
      id: "it_deal_4",
      categoryId: "cat_deals",
      name: "عرض 4 قطع",
      desc: "1 بطاطا + 1 ثوم + 1 خبز + مشروب غازي",
      priceJOD: 3.49,
      imageUrl: "https://source.unsplash.com/featured/900x650?fried-chicken&sig=1",
      isAvailable: true
    },
    {
      id: "it_deal_8_plain",
      categoryId: "cat_deals",
      name: "عرض 8 قطع (سادة)",
      desc: "8 قطع + بطاطا",
      priceJOD: 4.49,
      imageUrl: "https://source.unsplash.com/featured/900x650?chicken-bucket&sig=2",
      isAvailable: true
    },
    {
      id: "it_deal_8_combo",
      categoryId: "cat_deals",
      name: "عرض 8 قطع (كومبو)",
      desc: "2 بطاطا + 2 ثوم + 2 خبز + 1 لتر مشروب غازي + كولسلو",
      priceJOD: 6.49,
      imageUrl: "https://source.unsplash.com/featured/900x650?fried-chicken,fries&sig=3",
      isAvailable: true
    },
    {
      id: "it_deal_12",
      categoryId: "cat_deals",
      name: "عرض 12 قطعة",
      desc: "1 بطاطا عائلي + 3 ثوم + 3 خبز + 1 لتر مشروب غازي + كولسلو",
      priceJOD: 9.99,
      imageUrl: "https://source.unsplash.com/featured/900x650?crispy-chicken&sig=4",
      isAvailable: true
    },
    {
      id: "it_deal_16",
      categoryId: "cat_deals",
      name: "عرض 16 قطعة",
      desc: "1 بطاطا عائلي + 4 ثوم + 4 خبز + 2 لتر مشروب غازي + كولسلو",
      priceJOD: 12.99,
      imageUrl: "https://source.unsplash.com/featured/900x650?fried-chicken,party-food&sig=5",
      isAvailable: true
    },
    {
      id: "it_deal_20",
      categoryId: "cat_deals",
      name: "عرض 20 قطعة",
      desc: "1 بطاطا عائلي + 6 ثوم + 6 خبز + 2 لتر مشروب غازي + كولسلو",
      priceJOD: 15.99,
      imageUrl: "https://source.unsplash.com/featured/900x650?chicken,fast-food&sig=6",
      isAvailable: true
    },
    {
      id: "it_deal_24",
      categoryId: "cat_deals",
      name: "عرض 24 قطعة",
      desc: "2 بطاطا عائلي + 6 ثوم + 12 خبز + 2 لتر مشروب غازي + كولسلو",
      priceJOD: 18.99,
      imageUrl: "https://source.unsplash.com/featured/900x650?fried-chicken,sharing&sig=7",
      isAvailable: true
    },

    // ===================== شاورما =====================
    {
      id: "it_sh_01",
      categoryId: "cat_shawarma",
      name: "ساندويش شاورما عادي",
      desc: "شاورما + خبز + صوصات",
      priceJOD: 0.60,
      imageUrl: "https://source.unsplash.com/featured/900x650?shawarma,wrap&sig=11",
      isAvailable: true
    },
    {
      id: "it_sh_02",
      categoryId: "cat_shawarma",
      name: "ساندويش شاورما سوبر",
      desc: "حجم أكبر + إضافات",
      priceJOD: 1.20,
      imageUrl: "https://source.unsplash.com/featured/900x650?shawarma,sandwich&sig=12",
      isAvailable: true
    },
    {
      id: "it_sh_03",
      categoryId: "cat_shawarma",
      name: "ساندويش شاورما أكرم",
      desc: "حجم مميز + صوص خاص",
      priceJOD: 1.75,
      imageUrl: "https://source.unsplash.com/featured/900x650?shawarma,arabic-food&sig=13",
      isAvailable: true
    },
    {
      id: "it_sh_04",
      categoryId: "cat_shawarma",
      name: "وجبة شاورما عادي",
      desc: "ساندويش + بطاطا + مشروب",
      priceJOD: 2.00,
      imageUrl: "https://source.unsplash.com/featured/900x650?shawarma,fries&sig=14",
      isAvailable: true
    },
    {
      id: "it_sh_05",
      categoryId: "cat_shawarma",
      name: "وجبة شاورما سوبر",
      desc: "سوبر + بطاطا + مشروب",
      priceJOD: 2.50,
      imageUrl: "https://source.unsplash.com/featured/900x650?shawarma,meal&sig=15",
      isAvailable: true
    },
    {
      id: "it_sh_06",
      categoryId: "cat_shawarma",
      name: "وجبة شاورما دبل",
      desc: "دبل + بطاطا + مشروب",
      priceJOD: 3.25,
      imageUrl: "https://source.unsplash.com/featured/900x650?shawarma,plate&sig=16",
      isAvailable: true
    },
    {
      id: "it_sh_07",
      categoryId: "cat_shawarma",
      name: "وجبة شاورما تريبل",
      desc: "تريبل + بطاطا + مشروب",
      priceJOD: 4.00,
      imageUrl: "https://source.unsplash.com/featured/900x650?shawarma,big&sig=17",
      isAvailable: true
    },
    {
      id: "it_sh_08",
      categoryId: "cat_shawarma",
      name: "وجبة شاورما إيطالي",
      desc: "ستايل إيطالي + صوصات",
      priceJOD: 3.50,
      imageUrl: "https://source.unsplash.com/featured/900x650?wrap,grilled&sig=18",
      isAvailable: true
    },
    {
      id: "it_sh_09",
      categoryId: "cat_shawarma",
      name: "وجبة شاورما حلبي",
      desc: "ستايل حلبي + نكهة خاصة",
      priceJOD: 3.25,
      imageUrl: "https://source.unsplash.com/featured/900x650?shawarma,chicken&sig=19",
      isAvailable: true
    },
    {
      id: "it_sh_10",
      categoryId: "cat_shawarma",
      name: "وجبة توفير",
      desc: "خيار اقتصادي (حسب المتوفر)",
      priceJOD: 8.00,
      imageUrl: "https://source.unsplash.com/featured/900x650?arabic-meal&sig=20",
      isAvailable: true
    },
    {
      id: "it_sh_11",
      categoryId: "cat_shawarma",
      name: "وجبة عائلي",
      desc: "عائلية (حسب المتوفر)",
      priceJOD: 10.00,
      imageUrl: "https://source.unsplash.com/featured/900x650?family-meal&sig=21",
      isAvailable: true
    },
    {
      id: "it_sh_12",
      categoryId: "cat_shawarma",
      name: "وجبة عائلي (كبير)",
      desc: "عائلية كبيرة (حسب المتوفر)",
      priceJOD: 12.00,
      imageUrl: "https://source.unsplash.com/featured/900x650?family-dinner&sig=22",
      isAvailable: true
    },

    // ===================== سناكات =====================
    { id:"it_sn_01", categoryId:"cat_snacks", name:"زنجر", desc:"سناك زنجر", priceJOD:1.75, imageUrl:"https://source.unsplash.com/featured/900x650?zinger,sandwich&sig=31", isAvailable:true },
    { id:"it_sn_02", categoryId:"cat_snacks", name:"برجر", desc:"سناك برجر", priceJOD:1.25, imageUrl:"https://source.unsplash.com/featured/900x650?burger&sig=32", isAvailable:true },
    { id:"it_sn_03", categoryId:"cat_snacks", name:"اسكالوب", desc:"سناك اسكالوب", priceJOD:1.25, imageUrl:"https://source.unsplash.com/featured/900x650?chicken-sandwich&sig=33", isAvailable:true },
    { id:"it_sn_04", categoryId:"cat_snacks", name:"فاهيتا", desc:"سناك فاهيتا", priceJOD:1.75, imageUrl:"https://source.unsplash.com/featured/900x650?fajita,wrap&sig=34", isAvailable:true },
    { id:"it_sn_05", categoryId:"cat_snacks", name:"كوردن بلو", desc:"سناك كوردن بلو", priceJOD:1.75, imageUrl:"https://source.unsplash.com/featured/900x650?cordon-bleu&sig=35", isAvailable:true },
    { id:"it_sn_06", categoryId:"cat_snacks", name:"مكسيكي", desc:"سناك مكسيكي", priceJOD:1.75, imageUrl:"https://source.unsplash.com/featured/900x650?mexican,wrap&sig=36", isAvailable:true },
    { id:"it_sn_07", categoryId:"cat_snacks", name:"فرانسيسكو", desc:"سناك فرانسيسكو", priceJOD:1.75, imageUrl:"https://source.unsplash.com/featured/900x650?sub-sandwich&sig=37", isAvailable:true },
    { id:"it_sn_08", categoryId:"cat_snacks", name:"تشكين مشروم", desc:"سناك تشكن مشروم", priceJOD:1.75, imageUrl:"https://source.unsplash.com/featured/900x650?chicken,mushroom,sandwich&sig=38", isAvailable:true },
    { id:"it_sn_09", categoryId:"cat_snacks", name:"تركي + جبنة", desc:"سناك تركي مع جبنة", priceJOD:1.75, imageUrl:"https://source.unsplash.com/featured/900x650?turkey,cheese,sandwich&sig=39", isAvailable:true },
    { id:"it_sn_10", categoryId:"cat_snacks", name:"برجر عملاق", desc:"سناك برجر عملاق", priceJOD:2.00, imageUrl:"https://source.unsplash.com/featured/900x650?big-burger&sig=40", isAvailable:true },

    // ===================== وجبات =====================
    { id:"it_m_01", categoryId:"cat_meals", name:"وجبة برجر مكس", desc:"برجر + بطاطا + مشروب", priceJOD:2.50, imageUrl:"https://source.unsplash.com/featured/900x650?burger,fries&sig=51", isAvailable:true },
    { id:"it_m_02", categoryId:"cat_meals", name:"وجبة زنجر", desc:"زنجر + بطاطا + مشروب", priceJOD:2.25, imageUrl:"https://source.unsplash.com/featured/900x650?fried-chicken-sandwich,fries&sig=52", isAvailable:true },
    { id:"it_m_03", categoryId:"cat_meals", name:"وجبة فاهيتا", desc:"فاهيتا + بطاطا + مشروب", priceJOD:2.25, imageUrl:"https://source.unsplash.com/featured/900x650?fajita,meal&sig=53", isAvailable:true },
    { id:"it_m_04", categoryId:"cat_meals", name:"وجبة فرانسيسكو", desc:"فرانسيسكو + بطاطا + مشروب", priceJOD:2.25, imageUrl:"https://source.unsplash.com/featured/900x650?sandwich,fries&sig=54", isAvailable:true },
    { id:"it_m_05", categoryId:"cat_meals", name:"وجبة كوردن بلو", desc:"كوردن بلو + بطاطا + مشروب", priceJOD:2.25, imageUrl:"https://source.unsplash.com/featured/900x650?cordon-bleu,fries&sig=55", isAvailable:true },
    { id:"it_m_06", categoryId:"cat_meals", name:"وجبة تشكن مشروم", desc:"تشكن مشروم + بطاطا + مشروب", priceJOD:2.25, imageUrl:"https://source.unsplash.com/featured/900x650?chicken,mushroom,meal&sig=56", isAvailable:true },

    // ===================== المقبلات =====================
    { id:"it_s_01", categoryId:"cat_sides", name:"صحن بطاطا صغير", desc:"", priceJOD:0.50, imageUrl:"https://source.unsplash.com/featured/900x650?fries&sig=61", isAvailable:true },
    { id:"it_s_02", categoryId:"cat_sides", name:"صحن بطاطا كبير", desc:"", priceJOD:1.00, imageUrl:"https://source.unsplash.com/featured/900x650?french-fries&sig=62", isAvailable:true },
    { id:"it_s_03", categoryId:"cat_sides", name:"صحن بطاطا مع جبنة", desc:"", priceJOD:1.00, imageUrl:"https://source.unsplash.com/featured/900x650?cheese-fries&sig=63", isAvailable:true },
    { id:"it_s_04", categoryId:"cat_sides", name:"علبة سلطة كولسلو", desc:"", priceJOD:0.50, imageUrl:"https://source.unsplash.com/featured/900x650?coleslaw&sig=64", isAvailable:true },
    { id:"it_s_05", categoryId:"cat_sides", name:"سلطة خيار لبن", desc:"", priceJOD:0.50, imageUrl:"https://source.unsplash.com/featured/900x650?cucumber,yogurt&sig=65", isAvailable:true },
    { id:"it_s_06", categoryId:"cat_sides", name:"سلطة عربية", desc:"", priceJOD:0.50, imageUrl:"https://source.unsplash.com/featured/900x650?salad&sig=66", isAvailable:true },
    { id:"it_s_07", categoryId:"cat_sides", name:"دقوس", desc:"", priceJOD:0.50, imageUrl:"https://source.unsplash.com/featured/900x650?sauce&sig=67", isAvailable:true },
    { id:"it_s_08", categoryId:"cat_sides", name:"طحينية", desc:"", priceJOD:0.50, imageUrl:"https://source.unsplash.com/featured/900x650?tahini&sig=68", isAvailable:true },
    { id:"it_s_09", categoryId:"cat_sides", name:"مخلل", desc:"", priceJOD:0.50, imageUrl:"https://source.unsplash.com/featured/900x650?pickles&sig=69", isAvailable:true },
    { id:"it_s_10", categoryId:"cat_sides", name:"شوربة خضار", desc:"", priceJOD:0.50, imageUrl:"https://source.unsplash.com/featured/900x650?vegetable-soup&sig=70", isAvailable:true },
    { id:"it_s_11", categoryId:"cat_sides", name:"شوربة عدس", desc:"", priceJOD:0.50, imageUrl:"https://source.unsplash.com/featured/900x650?lentil-soup&sig=71", isAvailable:true },
    { id:"it_s_12", categoryId:"cat_sides", name:"مشروب غازي", desc:"", priceJOD:0.35, imageUrl:"https://source.unsplash.com/featured/900x650?soft-drink&sig=72", isAvailable:true },
    { id:"it_s_13", categoryId:"cat_sides", name:"مياه صغير", desc:"", priceJOD:0.25, imageUrl:"https://source.unsplash.com/featured/900x650?water-bottle&sig=73", isAvailable:true }
  ]
};
