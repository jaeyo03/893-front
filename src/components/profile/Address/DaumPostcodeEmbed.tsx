"use client";

import { useEffect, useRef } from "react";

type DaumPostcodeData = {
  address: string;
  addressType: "R" | "J";
  bname: string;
  buildingName: string;
  zonecode: string;
  jibunAddress: string;
  roadAddress: string;
  autoRoadAddress?: string;
  autoJibunAddress?: string;
};

export default function DaumPostcodeEmbed({
  onComplete,
}: {
  onComplete: (data: DaumPostcodeData) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadDaumPostcode = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { daum } = window as any;
      new daum.postcode.Postcode({
        oncomplete: onComplete,
        width: "100%",
        height: "100%",
      }).embed(containerRef.current);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined" && !(window as any).daum) {
      const script = document.createElement("script");
      script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.onload = loadDaumPostcode;
      document.body.appendChild(script);
    } else {
      loadDaumPostcode();
    }
  }, [onComplete]);

  return <div ref={containerRef} style={{ width: "100%", height: "400px" }} />;
}
