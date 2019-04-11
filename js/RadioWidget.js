class RadioWidget extends Widget {
	
	constructor(id, app) {
		super(id, RadioModel, RadioView, RadioController, app);
	}
	
	setUp() {
		super.setUp();
		this.header = true;
		this.footer = true;
		this.sizeX = 1.8;
		this.sizeY = 0.9;
		this.radius = 15;
	}
	
	/*async ready() {
		super.ready();
	}*/
	
}

class RadioModel extends WidgetModel {
	
	constructor() {
		super();
	}
	
	//Présentation des stations avec leur lien internet
	stations() {
		return {
			"Sélectionnez votre station": "" ,
			Skyrock: "http://www.skyrock.fm/stream.php/mytuner_128mp3.mp3" ,
			"Chérie": "https://scdn.nrjaudio.fm/fr/40104/aac_64.mp3?cdn_path=audio_lbs7" ,
			Generations: "http://generationfm.ice.infomaniak.ch/generationfm-high.mp3" ,
			Nostalgie: "https://scdn.nrjaudio.fm/fr/40106/aac_64.mp3?cdn_path=audio_lbs7" ,
			"Virgin Radio": "http://mp3lg4.tdf-cdn.com/9243/lag_164753.mp3" ,
			NRJ: "https://scdn.nrjaudio.fm/fr/40050/aac_64.mp3?cdn_path=audio_lbs7" ,
			RFM: "http://rfm-live-mp3-128.scdn.arkena.com/rfm.mp3",
			"Europe 1": "http://audiots.scdn.arkena.com/10713/europe1ts.mp3?date=2019-3-29T13:11:0" ,
			"Jazz Radio": "http://jazzradio.ice.infomaniak.ch/jazzradio-high.mp3" 
		};
	}
	
}

class RadioView extends WidgetView {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}

	draw() {
		super.draw();
	    	this.header.innerHTML = "Radio";
		SS.style(this.header, {"backgroundColor": "maroon"});
	    	SS.style(this.footer, {"backgroundColor": "maroon"});
	    	SS.style(this.stage, {"backgroundColor": "white", "color": "white"});
		
		//Création de la liste de stations
		this.stationsList = document.createElement("select");
		this.stationsList.setAttribute("id","radioList");
		SS.style(this.stationsList,{"width": "100%", "cursor": "pointer", "color": "black"});
		this.stage.appendChild(this.stationsList);
		
		//Création d'une balise audio avec un contrôleur prédéfini
		this.stationsAudio = document.createElement("audio");
		this.stationsAudio.controls = "controls";
		SS.style(this.stationsAudio, {"backgroundColor":"#000000", "marginTop": "10px"});
		this.stage.appendChild(this.stationsAudio);
		
		this.span = document.createElement("span");
		SS.style(this.span, {"fontSize": "10px"});
		this.stage.appendChild(this.span);
		
		//Intégration des différentes stations de radio dans la liste "stationsList"
		var stations = this.mvc.model.stations();
		for(var key in stations) {
			this.stationsListOption = document.createElement("option");
			this.stationsListOption.value = key;
			this.stationsListOption.text = key;
			this.stationsList.appendChild(this.stationsListOption);
		};
		
		//Fonction événement de "stationsList" qui fait appel à la fonction "stationClick" du controller
		Events.on(this.stationsList, "change", (event) => this.mvc.controller.stationClick(this.stationsList.value));
	}
	
	update(title) {
		this.span.innerHTML = title;
	}
	
}

class RadioController extends WidgetController {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();	
	}
	
	//Fonction qui joue la station séléctionnée
  	stationClick(station) {
 		console.log(station);
  		console.log(this.mvc.model.stations()[station]);
  		this.try.mvc.view.stationsAudio.setAttribute("src", this.mvc.model.stations()[station]);
   		this.try.mvc.view.footer.innerHTML = station;
	}
	
	async load() {
		let result = await this.mvc.main.dom("https://www.radioways.fr"); // load web page
		let domstr = _atob(result.response.dom); // decode result
		let parser = new DOMParser(); // init dom parser
		let dom = parser.parseFromString(domstr, "text/html"); // inject result
		let article = new xph().doc(dom).ctx(dom).craft('//*[@id="titre-en-cours"]').firstResult; // find interesting things
		this.mvc.view.update(article.textContent);
	}

}
