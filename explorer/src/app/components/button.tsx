import React from "react";

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }): React.ReactNode => {
    return (
        <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClick?.(e)}
            className="flex font-medium cursor-pointer text-gray-500 transition-colors ease-in-out duration-150 hover:text-blue-600 flex-row justify-center items-start space-x-2"
        >
            {children}
        </button>
    );
};

const MiniButton: React.FC<ButtonProps> = ({ children, onClick }): React.ReactNode => {
    return (
        <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClick?.(e)}
            className="w-9 h-9 flex flex-col flex-shrink-0 justify-center items-center transition-colors ease-in-out duration-150 hover:text-blue-600"
        >
            {children}
        </button>
    );
};

export default Button;

export { MiniButton };
