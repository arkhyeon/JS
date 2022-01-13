import React, { useState } from "react";
import "../scss/common.scss";

import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";

let initRowData = [
    {
        server_name: "정보계",
        dbms_dbname: "INFPD",
        dbms_dsn: "fninfdb1",
        owner: "SU",
        table_name: "BEDTX1",
        table_desc: "한글하나",
        trrule_yn: "Y",
        table_status: "신규",
        trans_yn: "YES",
        ledger: "내역1",
        truncate_yn: "Y",
        extract_sql: "select * from BEDTX1",
        table_real_size: "1024",
        table_dev_size: "1025",
        etc: "Test1",
        index: "0",
    },
    {
        server_name: "정보계",
        dbms_dbname: "INFPD",
        dbms_dsn: "fninfdb1",
        owner: "SU",
        table_name: "BEDTX2",
        table_desc: "한글둘",
        trrule_yn: "N",
        table_status: "신규",
        trans_yn: "NO",
        ledger: "내역2",
        truncate_yn: "Y",
        extract_sql: "select * from BEDTX2",
        table_real_size: "1026",
        table_dev_size: "1027",
        etc: "Test2",
        index: "1",
    },
    {
        server_name: "정보계",
        dbms_dbname: "INFPD",
        dbms_dsn: "fninfdb1",
        owner: "SU",
        table_name: "BEDTX3",
        table_desc: "한글삼",
        trrule_yn: "Y",
        table_status: "신규",
        trans_yn: "NO",
        ledger: "내역3",
        truncate_yn: "N",
        extract_sql: "select * from BEDTX3",
        table_real_size: "1028",
        table_dev_size: "1029",
        etc: "Test3",
        index: "2",
    },
];

const WorkRegister = () => {
    const cellEditorSelector = (params) => {
        console.log("before-kuller");
        console.log(params);
        console.log(params.data.trans_yn);
        console.log("after-kuller");

        return {
            component: "agSelectCellEditor",
            //component: "agRichSelectCellEditor",
            params: {
                values: ["YES", "NO"],
            },
        };
    };

    const [allowEdit, setAllowEdit] = useState(true);

    const ColumnInfo = {
        HeaderInfo: [
            {
                headerName: "시스템명",
                field: "server_name",
                checkboxSelection: true,
                //pinned: "left",
                rowDrag: true,
            },
            {
                headerName: "DB Name",
                field: "dbms_dbname",
                //pinned: "left",
            },
            {
                headerName: "SID",
                field: "dbms_dsn",
                //pinned: "left",
            },
            {
                headerName: "OWNER",
                field: "owner",
                //pinned: "left",
            },
            {
                headerName: "Table 영문명",
                field: "table_name",
                //pinned: "left",
            },
            {
                headerName: "테이블 한글명",
                field: "table_desc",
                //pinned: "left",
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
                        editable: allowEdit,
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
                        editable: allowEdit,
                        cellRenderer: "fmtTruncateYn",
                    },
                    {
                        headerName: "추출조건",
                        field: "extract_sql",
                        cellEditor: "agLargeTextCellEditor",
                        minWidth: 250,
                        editable: allowEdit,
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
                        headerName: "Etc",
                        field: "etc",
                    },
                ],
            },
            {
                headerName: "index",
                field: "index",
                resizable: false,
                sortable: false,
                hide: true,
            },
        ],
        DefaultInfo: {
            //suppressMenu: true,
            headerClass: "ag-header-cell-label",
            editable: false,
            resizable: true,
            sortable: true,
            width: 150,
            filter: true,
        },
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
                    },
                    minWidth: 225,
                    maxWidth: 225,
                    width: 225,
                },
            ],
            hiddenByDefault: false,
            position: "right",
            defaultToolPanel: "columns",
        },
    };

    const [itemId, setItemId] = useState(3);

    //const [rowItem, setRowItem] = useState(initRowData);

    const onSelectChanged = (select) => {
        console.log("SELECT: ", select);
    };

    const FuncTruncateYn = (props) => {
        // console.log(params);
        const [selection, setSelection] = useState(props.value);

        const onChange = (e) => {
            console.log(e);
            setSelection(e.target.value);
            onSelectChanged(e.target.value);
        };

        return (
            <div>
                <select value={selection} onChange={onChange} style={{ width: "80px" }}>
                    <option value="Y">YES</option>
                    <option value="N">NO</option>
                </select>
            </div>
        );
    };

    const onCellValueChanged = (params) => {
        const colId = params.column.getId();

        console.log("before cell change");
        console.log(params);
        console.log(params.oldValue);
        console.log(params.newValue);
        console.log(params.data);
        console.log(colId);
        console.log("after cell change");

        /*if (colId === "country") {
      const selectedCountry = params.data.country;
      const selectedCity = params.data.city;
      const allowedCities = countyToCityMap(selectedCountry);
      const cityMismatch = allowedCities.indexOf(selectedCity) < 0;
      if (cityMismatch) {
        params.node.setDataValue("city", null);
      }
    }*/
    };

    const [gridApi, setGridApi] = useState(null);
    //const [rowData] = useState(initRowData);

    const onGridReady = (params) => {
        setGridApi(params.api);
        // setGridColumnApi(params.columnApi);
        params.api.setRowData(initRowData); //? 의미없을것 같음.
        params.api.closeToolPanel();
        //params.api.sizeColumnsToFit(); // girdApi.sizeColumnsToFit() 하면 error가 발생, 왜?
        //setRowData(rowData);
    };

    const onSelectionChanged = () => {
        const selectedRows = gridApi.getSelectedRows();

        console.log(selectedRows);

        if (selectedRows.length > 0) console.log(selectedRows[0].index);

        //console.log(gridApi);
        //console.log(gridRef);
    };

    const onClearData = () => {
        console.log(gridApi);
        gridApi.setRowData(null);
        //const selectedRows = gridApi.getSelectedRows();
        console.log("Clear Data");
        //console.log(selectedRows);

        //console.log(gridApi);
        //console.log(gridRef);
    };

    const onReloadData = () => {
        gridApi.setRowData(initRowData);
        console.log("Reload Data");

        //console.log(gridApi);
        //console.log(gridRef);
    };

    const onRowAdd = () => {
        setItemId(itemId + 1);

        var newRow = {
            server_name: "정보계",
            dbms_dbname: "INFPD",
            dbms_dsn: "fninfdb1",
            owner: "SU",
            table_name: "BEDTX" + (itemId + 1),
            table_desc: "한글삼",
            trrule_yn: "Y",
            table_status: "신규",
            trans_yn: "N",
            ledger: "내역3",
            truncate_yn: "N",
            extract_sql: "select * from BEDTX" + (itemId + 1),
            table_real_size: "1028",
            table_dev_size: "1029",
            etc: "Test3",
            index: itemId,
        };

        gridApi.applyTransaction({ add: [newRow] });

        initRowData = [...initRowData, newRow];

        console.log(initRowData);

        //gridApi.setRowData(initRowData);
    };

    const onRowDel = () => {
        let selectedRows = gridApi.getSelectedRows();
        console.log(selectedRows);

        for (let i = 0; i < selectedRows.length; i++) {
            initRowData = initRowData.filter((item) => item.index !== selectedRows[i].index);
        }

        gridApi.applyTransaction({ remove: selectedRows });

        console.log(initRowData);
    };

    const onRowUpdate = () => {
        let selectedNodes = gridApi.getSelectedNodes();
        console.log(selectedNodes);

        let selectedRows = gridApi.getSelectedRows();
        console.log(selectedRows);

        for (let i = 0; i < selectedRows.length; i++) {
            console.log(selectedRows[i]);

            initRowData = initRowData.map((item) => (item.index === selectedRows[i].index ? { ...item, table_name: (item.table_name += "_kuller") } : item));

            selectedNodes[i].setData(selectedRows[i]);
        }

        console.log(initRowData);
    };

    const onAllRowData = () => {
        let gridData = [];
        gridApi.forEachNode(function (node) {
            console.log(node.data);
            gridData = [...gridData, node.data];
        });

        console.log(initRowData);
        console.log(gridData);
    };

    const onEnableData = () => {
        setAllowEdit(true);
        console.log("enable");
    };

    const onDisableData = () => {
        setAllowEdit(false);
        console.log("disable");
    };

    const onRowDragEnter = (e) => {
        console.log("onRowDragEnter", e);
    };

    const onRowDragEnd = (e) => {
        console.log("onRowDragEnd", e);
    };

    return (
        <div className="ag-theme-alpine" style={{ height: 800, width: 1900 }}>
            <button onClick={onClearData}>Clear Data</button>
            <button onClick={onReloadData}>Reload Data</button>
            <button onClick={onRowAdd}>Row Add</button>
            <button onClick={onRowDel}>Row Delete</button>
            <button onClick={onRowUpdate}>Update Item</button>
            <button onClick={onAllRowData}>All Data</button>
            <button onClick={onEnableData}>Enable</button>
            <button onClick={onDisableData}>Disable</button>
            <AgGridReact
                rowSelection="multiple"
                columnDefs={ColumnInfo.HeaderInfo}
                defaultColDef={ColumnInfo.DefaultInfo}
                onSelectionChanged={onSelectionChanged}
                frameworkComponents={{
                    fmtTruncateYn: FuncTruncateYn,
                }}
                onCellValueChanged={onCellValueChanged.bind(this)}
                sideBar={ColumnInfo.sideBar}
                stopEditingWhenCellsLoseFocus={true}
                rowDragManaged={true}
                animateRows={true}
                onRowDragEnter={onRowDragEnter}
                onRowDragEnd={onRowDragEnd}
                onGridReady={onGridReady}
            ></AgGridReact>
        </div>
    );
};

export default WorkRegister;
