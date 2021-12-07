import React from "react";
import {
    MdHome,
    MdAccountBox,
    MdAnnouncement,
    MdDashboardCustomize,
    MdDelete,
    MdVerifiedUser,
    MdVpnKey,
    MdDriveFileMoveOutline,
    MdFlipCameraIos,
    MdOutlineWindow,
} from "react-icons/md";

export const menuList = [
    {
        id: 1,
        title: "Main",
        link: "/",
        icon: <MdHome />,
    },
    {
        id: 2,
        title: "Menu",
        link: "/menu",
        icon: <MdAccountBox />,
    },
    {
        id: 3,
        title: "Menu1",
        link: "/Main1",
        icon: <MdHome />,
    },
    {
        id: 2,
        title: "Menu2",
        link: "/Main2",
        icon: <MdAccountBox />,
    },
    {
        id: 1,
        title: "Menu3",
        link: "/Main3",
        icon: <MdHome />,
    },
    {
        id: 2,
        title: "Menu4",
        link: "/menu4",
        icon: <MdAccountBox />,
    },
    {
        id: 1,
        title: "Menu5",
        link: "/Menu5",
        icon: <MdHome />,
    },
    {
        id: 2,
        title: "Menu6",
        link: "/menu6",
        icon: <MdAccountBox />,
    },
    {
        id: 1,
        title: "Menu7",
        link: "/Menu7",
        icon: <MdHome />,
    },
    {
        id: 2,
        title: "Menu8",
        link: "/menu8",
        icon: <MdAccountBox />,
    },
];

export const subMenuList = [
    {
        id: 1,
        title: "subMenu1",
        link: "/menu/1",
        icon: <MdAnnouncement />,
    },
    {
        id: 2,
        title: "subMenu2",
        link: "/menu/2",
        icon: <MdDashboardCustomize />,
    },
    {
        id: 3,
        title: "subMenu3",
        link: "/menu/3",
        icon: <MdDelete />,
    },
    {
        id: 4,
        title: "subMenu4",
        link: "/menu/4",
        icon: <MdVerifiedUser />,
    },
    {
        id: 5,
        title: "subMenu5",
        link: "/menu/5",
        icon: <MdVpnKey />,
    },
    {
        id: 6,
        title: "subMenu6",
        link: "/menu/6",
        icon: <MdDriveFileMoveOutline />,
    },
    {
        id: 7,
        title: "subMenu7",
        link: "/menu/7",
        icon: <MdFlipCameraIos />,
    },
    {
        id: 8,
        title: "subMenu8",
        link: "/menu/8",
        icon: <MdOutlineWindow />,
    },
];

export const subSubMenuList = [
    {
        id: 1,
        title: "subSubMenu1",
        link: "/sub/menu/1",
        icon: <MdAnnouncement />,
    },
    {
        id: 2,
        title: "subSubMenu2",
        link: "/sub/menu/2",
        icon: <MdDashboardCustomize />,
    },
    {
        id: 3,
        title: "subSubMenu3",
        link: "/sub/menu/3",
        icon: <MdDelete />,
    },
];
