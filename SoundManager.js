class SoundManager {
  constructor() {
    this.sounds = new Map();
    this.nowPlaying = null;
  }

  LoadSound(name, filename) {
    let sound = loadSound(filename);
    this.sounds.set(name, sound);
  }

  PlaySound(name) {
    let sound = this.sounds.get(name);
    if (sound) {
      sound.play();
      this.nowPlaying = sound;
    }
  }

  StopSound(name) {
    let sound = this.sounds.get(name);
    if (sound) {
      sound.stop();
    }
  }

  soundDuration(name) {
    let sound = this.sounds.get(name);
    if (sound) {
      return sound.duration();
    }
    return 0;
  }

  playSoundOnce(name) {
    this.PlaySound(name);
    this.removeSound(name);
  }

  removeSound(name) {
    this.sounds.delete(name);
  }

  hasSound(name) {
    return this.sounds.has(name);
  }

  isPlaying(name) {
    let sound = this.sounds.get(name);
    if (sound) {
      return sound.isPlaying();
    }
    return false;
  }

  stopNowPlaying() {
    if (this.nowPlaying) {
      this.nowPlaying.stop();
    }
  }
}
