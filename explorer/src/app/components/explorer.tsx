"use client";

import React, { useEffect, useState } from "react";
import { ArrowRightIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import Input from "./input";
import Buttons, { MiniButton } from "./buttons";
import { getObjectValue } from "@app/app/utils";


// Use a JSON standard typescript interface
interface ResponseProps {
    res: object;
}

interface ExplorerProps {
    initialData?: object;
}

const JSONExplorer: React.FC<ExplorerProps> = ({ initialData = {} }) => {
    const [data, setData] = useState<ResponseProps>({ res: initialData });
    const [propertyKey, setPropertyKey] = useState<string>("");
    const [propertyValue, setPropertyValue] = useState<string>("");
    const [variable, setVariable] = useState<string>("");

    useEffect(() => {
        setData({ res: initialData });
    }, [initialData]);

    useEffect(() => {
        const propValue = getObjectValue(data, propertyKey);
        if (
            ["string", "boolean", "Date", "number", "undefined"].includes(typeof propValue) ||
            [null, undefined, NaN].includes(propValue)
        ) {
            setPropertyValue(String(propValue));
        }
    }, [propertyKey, data]);

    /**
     * Recursively walk the node / data object until all values are rendered.
     * It takes into handles various data types (number, string, boolean, date, array & dictionary) accordingly,
     * deciding how to handle each block as it goes through each attribute it finds.
     * @param node - attribute / node to evaluate
     * @param parentKey - attribute key (e.g. res.name)
     */
    const renderNode = (node: unknown, parentKey: string = ""): React.ReactNode => {
        const buildBlock = (item: unknown) => {
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

        const renderValue = (value: unknown) => {
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
                        {node.map((item: unknown, idx: number) => {
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
                        {Object.entries(node).map(([key, item]: [string, unknown], idx: number) => {
                            const { blockStart, blockEnd, ignoreClick } = buildBlock(item);
                            const currentKey = [parentKey, key].filter(Boolean).join(".");

                            return (
                                <li className="" key={`${parentKey}.${idx}`}>
                                    <span>
                                        <span
                                            id={currentKey}
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
            {/*Headline input sections */}
            <div className="flex flex-row justify-between space-x-4 items-start w-full">
                {/* Property Input Component */}
                <Input
                    name={"property"}
                    label={"Property"}
                    placeholder={"res.path.property"}
                    value={propertyKey}
                    onChange={(value) => setPropertyKey(value?.trim())}
                    propertyValue={propertyValue}
                />
                <span className="h-ful pt-10">
                    <ArrowRightIcon strokeWidth={2} className="h-6 w-6" />
                </span>
                <Input
                    name={"variable"}
                    label={"Block / Variable"}
                    placeholder={"Variable"}
                    value={variable}
                    onChange={setVariable}
                />
                <span className="h-full pt-8 text-gray-500">
                    <MiniButton>
                        <MinusIcon strokeWidth={2} className="h-6 w-6" />
                    </MiniButton>
                </span>
            </div>
            <div className="space-y-6 px-4">
                <Buttons>
                    <PlusIcon strokeWidth={2} className="h-6 w-6" />
                    <span>Assign to variable</span>
                </Buttons>
                <Buttons>
                    <PlusIcon strokeWidth={2} className="h-6 w-6" />
                    <span>Assign to block</span>
                </Buttons>
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
