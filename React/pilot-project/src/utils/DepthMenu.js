import React from "react";
import Main from "../page/Main";
import Menu2 from "../page/Menu2";
import Menu3 from "../page/Menu3";
import Menu4 from "../page/Menu4";
import Work from "../page/work/Work";

export const DepthList1 = [
    {
        id: 1,
        title: "depth_1depth_1",
        link: "/b",
        // component: <Menu3 />,
        subMenu: [
            {
                id: 1_1,
                title: "depth_1_1",
                link: "/b/1",
                component: <Menu3 />,
                subMenu: [],
            },
            {
                id: 1_2,
                title: "depth_1_2",
                link: "/b/2",
                component: <Main />,
                subMenu: [],
            },
            {
                id: 1_3,
                title: "depth_1_3",
                link: "/b/3",
                component: <Menu2 />,
                subMenu: [
                    {
                        id: 1_3_1,
                        title: "depth_1_3_1",
                        link: "/b/3/1",
                        component: <Menu2 />,
                        subMenu: [],
                    },
                    {
                        id: 1_3_2,
                        title: "depth_1_3_2depth_1_3_2",
                        link: "/b/3/2",
                        component: <Menu2 />,
                        subMenu: [
                            {
                                id: 1_3_2_1,
                                title: "depth_1_3_2_1",
                                link: "/b/3/2/1",
                                component: <Menu2 />,
                                subMenu: [],
                            },
                            {
                                id: 1_3_2_2,
                                title: "depth_1_3_2_2",
                                link: "/b/3/2/2",
                                component: <Menu2 />,
                                subMenu: [],
                            },
                            {
                                id: 1_3_2_3,
                                title: "depth_1_3_2_3",
                                link: "/b/3/2/3",
                                component: <Menu2 />,
                                subMenu: [
                                    {
                                        id: 1_3_2_3_1,
                                        title: "depth_1_3_2_3_1",
                                        link: "/b/3/2/3/1",
                                        component: <Menu2 />,
                                        subMenu: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 1_3_3,
                        title: "depth_1_3_3",
                        link: "/b/3/3",
                        component: <Menu2 />,
                        subMenu: [],
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        title: "depth_2",
        link: "/menu",
        component: <Work />,
        subMenu: [],
    },
    {
        id: 3,
        title: "depth_3",
        link: "/a",
        component: <Menu2 />,
        subMenu: [
            {
                id: 3_1,
                title: "depth_3_1",
                link: "/a/1",
                component: <Main />,
                subMenu: [],
            },
            {
                id: 3_2,
                title: "depth_3_2",
                link: "/a/2",
                component: <Main />,
                subMenu: [
                    {
                        id: 3_2_1,
                        title: "depth_3_2_1",
                        link: "/a/2/1",
                        component: <Main />,
                        subMenu: [],
                    },
                    {
                        id: 3_2_2,
                        title: "depth_3_2_2",
                        link: "/a/2/2",
                        component: <Menu2 />,
                        subMenu: [],
                    },
                    {
                        id: 3_2_3,
                        title: "depth_3_2_3",
                        link: "/a/2/3",
                        component: <Main />,
                        subMenu: [],
                    },
                ],
            },
            {
                id: 3_3,
                title: "depth_3_3",
                link: "/a/3",
                component: <Main />,
                subMenu: [],
            },
            {
                id: 3_4,
                title: "depth_3_4",
                link: "/a/4",
                component: <Main />,
                subMenu: [],
            },
        ],
    },
    {
        id: 4,
        title: "depth_4",
        component: <Menu3 />,
        link: "/c",
        subMenu: [],
    },
    {
        id: 5,
        title: "depth_5",
        component: <Menu4 />,
        link: "/d",
        subMenu: [],
    },
];

export const Common_depth_list_1 = [
    {
        id: 1,
        title: "작업",
        link: "",
        component: <Main />,
    },
];
