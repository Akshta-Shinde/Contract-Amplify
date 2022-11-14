import React from 'react';

function OtherChargesLineIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="37" viewBox="0 0 34 37" fill="none">
            <g filter="url(#filter0_d_297_1429)">
                <path d="M4.5 0V28H29.5" stroke="black" />
            </g>
            <defs>
                <filter id="filter0_d_297_1429" x="0" y="0" width="33.5" height="36.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_297_1429" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_297_1429" result="shape" />
                </filter>
            </defs>
        </svg>
    );
}

export default OtherChargesLineIcon;