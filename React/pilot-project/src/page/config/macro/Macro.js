import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { WhiteButton } from '../../../component/button/R2wButton';
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

function Main() {
    const [showMacroModal, setShowMacroModal] = useState(false);

    const ColumnInfo = {
        HeaderInfo: [
            {
                checkboxSelection: true,
                headerCheckboxSelection: true,
                rowDrag: true,
                headerName: '매크로 변수',
                field: 'macroKey',
                cellEditor: 'agLargeTextCellEditor',
                editable: true,
                flex: 1,
                cellEditorParams: { maxLength: 1024 },
            },
            {
                headerName: '매크로 값',
                field: 'macroValue',
                cellEditor: 'agLargeTextCellEditor',
                editable: true,
                flex: 1,
                cellEditorParams: { maxLength: 1024 },
            },
            {
                headerName: '예시',
                field: 'ex',
                flex: 2,
            },
            {
                headerName: 'index',
                field: 'index',
                hide: true,
            },
        ],
        DefaultInfo: {
            suppressMenu: true,
            headerClass: 'ag-header-cell-label',
            editable: false,
            resizable: true,
            sortable: false,
        },
        sideBar: {
            hiddenByDefault: true,
        },
    };

    const [gridApi, setGridApi] = useState(null);

    const onGridReady = (params) => {
        setGridApi(params.api);
        params.api.setRowData(initRowData); //? 의미없을것 같음.
        params.api.closeToolPanel();
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
            initRowData = initRowData.filter((item) => item.index !== selectedRows[i].index);
        }
        gridApi.applyTransaction({ remove: selectedRows });
        console.log(initRowData);
    };

    return (
        <>
            <MacroWrap className="ag-theme-alpine">
                <Row>
                    <Col Column sm={4}>
                        <h3>매크로 설정</h3>
                    </Col>
                    <Col Column sm={8}>
                        <WhiteButton onClick={onRowDel}>삭제</WhiteButton>
                        <WhiteButton
                            onClick={() => {
                                setShowMacroModal(true);
                            }}
                        >
                            등록
                        </WhiteButton>
                    </Col>
                </Row>

                <hr />

                <MacroGridWrap>
                    <AgGridReact
                        rowSelection="multiple"
                        columnDefs={ColumnInfo.HeaderInfo}
                        defaultColDef={ColumnInfo.DefaultInfo}
                        sideBar={ColumnInfo.sideBar}
                        stopEditingWhenCellsLoseFocus={true}
                        rowDragManaged={true}
                        animateRows={true}
                        onGridReady={onGridReady}
                        rowHeight="35"
                        headerHeight="40"
                    ></AgGridReact>
                </MacroGridWrap>
            </MacroWrap>
            <MacroAddModal show={showMacroModal} setShowMacroModal={setShowMacroModal} add={onRowAdd}></MacroAddModal>
        </>
    );
}

const MacroWrap = styled.div`
    & hr {
        margin: 15px 0px;
    }

    & .row {
        align-items: center;
        & .col-sm-2 {
            padding-left: 0px;
        }
        & .col-sm-10 {
            padding-right: 0px;
        }
        & button {
            height: 33px;
            float: right;
            margin-left: 7px;
        }

        & h3 {
            font-size: 1.375rem;
        }
    }
`;

const MacroGridWrap = styled.div`
    width: 100%;
    height: 747px;
`;

export default Main;
