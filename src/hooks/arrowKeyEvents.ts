import { useEffect, useState } from 'react';
import { Vector } from 'vecti';

enum dir {
    up = "ArrowUp",
    down = "ArrowDown",
    left = "ArrowLeft",
    right = "ArrowRight"
}

const useArrowKeys = () => {
    const [input, setInput] = useState<{ [key in dir]: boolean }>(
        {
            [dir.up]: false,
            [dir.down]: false,
            [dir.left]: false,
            [dir.right]: false
        }
    );

    function updateInput(key: dir | null, value: boolean) {
        if (key) {
            const d = input
            d[key] = value;
            setInput(d);
        }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        updateInput(event.key as dir, true);
    }
    const handleKeyUp = (event: KeyboardEvent) => {
        updateInput(event.key as dir, false);
    }


    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    });

    return Vector.of([
        (input[dir.right] ? 1 : 0) - (input[dir.left] ? 1 : 0),
        (input[dir.up] ? 1 : 0) - (input[dir.down] ? 1 : 0)
    ]);
};

export default useArrowKeys;
