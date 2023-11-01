"use client"
import React from "react";
import dynamic from "next/dynamic";
import {CardBalance1} from "./card-balance1";
import {CardBalance2} from "./card-balance2";
import {CardBalance3} from "./card-balance3";
import {Button} from "@nextui-org/react";
import {ParseFile} from "../../tool/WorkPlanParser/WorkPlanParser";


const Chart = dynamic(
    () => import("../charts/steam").then((mod) => mod.Steam),
    {
        ssr: false,
    }
);

export const Content = () => (
    <div className=" h-full">
        <div
            className="flex justify-center gap-4 xl:gap-12 pt-2 md:pt-2 px-8 flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
            <div className="mt-6 gap-6 flex flex-col w-full">
                {/* Card Section Top */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">Текущие показатели</h3>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-5  justify-center w-full">
                        <CardBalance1/>
                        <CardBalance2/>
                        <CardBalance3/>
                    </div>
                </div>

                {/* Chart */}
                <div className="h-full flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">Статистика</h3>
                    <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
                        <Chart/>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
