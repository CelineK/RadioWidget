class RadioWidget extends Widget {
	
	constructor(id, app) {
		super(id, RadioModel, RadioView, RadioController, app);
	}
	
	setUp() {
		super.setUp();
		this.header = true;
		this.footer = true;
		this.sizeX = 2;
		this.sizeY = 1;
		this.radius = 10;

	}
	
	async ready() {
		super.ready();
		
		
	}
	
}

class RadioModel extends WidgetModel {
	
	constructor() {
		super();
	}
	
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

		
		this.select = document.createElement("select");
		this.select.setAttribute("id","stationSelect");
		SS.style(this.select,{"width": "100%", "cursor": "pointer"});
		this.stage.appendChild(this.select);
		
		this.stationAudio = document.createElement("audio");
		this.stationAudio.controls = "controls";
		
		var stations = this.mvc.model.stations();
		
		for(var key in stations) {
			this.option = document.createElement("option");
			this.option.value = key;
			this.option.text = key;
			this.select.appendChild(this.option);
			
			//this.stationAudio.src = this.station[key];
			//this.stationAudio.type = "audio";
		};
		
		this.stage.appendChild(this.stationAudio);
		//this.select.addEventListener("change",this.mvc.controller.stationSelect());
		Events.on(this.select, "change", (event) => this.mvc.controller.stationSelect(this.select.value));
	}
}

class RadioController extends WidgetController {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}
	
    stationSelect(station) {
 	console.log(station);
  	console.log(this.mvc.model.stations()[station]);
  	this.try.mvc.view.stationAudio.setAttribute("src", this.mvc.model.stations()[station]);
   	this.try.mvc.view.footer.innerHTML= station;
	}

}
