public class S2C7 extends Scene {
  public float SCENE_DURATION = 5f;
  private float animalScale = 0.20f;
  private float utilScale = 0.035f;
  private float tearScale = 0.025f;
  private int bearY = height - 280;
  private int tigerY = height - 305;
  private float handX = 530f;
  private int handY = 470;
  private float handRotate = 0.0f;
  private float handAngle = 0.01f;
  private float handDir = -0.4f;
  private float tearLeftY = height - 280f;
  private float tearRightY = height - 290f;
  private float tearSpeedL = 0f;
  private float tearSpeedR = 0f;
  private int startTime = 0;
  private boolean playingYum = false;

  public S2C7() {
  }

  @Override public void OnEnter() {
    image.LoadImage("background", "Images/S2/C7/background");

    // image.LoadImage("bear", "Images/S2/C7/bear");
    // image.LoadImage("bear_eyes", "Images/S2/C7/bear_eyes");
    // image.LoadImage("bear_mouth", "Images/S2/C7/bear_mouth");
    // image.LoadImage("tiger_body", "Images/S2/C7/tiger_body");
    // image.LoadImage("tiger_eyes", "Images/S2/C7/tiger_eyes");
    // image.LoadImage("tiger_head", "Images/S2/C7/tiger_head");
    // image.LoadImage("tiger_mouth", "Images/S2/C7/tiger_mouth");

    image.LoadImage("tiger1", "Images/S2/C7/tiger1");
    image.LoadImage("tiger2", "Images/S2/C7/tiger2");

    image.LoadImage("bear1", "Images/S2/C7/bear1");
    image.LoadImage("bear2", "Images/S2/C7/bear2");
    sound.LoadSound("yum","Sounds/Effects/YumYum.mp3");

    startTime = millis();
  }

  @Override public void OnDraw() {
    int currentProcessingTime =(millis() - startTime) / 500;
    boolean isEating = currentProcessingTime % 2 == 1;
    int positionToMoveHead = isEating ? 10 : 0;
    image.DrawImageScale("background", new PVector(width / 2, height / 2), new PVector(1, 1));
    //Legacy
    // image.DrawImageScale("bear_eyes", new PVector(435, 390), new PVector(animalScale, animalScale));
    // image.DrawImageScale("bear", new PVector(440, 440), new PVector(animalScale, animalScale));
    // image.DrawImageScale("bear_mouth", new PVector(445, 450 + positionToMoveHead), new PVector(animalScale, animalScale));
    // image.DrawImageScale("tiger_eyes", new PVector(690, 380 + positionToMoveHead), new PVector(animalScale, animalScale));
    // image.DrawImageScale("tiger_body", new PVector(730, 500), new PVector(animalScale, animalScale));
    // image.DrawImageScale("tiger_mouth", new PVector(695, 470 + positionToMoveHead), new PVector(animalScale, animalScale));
    // image.DrawImageScale("tiger_head", new PVector(720, 370 + positionToMoveHead), new PVector(animalScale, animalScale));

    //240603 수정

    if (isEating) {
      image.DrawImageScale("bear1", new PVector(520, 440), new PVector(animalScale, animalScale));
      image.DrawImageScale("tiger1", new PVector(660, 405), new PVector(animalScale, animalScale));
    } else {
      image.DrawImageScale("bear2", new PVector(520, 440), new PVector(animalScale, animalScale));
      image.DrawImageScale("tiger2", new PVector(660, 405), new PVector(animalScale, animalScale));
    }
    if (time.time - enterTime > 1.f && !playingYum) {
      sound.PlaySound("yum");
      playingYum = true;
    }
    if (time.time - enterTime > SCENE_DURATION) {
      scene.ChangeScene(new S2C8());
    }
  }

  @Override public void OnExit() {
  }
}
