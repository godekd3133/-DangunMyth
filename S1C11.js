class S1C11 extends Scene {
  constructor() {
    super();

    this.HWANIN_BODY_X = 200.0;
    this.HWANIN_BODY_Y = 520.0;
    this.HWANIN_EYE_X = 200.0;
    this.HWANIN_EYE_Y = 420.0;
    this.HWANIN_SCALE = 0.35;

    this.HWANWOONG_BODY_X = 1100.0;
    this.HWANWOONG_BODY_Y = 580.0;
    this.HWANWOONG_EYE_X = 1025.0;
    this.HWANWOONG_EYE_Y = 385.0;
    this.HWANWOONG_SCALE = 0.35;

    this.SCENE_SCONDS = 3; // 3초 동안 씬 진행
    this.startMillis = 0;

    this.narrDuration = 0;
  }

  OnEnter() {

    this.startMillis = millis();
  }

  OnDraw() {
    imageManager.DrawImage("s1c11_background", createVector(width / 2, height / 2));
    imageManager.DrawImage("s1c11_text", createVector(width / 2, height / 2));

    imageManager.DrawImageScale(
      "s1c11_hwanin_body",
      createVector(this.HWANIN_BODY_X, this.HWANIN_BODY_Y),
      createVector(this.HWANIN_SCALE, this.HWANIN_SCALE, 0)
    );
    imageManager.DrawImageScale(
      "s1c11_hwanwoong_body",
      createVector(this.HWANWOONG_BODY_X, this.HWANWOONG_BODY_Y),
      createVector(this.HWANWOONG_SCALE, this.HWANWOONG_SCALE, 0)
    );

    // 입, 움직임 인터랙션 반복
    if (Math.floor(millis() / 500) % 2 === 0) {
      imageManager.DrawImageScale(
        "s1c11_hwanin_expression1",
        createVector(this.HWANIN_EYE_X, this.HWANIN_EYE_Y),
        createVector(this.HWANIN_SCALE, this.HWANIN_SCALE, 0)
      );
      imageManager.DrawImageScale(
        "s1c11_hwanwoong_expression1",
        createVector(this.HWANWOONG_EYE_X, this.HWANWOONG_EYE_Y),
        createVector(this.HWANWOONG_SCALE, this.HWANWOONG_SCALE, 0)
      );
    } else {
      imageManager.DrawImageScale(
        "s1c11_hwanin_expression2",
        createVector(this.HWANIN_EYE_X, this.HWANIN_EYE_Y),
        createVector(this.HWANIN_SCALE, this.HWANIN_SCALE, 0)
      );
      imageManager.DrawImageScale(
        "s1c11_hwanwoong_expression2",
        createVector(this.HWANWOONG_EYE_X, this.HWANWOONG_EYE_Y),
        createVector(this.HWANWOONG_SCALE, this.HWANWOONG_SCALE, 0)
      );
    }

    // 씬 시작 후 1.5초 뒤 대사1 시작
    if (
      soundManager.hasSound("S1/C11/hwanin") &&
      isTimeExceededMillis(this.startMillis, 1.5)
    ) {
      this.narrDuration = soundManager.soundDuration("S1/C11/hwanin");
      soundManager.playSoundOnce("S1/C11/hwanin");
      this.startMillis = millis(); // 대사 1 시작 millis
    }

    // 대사 1 종료 후 1초 뒤 대사2 시작
    if (
      !soundManager.hasSound("S1/C11/hwanin") &&
      soundManager.hasSound("S1/C11/hwanwoong") &&
      isTimeExceededMillis(this.startMillis, this.narrDuration + 1.0)
    ) {
      this.narrDuration = soundManager.soundDuration("S1/C11/hwanwoong");
      soundManager.playSoundOnce("S1/C11/hwanwoong");
      this.startMillis = millis();
    }

    // 대사 2 종료 후 1초 뒤 다음 장면으로 이동
    if (
      !soundManager.hasSound("S1/C11/hwanin") &&
      !soundManager.hasSound("S1/C11/hwanwoong") &&
      isTimeExceededMillis(this.startMillis, this.narrDuration + 1.0)
    ) {
      sceneManager.ChangeScene(new S1C13());
    }
  }

  OnExit() {
    soundManager.stopNowPlaying();
  }

  isTimeExceededMillis(startMillis, endSeconds) {
    let nowTotalMilliseconds = millis();
    let endMilliseconds = endSeconds * 1000;
    return nowTotalMilliseconds - startMillis >= endMilliseconds;
  }
}
