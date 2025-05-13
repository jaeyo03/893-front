"use client";

import { useRef, useState, useEffect } from "react";
import { Camera, X } from "lucide-react";

type ServerImage = {
  url: string;
  originalName?: string;
};

type Props = {
  value: File[];
  onChange: (files: File[]) => void;
  serverImages?: ServerImage[]; // ✅ 선택적
  onDeleteServerImage?: (index: number) => void; // ✅ 선택적
  onEmptyImage?: () => void;
};

type Preview = {
  url: string;
  file?: File;
  isServer?: boolean;
};

export default function ImageUploader({
  value,
  onChange,
  serverImages,
  onDeleteServerImage,
  onEmptyImage,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [representIndex, setRepresentIndex] = useState<number>(0);

  // 🔄 미리보기 구성
  useEffect(() => {
    const makePreviews = async () => {
      const localPreviews = await Promise.all(
        value.map(
          (file) =>
            new Promise<Preview>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve({ file, url: reader.result as string });
              };
              reader.readAsDataURL(file);
            })
        )
      );

      const serverPreviews =
        serverImages?.map((img) => ({
          url: img.url,
          isServer: true,
        })) ?? [];

      setPreviews([...serverPreviews, ...localPreviews]);
    };

    makePreviews();
  }, [value, serverImages]);

  // ✅ 대표 이미지 선택
  const handleRepresentClick = (index: number) => {
    setRepresentIndex(index);

    const serverCount = serverImages?.length ?? 0;
    if (index >= serverCount) {
      const localIndex = index - serverCount;
      const reordered = reorderFiles(value, localIndex);
      onChange(reordered);
    }
  };

  // ✅ 새 이미지 업로드
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const total = (serverImages?.length ?? 0) + value.length + files.length;
    if (total > 10) {
      alert("최대 10장까지 업로드할 수 있습니다.");
      return;
    }

    const newFiles = [...value, ...files];
    onChange(newFiles);
    e.target.value = "";
  };

  // ✅ 이미지 삭제
  const handleDeleteImage = (index: number) => {
    const serverCount = serverImages?.length ?? 0;

    if (index < serverCount) {
      onDeleteServerImage?.(index);
    } else {
      const localIndex = index - serverCount;
      const newFiles = [...value];
      newFiles.splice(localIndex, 1);
      onChange(newFiles);

      if (newFiles.length === 0 && (serverImages?.length ?? 0) === 0) {
        onEmptyImage?.();
      }
    }

    if (representIndex === index) {
      setRepresentIndex(0);
    } else if (representIndex > index) {
      setRepresentIndex((prev) => prev - 1);
    }
  };

  // ✅ 대표 이미지 정렬
  const reorderFiles = (files: File[], representFileIndex: number): File[] => {
    const main = files[representFileIndex];
    return [main, ...files.filter((_, i) => i !== representFileIndex)];
  };

  const imageCount = (serverImages?.length ?? 0) + value.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        {previews
          .map((p, i) => ({ ...p, index: i }))
          .sort((a, b) => {
            if (a.index === representIndex) return -1;
            if (b.index === representIndex) return 1;
            return 0;
          })
          .map(({ url, index }) => (
            <div
              key={index}
              onClick={() => handleRepresentClick(index)}
              className={`relative w-[144px] h-[144px] rounded-md overflow-hidden border-4 cursor-pointer ${
                index === representIndex ? "border-main" : "border-transparent"
              }`}
            >
              <img
                src={url}
                alt={`preview-${index}`}
                className="object-cover w-full h-full"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteImage(index);
                }}
                className="absolute p-1 rounded-full top-1 right-1 bg-white/80 hover:bg-white"
              >
                <X className="w-4 h-4" />
              </button>
              {index === representIndex && (
                <span className="absolute px-2 py-1 text-xs rounded-md bottom-1 left-1 bg-white/80">
                  대표 이미지
                </span>
              )}
            </div>
          ))}

        {imageCount < 10 && (
          <label
            htmlFor="image-upload"
            className="w-[144px] h-[144px] flex flex-col justify-center items-center gap-1 rounded-md border bg-divider border-none hover:bg-gray-200 transition cursor-pointer"
          >
            <Camera className="w-8 h-8 text-resgistersubtext" />
            <span className="text-xs text-resgistersubtext">
              {imageCount}/10
            </span>
          </label>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        id="image-upload"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
      />
    </div>
  );
}
