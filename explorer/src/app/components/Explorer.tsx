"use client";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

interface ResponseProps {
    res: object;
}

interface ExplorerProps {
    initialData?: object;
}

const JSONExplorer: React.FC<ExplorerProps> = ({ initialData = {} }) => {
    const [data, setData] = useState<ResponseProps>();
    const [propertyKey, setPropertyKey] = useState<string>("");
    const [propertyValue, setPropertyValue] = useState<string>("");
    const [variable, setVariable] = useState<string>("");

    useEffect(() => {
        setData({ res: initialData });
    }, [initialData]);

    useEffect(() => {
        const getObjectValue = (obj: ResponseProps | undefined, path: string): any => {
            const keys = path.match(/[^.[\]]+/g);

            if (!keys) return undefined;

            return keys.reduce((acc: any, key: string | number) => (acc !== undefined ? acc[key] : undefined), obj);
        };
        const propValue = getObjectValue(data, propertyKey);
        if (
            ["string", "boolean", "Date", "number", "undefined"].includes(typeof propValue) ||
            [null, undefined, NaN].includes(propValue)
        ) {
            setPropertyValue(String(propValue));
        }
    }, [propertyKey]);

    const renderNode = (node: any, parentKey: string = ""): React.ReactNode => {
        const buildBlock = (item: any) => {
            const isArray = Array.isArray(item);
            const isObject =
                typeof item === "object" &&
                item !== null &&
                (Object.getPrototypeOf(item) === Object.prototype || Object.getPrototypeOf(item) === null);
            let blockStart = "";
            let blockEnd;
            if (isArray) {
                blockStart = "[ ";
                blockEnd = "],";
            }

            if (isObject) {
                blockStart = "{ ";
                blockEnd = "},";
            }

            const ignoreClick = isArray || isObject;

            return { blockStart, blockEnd, ignoreClick };
        };

        const renderValue = (value: any) => {
            if (["boolean", "number"].includes(typeof value)) {
                return <span className="text-pink-600">{`${String(value)},`}</span>;
            } else {
                return <span className="text-green-600">{`"${String(value)}",`}</span>;
            }
        };

        if (typeof node === "object" && node !== null) {
            if (Array.isArray(node)) {
                return (
                    <ul className="px-6">
                        {node.map((item: any, idx: number) => {
                            const { blockStart, blockEnd } = buildBlock(item);
                            return (
                                <li key={`${parentKey}.${idx}`}>
                                    <span>{blockStart}</span>
                                    <span className="">{renderNode(item, `${parentKey}[${idx}]`)}</span>
                                    <span>{blockEnd}</span>
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                return (
                    <ul className="px-6">
                        {Object.entries(node).map(([key, item]: [string, any], idx: number) => {
                            const { blockStart, blockEnd, ignoreClick } = buildBlock(item);
                            const currentKey = [parentKey, key].filter(Boolean).join(".");

                            return (
                                <li className="" key={`${parentKey}.${idx}`}>
                                    <span>
                                        <span
                                            onClick={() =>
                                                !ignoreClick && setPropertyKey(["res", currentKey].join("."))
                                            }
                                            className={
                                                ignoreClick ? "" : "text-sky-600 hover:cursor-pointer hover:underline"
                                            }
                                        >{`${key}`}</span>
                                        {`: ${blockStart}`}
                                    </span>
                                    <span>{renderNode(item, currentKey)}</span>
                                    <span className="">{blockEnd}</span>
                                </li>
                            );
                        })}
                    </ul>
                );
            }
        } else {
            return renderValue(node);
        }
    };

    return (
        <div className="flex flex-col w-full space-y-8">
            <div className="flex flex-row justify-between space-x-4 items-start w-full">
                {/* Input Component */}
                <fieldset className="flex flex-1 flex-col space-y-1">
                    <label className="text-gray-500" htmlFor="property">
                        Property
                    </label>
                    <input
                        className="px-4 h-12 border border-gray-300 rounded-lg w-full"
                        type="text"
                        placeholder={"res.path.to.property"}
                        value={propertyKey}
                        onChange={(e) => setPropertyKey(e.target.value)}
                    />
                    <span className="text-gray-500">{propertyValue}</span>
                </fieldset>
                <span className="w-8 h-full pt-9 flex flex-col flex-shrink-0 justify-center items-center">
                    <ArrowRightIcon strokeWidth={2} className="h-6 w-6" />
                </span>
                <fieldset className="flex flex-1 flex-col space-y-1">
                    <label className="text-gray-500" htmlFor="property">
                        Block / Variable
                    </label>
                    <input
                        className="px-4 h-12 border border-gray-300 rounded-lg w-full"
                        type="text"
                        placeholder={"Variable"}
                        value={variable}
                        onChange={(e) => setVariable(e.target.value)}
                    />
                </fieldset>
                <span className="w-8 h-full pt-9 flex text-gray-500 flex-col flex-shrink-0 justify-center items-center">
                    <MinusIcon strokeWidth={2} className="h-6 w-6" />
                </span>
            </div>
            <div className="space-y-6 px-4">
                <button className="flex font-medium cursor-pointer text-gray-500 transition-colors ease-in-out duration-150 hover:text-blue-600 flex-row justify-center items-start space-x-2">
                    <PlusIcon strokeWidth={2} className="h-6 w-6" />
                    <span>Assign to variable</span>
                </button>
                <button className="flex font-medium cursor-pointer text-gray-500 transition-colors ease-in-out duration-150 hover:text-blue-600 flex-row justify-center items-start space-x-2">
                    <PlusIcon strokeWidth={2} className="h-6 w-6" />
                    <span>Assign to block</span>
                </button>
            </div>
            <fieldset className="flex flex-1 flex-col space-y-1">
                <label className="text-gray-500" htmlFor="property">
                    Response
                </label>
                <pre className="w-full min-h-80 max-h-[600px] leading-relaxed text-sm overflow-y-auto border border-gray-300 py-6 rounded-lg">
                    {renderNode(data?.res || {})}
                </pre>
            </fieldset>
        </div>
    );
};

export default JSONExplorer;
