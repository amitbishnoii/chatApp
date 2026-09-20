import { useState } from "react";

export const usePasswordToggle = () => {
    const [show, setShow] = useState<boolean>(false);
    const toggle = () => setShow((prev) => !prev);

    return { show, toggle };
};
