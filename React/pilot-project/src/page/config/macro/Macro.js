import { AgGridReact } from 'ag-grid-react';
import React, { useRef } from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { MdDeleteOutline } from 'react-icons/md';
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

let initRowData2 = [
    {
        macroKey: ':V_ACTBT_국코드',
        code: '"010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017","010017"',
    },
];

function Main() {
    const [showMacroModal, setShowMacroModal] = useState(false);
    const codeRef = useRef();
    const macroRef = useRef();

    const onGridReady = () => {
        macroRef.current.api.setRowData(initRowData);
        codeRef.current.api.setRowData(initRowData2);
    };

    // 추가
    const itemId = useRef(3);

    const onRowAdd = (key) => {
        itemId.current++;
        var newRow = {
            macroKey: key,
            ex: '2022',
            index: itemId.current,
        };
        macroRef.current.api.applyTransaction({ add: [newRow] });
        initRowData = [...initRowData, newRow];
    };

    const rowAddOn = (props) => {
        return (
            <div className="editWrap">
                <div className="editTitle">{props.value}</div>
                <div className="editIcon">
                    <MdDeleteOutline
                        onClick={() => {
                            deleteRow(props);
                        }}
                    />
                </div>
            </div>
        );
    };

    const deleteRow = (node) => {
        macroRef.current.api.updateRowData({ remove: [node.data] });
    };

    return (
        <>
            <MacroWrap className="ag-theme-alpine">
                <Row>
                    <Col Column sm={4}>
                        <h3>매크로 설정</h3>
                    </Col>
                    <Col Column sm={8}>
                        <WhiteButton
                            onClick={() => {
                                setShowMacroModal(true);
                            }}
                        >
                            등록
                        </WhiteButton>
                    </Col>
                </Row>
                <CodeGridWrap>
                    <AgGridReact
                        columnDefs={codeGrid.HeaderInfo}
                        defaultColDef={defaultGrid.DefaultInfo}
                        stopEditingWhenCellsLoseFocus={true}
                        onGridReady={onGridReady}
                        rowHeight="150"
                        headerHeight="40"
                        ref={codeRef}
                        domLayout={'autoHeight'}
                    ></AgGridReact>
                </CodeGridWrap>

                <MacroGridWrap>
                    <AgGridReact
                        rowSelection="multiple"
                        columnDefs={macroGrid.HeaderInfo}
                        defaultColDef={defaultGrid.DefaultInfo}
                        sideBar={defaultGrid.sideBar}
                        stopEditingWhenCellsLoseFocus={true}
                        rowDragManaged={true}
                        frameworkComponents={{ rowAddOn }}
                        animateRows={true}
                        onGridReady={onGridReady}
                        rowHeight="35"
                        headerHeight="40"
                        ref={macroRef}
                    ></AgGridReact>
                </MacroGridWrap>
            </MacroWrap>
            <MacroAddModal show={showMacroModal} setShowMacroModal={setShowMacroModal} add={onRowAdd}></MacroAddModal>
        </>
    );
}

const MacroWrap = styled.div`
    & .row {
        align-items: center;
        margin-bottom: 15px;
        & .col-sm-4 {
            margin-top: 4px;
        }
        & button {
            height: 33px;
            float: right;
            margin-left: 7px;
        }

        & h3 {
            font-size: 1.2rem;
            line-height: 2px;
        }
    }
`;

const MacroGridWrap = styled.div`
    width: 100%;
    height: 539px;
`;

const CodeGridWrap = styled.div`
    width: 100%;
    /* height: 300px; */
    margin-bottom: 15px;
`;

const codeGrid = {
    HeaderInfo: [
        {
            headerName: '매크로 변수',
            field: 'macroKey',
            cellEditor: 'agLargeTextCellEditor',
            cellStyle: { 'line-height': '25px', display: 'flex', 'align-items': 'center' },
            editable: true,
            flex: 0.35,
            cellEditorParams: { maxLength: 1024 },
        },
        {
            headerName: '데이터',
            field: 'code',
            flex: 2,
            cellEditor: 'agLargeTextCellEditor',
            editable: true,
            cellClass: 'cell-wrap-text',
            cellStyle: { 'line-height': '25px', display: 'flex', 'align-items': 'center' },
            wrapText: true,
        },
        {
            headerName: 'index',
            field: 'index',
            hide: true,
        },
    ],
};

const macroGrid = {
    HeaderInfo: [
        {
            rowDrag: true,
            flex: 0.1,
        },
        {
            headerName: '매크로 변수',
            field: 'macroKey',
            cellEditor: 'agLargeTextCellEditor',
            editable: true,
            flex: 1,
            cellEditorParams: { maxLength: 1024 },
            cellRenderer: 'rowAddOn',
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
};

const defaultGrid = {
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

export default Main;
