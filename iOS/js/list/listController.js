define(["app", "js/contactModel","js/list/listView"], function(app, Contact, ListView) {

	/**
	 * Bindings array. Bind DOM event to some handler function in controller
	 * @type {*[]}
	 */
	var bindings = [{
		element: '.contact-add-link',
		event: 'click',
		handler: openAddPopup
	}, {
		element: '.list-panel-all',
		event: 'click',
		handler: showAll
	}, {
		element: '.list-panel-favorites',
		event: 'click',
		handler: showFavorites
	}, {
	    element: '.list-panel-department',
	    event: 'click',
	    handler: showDepartment
	}, {
	    element: '.list-panel-cathedral',
	    event: 'click',
	    handler: showCathedral
	}, {
	    element: '.list-panel-poll',
	    event: 'click',
	    handler: showPoll
	}
	];

	var state = {
		isFavorite: false
	};

    function init() {
        var contacts = loadContacts();
        var contactsCathedral = loadContactsCathedral();
        
		ListView.render({
			bindings: bindings,
			model: contacts
		});
	}

	function openAddPopup() {
		app.router.load('contactEdit', { 'isFavorite': state.isFavorite });
	}

	function showAll() {
		state.isFavorite = false;
		var contacts = loadContacts();
		ListView.reRender({ model: contacts, header: "Wszystkie Kontakty" });
	}

	function showFavorites() {
		state.isFavorite = true;
		var contacts = loadContacts({ isFavorite: true });
		ListView.reRender({ model: contacts, header: "Ulubione" });
	}
	function showPoll() {
	    var myApp = new Framework7();
	    var $$ = Dom7;
	    $$('.open-about').on('click', function () {
	        myApp.popup('.popup-about');
	    });
	}
	function showDepartment() {
	    state.isFavorite = true;
	    var contacts = loadContactsDepartment();
	    ListView.reRender({ model: contacts, header: "Kontakty posortowane wydziałami" });
	}
	function loadContactsDepartment(filter) {
	    var f7Contacts = localStorage.getItem("f7Contacts");
	    var contacts = f7Contacts ? JSON.parse(f7Contacts) : tempInitializeStorage();
	    if (filter) {
	        contacts = _.filter(contacts, filter);
	    }
	    contacts.sort(contactSortDepartment);
	    contacts = _.groupBy(contacts, function (contact) { return "Wydział " + contact.department; });
	    contacts = _.toArray(_.mapValues(contacts, function (value, key) { return { 'letter': key, 'list': value }; }));
	    return contacts;
	}
	function showCathedral() {
	    state.isFavorite = true;
	    var contacts = loadContactsCathedral();
	    ListView.reRender({ model: contacts, header: "Kontakty posortowane katedrami" });
	}
	function loadContactsCathedral(filter) {
	    var f7Contacts = localStorage.getItem("f7Contacts");
	    var contacts = f7Contacts ? JSON.parse(f7Contacts) : tempInitializeStorage();
	    if (filter) {
	        contacts = _.filter(contacts, filter);
	    }
	    contacts.sort(contactSortCathedral);
	    contacts = _.groupBy(contacts, function (contact) { return "Katedra "+contact.cathedral; });
	    contacts = _.toArray(_.mapValues(contacts, function (value, key) { return { 'letter': key, 'list': value }; }));
	    return contacts;
	}

	function loadContacts(filter) {
		var f7Contacts = localStorage.getItem("f7Contacts");
		var contacts = f7Contacts ? JSON.parse(f7Contacts) : tempInitializeStorage();
		if (filter) {
			contacts = _.filter(contacts, filter);
		}
		contacts.sort(contactSort);
		contacts = _.groupBy(contacts, function(contact) { return contact.lastName.charAt(0); });
		contacts = _.toArray(_.mapValues(contacts, function(value, key) { return { 'letter': key, 'list': value }; }));
		return contacts;
	}

	function tempInitializeStorage() {
		var contacts = [
			new Contact({
			    "academicTitle": "prof.",
			    "firstName": "Henryk",
			    "lastName": "Kasor",
			    "department": "Ekonomii",
			    "cathedral": "Analiz i Prognozowania Rynku Pracy",
			    "phone": "+48728459321",
			    "email": "henryk.kasor@gmail.com",
			    "consultations": "Pon. A 13:30-15:00 Pokój 345a bud.A",
			    isFavorite: true
			}),
			new Contact({
			    "academicTitle": "mgr",
			    "firstName": "Grzegorz",
			    "lastName": "Nowak",
			    "department": "Ekonomii",
			    "cathedral": "Badań Strategicznych i Regionalnych",
			    "phone": "+380631234562",
			    "email": "grzegorz.nowak@gmail.com",
			    "consultations": "Czw. B 8:00-9:35 Pokój 101a bud.D"
			}),
			new Contact({
			    "academicTitle": "prof. UE",
			    "firstName": "Andrzej",
			    "lastName": "Kieryś",
			    "department": "Ekonomii",
			    "cathedral": "Ekonomii",
			    "email": "andrzej.kierys@gmail.com",
			    "consultations": "Śr. A i B 9:35-11:40 Pokój 203b bud.B",
			    isFavorite: true
			}),
			new Contact({
			    "academicTitle": "mgr",
			    "firstName": "Aneta",
			    "lastName": "Damiecka",
			    "department": "Ekonomii",
			    "cathedral": "Transportu",
			    "email": "aneta.damiecka@gmail.com",
			    "consultations": "Pt. A 8:00-9:35 Pokój 101a bud.F"
			}),
			new Contact({
			    "academicTitle": "dr",
			    "firstName": "Mirosław",
			    "lastName": "Labok",
			    "department": "Ekonomii",
			    "cathedral": "Analiz i Prognozowania Rynku Pracy",
			    "phone": "+380631234567",
			    "email": "miroslaw.labok@gmail.com",
			    "consultations": "Wt. A i B 9:35-11:40 Pokój 504a bud.D"
			}),
			new Contact({
			    "academicTitle": "prof. zw",
			    "firstName": "Olga",
			    "lastName": "Wiras",
			    "department": "Finansów i Ubezpieczeń",
			    "cathedral": "Matematyki Stosowanej",
			    "phone": "+380631234566",
			    "email": "olga.wiras@gmail.com",
			    "consultations": "Pon. A i B 9:35-11:40 Pokój 404a bud.D"
			}),
			new Contact({
			    "academicTitle": "prof. UE dr hab.",
			    "firstName": "Wiktor",
			    "lastName": "Kot",
			    "department": "Finansów i Ubezpieczeń",
			    "cathedral": "Prawa i Ubezpieczeń",
			    "phone": "+380631234567",
			    "email": "wiktor.kot@gmail.com",
			    "consultations": "Śr. A i B 8:00-9:35 Pokój 101c bud.A"
			}),
			new Contact({
			    "academicTitle": "dr",
			    "firstName": "Wojciech",
			    "lastName": "Loberek",
			    "department": "Finansów i Ubezpieczeń",
			    "cathedral": "Finansów Publicznych",
			    "phone": "+380631234568",
			    "email": "wojciech.loberek@gmail.com",
			    "consultations": "Cz. B 9:35-11:40 Pokój 304a bud.F"
			}),
			new Contact({
			    "academicTitle": "mgr",
			    "firstName": "Michał",
			    "lastName": "Miskor",
			    "department": "Finansów i Ubezpieczeń",
			    "cathedral": "Prawa i Ubezpieczeń",
			    "phone": "+380631234568",
			    "email": "michal.miskor@gmail.com",
			    "consultations": "Pon. A 11:40-13:20 Pokój 650a bud.D",
			    isFavorite: true
			}),
			new Contact({
			    "academicTitle": "mgr inż.",
			    "firstName": "Damian",
			    "lastName": "Granatnikow",
			    "department": "Finansów i Ubezpieczeń",
			    "cathedral": "Rachunkowości",
			    "phone": "+380631234570",
			    "email": "damian.granatnikow@gmail.com",
			    "consultations": "Pt. A 9:35-11:40 Pokój 101a bud.D"
			}),
			new Contact({
			    "academicTitle": "prof.",
			    "firstName": "Dorota",
			    "lastName": "Adamiecka",
			    "department": "Informatyki i Komunikacji",
			    "cathedral": "Badań Operacyjnych",
			    "phone": "+380631234567",
			    "email": "dorota.adamiecka@gmail.com",
			    "consultations": "Wt. A 15:30-16:20 pokój 306a Bud. D"
			}),
			new Contact({
			    "academicTitle": "mgr",
			    "firstName": "Karina",
			    "lastName": "Kowal",
			    "department": "Informatyki i Komunikacji",
			    "cathedral": "Badań Operacyjnych",
			    "phone": "+380631234568",
			    "email": "karina.kowal@gmail.com",
			    "consultations": "Wt. A i B 9:35-11:40 Pokój 504a bud.D"
			}),
			new Contact({
			    "academicTitle": "mgr inż.",
			    "firstName": "Sebastian",
			    "lastName": "Blabor",
			    "department": "Informatyki i Komunikacji",
			    "cathedral": "Inżynierii Wiedzy",
			    "phone": "+380631234568",
			    "email": "sebastian.blabor@gmail.com",
			    "consultations": "Czw. A 9:35-11:40 Pokój 104b bud.F",
			    isFavorite: true
			}),
			new Contact({
			    "academicTitle": "dr",
			    "firstName": "Daniel",
			    "lastName": "Pieskorz",
			    "department": "Informatyki i Komunikacji",
			    "cathedral": "Dziennikarstwa Ekonomicznego i Nowych Mediów",
			    "phone": "+380631234570",
			    "email": "daniel.pieskorz@gmail.com",
			    "consultations": "Pon. A i B 9:35-11:40 Pokój 401a bud.D"
			}),
			new Contact({
			    "academicTitle": "mgr inż.",
			    "firstName": "Michał",
			    "lastName": "Bokok",
			    "department": "Informatyki i Komunikacji",
			    "cathedral": "Dziennikarstwa Ekonomicznego i Nowych Mediów",
			    "phone": "+380631234570",
			    "email": "michal.bokok@gmail.com",
			    "consultations": "Śr. B 9:35-11:40 Pokój 305a bud.A"
			}),
			new Contact({
			    "academicTitle": "mgr",
			    "firstName": "Alicja",
			    "lastName": "Wikander",
			    "department": "Zarządzania",
			    "cathedral": "Marketingu",
			    "phone": "+380631234570",
			    "email": "alicja.wikander@gmail.com",
			    "consultations": "Czw. A 9:35-11:40 Pokój 504a bud.D"
			}),
			new Contact({
			    "academicTitle": "prof.",
			    "firstName": "Jerzy",
			    "lastName": "Stuhr",
			    "department": "Zarządzania",
			    "cathedral": "Zarządzania Międzynarodowym",
			    "phone": "+380631234570",
			    "email": "jerzy.stuhr@gmail.com",
			    "consultations": "Pt. B 9:35-11:40 Pokój 101b bud.F"
			}),
			new Contact({
			    "academicTitle": "prof. UE dr hab.",
			    "firstName": "Janusz",
			    "lastName": "Gajos",
			    "department": "Zarządzania",
			    "cathedral": "Zarządzania Zasobami Ludzkimi",
			    "phone": "+380631234570",
			    "email": "janusz.gajos@gmail.com",
			    "consultations": "Wt. A i B 9:35-11:40 Pokój 504a bud.D"
			}),
			new Contact({
			    "academicTitle": "dr",
			    "firstName": "Michał",
			    "lastName": "Żebrowski",
			    "department": "Zarządzania",
			    "cathedral": "Przedsiębiorczości",
			    "phone": "+380631234570",
			    "email": "michal.zebrowski@gmail.com",
			    "consultations": "Wt. A i B 9:35-11:40 Pokój 504a bud.D"
			}),
			new Contact({
			    "academicTitle": "mgr inż.",
			    "firstName": "Daniel",
			    "lastName": "Olbrychski",
			    "department": "Zarządzania",
			    "cathedral": "Przedsiębiorczości",
			    "phone": "+380631234570",
			    "email": "daniel.olbrychski@gmail.com",
			    "consultations": "Wt. A i B 9:35-11:40 Pokój 504a bud.D"
			})
		];
		localStorage.setItem("f7Contacts", JSON.stringify(contacts));
		return JSON.parse(localStorage.getItem("f7Contacts"));
	}

	function contactSort(a, b) {
		if (a.lastName > b.lastName) {
			return 1;
		}
		if (a.lastName === b.lastName && a.firstName >= b.firstName) {
			return 1;
		}
		return -1;
	}
	function contactSortCathedral(a, b) {
	    if (a.cathedral > b.cathedral) {
	        return 1;
	    }
	    
	   
	    return -1;
	}

    return {
        init: init
    };
    function contactSortDepartment(a, b) {
        if (a.department > b.department) {
            return 1;
        }


        return -1;
    }

    return {
        init: init
    };
});