import styled from "styled-components";
import { NormalButton } from "../../component/button/R2wButton";

const AffectSqlRenderer = (props) => {
    const setExtSql = (e) => {
        props.context.masterGrid.node.setDataValue("extract_sql", e.target.value);
    };

    return (
        <GridButtonWrap>
            <NormalButton onClick={setExtSql} value={props.data.user_extract_sql}>
                쿼리 적용
            </NormalButton>
        </GridButtonWrap>
    );
};

const GridButtonWrap = styled.div`
    display: flex;
    align-items: center;
`;

const cellEditorSelector = (params) => {
    if (params.column.colId === "trans_yn") {
        return {
            component: "agSelectCellEditor",
            params: {
                values: ["YES", "NO"],
            },
        };
    } else if (params.column.colId === "truncate_yn") {
        return {
            component: "agRichSelectCellEditor",
            params: {
                values: ["YES", "NO"],
            },
        };
    } else return null;
};

export const commonGridOption = {
    sideBar: {
        toolPanels: [
            {
                id: "columns",
                labelDefault: "Columns",
                labelKey: "columns",
                iconKey: "columns",
                toolPanel: "agColumnsToolPanel",
                toolPanelParams: {
                    suppressRowGroups: true,
                    suppressValues: true,
                    suppressPivotMode: true,
                },
            },
        ],
    },
    defaultColDef: {
        suppressMenu: true,
        headerClass: "ag-header-cell-label",
        editable: false,
        resizable: true,
        sortable: true,
        filter: true,
        menuTabs: ["filterMenuTab"],
    },
};

export const adminGridOption = (isOpen) => {
    const adminGridOption = {
        masterDetail: true,
        detailRowAutoHeight: true,
        isRowMaster: function (dataItem) {
            return dataItem ? dataItem.users_query.length > 1 : false;
        },
        rowClassRules: {
            alreadyEnroll: function (params) {
                return params.data.enroll === 1;
            },
        },
        getRowNodeId: function (data) {
            return data.id;
        },
        rowMultiSelectWithClick: true,
        columnDefs: [
            {
                headerName: "시스템명",
                field: "server_name",
                checkboxSelection: true,
                pinned: "left",
                headerCheckboxSelection: true,
                cellRenderer: "agGroupCellRenderer",
            },
            {
                headerName: "DB Name",
                field: "dbms_dbname",
                pinned: "left",
            },
            {
                headerName: "SID",
                field: "dbms_dsn",
                pinned: "left",
            },
            {
                headerName: "OWNER",
                field: "owner",
            },
            {
                headerName: "Table 영문명",
                field: "table_name",
                suppressMenu: false,
            },
            {
                headerName: "Table 한글명",
                field: "table_desc",
            },
            {
                headerName: "변환컬럼 존재",
                field: "trrule_yn",
            },
            {
                headerName: "상태(신규,변경)",
                field: "table_status",
            },
            {
                headerName: "2021.08 이관 정보",
                children: [
                    {
                        headerName: "이관작업등록",
                        field: "trans_yn",
                        editable: !isOpen,
                        cellStyle: { textAlign: "center" },
                        cellEditorSelector: cellEditorSelector,
                    },
                    {
                        headerName: "원장구분",
                        field: "ledger",
                    },
                    {
                        headerName: "Truncate 대상",
                        field: "truncate_yn",
                        editable: !isOpen,
                        cellStyle: { textAlign: "center" },
                        cellEditorSelector: cellEditorSelector,
                    },
                    {
                        headerName: "등록사용자 수",
                        field: "users",
                        cellStyle: { textAlign: "right" },
                    },
                    {
                        headerName: "추출조건",
                        field: "extract_sql",
                        cellEditor: "agLargeTextCellEditor",
                        editable: !isOpen,
                        width: 400,
                        cellEditorParams: { maxLength: 1024 },
                    },
                    {
                        headerName: "Real Size(M)",
                        field: "table_real_size",
                    },
                    {
                        headerName: "Dev Size(M)",
                        field: "table_dev_size",
                    },
                    {
                        field: "id",
                        hide: true,
                    },
                    {
                        field: "enroll",
                        hide: true,
                    },
                ],
            },
        ],
        detailCellRendererParams: (props) => ({
            detailGridOptions: {
                columnDefs: [
                    { headerName: "사용자", field: "userid" },
                    { headerName: "등록쿼리", field: "user_extract_sql", width: 450 },
                    {
                        headerName: "쿼리 적용",
                        field: "affect_sql",
                        width: 50,
                        hide: isOpen,
                        cellRenderer: "affectsqlRenderer",
                    },
                ],
                context: {
                    masterGrid: {
                        node: props.node.parent,
                        data: props.data,
                    },
                },
                defaultColDef: {
                    editable: false,
                    resizable: true,
                    sortable: true,
                    minWidth: 150,
                    suppressMenu: true,
                },
                frameworkComponents: {
                    affectsqlRenderer: AffectSqlRenderer,
                },
            },
            getDetailRowData: function (params) {
                params.successCallback(params.data.users_query);
            },
        }),
    };

    return adminGridOption;
};

/**
 * userGridOption
 */

export const userGridOption = (isOpen) => {
    const userGridOption = {
        columnDefs: [
            {
                headerName: "시스템명",
                field: "server_name",
                pinned: "left",
            },
            {
                headerName: "DB Name",
                field: "dbms_dbname",
                pinned: "left",
            },
            {
                headerName: "SID",
                field: "dbms_dsn",
                pinned: "left",
            },
            {
                headerName: "OWNER",
                field: "owner",
            },
            {
                headerName: "Table 영문명",
                field: "table_name",
                suppressMenu: false,
            },
            {
                headerName: "Table 한글명",
                field: "table_desc",
            },
            {
                headerName: "변환컬럼 존재",
                field: "trrule_yn",
            },
            {
                headerName: "상태(신규,변경)",
                field: "table_status",
            },
            {
                headerName: "2021.08 이관 정보",
                children: [
                    {
                        headerName: "＠이관작업등록",
                        field: "trans_yn",
                        editable: isOpen,
                        cellStyle: { textAlign: "center" },
                        cellEditorSelector: cellEditorSelector,
                    },
                    {
                        headerName: "원장구분",
                        field: "ledger",
                    },
                    {
                        headerName: "＠Truncate 대상",
                        field: "truncate_yn",
                        editable: isOpen,
                        cellStyle: { textAlign: "center" },
                        cellEditorSelector: cellEditorSelector,
                    },
                    {
                        headerName: "＠추출조건",
                        field: "extract_sql",
                        cellEditor: "agLargeTextCellEditor",
                        editable: isOpen,
                        width: 400,
                        cellEditorParams: { maxLength: 1024 },
                    },
                    {
                        headerName: "Real Size(M)",
                        field: "table_real_size",
                        width: 120,
                    },
                    {
                        headerName: "Dev Size(M)",
                        field: "table_dev_size",
                        width: 120,
                    },
                ],
            },
        ],
    };

    return userGridOption;
};
