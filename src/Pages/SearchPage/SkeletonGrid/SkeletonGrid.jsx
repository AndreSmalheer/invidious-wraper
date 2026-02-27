import React from "react";
import "./SkeletonGrid.css";

export default function SkeletonGrid({ count = 24 }) {
    const placeholders = Array.from({ length: count });
    return (
        <>
            {placeholders.map((_, index) => (
                <div key={index} className="video skeleton-video">
                    <div className="thumbnail skeleton-box"></div>
                    <div className="video-text">
                        <h3 className="skeleton-line"></h3>
                        <p className="skeleton-line creator"></p>
                        <p className="skeleton-line meta"></p>
                    </div>
                </div>
            ))}
        </>
    );
}
