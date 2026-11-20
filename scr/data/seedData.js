export const seedData = {
  courses: [
    {
      id: 'c1',
      title: 'فيزياء — الصف الثالث الثانوي',
      description: 'شرح كامل للمنهج مع حل أسئلة امتحانات سابقة ومراجعات ليلة الامتحان.',
      image: 'https://images.unsplash.com/photo-1635372722656-389f87a941b7?w=900&q=80',
      price: 450, discount_price: 350, sessions_count: 24,
      category: 'فيزياء', status: 'active', is_featured: true, sort_order: 1,
      content: 'الحركة - الديناميكا - الكهرباء - المغناطيسية - الفيزياء الحديثة'
    },
    {
      id: 'c2',
      title: 'رياضيات — الصف الثاني الثانوي',
      description: 'تأسيس قوي في الجبر والتفاضل مع تدريبات أسبوعية ومتابعة فردية.',
      image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=900&q=80',
      price: 400, discount_price: null, sessions_count: 20,
      category: 'رياضيات', status: 'active', is_featured: true, sort_order: 2,
      content: 'الجبر - حساب المثلثات - التفاضل - الاحتمالات'
    },
    {
      id: 'c3',
      title: 'كيمياء — الصف الأول الثانوي',
      description: 'ابدأ الكيمياء صح من أول حصة، شرح مبسط وتجارب تفاعلية.',
      image: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=900&q=80',
      price: 350, discount_price: 299, sessions_count: 16,
      category: 'كيمياء', status: 'active', is_featured: false, sort_order: 3,
      content: 'الذرة - الجدول الدوري - الروابط - التفاعلات'
    }
  ],
  lessons: {
    c1: [
      { id: 'l1', course_id: 'c1', title: 'الحركة في خط مستقيم', duration_minutes: 45, sort_order: 1 },
      { id: 'l2', course_id: 'c1', title: 'قوانين نيوتن', duration_minutes: 50, sort_order: 2 },
      { id: 'l3', course_id: 'c1', title: 'الطاقة والشغل', duration_minutes: 40, sort_order: 3 }
    ],
    c2: [
      { id: 'l4', course_id: 'c2', title: 'الدوال والنهايات', duration_minutes: 45, sort_order: 1 },
      { id: 'l5', course_id: 'c2', title: 'المشتقات', duration_minutes: 55, sort_order: 2 }
    ],
    c3: [
      { id: 'l6', course_id: 'c3', title: 'تركيب الذرة', duration_minutes: 40, sort_order: 1 }
    ]
  },
  restaurantCategories: [
    { id: 'rc1', name: 'مشروبات ساخنة', sort_order: 1 },
    { id: 'rc2', name: 'مشروبات باردة', sort_order: 2 },
    { id: 'rc3', name: 'أطباق رئيسية', sort_order: 3 },
    { id: 'rc4', name: 'حلويات', sort_order: 4 }
  ],
  restaurantProducts: [
    { id: 'rp1', name: 'كابتشينو', description: 'إسبريسو مع حليب مبخر ورغوة ناعمة', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80', price: 85, discount_price: 65, category_id: 'rc1', category_name: 'مشروبات ساخنة', is_available: true, is_featured: true, sort_order: 1 },
    { id: 'rp2', name: 'لاتيه مثلج', description: 'إسبريسو بارد مع حليب وثلج', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&q=80', price: 95, discount_price: null, category_id: 'rc2', category_name: 'مشروبات باردة', is_available: true, is_featured: true, sort_order: 2 },
    { id: 'rp3', name: 'برجر كلاسيك', description: 'لحم طازج، جبنة، صوص خاص، وبطاطس', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80', price: 220, discount_price: 189, category_id: 'rc3', category_name: 'أطباق رئيسية', is_available: true, is_featured: true, sort_order: 3 },
    { id: 'rp4', name: 'تشيز كيك', description: 'تشيز كيك ناعمة مع صوص توت', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80', price: 140, discount_price: null, category_id: 'rc4', category_name: 'حلويات', is_available: true, is_featured: false, sort_order: 4 }
  ],
  accessoriesCategories: [
    { id: 'ac1', name: 'سلاسل', sort_order: 1 },
    { id: 'ac2', name: 'أساور', sort_order: 2 },
    { id: 'ac3', name: 'خواتم', sort_order: 3 },
    { id: 'ac4', name: 'نظارات', sort_order: 4 }
  ],
  accessoriesProducts: [
    { id: 'ap1', name: 'سلسلة ذهبية راقية', description: 'سلسلة بتصميم Minimal، خامة عالية الجودة ومقاومة للصدأ', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80', price: 450, discount_price: 349, category_id: 'ac1', category_name: 'سلاسل', stock: 12, is_available: true, is_featured: true, sort_order: 1 },
    { id: 'ap2', name: 'سوار جلد كلاسيك', description: 'سوار جلد طبيعي بقفل معدني أنيق', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80', price: 280, discount_price: null, category_id: 'ac2', category_name: 'أساور', stock: 8, is_available: true, is_featured: true, sort_order: 2 },
    { id: 'ap3', name: 'خاتم فضي Minimal', description: 'خاتم فضي بتصميم بسيط يناسب كل يوم', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80', price: 320, discount_price: 259, category_id: 'ac3', category_name: 'خواتم', stock: 0, is_available: false, is_featured: false, sort_order: 3 },
    { id: 'ap4', name: 'نظارة شمسية Premium', description: 'عدسات UV400 وإطار خفيف ومريح', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80', price: 650, discount_price: 499, category_id: 'ac4', category_name: 'نظارات', stock: 5, is_available: true, is_featured: true, sort_order: 4 }
  ]
}