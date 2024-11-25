import React from "react";

interface InputProps {
    label: string;
    value: string;
    type?: string;
    placeholder?: string;
    propertyValue?: string;
    onChange: (value: any) => void;
}

const Input: React.FC<InputProps> = ({
    label,
    value,
    type = "text",
    onChange,
    placeholder = "",
    propertyValue = ""
}): React.ReactNode => {
    return (
        <fieldset className="flex flex-1 flex-col space-y-1">
            <label className="text-gray-500" htmlFor="property">
                {label}
            </label>
            <input
                className="px-4 h-12 border border-gray-300 rounded-lg w-full"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
            />
            {Boolean(propertyValue) && <span className="text-gray-500">{propertyValue}</span>}
        </fieldset>
    );
};

export default Input;
