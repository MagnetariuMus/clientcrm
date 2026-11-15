/* ==========================================================================
   ClientCRM — клиенттерді тіркеу жүйесі
   Таза JavaScript (ES2017), сыртқы кітапханаларсыз.
   Деректер localStorage-та сақталады.
   ========================================================================== */
(function () {
  'use strict';

  var STORAGE_KEY = 'crs_clients_v2';
  var LANG_KEY = 'crs_lang_v2';
  var PAGE_SIZE = 8;

  /* ------------------------------------------------------------------ */
  /*  Аудармалар                                                         */
  /* ------------------------------------------------------------------ */
  var I18N = {
    kk: {
      'brand.sub': 'Клиенттерді тіркеу жүйесі',
      'nav.clients': 'Клиенттер',
      'nav.stats': 'Статистика',
      'nav.about': 'Жүйе туралы',
      'hero.eyebrow': 'Клиенттерді тіркеу және есепке алу',
      'hero.title': 'Клиенттер базасы',
      'hero.sub': 'Жаңа клиентті тіркеңіз, деректерін жүргізіңіз, аты, телефоны немесе қаласы бойынша жылдам табыңыз.',
      'btn.add': 'Жаңа клиент',
      'btn.export': 'CSV жүктеу',
      'btn.cancel': 'Болдырмау',
      'btn.save': 'Сақтау',
      'btn.delete': 'Өшіру',
      'btn.reset': 'Сүзгіні тазалау',
      'stat.total': 'Барлық клиент',
      'stat.vip': 'VIP клиент',
      'stat.month': 'Осы айда тіркелген',
      'stat.cities': 'Қала саны',
      'panel.title': 'Клиенттер тізімі',
      'search.placeholder': 'Аты, email, телефон немесе қала бойынша іздеу…',
      'filter.typeAll': 'Барлық түрлер',
      'filter.cityAll': 'Барлық қалалар',
      'sort.newFirst': 'Алдымен жаңалары',
      'sort.oldFirst': 'Алдымен ескілері',
      'sort.nameAsc': 'Аты бойынша (А–Я)',
      'sort.birthDesc': 'Туған күні бойынша',
      'th.name': 'Аты-жөні',
      'th.email': 'Email',
      'th.phone': 'Телефон',
      'th.birth': 'Туған күні',
      'th.city': 'Қала',
      'th.type': 'Түрі',
      'th.created': 'Тіркелген күні',
      'th.actions': 'Әрекеттер',
      'type.standard': 'Стандарт',
      'type.vip': 'VIP',
      'type.new': 'Жаңа',
      'empty.title': 'Клиенттер табылмады',
      'empty.text': 'Іздеу сұранысын өзгертіп немесе сүзгілерді тазалап көріңіз.',
      'result.of': 'көрсетілді, барлығы',
      'result.clients': 'клиент',
      'about.title': 'Жүйе туралы',
      'about.text': 'ClientCRM — клиенттерді тіркеуге, олардың деректерін жүргізуге және жылдам іздеуге арналған демонстрациялық веб-қосымша. Барлық деректер браузердің жергілікті жадында (localStorage) сақталады, сондықтан серверсіз де толық жұмыс істейді.',
      'about.c1.t': 'Тіркеу және валидация',
      'about.c1.d': 'Аты-жөні, email, телефон, туған күні және қала өрістері тексеріледі: email форматы, телефон нөмірінің пішімі, қайталанатын email тіркелмейді.',
      'about.c2.t': 'Іздеу және сүзгілеу',
      'about.c2.d': 'Іздеу бас/кіші әріпті ажыратпайды, бірнеше өріс бойынша жұмыс істейді. Клиент түрі мен қала бойынша сүзгілер бірге қолданылады.',
      'about.c3.t': 'Деректер қауіпсіздігі',
      'about.c3.d': 'Өшіру тек растаудан кейін орындалады және бірден жадыға жазылады — бетті жаңартқанда деректер қайта пайда болмайды.',
      'about.c4.t': 'Есептілік',
      'about.c4.d': 'Жалпы саны, VIP клиенттер, ай бойынша тіркелу және қалалар статистикасы нақты уақытта есептеледі. Тізімді CSV файлына шығаруға болады.',
      'footer.copy': '© 2026 ClientCRM · Курстық жоба · Толқынұлы Еділ',
      'footer.seed': 'Демо деректерді қалпына келтіру',
      'form.addTitle': 'Жаңа клиентті тіркеу',
      'form.editTitle': 'Клиент деректерін өзгерту',
      'form.name': 'Аты-жөні *',
      'form.email': 'Email *',
      'form.phone': 'Телефон *',
      'form.birth': 'Туған күні *',
      'form.city': 'Қала',
      'form.type': 'Клиент түрі',
      'form.note': '* белгісі бар өрістер міндетті. Email қайталанбауы керек.',
      'confirm.title': 'Клиентті өшіру',
      'confirm.text': '«{name}» клиентін өшіруге сенімдісіз бе?',
      'confirm.note': 'Бұл әрекетті кейін қайтару мүмкін емес.',
      'err.name': 'Аты-жөні кемінде 3 таңбадан тұруы керек',
      'err.nameChars': 'Аты-жөнінде тек әріптер, бос орын және дефис болуы керек',
      'err.emailRequired': 'Email енгізіңіз',
      'err.email': 'Email форматы дұрыс емес (мысалы: client@mail.kz)',
      'err.emailDup': 'Бұл email әлдеқашан тіркелген',
      'err.phoneRequired': 'Телефон нөмірін енгізіңіз',
      'err.phone': 'Телефон форматы дұрыс емес (мысалы: +7 701 123 45 67)',
      'err.phoneDigits': 'Телефон нөмірінде кемінде 10 цифр болуы керек',
      'err.birthRequired': 'Туған күнін енгізіңіз',
      'err.birth': 'Туған күні 1900 жылдан кейін және бүгіннен аспауы керек',
      'err.city': 'Қала атауы тым ұзын (40 таңбадан аспауы керек)',
      'toast.created': 'Клиент сәтті тіркелді',
      'toast.updated': 'Деректер жаңартылды',
      'toast.deleted': 'Клиент өшірілді',
      'toast.exported': 'CSV файлы жүктелді',
      'toast.seeded': 'Демо деректер қалпына келтірілді',
      'toast.fix': 'Формадағы қателерді түзетіңіз',
      'toast.exportEmpty': 'Жүктеуге деректер жоқ'
    },
    ru: {
      'brand.sub': 'Система регистрации клиентов',
      'nav.clients': 'Клиенты',
      'nav.stats': 'Статистика',
      'nav.about': 'О системе',
      'hero.eyebrow': 'Регистрация и учёт клиентов',
      'hero.title': 'База клиентов',
      'hero.sub': 'Зарегистрируйте нового клиента, ведите его данные и находите нужную запись по имени, телефону или городу.',
      'btn.add': 'Новый клиент',
      'btn.export': 'Скачать CSV',
      'btn.cancel': 'Отмена',
      'btn.save': 'Сохранить',
      'btn.delete': 'Удалить',
      'btn.reset': 'Сбросить фильтры',
      'stat.total': 'Всего клиентов',
      'stat.vip': 'VIP клиентов',
      'stat.month': 'Зарегистрировано за месяц',
      'stat.cities': 'Количество городов',
      'panel.title': 'Список клиентов',
      'search.placeholder': 'Поиск по имени, email, телефону или городу…',
      'filter.typeAll': 'Все типы',
      'filter.cityAll': 'Все города',
      'sort.newFirst': 'Сначала новые',
      'sort.oldFirst': 'Сначала старые',
      'sort.nameAsc': 'По имени (А–Я)',
      'sort.birthDesc': 'По дате рождения',
      'th.name': 'ФИО',
      'th.email': 'Email',
      'th.phone': 'Телефон',
      'th.birth': 'Дата рождения',
      'th.city': 'Город',
      'th.type': 'Тип',
      'th.created': 'Дата регистрации',
      'th.actions': 'Действия',
      'type.standard': 'Стандарт',
      'type.vip': 'VIP',
      'type.new': 'Новый',
      'empty.title': 'Клиенты не найдены',
      'empty.text': 'Измените поисковый запрос или сбросьте фильтры.',
      'result.of': 'показано из',
      'result.clients': 'клиентов',
      'about.title': 'О системе',
      'about.text': 'ClientCRM — демонстрационное веб-приложение для регистрации клиентов, ведения их данных и быстрого поиска. Все данные хранятся в локальном хранилище браузера (localStorage), поэтому приложение полностью работает без сервера.',
      'about.c1.t': 'Регистрация и валидация',
      'about.c1.d': 'Проверяются имя, email, телефон, дата рождения и город: формат email, формат телефона, повторный email не регистрируется.',
      'about.c2.t': 'Поиск и фильтрация',
      'about.c2.d': 'Поиск не зависит от регистра и работает по нескольким полям. Фильтры по типу клиента и городу применяются вместе.',
      'about.c3.t': 'Сохранность данных',
      'about.c3.d': 'Удаление выполняется только после подтверждения и сразу сохраняется — после обновления страницы запись не возвращается.',
      'about.c4.t': 'Отчётность',
      'about.c4.d': 'Общее количество, VIP, регистрации за месяц и статистика по городам считаются в реальном времени. Список можно выгрузить в CSV.',
      'footer.copy': '© 2026 ClientCRM · Курсовой проект · Толкынулы Едил',
      'footer.seed': 'Восстановить демо-данные',
      'form.addTitle': 'Регистрация нового клиента',
      'form.editTitle': 'Редактирование данных клиента',
      'form.name': 'ФИО *',
      'form.email': 'Email *',
      'form.phone': 'Телефон *',
      'form.birth': 'Дата рождения *',
      'form.city': 'Город',
      'form.type': 'Тип клиента',
      'form.note': 'Поля со звёздочкой обязательны. Email не должен повторяться.',
      'confirm.title': 'Удаление клиента',
      'confirm.text': 'Удалить клиента «{name}»?',
      'confirm.note': 'Это действие нельзя отменить.',
      'err.name': 'ФИО должно содержать не менее 3 символов',
      'err.nameChars': 'В ФИО допускаются только буквы, пробел и дефис',
      'err.emailRequired': 'Введите email',
      'err.email': 'Неверный формат email (например: client@mail.kz)',
      'err.emailDup': 'Этот email уже зарегистрирован',
      'err.phoneRequired': 'Введите номер телефона',
      'err.phone': 'Неверный формат телефона (например: +7 701 123 45 67)',
      'err.phoneDigits': 'В номере должно быть не менее 10 цифр',
      'err.birthRequired': 'Введите дату рождения',
      'err.birth': 'Дата рождения должна быть позже 1900 года и не в будущем',
      'err.city': 'Название города слишком длинное (не более 40 символов)',
      'toast.created': 'Клиент успешно зарегистрирован',
      'toast.updated': 'Данные обновлены',
      'toast.deleted': 'Клиент удалён',
      'toast.exported': 'Файл CSV загружен',
      'toast.seeded': 'Демо-данные восстановлены',
      'toast.fix': 'Исправьте ошибки в форме',
      'toast.exportEmpty': 'Нет данных для выгрузки'
    }
  };

  /* ------------------------------------------------------------------ */
  /*  Демо деректер                                                      */
  /* ------------------------------------------------------------------ */
  var SEED = [
    { fullName: 'Асқар Асанов', email: 'askar.asanov@mail.kz', phone: '+7 701 245 18 90', birthDate: '1994-03-12', city: 'Алматы', type: 'vip', createdAt: '2026-11-04T09:15:00' },
    { fullName: 'Айгүл Нұрланова', email: 'aigul.n@mail.kz', phone: '+7 702 331 07 55', birthDate: '1998-07-25', city: 'Астана', type: 'standard', createdAt: '2026-11-05T11:40:00' },
    { fullName: 'Дәурен Смағұлов', email: 'dauren.s@inbox.kz', phone: '+7 705 118 44 21', birthDate: '1991-11-02', city: 'Шымкент', type: 'new', createdAt: '2026-11-06T14:05:00' },
    { fullName: 'Мадина Тұрсынова', email: 'madina.t@mail.kz', phone: '+7 747 902 33 18', birthDate: '2000-05-19', city: 'Алматы', type: 'vip', createdAt: '2026-11-07T10:20:00' },
    { fullName: 'Ержан Қалиев', email: 'erzhan.k@mail.kz', phone: '+7 701 556 71 04', birthDate: '1989-09-30', city: 'Қарағанды', type: 'standard', createdAt: '2026-10-22T16:30:00' },
    { fullName: 'Гүлнар Оспанова', email: 'gulnar.o@mail.kz', phone: '+7 708 244 90 12', birthDate: '1996-02-14', city: 'Ақтөбе', type: 'new', createdAt: '2026-10-28T09:50:00' },
    { fullName: 'Нұрлан Әбдіров', email: 'nurlan.a@inbox.kz', phone: '+7 700 873 26 47', birthDate: '1993-12-08', city: 'Атырау', type: 'standard', createdAt: '2026-10-12T13:10:00' },
    { fullName: 'Айнұр Серікқызы', email: 'ainur.s@mail.kz', phone: '+7 771 415 60 33', birthDate: '2001-06-21', city: 'Алматы', type: 'new', createdAt: '2026-11-01T18:25:00' },
    { fullName: 'Тимур Жақсылықов', email: 'timur.zh@mail.kz', phone: '+7 702 980 11 76', birthDate: '1987-04-05', city: 'Павлодар', type: 'vip', createdAt: '2026-09-18T12:00:00' },
    { fullName: 'Алия Бекова', email: 'aliya.b@mail.kz', phone: '+7 747 330 58 09', birthDate: '1999-08-17', city: 'Тараз', type: 'standard', createdAt: '2026-09-25T15:45:00' },
    { fullName: 'Данияр Мұқанов', email: 'daniyar.m@inbox.kz', phone: '+7 705 602 74 38', birthDate: '1995-10-11', city: 'Астана', type: 'standard', createdAt: '2026-10-03T11:20:00' },
    { fullName: 'Сәуле Қасымова', email: 'saule.k@mail.kz', phone: '+7 701 774 39 52', birthDate: '1990-01-29', city: 'Шымкент', type: 'new', createdAt: '2026-11-02T08:40:00' },
    { fullName: 'Арман Төлегенов', email: 'arman.t@mail.kz', phone: '+7 708 519 83 60', birthDate: '1985-07-07', city: 'Қарағанды', type: 'standard', createdAt: '2026-08-30T17:05:00' },
    { fullName: 'Жанар Ыбыраева', email: 'zhanar.y@mail.kz', phone: '+7 771 208 46 15', birthDate: '2002-03-03', city: 'Алматы', type: 'vip', createdAt: '2026-10-19T10:00:00' }
  ];

  /* ------------------------------------------------------------------ */
  /*  Күй                                                               */
  /* ------------------------------------------------------------------ */
  var state = {
    clients: [],
    query: '',
    type: '',
    city: '',
    sort: 'created_desc',
    page: 1,
    lang: 'kk',
    editingId: null,
    pendingDelete: null
  };

  /* ------------------------------------------------------------------ */
  /*  Көмекші функциялар                                                 */
  /* ------------------------------------------------------------------ */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function t(key) {
    var dict = I18N[state.lang] || I18N.kk;
    return dict[key] != null ? dict[key] : (I18N.kk[key] != null ? I18N.kk[key] : key);
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function uid() {
    return 'c_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function formatDate(iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '—';
    return pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '.' + d.getFullYear();
  }

  function parseDate(value) {
    if (!value) return null;
    var parts = value.split('-');
    if (parts.length !== 3) return null;
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return isNaN(d.getTime()) ? null : d;
  }

  function initials(name) {
    return name.trim().split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0); }).join('').toUpperCase();
  }

  function plural(n) { return n + ' ' + t('result.clients'); }

  /* ------------------------------------------------------------------ */
  /*  Дерекқор (localStorage)                                            */
  /* ------------------------------------------------------------------ */
  function loadData() {
    var raw = null;
    try { raw = localStorage.getItem(STORAGE_KEY); } catch (e) { raw = null; }
    if (!raw) {
      state.clients = SEED.map(function (item, i) {
        var copy = Object.assign({}, item);
        copy.id = 'c_' + (1000 + i);
        return copy;
      });
      saveData();
      return;
    }
    try {
      var parsed = JSON.parse(raw);
      state.clients = Array.isArray(parsed) ? parsed.filter(function (c) { return c && c.id; }) : [];
    } catch (e) {
      state.clients = [];
    }
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.clients));
    } catch (e) {
      console.warn('localStorage: сақтау мүмкін болмады', e);
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Сүзгілеу / сұрыптау / іздеу                                        */
  /* ------------------------------------------------------------------ */
  function filtered() {
    var q = state.query.trim().toLowerCase();
    var list = state.clients.filter(function (c) {
      if (state.type && c.type !== state.type) return false;
      if (state.city && c.city !== state.city) return false;
      if (!q) return true;
      var haystack = [c.fullName, c.email, c.phone, c.city, String(c.id)].join(' ').toLowerCase();
      return haystack.indexOf(q) !== -1;
    });

    var sorters = {
      created_desc: function (a, b) { return new Date(b.createdAt) - new Date(a.createdAt); },
      created_asc: function (a, b) { return new Date(a.createdAt) - new Date(b.createdAt); },
      name_asc: function (a, b) { return a.fullName.localeCompare(b.fullName, 'kk'); },
      birth_desc: function (a, b) { return new Date(b.birthDate) - new Date(a.birthDate); }
    };

    return list.sort(sorters[state.sort] || sorters.created_desc);
  }

  function paginate(list) {
    var pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
    if (state.page > pages) state.page = pages;
    var start = (state.page - 1) * PAGE_SIZE;
    return { pages: pages, start: start, items: list.slice(start, start + PAGE_SIZE) };
  }

  /* ------------------------------------------------------------------ */
  /*  Рендер                                                            */
  /* ------------------------------------------------------------------ */
  function renderStats() {
    var all = state.clients;
    var now = new Date();
    var vip = all.filter(function (c) { return c.type === 'vip'; }).length;
    var month = all.filter(function (c) {
      var d = new Date(c.createdAt);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    }).length;
    var cities = {};
    all.forEach(function (c) { if (c.city) cities[c.city] = 1; });

    $('#statTotal').textContent = all.length;
    $('#statVip').textContent = vip;
    $('#statMonth').textContent = month;
    $('#statCities').textContent = Object.keys(cities).length;
  }

  function renderCityFilter() {
    var select = $('#cityFilter');
    var current = state.city;
    var cities = {};
    state.clients.forEach(function (c) { if (c.city) cities[c.city] = 1; });
    var names = Object.keys(cities).sort(function (a, b) { return a.localeCompare(b, 'kk'); });

    select.innerHTML = '<option value="">' + escapeHtml(t('filter.cityAll')) + '</option>' +
      names.map(function (city) {
        return '<option value="' + escapeHtml(city) + '">' + escapeHtml(city) + '</option>';
      }).join('');

    select.value = names.indexOf(current) !== -1 ? current : '';
    if (select.value !== current) state.city = select.value;
  }

  function rowHtml(client) {
    var badgeClass = client.type === 'vip' ? 'badge--vip' : (client.type === 'new' ? 'badge--new' : 'badge--standard');
    var typeLabel = t('type.' + client.type);
    var shortId = client.id.replace('c_', '');

    return '' +
      '<tr data-id="' + escapeHtml(client.id) + '">' +
        '<td class="cell-main">' +
          '<div class="cell-name">' +
            '<span class="avatar">' + escapeHtml(initials(client.fullName)) + '</span>' +
            '<span class="cell-name__meta"><strong>' + escapeHtml(client.fullName) + '</strong>' +
            '<span>ID ' + escapeHtml(shortId) + '</span></span>' +
          '</div>' +
        '</td>' +
        '<td data-label="' + escapeHtml(t('th.email')) + '">' + escapeHtml(client.email) + '</td>' +
        '<td data-label="' + escapeHtml(t('th.phone')) + '"><span class="mono">' + escapeHtml(client.phone) + '</span></td>' +
        '<td data-label="' + escapeHtml(t('th.birth')) + '"><span class="mono">' + formatDate(client.birthDate) + '</span></td>' +
        '<td data-label="' + escapeHtml(t('th.city')) + '">' + (client.city ? escapeHtml(client.city) : '<span class="muted">—</span>') + '</td>' +
        '<td data-label="' + escapeHtml(t('th.type')) + '"><span class="badge ' + badgeClass + '">' + escapeHtml(typeLabel) + '</span></td>' +
        '<td data-label="' + escapeHtml(t('th.created')) + '"><span class="mono">' + formatDate(client.createdAt) + '</span></td>' +
        '<td data-label="' + escapeHtml(t('th.actions')) + '">' +
          '<div class="row-actions">' +
            '<button class="iconbtn" type="button" data-action="edit" title="' + escapeHtml(t('form.editTitle')) + '">✎</button>' +
            '<button class="iconbtn iconbtn--danger" type="button" data-action="delete" title="' + escapeHtml(t('confirm.title')) + '">🗑</button>' +
          '</div>' +
        '</td>' +
      '</tr>';
  }

  function renderTable() {
    var list = filtered();
    var page = paginate(list);
    var body = $('#clientsBody');
    var empty = $('#emptyState');
    var table = $('#clientsTable');

    if (!page.items.length) {
      body.innerHTML = '';
      table.hidden = true;
      empty.hidden = false;
    } else {
      table.hidden = false;
      empty.hidden = true;
      body.innerHTML = page.items.map(rowHtml).join('');
    }

    $('#resultInfo').textContent = list.length
      ? page.items.length + ' ' + t('result.of') + ' ' + plural(list.length)
      : '';

    renderPagination(page);
  }

  function renderPagination(page) {
    var wrap = $('#pagination');
    if (!filtered().length) { wrap.innerHTML = ''; return; }

    var buttons = [];
    buttons.push('<button class="pagebtn" type="button" data-page="' + (state.page - 1) + '"' +
      (state.page === 1 ? ' disabled' : '') + ' aria-label="Алдыңғы">‹</button>');

    var pages = [];
    for (var i = 1; i <= page.pages; i++) {
      if (i === 1 || i === page.pages || Math.abs(i - state.page) <= 1) pages.push(i);
    }
    var prev = 0;
    pages.forEach(function (p) {
      if (prev && p - prev > 1) buttons.push('<span class="muted" style="padding:0 4px">…</span>');
      buttons.push('<button class="pagebtn' + (p === state.page ? ' is-active' : '') +
        '" type="button" data-page="' + p + '">' + p + '</button>');
      prev = p;
    });

    buttons.push('<button class="pagebtn" type="button" data-page="' + (state.page + 1) + '"' +
      (state.page === page.pages ? ' disabled' : '') + ' aria-label="Келесі">›</button>');

    var from = page.items.length ? page.start + 1 : 0;
    var to = page.start + page.items.length;

    wrap.innerHTML = '<span class="pagination__info">' + from + '–' + to + ' / ' + plural(filtered().length) +
      '</span><span class="pagination__pages">' + buttons.join('') + '</span>';
  }

  function render() {
    renderStats();
    renderCityFilter();
    renderTable();
  }

  /* ------------------------------------------------------------------ */
  /*  Тіл                                                               */
  /* ------------------------------------------------------------------ */
  function applyI18n() {
    document.documentElement.lang = state.lang === 'kk' ? 'kk' : 'ru';

    $$('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });

    $$('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });

    $$('.lang__btn').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang') === state.lang);
    });

    // Жасырын select опциялары (тип сүзгісі)
    $$('#typeFilter option, #type option').forEach(function (opt) {
      var key = opt.getAttribute('data-i18n');
      if (key) opt.textContent = t(key);
    });
  }

  function setLang(lang) {
    state.lang = lang === 'ru' ? 'ru' : 'kk';
    try { localStorage.setItem(LANG_KEY, state.lang); } catch (e) {}
    applyI18n();
    render();
  }

  /* ------------------------------------------------------------------ */
  /*  Хабарламалар                                                       */
  /* ------------------------------------------------------------------ */
  function toast(kind, title, text) {
    var box = document.createElement('div');
    box.className = 'toast toast--' + kind;
    var icon = kind === 'error' ? '⚠️' : (kind === 'info' ? 'ℹ️' : '✅');
    box.innerHTML = '<span class="toast__icon">' + icon + '</span><div><strong>' +
      escapeHtml(title) + '</strong>' + (text ? '<p>' + escapeHtml(text) + '</p>' : '') + '</div>';
    $('#toasts').appendChild(box);
    var delay = document.documentElement.classList.contains('no-anim') ? 60000 : 3200;
    setTimeout(function () {
      box.style.transition = 'opacity .3s, transform .3s';
      box.style.opacity = '0';
      box.style.transform = 'translateX(12px)';
      setTimeout(function () { box.remove(); }, 320);
    }, delay);
  }

  /* ------------------------------------------------------------------ */
  /*  Валидация                                                          */
  /* ------------------------------------------------------------------ */
  function readForm() {
    return {
      fullName: $('#fullName').value,
      email: $('#email').value,
      phone: $('#phone').value,
      birthDate: $('#birthDate').value,
      city: $('#city').value,
      type: $('#type').value
    };
  }

  function validateClient(data, editingId) {
    var errors = {};
    var name = data.fullName.trim();

    if (name.length < 3) {
      errors.fullName = t('err.name');
    } else if (!/^[A-Za-zА-Яа-яӘәҒғҚқҢңӨөҰұҮүҺһІіЁё\s\-']+$/.test(name)) {
      errors.fullName = t('err.nameChars');
    }

    var email = data.email.trim();
    if (!email) {
      errors.email = t('err.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      errors.email = t('err.email');
    } else if (state.clients.some(function (c) {
      return c.email.toLowerCase() === email.toLowerCase() && c.id !== editingId;
    })) {
      errors.email = t('err.emailDup');
    }

    var phone = data.phone.trim();
    if (!phone) {
      errors.phone = t('err.phoneRequired');
    } else if (!/^\+?[\d\s\-()]{10,19}$/.test(phone)) {
      errors.phone = t('err.phone');
    } else if ((phone.match(/\d/g) || []).length < 10) {
      errors.phone = t('err.phoneDigits');
    }

    var birth = data.birthDate ? parseDate(data.birthDate) : null;
    if (!birth) {
      errors.birthDate = t('err.birthRequired');
    } else {
      var today = new Date();
      today.setHours(23, 59, 59, 999);
      if (birth.getFullYear() < 1900 || birth > today) errors.birthDate = t('err.birth');
    }

    if (data.city && data.city.trim().length > 40) errors.city = t('err.city');

    return errors;
  }

  function showErrors(errors) {
    ['fullName', 'email', 'phone', 'birthDate', 'city'].forEach(function (field) {
      var input = $('#' + field);
      var box = $('#err-' + field);
      var message = errors[field];
      input.classList.toggle('is-error', Boolean(message));
      box.textContent = message || '';
      box.classList.toggle('is-visible', Boolean(message));
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Модальдар                                                          */
  /* ------------------------------------------------------------------ */
  function openModal(id) {
    $(id).hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal(id) {
    $(id).hidden = true;
    if (!$$('.modal:not([hidden])').length) document.body.style.overflow = '';
  }

  function closeAll() {
    $$('.modal').forEach(function (m) { m.hidden = true; });
    document.body.style.overflow = '';
  }

  function openForm(clientId) {
    state.editingId = clientId || null;
    var form = $('#clientForm');
    form.reset();
    showErrors({});

    if (clientId) {
      var client = state.clients.filter(function (c) { return c.id === clientId; })[0];
      if (!client) return;
      $('#modalTitle').textContent = t('form.editTitle');
      $('#fullName').value = client.fullName;
      $('#email').value = client.email;
      $('#phone').value = client.phone;
      $('#birthDate').value = client.birthDate;
      $('#city').value = client.city || '';
      $('#type').value = client.type || 'standard';
    } else {
      $('#modalTitle').textContent = t('form.addTitle');
      $('#type').value = 'standard';
    }

    openModal('#clientModal');
    setTimeout(function () { $('#fullName').focus(); }, 60);
  }

  function submitForm(event) {
    event.preventDefault();

    var data = readForm();
    var errors = validateClient(data, state.editingId);
    showErrors(errors);

    if (Object.keys(errors).length) {
      toast('error', t('toast.fix'), Object.values(errors)[0]);
      return;
    }

    if (state.editingId) {
      state.clients = state.clients.map(function (c) {
        if (c.id !== state.editingId) return c;
        return {
          id: c.id,
          fullName: data.fullName.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          birthDate: data.birthDate,
          city: data.city.trim(),
          type: data.type,
          createdAt: c.createdAt
        };
      });
      toast('success', t('toast.updated'), data.fullName.trim());
    } else {
      state.clients.push({
        id: uid(),
        fullName: data.fullName.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        birthDate: data.birthDate,
        city: data.city.trim(),
        type: data.type,
        createdAt: new Date().toISOString()
      });
      toast('success', t('toast.created'), data.fullName.trim());
    }

    saveData();
    closeModal('#clientModal');
    state.editingId = null;
    state.page = 1;
    render();
  }

  function askDelete(clientId) {
    var client = state.clients.filter(function (c) { return c.id === clientId; })[0];
    if (!client) return;
    state.pendingDelete = clientId;
    $('#confirmText').textContent = t('confirm.text').replace('{name}', client.fullName);
    openModal('#confirmModal');
  }

  function confirmDelete() {
    if (!state.pendingDelete) return;
    var client = state.clients.filter(function (c) { return c.id === state.pendingDelete; })[0];
    state.clients = state.clients.filter(function (c) { return c.id !== state.pendingDelete; });
    state.pendingDelete = null;
    saveData();
    closeModal('#confirmModal');
    render();
    if (client) toast('success', t('toast.deleted'), client.fullName);
  }

  /* ------------------------------------------------------------------ */
  /*  CSV                                                                */
  /* ------------------------------------------------------------------ */
  function exportCsv() {
    var list = filtered();
    if (!list.length) {
      toast('error', t('toast.exportEmpty'));
      return;
    }

    var header = ['ID', 'Аты-жөні', 'Email', 'Телефон', 'Туған күні', 'Қала', 'Түрі', 'Тіркелген күні'];
    var rows = list.map(function (c) {
      return [c.id, c.fullName, c.email, c.phone, c.birthDate, c.city || '', t('type.' + c.type), c.createdAt];
    });

    var csv = [header].concat(rows).map(function (row) {
      return row.map(function (cell) {
        return '"' + String(cell == null ? '' : cell).replace(/"/g, '""') + '"';
      }).join(';');
    }).join('\r\n');

    var blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'clients_' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    toast('success', t('toast.exported'), list.length + ' ' + t('result.clients'));
  }

  /* ------------------------------------------------------------------ */
  /*  Оқиғалар                                                           */
  /* ------------------------------------------------------------------ */
  function bindEvents() {
    $('#addBtn').addEventListener('click', function () { openForm(null); });
    $('#exportBtn').addEventListener('click', exportCsv);
    $('#clientForm').addEventListener('submit', submitForm);
    $('#confirmDelete').addEventListener('click', confirmDelete);

    $('#searchInput').addEventListener('input', function (e) {
      state.query = e.target.value;
      state.page = 1;
      render();
      toggleReset();
    });

    $('#typeFilter').addEventListener('change', function (e) {
      state.type = e.target.value;
      state.page = 1;
      render();
      toggleReset();
    });

    $('#cityFilter').addEventListener('change', function (e) {
      state.city = e.target.value;
      state.page = 1;
      render();
      toggleReset();
    });

    $('#sortSelect').addEventListener('change', function (e) {
      state.sort = e.target.value;
      state.page = 1;
      render();
    });

    $('#resetFilters').addEventListener('click', resetFilters);
    $('#emptyReset').addEventListener('click', resetFilters);

    $('#clientsBody').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;
      var row = btn.closest('tr');
      var id = row && row.getAttribute('data-id');
      if (!id) return;
      if (btn.getAttribute('data-action') === 'edit') openForm(id);
      else askDelete(id);
    });

    $('#pagination').addEventListener('click', function (e) {
      var btn = e.target.closest('[data-page]');
      if (!btn || btn.disabled) return;
      var page = Number(btn.getAttribute('data-page'));
      if (!page || page < 1) return;
      state.page = page;
      renderTable();
      document.getElementById('clients').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    $$('[data-close]').forEach(function (el) {
      el.addEventListener('click', function () {
        var modal = el.closest('.modal');
        if (modal) closeModal('#' + modal.id);
      });
    });

    $$('.lang__btn').forEach(function (btn) {
      btn.addEventListener('click', function () { setLang(btn.getAttribute('data-lang')); });
    });

    $$('.th-sort').forEach(function (th) {
      th.addEventListener('click', function () {
        state.sort = state.sort === 'name_asc' ? 'created_desc' : 'name_asc';
        $('#sortSelect').value = state.sort;
        state.page = 1;
        render();
        markSort();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll();
    });

    $('#seedBtn').addEventListener('click', function () {
      if (!confirm(state.lang === 'kk' ? 'Демо деректерді қалпына келтіру керек пе?' : 'Восстановить демо-данные?')) return;
      state.clients = SEED.map(function (item, i) {
        var copy = Object.assign({}, item);
        copy.id = 'c_' + (1000 + i);
        return copy;
      });
      saveData();
      state.page = 1;
      render();
      toast('info', t('toast.seeded'));
    });
  }

  function toggleReset() {
    var active = Boolean(state.query || state.type || state.city);
    $('#resetFilters').hidden = !active;
    markSort();
  }

  function markSort() {
    $$('.th-sort').forEach(function (th) {
      var isName = th.getAttribute('data-sort') === 'name' && state.sort === 'name_asc';
      th.classList.toggle('is-sorted', isName);
      var mark = th.querySelector('.sort-mark');
      if (mark) mark.textContent = isName ? '↑' : '';
    });
  }

  function resetFilters() {
    state.query = '';
    state.type = '';
    state.city = '';
    state.sort = 'created_desc';
    state.page = 1;
    $('#searchInput').value = '';
    $('#typeFilter').value = '';
    $('#cityFilter').value = '';
    $('#sortSelect').value = 'created_desc';
    render();
    toggleReset();
  }

  /* ------------------------------------------------------------------ */
  /*  Демо режим (скриншоттар үшін)                                      */
  /* ------------------------------------------------------------------ */
  function applyDemo() {
    var params = new URLSearchParams(window.location.search);
    if (params.get('noanim')) document.documentElement.classList.add('no-anim');
    var lang = params.get('lang');
    if (lang) setLang(lang);

    var demo = params.get('demo');
    if (!demo) return;

    if (demo === 'add') {
      setTimeout(function () { openForm(null); }, 50);
    } else if (demo === 'edit') {
      setTimeout(function () {
        var first = filtered()[0];
        if (first) openForm(first.id);
      }, 50);
    } else if (demo === 'delete') {
      setTimeout(function () {
        var first = filtered()[0];
        if (first) askDelete(first.id);
      }, 50);
    } else if (demo === 'invalid') {
      setTimeout(function () {
        openForm(null);
        $('#fullName').value = 'Ас';
        $('#email').value = 'testmail';
        $('#phone').value = 'abc';
        $('#birthDate').value = '2030-01-01';
        submitForm(new Event('submit', { cancelable: true }));
      }, 50);
    } else if (demo === 'search') {
      var q = params.get('q') || 'Асқар';
      $('#searchInput').value = q;
      state.query = q;
      state.page = 1;
      render();
      toggleReset();
    } else if (demo === 'empty') {
      $('#searchInput').value = 'Тесттік клиент 000';
      state.query = 'Тесттік клиент 000';
      state.page = 1;
      render();
      toggleReset();
    } else if (demo === 'selftest') {
      setTimeout(runSelfTest, 80);
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Автоматты өзін-өзі тексеру (QA режимі, ?demo=selftest)            */
  /* ------------------------------------------------------------------ */
  function runSelfTest() {
    var results = [];
    var start = state.clients.length;

    function check(name, ok) { results.push((ok ? 'PASS' : 'FAIL') + ' ' + name); }

    function fill(data) {
      openForm(null);
      $('#fullName').value = data.fullName;
      $('#email').value = data.email;
      $('#phone').value = data.phone;
      $('#birthDate').value = data.birthDate;
      $('#city').value = data.city || '';
      $('#type').value = data.type || 'standard';
      submitForm({ preventDefault: function () {} });
    }

    fill({ fullName: 'Тест Клиент', email: 'test.client@mail.kz', phone: '+7 700 111 22 33', birthDate: '1995-05-05', city: 'Алматы', type: 'new' });
    check('add-client', state.clients.length === start + 1);

    var added = state.clients.filter(function (c) { return c.email === 'test.client@mail.kz'; })[0];
    check('client-saved', Boolean(added));

    fill({ fullName: 'Тест Клиент 2', email: 'test.client@mail.kz', phone: '+7 700 111 22 33', birthDate: '1995-05-05' });
    check('duplicate-email-blocked', state.clients.length === start + 1);

    fill({ fullName: 'Тест Клиент 3', email: 'test3@mail.kz', phone: 'abc', birthDate: '1995-05-05' });
    check('phone-validation', state.clients.length === start + 1);

    if (added) {
      openForm(added.id);
      $('#fullName').value = 'Тест Клиент Өзгертілді';
      submitForm({ preventDefault: function () {} });
      var edited = state.clients.filter(function (c) { return c.id === added.id; })[0];
      check('edit-client', Boolean(edited) && edited.fullName === 'Тест Клиент Өзгертілді');
    } else {
      check('edit-client', false);
    }

    state.query = 'Өзгертілді';
    state.page = 1;
    render();
    check('search', $$('#clientsBody tr').length === 1);

    resetFilters();

    if (added) {
      askDelete(added.id);
      confirmDelete();
      check('delete-client', state.clients.length === start);
    } else {
      check('delete-client', false);
    }

    var stored = [];
    try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch (e) { stored = []; }
    check('persisted', stored.length === start);

    var box = document.createElement('div');
    box.id = 'selftest';
    box.style.cssText = 'position:fixed;left:16px;bottom:16px;z-index:9999;background:#fff;border:1px solid #cbd5e1;border-radius:10px;padding:10px 14px;font:12px/1.5 monospace;white-space:pre;box-shadow:0 8px 24px rgba(0,0,0,.15)';
    var passed = results.filter(function (r) { return r.indexOf('PASS') === 0; }).length;
    box.textContent = 'SELFTEST ' + passed + '/' + results.length + '\n' + results.join('\n');
    document.body.appendChild(box);
    document.title = 'SELFTEST ' + (passed === results.length ? 'ALL PASS' : 'HAS FAIL');
  }

  /* ------------------------------------------------------------------ */
  /*  Іске қосу                                                          */
  /* ------------------------------------------------------------------ */
  function init() {
    var savedLang = null;
    try { savedLang = localStorage.getItem(LANG_KEY); } catch (e) {}
    state.lang = savedLang === 'ru' ? 'ru' : 'kk';

    loadData();
    applyI18n();
    bindEvents();
    render();
    toggleReset();
    applyDemo();

    document.querySelectorAll('.topnav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        document.querySelectorAll('.topnav__link').forEach(function (l) { l.classList.remove('is-active'); });
        link.classList.add('is-active');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
