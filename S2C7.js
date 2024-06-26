class S2C7 extends Scene {
  constructor() {
    super();
    this.SCENE_DURATION = 5;
    this.animalScale = 0.2;
    this.utilScale = 0.035;
    this.tearScale = 0.025;
    this.bearY = height - 280;
    this.tigerY = height - 305;
    this.handX = 530;
    this.handY = 470;
    this.handRotate = 0.0;
    this.handAngle = 0.01;
    this.handDir = -0.4;
    this.tearLeftY = height - 280;
    this.tearRightY = height - 290;
    this.tearSpeedL = 0;
    this.tearSpeedR = 0;
    this.startTime = 0;
    this.playingYum = false;
  }

  OnEnter() {
    this.startTime = millis();
  }

  OnDraw() {
    let currentProcessingTime = Math.floor((millis() - this.startTime) / 500);
    let isEating = currentProcessingTime % 2 == 1;
    let positionToMoveHead = isEating ? 10 : 0;
    imageManager.DrawImageScale(
      "s2c7_background",
      createVector(width / 2, height / 2),
      createVector(1, 1)
    );

    if (isEating) {
      imageManager.DrawImageScale(
        "s2c7_bear1",
        createVector(520, 440),
        createVector(this.animalScale, this.animalScale)
      );
      imageManager.DrawImageScale(
        "s2c7_tiger1",
        createVector(660, 405),
        createVector(this.animalScale, this.animalScale)
      );
    } else {
      imageManager.DrawImageScale(
        "s2c7_bear2",
        createVector(520, 440),
        createVector(this.animalScale, this.animalScale)
      );
      imageManager.DrawImageScale(
        "s2c7_tiger2",
        createVector(660, 405),
        createVector(this.animalScale, this.animalScale)
      );
    }

    if (timeManager.time - this.enterTime > 1 && !this.playingYum) {
      soundManager.PlaySound("yum");
      this.playingYum = true;
    }

    if (timeManager.time - this.enterTime > this.SCENE_DURATION) {
      sceneManager.ChangeScene(new S2C8());
    }
  }

  OnExit() {}
}
