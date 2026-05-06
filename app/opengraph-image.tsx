import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Brendo Bittencourt — Engenheiro de Dados";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FEFAE0",
                    position: "relative",
                    fontFamily: "system-ui, sans-serif",
                }}
            >
                {/* Decorative circles */}
                <div
                    style={{
                        position: "absolute",
                        top: "80px",
                        right: "150px",
                        width: "300px",
                        height: "300px",
                        borderRadius: "50%",
                        border: "1px solid #CCD5AE",
                        opacity: 0.3,
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "120px",
                        right: "190px",
                        width: "220px",
                        height: "220px",
                        borderRadius: "50%",
                        border: "1px solid #CCD5AE",
                        opacity: 0.2,
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "100px",
                        left: "100px",
                        width: "200px",
                        height: "200px",
                        borderRadius: "50%",
                        border: "1px solid #D4A373",
                        opacity: 0.2,
                    }}
                />

                {/* Name */}
                <div
                    style={{
                        fontSize: "72px",
                        fontWeight: 300,
                        color: "#3D2C1E",
                        letterSpacing: "-2px",
                        display: "flex",
                        alignItems: "baseline",
                    }}
                >
                    Brendo B
                    <span style={{ color: "#D4A373", fontSize: "72px" }}>.</span>
                </div>

                {/* Description */}
                <div
                    style={{
                        fontSize: "24px",
                        color: "#7A6B5A",
                        marginTop: "16px",
                        letterSpacing: "1px",
                    }}
                >
                    Engenheiro de Dados
                </div>

                {/* Email */}
                <div
                    style={{
                        fontSize: "18px",
                        color: "#D4A373",
                        marginTop: "24px",
                        fontFamily: "monospace",
                    }}
                >
                    oi@brendo.dev
                </div>

                {/* Bottom accent line */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "40px",
                        width: "60px",
                        height: "2px",
                        backgroundColor: "#D4A373",
                        borderRadius: "1px",
                    }}
                />
            </div>
        ),
        { ...size }
    );
}
