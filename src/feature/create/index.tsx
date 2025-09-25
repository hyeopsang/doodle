import ClickableCard from './clickable-card';
export default function Create() {
  return (
    <div className="flex flex-col justify-center items-center 2xl:flex-row gap-4">
      <ClickableCard
        path="/drowing"
        title="드로잉"
        description="다양한 브러쉬와 색상으로 자유롭게 그림을 그려보세요."
      />
      <ClickableCard
        path="/draft"
        title="글쓰기"
        description="제목, 본문, 태그 등 다양한 요소로 생각을 자유롭게 정리해보세요."
      />
    </div>
  );
}
