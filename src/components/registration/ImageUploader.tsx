"use client";

import { useRef, useState } from "react";
import { Camera, X } from "lucide-react";

export default function ImageUploadBox() {
  const [previews, setPreviews] = useState<string[]>([]); // 이미지 미리보기 상태
  const [representIndex, setRepresentIndex] = useState<number | null>(null); // 대표 이미지 인덱스 상태

  const fileInputRef = useRef<HTMLInputElement | null>(null); // 파일 input에 접근하기 위한 ref

  // 이미지 선택 시 실행되는 함수
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files);
    const totalFiles = previews.length + selectedFiles.length;

    //  10개 이상 업로드 시 제한
    if (totalFiles > 10) {
      alert("최대 10장까지 이미지를 업로드할 수 있습니다.");
      return;
    }

    // 각 파일을 base64로 변환해 preview에 추가
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreviews((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = ""; // 같은 파일 다시 선택 가능하게 리셋
  };

  const handleDeleteImage = (indexToDelete: number) => {
    //이미지 삭제 함수
    // 클릭된 index 제외하고 다시 배열 구성
    setPreviews((prev) => prev.filter((_, i) => i !== indexToDelete));
  };

  return (
    <div className="flex flex-col gap-2">
      {/* 이미지 미리보기들 */}
      <div className="flex flex-wrap gap-4">
        {previews.map((src, index) => (
          <div
            key={index}
            onClick={() => setRepresentIndex(index)} // 클릭 시 대표 이미지로 설정
            className={`relative w-[144px] h-[144px] rounded-md overflow-hidden border-4 cursor-pointer ${
              representIndex === index ? "border-main" : "border-transparent"
            }`}
          >
            {/* 이미지 미리보기 */}
            <img
              src={src}
              alt={`preview-${index}`}
              className="object-cover w-full h-full"
            />
            {/* 삭제 버튼 */}
            <button
              onClick={() => handleDeleteImage(index)}
              className="absolute p-1 rounded-full top-1 right-1 bg-white/80 hover:bg-white"
              aria-label="이미지 삭제"
            >
              <X className="w-4 h-4 " />
            </button>
            {/*대표이미지 버튼*/}
            <button
              onClick={() => setRepresentIndex(index)}
              className="absolute px-2 py-1 text-xs rounded-md bottom-1 left-1 bg-white/80 hover:bg-white"
            >
              {representIndex === index ? "대표 이미지" : "대표로 설정"}
            </button>
          </div>
        ))}

        {/* 업로드 버튼 - 10개 미만일 때만 노출 */}
        {previews.length < 10 && (
          <label
            htmlFor="image-upload"
            className="w-[144px] h-[144px] flex flex-col justify-center items-center gap-1 rounded-md border bg-divider border-none hover:bg-gray-200 transition cursor-pointer"
          >
            <Camera className="w-8 h-8 text-resgistersubtext" />
            <span className="text-xs text-resgistersubtext">
              {previews.length}/10
            </span>
          </label>
        )}
      </div>

      {/* 숨겨진 input */}
      <input
        type="file"
        accept="image/*"
        id="image-upload"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}
        multiple // 여러 파일 선택 설정
      />
    </div>
  );
}
// 1. 이미지 다중 업로드 미리보기 o , 삭제o , 수정?
// 2. 이미지 디테일 UI/UX
// 3. 반응형 디자인
