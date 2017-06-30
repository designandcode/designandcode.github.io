(function (window, _) {
	var demo = 'sneakerwatcher',
	data =  {
		sneakers: [
	  	{"name": "Yeezy 750 x Kanye West", "brand": "Adidas", "series": ["750"]},
	  	{"name": "Air Max 90", "brand": "Nike", "series": ["Air Max", "Air Max 90"]},
	  	{"name": "Nike Kyrie 1 \"All-Star\"", "brand": "Nike", "series": ["Nike Kyrie 1", "Nike Kyrie 1"]},
	  	{"name": "ZX Flux", "brand": "Adidas", "series": ["ZX", "ZX Flux"]},
	  	{"name": "Air Foamposite One", "brand": "Nike", "series": ["Air Foamposite", "Air Foamposite One"]},
	  	{"name": "AIR JORDAN 4 RETRO LS", "brand": "Jordan", "series": ["Air Jordan", "Air Jordan 4", "Air Jordan Retro"]},
	  	{"name": "Air Jordan 1 Retro Low OG \"Bred\"", "brand": "Jordan", "series": ["Air Jordan", "Air Jordan 1", "Air Jordan 1 Low", "Air Jordan Retro", "Air Jordan OG"]},
	  	{"name": "Air Jordan 4 Retro \"Oreo\"", "brand": "Jordan", "series": [""]},
	  	{"name": "Kobe 9 High EXT QT", "brand": "Nike", "series": ["Kobe 9"]},
	  	{"name": "Air Jordan 20 \"Laser\"", "brand": "Jordan", "series": ["Air Jordan", "Air Jordan 20", "Air Jordan Laser"]},
	  	{"name": "Air Jordan 10 Retro \"Lady Liberty\"", "brand": "Jordan", "series": ["Air Jordan", "Air Jordan 10", "Air Jordan Retro"]},
	  	{"name": "4 retro \"Oreo\"", "brand": "Air Jordan", "series": ["Air Jordan", "Air Jordan 4", "Air Jordan Retro", "Air Jordan Oreo"]},
	  	{"name": "BREAKPOINT OX \"SOLEBOX\"", "brand": "Converse", "series": [""]},
	  	{"name": "GEL LYTE V \"TAILOR PACK\"", "brand": "Asics", "series": ["Asics Gel Lyte", "Asics Gel Lyte V"]}
		],
		users: [
		  {"id": 1, "firstName": "Foo", "lastName": "Bar", "email": "fakeuser@example.com", "permissions": {"show": 2, "view": 2, "edit": 2, "delete": 2, "create": 2}},
		  {"id": 2, "firstName": "Sue", "lastName": "Baz", "email": "suezer@example.com", "permissions": {"show": 2, "view": 2, "edit": 1, "delete": 0}},
		  {"id": 3, "firstName": "Blah", "lastName": "Foo", "email": "blahblah@example.com", "permissions": null}
		]
	},
	templates = {
		sneakers: {
			data: data.sneakers,
			item: _.template('<li><%= name %></li>'),
			el: document.querySelector('#sneakers'),
			render: function () {
				var html = this.data.forEach( c => {
					this.el.innerHTML += this.item(c);
				});
			}
		}
		
	};

	templates.sneakers.render();
	
}(this, _, undefined));