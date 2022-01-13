import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import WorkSchedule from "./WorkSchedule";

function Work() {
    const [showSchedule, setShowSchedule] = useState();
    const [isOpen, setIsOpen] = useState();
    let userGridApi = null;

    useEffect(() => {
        getWorkIsOpen();
    }, []);

    const getWorks = () => {
        axios
            .get(process.env.REACT_APP_DB_HOST + "/Works")
            .then((res) => {
                userGridApi.setRowData(res.data);
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const getWorkIsOpen = () => {
        axios
            .get(process.env.REACT_APP_DB_HOST + "/IsOpen")
            .then((res) => {
                setIsOpen(res.data.open);
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const onGridReady = (params) => {
        userGridApi = params.api;
        getWorks();
        userGridApi.closeToolPanel();
    };

    const onFirstDataRendered = (props) => {
        let allColumnIds = [];
        props.columnApi.getAllColumns().forEach((column) => {
            if (column.colId !== "extract_sql") {
                allColumnIds.push(column.colId);
            }
        });
        props.columnApi.autoSizeColumns(allColumnIds, false);
    };

    return (
        <>
            <WorkWrap className="ag-theme-alpine">
                <div style={{ overflow: "hidden" }}>
                    {isOpen ? <Button onClick={() => setIsOpen(0)}>업무 개시</Button> : <Button onClick={() => setIsOpen(1)}>업무 마감</Button>}
                </div>
                <AgGridReact
                    rowSelection="multiple"
                    stopEditingWhenCellsLoseFocus={true}
                    animateRows={true}
                    onGridReady={onGridReady}
                    gridOptions={gridOptions}
                    onFirstDataRendered={onFirstDataRendered}
                ></AgGridReact>
                <Button onClick={() => setShowSchedule(true)} style={{ float: "right" }}>
                    스케줄 추가
                </Button>
            </WorkWrap>
            <WorkSchedule show={showSchedule} setShowSchedule={setShowSchedule} />
        </>
    );
}

const WorkWrap = styled.div`
    width: 100%;
    height: 600px;
    padding: 0px 15px;

    & div button {
        float: right;
    }
`;

const AffectSqlRenderer = (props) => {
    const setExtSql = (e) => {
        props.context.masterGrid.node.setDataValue("extract_sql", e.target.value);
    };

    return (
        <Button onClick={setExtSql} value={props.data.user_extract_sql} size="sm">
            쿼리 적용
        </Button>
    );
};

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

const gridOptions = {
    masterDetail: true,
    detailRowAutoHeight: true,
    isRowMaster: function (dataItem) {
        return dataItem ? dataItem.users_query.length > 1 : false;
    },
    columnDefs: [
        {
            headerName: "시스템명",
            field: "server_name",
            checkboxSelection: true,
            pinned: "left",
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
            headerName: "테이블 한글명",
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
                    editable: true,
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
                    editable: true,
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
                    editable: true,
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
            ],
        },
    ],
    defaultColDef: {
        suppressMenu: true,
        headerClass: "ag-header-cell-label",
        editable: false,
        resizable: true,
        sortable: true,
        filter: true,
        menuTabs: ["filterMenuTab"],
    },
    detailCellRendererParams: (props) => ({
        detailGridOptions: {
            columnDefs: [
                { headerName: "사용자", field: "userid" },
                { headerName: "등록쿼리", field: "user_extract_sql", width: 450 },
                {
                    headerName: "쿼리 적용",
                    field: "affect_sql",
                    width: 50,
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
};

export default Work;
