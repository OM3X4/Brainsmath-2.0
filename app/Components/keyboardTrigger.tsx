import React, { useRef, useEffect } from 'react';

type KeyboardTriggerProps = {
    onKey: (char: string) => void;
};


const KeyboardTrigger: React.FC<KeyboardTriggerProps> = ({ onKey }) => {    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleInput = (e: Event) => {
            const target = e.target as HTMLInputElement;
            const value = target.value;
            if (value) {
                onKey(value); // send typed character to your quiz logic
                target.value = ''; // clear it for next input
            }
        };

        const input = inputRef.current;
        if (input) {
            input.addEventListener('input', handleInput);
        }

        return () => {
            if (input) {
                input.removeEventListener('input', handleInput);
            }
        };
    }, [onKey]);

    return (
        <>
            <input
                ref={inputRef}
                inputMode="text"
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                style={{
                    position: 'absolute',
                    opacity: 0,
                    zIndex: -1,
                    pointerEvents: 'none',
                }}
            />
            <button
                onClick={() => {
                    inputRef.current?.focus({ preventScroll: true });
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Tap to Start Typing
            </button>
        </>
    );
}

export default KeyboardTrigger;
