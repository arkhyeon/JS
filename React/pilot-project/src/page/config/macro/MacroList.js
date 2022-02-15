import React, { useState } from 'react';
import styled from 'styled-components';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import MacroAddModal from './MacroAddModal';

let initRowData = [
    {
        macroKey: ':V_기준년',
        macroValue: '%y',
        ex: '2022',
        index: 0,
    },
    {
        macroKey: ':V_기준년-1',
        macroValue: '%y-1',
        ex: '2021',
        index: 1,
    },
    {
        macroKey: ':V_기준년-2',
        macroValue: '%y-2',
        ex: '2020',
        index: 2,
    },
];

const MacroList = () => {
    const [allowEdit, setAllowEdit] = useState(true);
    const [showMacroModal, setShowMacroModal] = useState(false);

    const ColumnInfo = {
        HeaderInfo: [
            {
                headerName: '매크로 변수',
                field: 'macroKey',
                width: 200,
                checkboxSelection: true,
                rowDrag: true,
                cellEditor: 'agLargeTextCellEditor',
                editable: allowEdit,
                cellEditorParams: { maxLength: 1024 },
            },
            {
                headerName: '매크로 값',
                field: 'macroValue',
                width: 200,
                cellEditor: 'agLargeTextCellEditor',
                editable: allowEdit,
                cellEditorParams: { maxLength: 1024 },
            },
            {
                headerName: '예시',
                field: 'ex',
                width: 200,
            },
            {
                headerName: 'd',
                field: 'index',
                hide: true,
            },
        ],
        DefaultInfo: {
            suppressMenu: true,
            headerClass: 'ag-header-cell-label',
            editable: false,
            resizable: true,
            width: 150,
            filter: true,
            sortable: false,
        },
        sideBar: {
            toolPanels: [
                {
                    id: 'columns',
                    labelDefault: 'Columns',
                    labelKey: 'columns',
                    iconKey: 'columns',
                    toolPanel: 'agColumnsToolPanel',
                    toolPanelParams: {
                        suppressRowGroups: true,
                        suppressValues: true,
                    },
                    minWidth: 225,
                    maxWidth: 225,
                    width: 225,
                },
            ],
            hiddenByDefault: true,
            position: 'right',
            defaultToolPanel: 'columns',
        },
    };

    const FuncTruncateYn = (props) => {
        const [selection, setSelection] = useState(props.value);
        const onChange = (e) => {
            console.log(e);
            setSelection(e.target.value);
        };
        return (
            <div>
                <select
                    value={selection}
                    onChange={onChange}
                    style={{ width: '80px' }}
                >
                    <option value="Y">YES</option>
                    <option value="N">NO</option>
                </select>
            </div>
        );
    };

    const onCellValueChanged = (params) => {
        const colId = params.column.getId();
        console.log('before cell change');
        console.log(params);
        console.log(params.oldValue);
        console.log(params.newValue);
        console.log(params.data);
        console.log(colId);
        console.log('after cell change');
    };

    const [gridApi, setGridApi] = useState(null);

    const onGridReady = (params) => {
        setGridApi(params.api);
        params.api.setRowData(initRowData); //? 의미없을것 같음.
        params.api.closeToolPanel();
    };

    const onSelectionChanged = () => {
        const selectedRows = gridApi.getSelectedRows();
        console.log(selectedRows);
        if (selectedRows.length > 0) {
            console.log(selectedRows[0].index);
        }
    };

    // 추가
    const [itemId, setItemId] = useState(3);

    const onRowAdd = (key, v) => {
        setItemId(itemId + 1);
        var newRow = {
            macroKey: key,
            macroValue: v,
            ex: '2022',
            index: itemId,
        };
        gridApi.applyTransaction({ add: [newRow] });
        initRowData = [...initRowData, newRow];
        console.log(initRowData);
    };

    // 삭제
    const onRowDel = () => {
        let selectedRows = gridApi.getSelectedRows();
        if (selectedRows.length === 0) {
            alert('삭제할 항목을 선택해주세요.');
            return;
        }
        console.log(selectedRows);
        for (let i = 0; i < selectedRows.length; i++) {
            initRowData = initRowData.filter(
                (item) => item.index !== selectedRows[i].index,
            );
        }
        gridApi.applyTransaction({ remove: selectedRows });
        console.log(initRowData);
    };

    return (
        <>
            <div
                className="ag-theme-alpine"
                style={{ height: 500, width: 700 }}
            >
                <Head1>매크로 설정</Head1>
                <Button
                    onClick={() => {
                        setShowMacroModal(true);
                        console.log(123);
                    }}
                >
                    등록
                </Button>
                <Button onClick={onRowDel}>삭제</Button>
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
                    onGridReady={onGridReady}
                ></AgGridReact>
            </div>
            <MacroAddModal
                show={showMacroModal}
                setShowMacroModal={setShowMacroModal}
                add={onRowAdd}
            ></MacroAddModal>
        </>
    );
};

const Head1 = styled.h3`
    margin: 20px 0px 20px 0px;
`;

const Button = styled.button`
    padding: 6px 12px;
    margin: 0px 10px 10px 0px;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background-color: #74b9ff;
    :hover {
        background-color: #99c6f5;
    }
`;

export default MacroList;
