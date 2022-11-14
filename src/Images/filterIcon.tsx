import React from 'react';

function FilterIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none">
            <g filter="url(#filter0_d_426_9765)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 3.40023C6 4.30599 6.3117 5.18417 6.88274 5.88725L9.2992 8.86244L11.4799 11.5474C12.2035 12.4382 12.5985 13.5508 12.5988 14.6985L12.5992 16.4622L12.5993 16.7651C12.5995 18.0105 14.076 18.6661 15 17.8309L16.3845 16.5796C17.0311 15.9952 17.4005 15.1647 17.4015 14.2932C17.4024 13.4077 17.7077 12.5494 18.2661 11.8621L20.7015 8.86472L23.1156 5.89342C23.6877 5.1893 24 4.30973 24 3.4025C24 2.62792 23.3721 2 22.5975 2H15H7.40023C6.6269 2 6 2.6269 6 3.40023Z" fill="#00819D" />
            </g>
            <defs>
                <filter id="filter0_d_426_9765" x="0" y="0" width="30" height="28.2047" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feMorphology radius="2" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_426_9765" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_426_9765" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_426_9765" result="shape" />
                </filter>
            </defs>
        </svg>
    );
}

export default FilterIcon;