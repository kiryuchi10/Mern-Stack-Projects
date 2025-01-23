// AppIconsPage.js
import React from "react";

function AppIconsPage() {
    const icons = [
        { label: "Icon 1", color: "#FF5733" },
        { label: "Icon 2", color: "#33FF57" },
        { label: "Icon 3", color: "#3357FF" },
        { label: "Icon 4", color: "#FF33C4" },
    ];

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>App Icons</h2>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "15px",
                    flexWrap: "wrap",
                }}
            >
                {icons.map((icon, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: icon.color,
                            width: "100px",
                            height: "100px",
                            borderRadius: "15px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        {icon.label}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AppIconsPage;
