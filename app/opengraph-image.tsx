import { ImageResponse } from "next/og";

export const alt = "Искра — анонимный чат для знакомств и общения";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#ff7420",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            marginTop: "28px",
            fontSize: "92px",
            fontWeight: 800,
            color: "#fff8ef",
            lineHeight: 1,
          }}
        >
          Искра
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "18px",
            fontSize: "36px",
            color: "#fff",
            lineHeight: 1.3,
          }}
        >
          Анонимный чат для знакомств и общения
        </div>
      </div>
    ),
    { ...size },
  );
}
