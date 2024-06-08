class SceneManager {
  constructor() {}
  currentScene;
  nextScene;
  firstScene;
  creditScene;
  backgroundAlpha;
  fadeIn = false;
  fadeOut = false;
  fadeSpeed = 360;
  looping = true;
  CreditScene() {
    this.ChangeScene(this.creditScene);
  }
  SetCreditScene(scene) {
    this.creditScene = scene;
  }
  Setup(initialScene) {
    this.currentScene = null;
    this.nextScene = null;
    if (initialScene != null) {
      this.fadeIn = true;
      this.fadeOut = false;
      this.backgroundAlpha = 255;
      this.firstScene = initialScene;
      initialScene.enterTime = time.time;
      initialScene.OnEnter();
    }
  }
  Draw() {
    if (this.currentScene != null) this.currentScene.OnDraw();
    if (
      this.firstScene != null &&
      this.currentScene == null &&
      frameCount > 50
    ) {
      this.firstScene.OnDraw();
      if (this.backgroundAlpha > 0) {
        this.backgroundAlpha -= time.deltaTime * this.fadeSpeed;
      } else {
        this.backgroundAlpha = 0;
        this.fadeIn = false;
        this.currentScene = this.firstScene;
        this.firstScene = null;
        this.nextScene = null;
      }
    }
    if (this.nextScene != null && this.currentScene != null) {
      if (this.fadeOut == true && this.fadeIn == false) {
        this.backgroundAlpha += time.deltaTime * this.fadeSpeed;
        if (this.backgroundAlpha >= 255) {
          this.fadeIn = true;
          this.backgroundAlpha = 255;
          this.fadeOut = false;
          if (this.currentScene != null) {
            this.currentScene.OnExit();
          }
          this.currentScene = this.nextScene;
          image.ResetImages();
          this.currentScene.enterTime = time.time;
          this.currentScene.OnEnter();
        }
      }
      if (this.fadeIn == true && this.fadeOut == false) {
        if (this.backgroundAlpha > 0) {
          this.backgroundAlpha -= time.deltaTime * this.fadeSpeed;
        } else {
          this.backgroundAlpha = 0;
          this.fadeIn = false;
          this.firstScene = null;
          this.nextScene = null;
        }
      }
    }
    fill(0, this.backgroundAlpha);
    rect(0, 0, width, height);
  }
  ChangeScene(scene) {
    if (QAMode == true) {
      if (this.nextScene == null) this.looping = false;
      return;
    }
    if (this.nextScene != null || this.firstScene != null) {
      return;
    }
    this.backgroundAlpha = 0;
    this.fadeIn = false;
    this.fadeOut = true;
    this.nextScene = scene;
    this.looping = true;
  }
  ChangeSceneManually(scene) {
    if (this.nextScene != null || this.firstScene != null) return;
    this.backgroundAlpha = 0;
    this.fadeIn = false;
    this.fadeOut = true;
    this.nextScene = scene;
    this.looping = true;
  }
}
