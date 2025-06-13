"use client";

import { useEffect, useMemo, useRef } from "react";
import { Camera, X } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

type ServerImage = {
  url: string;
  originalName?: string;
};

type Props = {
  value: File[];
  onChange: (files: File[]) => void;
  serverImages?: ServerImage[];
  onDeleteServerImage?: (index: number) => void;
  onEmptyImage?: () => void;
  mainImageIndex: number;
  onChangeMainImageIndex: (index: number) => void;
};

export default function ImageUploader({
  value,
  onChange,
  serverImages = [],
  onDeleteServerImage,
  onEmptyImage,
  mainImageIndex,
  onChangeMainImageIndex,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const localImagePreviews = useMemo(() => {
    return value.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
  }, [value]);

  useEffect(() => {
    return () => {
      localImagePreviews.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, [localImagePreviews]);

  const combinedImages = useMemo(() => {
    const all = [
      ...serverImages.map((img, i) => ({
        url: img.url,
        index: i,
        isServer: true,
      })),
      ...localImagePreviews.map(({ url }, i) => ({
        url,
        index: i + serverImages.length,
        isServer: false,
      })),
    ];
    return all.sort((a, b) => {
      if (a.index === mainImageIndex) return -1;
      if (b.index === mainImageIndex) return 1;
      return 0;
    });
  }, [serverImages, localImagePreviews, mainImageIndex]);

  const handleRepresentClick = (index: number) => {
    onChangeMainImageIndex(index);

    const serverCount = serverImages.length;
    if (index >= serverCount) {
      const localIndex = index - serverCount;
      const reordered = reorderFiles(value, localIndex);
      onChange(reordered);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const total = serverImages.length + value.length + files.length;
    if (total > 10) {
      toast.error("최대 10장까지 업로드할 수 있습니다.");
      return;
    }

    onChange([...value, ...files]);
    e.target.value = "";
  };

  const handleDeleteImage = (index: number) => {
    const serverCount = serverImages.length;

    if (index < serverCount) {
      if (mainImageIndex === index) {
        onChangeMainImageIndex(0);
      } else if (mainImageIndex > index) {
        onChangeMainImageIndex(mainImageIndex - 1);
      }
      console.log("🧹 서버 이미지 삭제:", index);
      onDeleteServerImage?.(index);
    } else {
      const localIndex = index - serverCount;
      const newFiles = [...value];
      newFiles.splice(localIndex, 1);

      if (mainImageIndex === index) {
        onChangeMainImageIndex(0);
      } else if (mainImageIndex > index) {
        onChangeMainImageIndex(mainImageIndex - 1);
      }

      console.log("🧹 로컬 이미지 삭제:", localIndex);
      onChange(newFiles);

      if (newFiles.length === 0 && serverImages.length === 0) {
        onEmptyImage?.();
      }
    }
  };

  const reorderFiles = (files: File[], representFileIndex: number): File[] => {
    const main = files[representFileIndex];
    return [main, ...files.filter((_, i) => i !== representFileIndex)];
  };

  const imageCount = serverImages.length + value.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        {combinedImages.map(({ index, url }) => (
          <div
            key={`preview-${index}-${url}`}
            onClick={() => handleRepresentClick(index)}
            className={`relative w-[144px] h-[144px] rounded-md overflow-hidden border-4 cursor-pointer ${
              index === mainImageIndex ? "border-main" : "border-transparent"
            }`}
          >
            <Image
              src={url}
              alt={`preview-${index}`}
              width={144}
              height={144}
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
            {index === mainImageIndex && (
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
