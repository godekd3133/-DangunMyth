public class S2C5 extends Scene {
  private boolean isEffectOut;

  public S2C5() {
  }

  @Override public void OnEnter() {
    image.LoadImage("background", "Images/S2/C5/background");
    image.LoadImage("button", "Images/S2/C5/button");
    sound.LoadSound("effect", "Sounds/S2/C5/effect/effect.wav");
    isEffectOut = false;

  }

  @Override public void OnDraw() {
    image.DrawImageScale("background", new PVector(width / 2, height / 2), new PVector(1, 1));

    if (mouseX >= 550 && mouseX <= width - 592 && mouseY >= 585 && mouseY <= height - 85) {
      image.DrawImage("button", new PVector(width / 2, height / 2), 0f,255,220,220,220);

      if (mousePressed) {
        if (!isEffectOut) {
          sound.PlaySound("effect");
          isEffectOut = !isEffectOut;
        }
        // 미니 게임 씬 이동
        scene.ChangeScene(new S2C6());
      }
    } else {
      image.DrawImageScale("button", new PVector(width / 2, height / 2), new PVector(1, 1));
    }
  }

  @Override public void OnExit() {
  }
}
