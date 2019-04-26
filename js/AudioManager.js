var AudioManager = {
	music: false,
	sound: false,
	musicList: [],
	soundList: [],
	init: function() {
		var _this = this;

		game.sound.muteOnPause = true;

		var musicList = [
			'music',
		];

		musicList.forEach(function(music) {
			var tmp = game.add.sound(music);
			_this.musicList.push(tmp);

			tmp.volume -= 0.5;
		});

		var soundList = [
			'trash',
			'buyguiri',
			'coin'
		];

		soundList.forEach(function(sound) {
			var tmp = game.add.sound(sound);
			_this.soundList.push(tmp);

			tmp.volume -= 0.3;
		});

     	var music = JSON.parse(localStorage.getItem('allforthecove_music'));
        var sound = JSON.parse(localStorage.getItem('allforthecove_sound'));

        if (music === null) {
            music = false; 
        }

        if (sound === null) {
            sound = false;
        }

        this.setMusic(music);
        this.setSound(sound);
	},

	setMusic: function(mute) {
		this.music = mute;

		for (const music of this.musicList) {
			music.mute = mute;
		}

		localStorage.setItem("allforthecove_music", JSON.stringify(this.music));
	},

	setSound: function(mute) {
		this.sound = mute;

		for (const sound of this.soundList) {
			sound.mute = mute;
		}

		localStorage.setItem("allforthecove_sound", JSON.stringify(this.sound));
	},

	getMusic: function(key) {
		for (const music of this.musicList) {
			if (key === music.key) {
				return music;
			}	
		}

		return null;
	},

	getSound: function(key) {
		for (const sound of this.soundList) {
			if (key === sound.key) {
				return sound;
			}	
		}

		return null;
	}
}