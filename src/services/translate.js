import '../assets/i18n/ru';
import '../assets/i18n/en';
import '../assets/i18n/ky';

class  translate{
	constructor() {
		this.state = {
			lang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'ru',
		};
		this.translations = require('../assets/i18n/' + this.state.lang + '.json');
	}
	
	get(code) {
		return this.translations[code] ? this.translations[code] : code;
	}
	
	refresh(code){
		this.translations = require('../assets/i18n/' + code + '.json');
	}
}


export default new translate();