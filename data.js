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
    { id:"it_deal_4", categoryId:"cat_deals", name:"عرض 4 قطع", desc:"1 بطاطا + 1 ثوم + 1 خبز + مشروب غازي", priceJOD:3.49, imageUrl:"https://source.unsplash.com/1200x800/?fried-chicken,fries", isAvailable:true },
    { id:"it_deal_8_plain", categoryId:"cat_deals", name:"عرض 8 قطع (سادة)", desc:"8 قطع + بطاطا", priceJOD:4.49, imageUrl:"https://source.unsplash.com/1200x800/?fried-chicken,bucket", isAvailable:true },
    { id:"it_deal_8_combo", categoryId:"cat_deals", name:"عرض 8 قطع (كومبو)", desc:"2 بطاطا + 2 ثوم + 2 خبز + 1 لتر مشروب غازي + كولسلو", priceJOD:6.49, imageUrl:"https://source.unsplash.com/1200x800/?chicken-bucket,fast-food", isAvailable:true },
    { id:"it_deal_12", categoryId:"cat_deals", name:"عرض 12 قطعة", desc:"1 بطاطا عائلي + 3 ثوم + 3 خبز + 1 لتر مشروب غازي + كولسلو", priceJOD:9.99, imageUrl:"https://source.unsplash.com/1200x800/?crispy-chicken,fries", isAvailable:true },
    { id:"it_deal_16", categoryId:"cat_deals", name:"عرض 16 قطعة", desc:"1 بطاطا عائلي + 4 ثوم + 4 خبز + 2 لتر مشروب غازي + كولسلو", priceJOD:12.99, imageUrl:"https://source.unsplash.com/1200x800/?fried-chicken,party-food", isAvailable:true },
    { id:"it_deal_20", categoryId:"cat_deals", name:"عرض 20 قطعة", desc:"1 بطاطا عائلي + 6 ثوم + 6 خبز + 2 لتر مشروب غازي + كولسلو", priceJOD:15.99, imageUrl:"https://source.unsplash.com/1200x800/?chicken,bucket,meal", isAvailable:true },
    { id:"it_deal_24", categoryId:"cat_deals", name:"عرض 24 قطعة", desc:"2 بطاطا عائلي + 6 ثوم + 12 خبز + 2 لتر مشروب غازي + كولسلو", priceJOD:18.99, imageUrl:"https://source.unsplash.com/1200x800/?fried-chicken,sharing", isAvailable:true },

    { id:"it_sh_01", categoryId:"cat_shawarma", name:"ساندويش شاورما عادي", desc:"شاورما + خبز + صوصات", priceJOD:0.60, imageUrl:"https://source.unsplash.com/1200x800/?shawarma,wrap", isAvailable:true },
    { id:"it_sh_02", categoryId:"cat_shawarma", name:"ساندويش شاورما سوبر", desc:"حجم أكبر + إضافات", priceJOD:1.20, imageUrl:"https://source.unsplash.com/1200x800/?shawarma,sandwich", isAvailable:true },
    { id:"it_sh_03", categoryId:"cat_shawarma", name:"ساندويش شاورما أكرم", desc:"حجم مميز + صوص خاص", priceJOD:1.75, imageUrl:"https://source.unsplash.com/1200x800/?shawarma,arabic-food", isAvailable:true },
    { id:"it_sh_04", categoryId:"cat_shawarma", name:"وجبة شاورما عادي", desc:"ساندويش + بطاطا + مشروب", priceJOD:2.00, imageUrl:"https://source.unsplash.com/1200x800/?shawarma,fries", isAvailable:true },
    { id:"it_sh_05", categoryId:"cat_shawarma", name:"وجبة شاورما سوبر", desc:"سوبر + بطاطا + مشروب", priceJOD:2.50, imageUrl:"https://source.unsplash.com/1200x800/?shawarma,meal", isAvailable:true },
    { id:"it_sh_06", categoryId:"cat_shawarma", name:"وجبة شاورما دبل", desc:"دبل + بطاطا + مشروب", priceJOD:3.25, imageUrl:"https://source.unsplash.com/1200x800/?shawarma,plate", isAvailable:true },
    { id:"it_sh_07", categoryId:"cat_shawarma", name:"وجبة شاورما تريبل", desc:"تريبل + بطاطا + مشروب", priceJOD:4.00, imageUrl:"https://source.unsplash.com/1200x800/?shawarma,big", isAvailable:true },
    { id:"it_sh_08", categoryId:"cat_shawarma", name:"وجبة شاورما إيطالي", desc:"ستايل إيطالي + صوصات", priceJOD:3.50, imageUrl:"https://source.unsplash.com/1200x800/?shawarma,grilled", isAvailable:true },
    { id:"it_sh_09", categoryId:"cat_shawarma", name:"وجبة شاورما حلبي", desc:"ستايل حلبي + نكهة خاصة", priceJOD:3.25, imageUrl:"https://source.unsplash.com/1200x800/?shawarma,chicken", isAvailable:true },
    { id:"it_sh_10", categoryId:"cat_shawarma", name:"وجبة توفير", desc:"خيار اقتصادي (حسب المتوفر)", priceJOD:8.00, imageUrl:"https://source.unsplash.com/1200x800/?arabic-meal,shawarma", isAvailable:true },
    { id:"it_sh_11", categoryId:"cat_shawarma", name:"وجبة عائلي", desc:"عائلية (حسب المتوفر)", priceJOD:10.00, imageUrl:"https://source.unsplash.com/1200x800/?family-meal,fast-food", isAvailable:true },
    { id:"it_sh_12", categoryId:"cat_shawarma", name:"وجبة عائلي (كبير)", desc:"عائلية كبيرة (حسب المتوفر)", priceJOD:12.00, imageUrl:"https://source.unsplash.com/1200x800/?family-dinner,shawarma", isAvailable:true },

    { id:"it_sn_01", categoryId:"cat_snacks", name:"زنجر", desc:"سناك زنجر", priceJOD:1.75, imageUrl:"https://source.unsplash.com/1200x800/?crispy-chicken,sandwich", isAvailable:true },
    { id:"it_sn_02", categoryId:"cat_snacks", name:"برجر", desc:"سناك برجر", priceJOD:1.25, imageUrl:"https://source.unsplash.com/1200x800/?burger", isAvailable:true },
    { id:"it_sn_03", categoryId:"cat_snacks", name:"اسكالوب", desc:"سناك اسكالوب", priceJOD:1.25, imageUrl:"https://source.unsplash.com/1200x800/?chicken-sandwich", isAvailable:true },
    { id:"it_sn_04", categoryId:"cat_snacks", name:"فاهيتا", desc:"سناك فاهيتا", priceJOD:1.75, imageUrl:"https://source.unsplash.com/1200x800/?fajita,wrap", isAvailable:true },
    { id:"it_sn_05", categoryId:"cat_snacks", name:"كوردن بلو", desc:"سناك كوردن بلو", priceJOD:1.75, imageUrl:"https://source.unsplash.com/1200x800/?cordon-bleu", isAvailable:true },
    { id:"it_sn_06", categoryId:"cat_snacks", name:"مكسيكي", desc:"سناك مكسيكي", priceJOD:1.75, imageUrl:"https://source.unsplash.com/1200x800/?mexican,wrap", isAvailable:true },
    { id:"it_sn_07", categoryId:"cat_snacks", name:"فرانسيسكو", desc:"سناك فرانسيسكو", priceJOD:1.75, imageUrl:"https://source.unsplash.com/1200x800/?sub-sandwich", isAvailable:true },
    { id:"it_sn_08", categoryId:"cat_snacks", name:"تشكين مشروم", desc:"سناك تشكن مشروم", priceJOD:1.75, imageUrl:"https://source.unsplash.com/1200x800/?chicken,mushroom,sandwich", isAvailable:true },
    { id:"it_sn_09", categoryId:"cat_snacks", name:"تركي + جبنة", desc:"سناك تركي مع جبنة", priceJOD:1.75, imageUrl:"https://source.unsplash.com/1200x800/?turkey,cheese,sandwich", isAvailable:true },
    { id:"it_sn_10", categoryId:"cat_snacks", name:"برجر عملاق", desc:"سناك برجر عملاق", priceJOD:2.00, imageUrl:"https://source.unsplash.com/1200x800/?big-burger", isAvailable:true },

    { id:"it_m_01", categoryId:"cat_meals", name:"وجبة برجر مكس", desc:"برجر + بطاطا + مشروب", priceJOD:2.50, imageUrl:"https://source.unsplash.com/1200x800/?burger,fries,cola", isAvailable:true },
    { id:"it_m_02", categoryId:"cat_meals", name:"وجبة زنجر", desc:"زنجر + بطاطا + مشروب", priceJOD:2.25, imageUrl:"https://source.unsplash.com/1200x800/?zinger,burger", isAvailable:true },
    { id:"it_m_03", categoryId:"cat_meals", name:"وجبة فاهيتا", desc:"فاهيتا + بطاطا + مشروب", priceJOD:2.25, imageUrl:"https://source.unsplash.com/1200x800/?fajita,meal", isAvailable:true },
    { id:"it_m_04", categoryId:"cat_meals", name:"وجبة فرانسيسكو", desc:"فرانسيسكو + بطاطا + مشروب", priceJOD:2.25, imageUrl:"https://source.unsplash.com/1200x800/?sandwich,meal", isAvailable:true },
    { id:"it_m_05", categoryId:"cat_meals", name:"وجبة كوردن بلو", desc:"كوردن بلو + بطاطا + مشروب", priceJOD:2.25, imageUrl:"https://source.unsplash.com/1200x800/?cordon-bleu,meal", isAvailable:true },
    { id:"it_m_06", categoryId:"cat_meals", name:"وجبة تشكن مشروم", desc:"تشكن مشروم + بطاطا + مشروب", priceJOD:2.25, imageUrl:"https://source.unsplash.com/1200x800/?chicken,mushroom,meal", isAvailable:true },

    { id:"it_s_01", categoryId:"cat_sides", name:"صحن بطاطا صغير", desc:"", priceJOD:0.50, imageUrl:"https://source.unsplash.com/1200x800/?fries", isAvailable:true },
    { id:"it_s_02", categoryId:"cat_sides", name:"صحن بطاطا كبير", desc:"", priceJOD:1.00, imageUrl:"https://source.unsplash.com/1200x800/?french-fries", isAvailable:true },
    { id:"it_s_03", categoryId:"cat_sides", name:"صحن بطاطا مع جبنة", desc:"", priceJOD:1.00, imageUrl:"https://source.unsplash.com/1200x800/?cheese-fries", isAvailable:true },
    { id:"it_s_04", categoryId:"cat_sides", name:"علبة سلطة كولسلو", desc:"", priceJOD:0.50, imageUrl:"https://source.unsplash.com/1200x800/?coleslaw", isAvailable:true },
    { id:"it_s_05", categoryId:"cat_sides", name:"سلطة خيار لبن", desc:"", priceJOD:0.50, imageUrl:"https://source.unsplash.com/1200x800/?cucumber,yogurt", isAvailable:true },
    { id:"it_s_06", categoryId:"cat_sides", name:"سلطة عربية", desc:"", priceJOD:0.50, imageUrl:"https://source.unsplash.com/1200x800/?arabic-salad", isAvailable:true },
    { id:"it_s_07", categoryId:"cat_sides", name:"دقوس", desc:"", priceJOD:0.50, imageUrl:"https://source.unsplash.com/1200x800/?sauce", isAvailable:true },
    { id:"it_s_08", categoryId:"cat_sides", name:"طحينية", desc:"", priceJOD:0.50, imageUrl:"https://source.unsplash.com/1200x800/?tahini", isAvailable:true },
    { id:"it_s_09", categoryId:"cat_sides", name:"مخلل", desc:"", priceJOD:0.50, imageUrl:"https://source.unsplash.com/1200x800/?pickles", isAvailable:true },
    { id:"it_s_10", categoryId:"cat_sides", name:"شوربة خضار", desc:"", priceJOD:0.50, imageUrl:"https://source.unsplash.com/1200x800/?vegetable-soup", isAvailable:true },
    { id:"it_s_11", categoryId:"cat_sides", name:"شوربة عدس", desc:"", priceJOD:0.50, imageUrl:"https://source.unsplash.com/1200x800/?lentil-soup", isAvailable:true },
    { id:"it_s_12", categoryId:"cat_sides", name:"مشروب غازي", desc:"", priceJOD:0.35, imageUrl:"https://source.unsplash.com/1200x800/?soft-drink", isAvailable:true },
    { id:"it_s_13", categoryId:"cat_sides", name:"مياه صغير", desc:"", priceJOD:0.25, imageUrl:"https://source.unsplash.com/1200x800/?water-bottle", isAvailable:true }
  ]
};
