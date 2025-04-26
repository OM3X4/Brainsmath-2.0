import { useRef, useState } from "react";

const angleToNumber = (angle : any) => {
    // Normalize to [0, 360)
    angle = (angle + 360) % 360;

    if (angle >= 337.5 || angle < 22.5) return 3;        // Right
    if (angle >= 22.5 && angle < 67.5) return 2;         // Up-Right
    if (angle >= 67.5 && angle < 112.5) return 1;        // Up
    if (angle >= 112.5 && angle < 157.5) return 8;       // Up-Left
    if (angle >= 157.5 && angle < 202.5) return 7;       // Left
    if (angle >= 202.5 && angle < 247.5) return 6;       // Down-Left
    if (angle >= 247.5 && angle < 292.5) return 5;       // Down
    if (angle >= 292.5 && angle < 337.5) return 4;       // Down-Right

    return 9; // Fallback (center tap maybe?)
};

export default function JoystickPad({ onNumberInput } : any) {
    const padRef = useRef<HTMLDivElement | null>(null);
    const [center, setCenter] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);

    const handleStart = (e: any) => {
        const rect = padRef.current?.getBoundingClientRect();
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const y = e.touches ? e.touches[0].clientY : e.clientY;
        setCenter({ x, y });
        setDragging(true);
    };

    const handleEnd = (e: any) => {
        if (!dragging) return;
        const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;

        const dx = x - center.x;
        const dy = center.y - y; // Invert Y because screen coords grow downward

        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const number = angleToNumber(angle);
        onNumberInput(number);

        setDragging(false);
    };

    return (
        <div
            ref={padRef}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-800 rounded-full w-32 h-32 opacity-90 touch-none"
            onTouchStart={handleStart}
            onTouchEnd={handleEnd}
            onMouseDown={handleStart}
            onMouseUp={handleEnd}
        >
            <p className="text-white text-center mt-12 select-none">Joystick</p>
        </div>
    );
}
