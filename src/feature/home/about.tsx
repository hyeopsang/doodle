import AboutCard from "./about-card";

export default function About() {
  return (
    <section className="w-full flex flex-col py-10 2xl:py-20 gap-10 2xl:gap-0">
      <AboutCard
        title="유연한 드로잉 캔버스"
        description="브러시로 자유롭게 그리기, 색상 선택, 선 두께 조절, 지우개 사용, 그리고 스케치를 이미지로 저장까지"
        imgSrc="./images/drowing.jpg"
        reverse
      />
      <AboutCard
        title="글 속에 스케치 삽입"
        description="직접 스케치 한 이미지를 글에 삽입하여 아이디어를 시각적으로 표현"
        imgSrc="./images/docs.png"
      />
      <AboutCard
        title="다양한 글쓰기 기능 및 히스토리 지원"
        description="마크다운 지원, 글 버전 관리, 자동 저장 기능으로 안전하게 글 작성"
        imgSrc=""
        reverse
      />
    </section>
  );
}
