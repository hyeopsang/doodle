import {Link} from 'react-router';

export default function CreatePage() {
  return (
    <div className="bg-white dark:bg-black w-full h-full text-black flex justify-center py-10">
      <div className="max-w-[960px] w-full 3xl:px-0 2xl:px-[20px] xs:px-[7.5px] flex flex-col justify-center items-center 2xl:flex-row gap-4">
        {/* 드로잉 */}
        <div
          className="w-full 2xl:w-1/2 aspect-square bg-white shadow-xl 
                     flex flex-col justify-center items-center p-4 rounded-[20px] 
                      card-hover cursor-pointer"
        >
          <h2 className="text-2xl 2xl:text-[28px] 3xl:text-[32px] font-bold">
            드로잉
          </h2>
          <p className="text-center mt-2 text-[18px] 2xl:text-[22px] text-[#999] font-medium">
            다양한 브러쉬와 색상으로 자유롭게 그림을 그려보세요.
          </p>
        </div>

        {/* 글쓰기 */}
        <Link
          to={'/draft'}
          className="w-full 2xl:w-1/2 aspect-square bg-white shadow-xl 
                     flex flex-col justify-center items-center p-4 rounded-[20px] 
                     card-hover"
        >
          <h2 className="text-2xl 2xl:text-[28px] 3xl:text-[32px] font-bold">
            글쓰기
          </h2>
          <p className="text-center mt-2 text-[18px] 2xl:text-[22px] text-[#999] font-medium">
            제목, 본문, 태그 등 다양한 요소로 생각을 자유롭게 정리해보세요.
          </p>
        </Link>
      </div>
    </div>
  );
}
