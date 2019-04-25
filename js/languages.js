var Languages = {
	currentLang: null,
	init: function() {
		var lang = localStorage.getItem('allforthecove_lang');

		if (lang === null) {
			lang = 'es_es';
		}

		this.setLanguage(lang);
	},
	switchLanguage: function() {
		var lang = 'es_es';

		if (this.currentLang == 'es_es') {
			lang = 'en_us';
		}

		this.setLanguage(lang);
	},
	setLanguage: function(lang) {
		this.currentLang = lang
		localStorage.setItem('allforthecove_lang', lang);
	},
	getText: function(text) {
		var langJSON = game.cache.getJSON(this.currentLang);

		if (langJSON == null) {
			console.log('langFile is missing');
			return ''
		};

		if (!langJSON.hasOwnProperty(text)) {
			console.log('text' + text + ' for langFile is missing');
			return '';
		}

		return langJSON[text];
	}
}