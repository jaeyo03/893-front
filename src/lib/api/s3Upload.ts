// Presigned URL 요청 함수
export const getPresignedUrl = async (file: File) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/s3/presigned-url`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: file.name,
        contentType: file.type,
      }),
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("Presigned URL 요청 실패");

  const data = await res.json();
  return data;
};

// S3에 실제 이미지 업로드 함수
export const uploadToS3 = async (file: File, url: string) => {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
    body: file,
  });

  if (!res.ok) throw new Error("S3 업로드 실패");
};
