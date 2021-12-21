import React from "react";
import {
    MdHome,
    MdAccountBox,
    MdAnnouncement,
    MdDashboardCustomize,
    // MdDelete,
    // MdVerifiedUser,
    // MdVpnKey,
    // MdDriveFileMoveOutline,
    // MdFlipCameraIos,
    // MdOutlineWindow,
} from "react-icons/md";

export const DepthList1 = [
    {
        id: 1,
        title: "depth_1depth_1",
        link: "/b",
        icon: <MdHome />,
        subMenu: [
            {
                id: 1_1,
                title: "depth_1_1",
                link: "/b/1",
                icon: "",
                subMenu: [],
            },
            {
                id: 1_2,
                title: "depth_1_2",
                link: "/b/2",
                icon: "",
                subMenu: [],
            },
            {
                id: 1_3,
                title: "depth_1_3",
                link: "/b/3",
                icon: "",
                subMenu: [
                    {
                        id: 1_3_1,
                        title: "depth_1_3_1",
                        link: "/b/3/1",
                        icon: "",
                        subMenu: [],
                    },
                    {
                        id: 1_3_2,
                        title: "depth_1_3_2depth_1_3_2",
                        link: "/b/3/2",
                        icon: "",
                        subMenu: [
                            {
                                id: 1_3_2_1,
                                title: "depth_1_3_2_1",
                                link: "/b/3/2/1",
                                icon: "",
                                subMenu: [],
                            },
                            {
                                id: 1_3_2_2,
                                title: "depth_1_3_2_2",
                                link: "/b/3/2/2",
                                icon: "",
                                subMenu: [],
                            },
                            {
                                id: 1_3_2_3,
                                title: "depth_1_3_2_3",
                                link: "/b/3/2/3",
                                icon: "",
                                subMenu: [
                                    {
                                        id: 1_3_2_3_1,
                                        title: "depth_1_3_2_3_1",
                                        link: "/b/3/2/3/1",
                                        icon: "",
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
                        icon: "",
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
        icon: <MdAccountBox />,
        subMenu: [],
    },
    {
        id: 3,
        title: "depth_3",
        link: "/a",
        icon: <MdAnnouncement />,
        subMenu: [
            {
                id: 3_1,
                title: "depth_3_1",
                link: "/a/1",
                icon: "",
                subMenu: [],
            },
            {
                id: 3_2,
                title: "depth_3_2",
                link: "/a/2",
                icon: "",
                subMenu: [
                    {
                        id: 3_2_1,
                        title: "depth_3_2_1",
                        link: "/a/2/1",
                        icon: "",
                        subMenu: [],
                    },
                    {
                        id: 3_2_2,
                        title: "depth_3_2_2",
                        link: "/a/2/2",
                        icon: "",
                        subMenu: [],
                    },
                    {
                        id: 3_2_3,
                        title: "depth_3_2_3",
                        link: "/a/2/3",
                        icon: "",
                        subMenu: [],
                    },
                ],
            },
            {
                id: 3_3,
                title: "depth_3_3",
                link: "/a/3",
                icon: "",
                subMenu: [],
            },
            {
                id: 3_4,
                title: "depth_3_4",
                link: "/a/4",
                icon: "",
                subMenu: [],
            },
        ],
    },
    {
        id: 4,
        title: "depth_4",
        icon: <MdDashboardCustomize />,
        link: "/c",
        subMenu: [],
    },
    {
        id: 5,
        title: "depth_5",
        icon: <MdDashboardCustomize />,
        link: "/d",
        subMenu: [],
    },
];

export const Common_depth_list_1 = [
    {
        id: 1,
        title: "작업",
        link: "",
        icon: <MdHome />,
    },
];
