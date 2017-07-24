(function (window, _) {

	'use strict';

	var demo = 'sneakerwatcher',
	data =  {
		sneakers: [
	  	{"name": "Yeezy 750 x Kanye West", "brand": "Adidas", "series": ["750"], "url": "yeezy-750-x-kanye-west", "img": "57408d924fc4c609b97f4df1.jpg"},
	  	{"name": "Air Max 90", "brand": "Nike", "series": ["Air Max", "Air Max 90"], "url": "air-max-90", "img": "57408d924fc4c609b97f4df2.jpg"},
	  	{"name": "Nike Kyrie 1 \"All-Star\"", "brand": "Nike", "series": ["Nike Kyrie 1", "Nike Kyrie 1"], "url": "nike-kyrie-1-all-star", "img": "57408d924fc4c609b97f4df6.jpg"},
	  	{"name": "ZX Flux", "brand": "Adidas", "series": ["ZX", "ZX Flux"], "url": "zx-flux", "img": "57408d924fc4c609b97f4df7.jpg"},
	  	{"name": "Air Foamposite One", "brand": "Nike", "series": ["Air Foamposite", "Air Foamposite One"], "url": "air-foamposite-one", "img": "57408d924fc4c609b97f4df8.jpg"},
	  	{"name": "AIR JORDAN 4 RETRO LS", "brand": "Jordan", "series": ["Air Jordan", "Air Jordan 4", "Air Jordan Retro"], "url": "air-jordan-4-retro-ls", "img": "57408d924fc4c609b97f4df9.jpg"},
	  	{"name": "Air Jordan 1 Retro Low OG \"Bred\"", "brand": "Jordan", "series": ["Air Jordan", "Air Jordan 1", "Air Jordan 1 Low", "Air Jordan Retro", "Air Jordan OG"], "url": "air-jordan-1-retro-low-og-bred", "img": "57408d924fc4c609b97f4dfa.jpg"},
	  	{"name": "Air Jordan 4 Retro \"Oreo\"", "brand": "Jordan", "series": [""], "url": "air-jordan-4-retro-oreo", "img": "57408d924fc4c609b97f4dfb.jpg"},
	  	{"name": "Kobe 9 High EXT QT", "brand": "Nike", "series": ["Kobe 9"], "url": "kobe-9-high-ext-qt", "img": "57408d924fc4c609b97f4dfc_bk.jpg"},
	  	{"name": "Air Jordan 20 \"Laser\"", "brand": "Jordan", "series": ["Air Jordan", "Air Jordan 20", "Air Jordan Laser"], "url": "air-jordan-20-laser", "img": "57408d924fc4c609b97f4df9.jpg"},
	  	{"name": "Air Jordan 10 Retro \"Lady Liberty\"", "brand": "Jordan", "series": ["Air Jordan", "Air Jordan 10", "Air Jordan Retro"], "url": "air-jordan-10-retro-lady-liberty", "img": "asics-gel-lyte-v-suede-upper-off-white-sole-4.jpg"},
	  	{"name": "4 retro \"Oreo\"", "brand": "Air Jordan", "series": ["Air Jordan", "Air Jordan 4", "Air Jordan Retro", "Air Jordan Oreo"], "url": "4-retro-oreo", "img": "black-blue-9-600.jpg"},
	  	{"name": "BREAKPOINT OX \"SOLEBOX\"", "brand": "Converse", "series": [""], "url": "breakpoint-ox-solebox", "img": "63598656282-air-jordan-10-retro-white-obsidian-ice-blue-v-red-010186_1.jpg"},
	  	{"name": "GEL LYTE V \"TAILOR PACK\"", "brand": "Asics", "series": ["Asics Gel Lyte", "Asics Gel Lyte V"], "url": "gel-lyte-v-taylor-pack", "img": "57408d924fc4c609b97f4df9.jpg"}
		],
		users: [
		  {"id": 1, "firstName": "Foo", "lastName": "Bar", "email": "fakeuser@example.com", "permissions": {"show": 2, "view": 2, "edit": 2, "delete": 2, "create": 2}},
		  {"id": 2, "firstName": "Sue", "lastName": "Baz", "email": "suezer@example.com", "permissions": {"show": 2, "view": 2, "edit": 1, "delete": 0}},
		  {"id": 3, "firstName": "Blah", "lastName": "Foo", "email": "blahblah@example.com", "permissions": null}
		],
		// temporary watchlist until implement localStorage adapter
		// will be a list of urls (unique identifiers)
		watchlist: [
			{"name": "Yeezy 750 x Kanye West", "brand": "Adidas", "series": ["750"], "url": "yeezy-750-x-kanye-west", "img": "57408d924fc4c609b97f4df1.jpg"},
	  	{"name": "Air Max 90", "brand": "Nike", "series": ["Air Max", "Air Max 90"], "url": "air-max-90", "img": "57408d924fc4c609b97f4df2.jpg"},
	  	{"name": "Nike Kyrie 1 \"All-Star\"", "brand": "Nike", "series": ["Nike Kyrie 1", "Nike Kyrie 1"], "url": "nike-kyrie-1-all-star", "img": "57408d924fc4c609b97f4df6.jpg"}
		]
	};

	const route = (routes) => {

		const onChange = function(e) {
			// hide all the routes
			var templates = document.querySelectorAll('*[data-route]');

			var hash = location.hash.split('/')[0];

			for (var i = 0; i < templates.length; i++) {
				templates[i].hidden = true;
			}

			if(!hash) {
				location = '#home';
			}
			
			if(routes[hash]) {
				routes[hash](e);
				document.querySelector('*[data-route="'+hash+'"]').hidden = false;
			}
		}

		window.addEventListener('hashchange', onChange, false);
		window.addEventListener('load', onChange, false);
	}

	const api = {
		getCollection: collection => {
			var dataCollection = collection.replace('/', '');
			return data[dataCollection];
		}
	}

	function clone () {
		var clones = document.querySelectorAll('*[data-clone]');
		for ( var i = 0; i < clones.length; i++) {
			// clone existing
			var id = clones[i].dataset.id;
			clones[i].innerHTML = document.querySelector('#'+id).innerHTML;
			//clones[i] = document.querySelector('#'+id);
		}
	}

	function filtered (phrase, collection) {
		//returns filtered collection based on regex
		if (!phrase) { return collection }
		var phrasePart = new RegExp(phrase, 'i');
		//return collection.filter( v => v.name.match(phrasePart));
		return collection.filter( v => JSON.stringify(v).match(phrasePart));
	}

	function WatchlistCollection () {
		this.listeners = {};

		this.toJSON = function () {
			// will be localstorage adapter
			return data.watchlist;
		}

		this.add = function (id) {
			//var watchlistCollection = api.updateCollection('watchlist', 'add', {sneaker});
			var sneaker = _.findWhere(data.sneakers, {url: id});
			console.log(id, sneaker, data.watchlist);
			data.watchlist.push(sneaker);
			
			this.listeners['change'].forEach( v => {
				v(this);
			});
		}

		this.remove = function (id) {
			var idx;
			data.watchlist.forEach( (c, i) => {
				if (c.url === id) {
					idx = i;
				}
			});
			data.watchlist.splice(idx, 1);
			this.listeners['change'].forEach( v => {
				v(this);
			});
		}

		this.listenTo = function (type, listener) {
			// only listening for change event right now
			this.listeners[type] = this.listeners[type] || [];
			this.listeners[type].push(listener);
		}
	}

	// templates
	function Watchlist (constructor) {

		let [ watchlistCollection ] = constructor.collections;

		this.el = document.querySelector(constructor.el);
		this.template = _.template(`<li class="select watchlist" data-id="<%= url %>">
				<img src="/img/demos/sneakerwatcher/<%= img %>" />
				<a href="#sneaker/<%= url %>"><%= name %></a>
				<span></span>
			</li>
		`);

		this.render = function render () {
			let watchlist = watchlistCollection.toJSON(); // localApiAdapter.get({watchlist})
			
			var html = watchlist.reduce( (p, c) => {
				return p += this.template(c);
			}, '');

			this.el.innerHTML = html;

			this.addEventHandlers();
		}

		this.update = function update (type, data) {
			switch (type) {
				case 'watchlist':
					this.render();
					break;
			}
		}

		this.addEventHandlers = function () {
			let spans = this.el.querySelectorAll('span');
			let body = document.querySelector('body');

			//body.addEventListener('click', function (e) {
			//	if (e.target.nodeName === 'SPAN') {
			//		watchlistCollection.remove(e.target.parentNode.dataset.id);
			//	}
			//});

			for (var i = 0; i < spans.length; i++) {
				spans[i].addEventListener('click', function (e) {
					watchlistCollection.remove(e.target.parentNode.dataset.id);
				});
			}
		}



		watchlistCollection.listenTo('change', this.update.bind(this, 'watchlist'));
	}

	function Sneakers (constructor) {
		let [ sneakerCollection, watchlistCollection ] = constructor.collections;

		let bindings = constructor.bindings;

		this.el = document.querySelector('#sneakers');
		this.template = _.template(`
			<li class="select <%= watchlist %>" data-id="<%= url %>" <%= hidden %>>
				<img src="/img/demos/sneakerwatcher/<%= img %>" />
				<div>
					<a href="#sneaker/<%= url %>"><%= name %></a>
					<span></span>
				</div>
			</li>
		`);

		// Let's only call render once per app session
		this.render = function render () {
			let sneakers = sneakerCollection;
			
			var html = sneakers.reduce( (p, c) => {
				var inWatchlist = _.findWhere(watchlistCollection.toJSON(), {url: c.url});
				c.hidden = 'hidden';
				c.watchlist = '';
				if (inWatchlist) {
					c.watchlist = 'watchlist';
				}
				return p += this.template(c);
			}, '');

				this.el.innerHTML = html;

			this.addEventHandlers();
		}

		this.filter = function filter (phrase) {
			let sneakers = filtered(phrase, sneakerCollection);
			let els = this.el.querySelectorAll('li');
			
			for (var i = 0; i < els.length; i++) {
				if (!phrase) {
					els[i].hidden = true;
				} else if (JSON.stringify(sneakers).indexOf(els[i].dataset.id) > -1) {
					els[i].hidden = false;
				} else {
					els[i].hidden = true;
				}
			}
		}

		this.watchlistUpdated = function (watchlistCollection) {
			
			let els = this.el.querySelectorAll('li');
			var inWatchlist;
			
			for (var i = 0; i < els.length; i++) {
				inWatchlist = _.findWhere( watchlistCollection.toJSON(), {url: els[i].dataset['id']} );
				if (inWatchlist) {
					els[i].classList.add('watchlist');
				} else {
					els[i].classList.remove('watchlist');
				}
			}
		}

		this.update = function update (type, data) {
			switch (type) {
				case 'filter':
					this.filter(data);
					break;
				case 'watchlist':
					this.watchlistUpdated(data);
					break;
			}
		}

		this.addEventHandlers = function () {
			let els = this.el.querySelectorAll('li');

			for (var i = 0; i < els.length; i++) {
				els[i].addEventListener('click', function (e) {
					console.log(e.target, e, this);
					let parent = this;
					if (e.target.nodeName === 'SPAN') {
						if (parent.classList.contains('watchlist')) {
							watchlistCollection.remove(parent.dataset.id);
						} else {
							console.log()
							watchlistCollection.add(parent.dataset.id);
						}
					}
				});
			}
		}



		watchlistCollection.listenTo('change', this.update.bind(this, 'watchlist'));

	}

	

	function Search (constructor) {

		let el = document.querySelector('#search');

		let template = _.template(`
			<input type="search" id="search-input" class="input" placeholder="Search for Kicks" />
		`);

		let input;


		el.innerHTML = template();
		input = document.querySelector('#search-input');

		const reset = function reset () {
			input.value = '';
		};

		const set = function set (val) {
			input.value = val;
		}

		this.bindEvents = function bindEvents (opts) {
			let [ sneakers, overlay ] = opts.bindings;
			
			input.addEventListener('keyup', (e) => {
				sneakers.update('filter', e.target.value);
				if (e.target.value) {
					overlay.update({show:true});
				} else {
					overlay.update({show:false});
				}
			});
		}

		this.render = function render () {
			reset();
		}

		this.update = function update (val) {
			set(val);
		}
	}

	function Overlay (constructor) {
		this.el = document.getElementById('overlay');

		this.render = function render(opts) {
			this.el.hidden = true;

			if (opts.show === true) {
				this.el.hidden = false;
			}
		}

		this.update = function update (opts) {
			this.render(opts);
		}
	}

	// event handlers
	function expandWatchlistMini (e) {
		let button = document.getElementById('expand-watchlist');
		let watchlistMini = document.getElementById('watchlist-mini');

		e.target.classList.toggle('open');

		if (e.target.classList.contains('open')) {
			watchlistMini.hidden = false;
		} else {
			watchlistMini.hidden = true;
		}
	}

	function clearSearch (e) {
		let esc = 27,
			key = e.keyCode,
			type = e.type,
			target = e.target;


		if (key && key === esc) {
			target.value = '';
		} else if ((type === 'search' && !target.value) || 
				type === 'click') {
			//e.target.value = '';
			// Yuk
			search.render();
			sneakers.update('filter', '');
			overlay.update({show: false});
		}
	}

	// events
	document.getElementById('expand-watchlist').addEventListener('click', expandWatchlistMini);
	document.getElementById('search').addEventListener('keydown', clearSearch);
	document.getElementById('search').addEventListener('search', clearSearch);
	document.getElementsByTagName('body')[0].addEventListener('click', (e) => {
		if (e.target.hash && e.target.hash.match(/#sneaker/)) {
			clearSearch(e);
		}
	});

	//// Since both of these inits will probably access
	//// the same sneakers model, we should cache sneakers
	//// model then pass it into each
	//
	//api.getSneakers('/sneakers')
	//	.then(function(sneakerModel) {
	//		search.init({
	//			bindings: [ sneakers ],
	//			//models: [ sneakerModel ]
	//		});
	//
	//		sneakers.init(/*{ models: [ sneakerModel ] }*/);
	//	});


	const sneakerCollection = api.getCollection('/sneakers');
	const watchlistCollection = new WatchlistCollection;

	let overlay = new Overlay();
	
	let watchlist = new Watchlist({
		el: '#watchlist',
		template: `<li class="sneaker"><%= name %></li>`,
		collections: [ watchlistCollection ],
	});

	let watchlistMini = new Watchlist({
		el: '#watchlist-mini',
		template: `<li class="sneaker"><%= name %></li>`,
		collections: [ watchlistCollection ],
	});

	let sneakers = new Sneakers({
		collections: [ sneakerCollection, watchlistCollection ], 
	});

	let search = new Search;

	search.bindEvents({
		bindings: [ sneakers, overlay ],
	});

	

	//export { templates }

	//import { sneakers } from 'templates';

	// Watchlist will need a model, collection, persistence!
	// pass in persistence adapters (i will write one for)
	// localStorage but any adapter should have the same
	// interface -- maybe use backbone for this part?

	overlay.render({show: false});
	sneakers.render();
	search.render();
	watchlist.render();
	watchlistMini.render();

	//clone();

	// probably want to render things only certain route
	const router = route({
		'#home': function(e) {
			// nothing to do here
		},
		'#sneaker': function(e) {
			// just show the markup which is 
			// just screenshots for now
		}
	});
	
}(this, _, undefined));