/** * 웅녀 선택했을 때의 하트 출력 */

public class S3C3V1_3_1 extends Scene {
  private final static String PREFIX = "Images/S3/C3/V1/_3/_1/";

  private float 웅녀_X = 588;
  private float 웅녀_Y = 350;

  private float 환웅_X = 1150;
  private float 환웅_Y = 500;

  private int SCENE_SECONDS;
  private int startMinute;
  private int startSecond;
  private int startMillis;

  private float heartSize=0;
  private float diameter;
  private float minimumSize;
  private float angle = 0;

  @Override public void OnEnter() {

    웅녀_X = 588;
    웅녀_Y = 350;

    환웅_X = 1150;
    환웅_Y = 500;

    heartSize = 0;

    SCENE_SECONDS = 6;
    diameter = height - 400; //최대크기
    minimumSize = diameter-350;
    angle = 0;

    // 이미지 로드
    image.LoadImage("background", PREFIX+"background");

    image.LoadImage("웅녀", PREFIX+"웅녀");
    image.LoadImage("환웅", PREFIX+"환웅");

    image.LoadImage("heart", PREFIX+"heart");

    sound.LoadSound("Choice","Sounds/Effects/Choice.mp3");
    sound.PlaySound("Choice");

    startMinute=minute();
    startSecond=second();
    startMillis=millis();

  }

  @Override public void OnDraw() {
    //           최소크기                    최대크기
    float d1 = minimumSize +(sin(angle) *(diameter)/2) +(diameter)/2;

    // heartSize += 0.005;
    // println("d1 : " + d1);

    image.DrawImage("background", new PVector(width / 2, height / 2));

    //웅녀 선택 씬
    image.DrawImageScale("웅녀", new PVector(웅녀_X, 웅녀_Y), new PVector(0.2f, 0.2f));
    image.DrawImageScale("환웅", new PVector(환웅_X, 환웅_Y), new PVector(0.3, 0.3));

    image.DrawImageScale("heart", new PVector(width / 2, height / 2), new PVector(d1/2000, d1/2000));

    // 씬 시작 후 SCENE_SECONDS초 경과시 다음 장면으로 이동
    if (isTimeExceeded(startMinute, startSecond, SCENE_SECONDS)) {
      scene.ChangeScene(new S3C3V1_3_2());
    }
    angle += 0.1; //크기 증가 속도
    diameter+=7.0; //최대크기 증가
    minimumSize+=15; //최소크기 증가

  }

  @Override public void OnExit() {
  }
}
