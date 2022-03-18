import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { MdDeleteOutline } from 'react-icons/md';
import styled from 'styled-components';
import { WhiteButton } from '../../../component/button/R2wButton';
import MacroAddModal from './MacroAddModal';

function Main() {
    const [showMacroModal, setShowMacroModal] = useState(false);
    const codeRef = useRef();
    const macroRef = useRef();
    let SelectRowData = null;

    const onGridReady = () => {
        macroRef.current.api.setRowData(null);
        codeRef.current.api.setRowData(null);

        getMacroInfo();
    };

    const getMacroInfo = () => {
        axios
            .get('find/macros')
            .then((res) => {
                if (res.length > 0) {
                    codeRef.current.api.setRowData(
                        res.filter((macro) => macro.macro_name === ':V_ACTBT_국코드'),
                    );
                }

                if (res.length > 1) {
                    macroRef.current.api.setRowData(
                        res.filter((macro) => macro.macro_name !== ':V_ACTBT_국코드'),
                    );
                }
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const deleteMacroInfo = (macroName) => {
        axios
            .post('delete/macros/' + macroName)
            .then((res) => {
                macroRef.current.api.updateRowData({ remove: [SelectRowData] });
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const addMacroInfo = (newRow) => {
        axios
            .post('save/macros', newRow, { withCredentials: true })
            .then((res) => {
                getMacroInfo();
            })
            .catch((Error) => {
                console.log(Error.response);
            });
    };

    const onRowAdd = (key) => {
        let newRow = {
            macro_name: key,
            macro_value: '',
        };

        addMacroInfo(newRow);
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
        SelectRowData = node.data;
        deleteMacroInfo(node.value);
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
            <MacroAddModal
                show={showMacroModal}
                setShowMacroModal={setShowMacroModal}
                add={onRowAdd}
            ></MacroAddModal>
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
            field: 'macro_name',
            cellEditor: 'agLargeTextCellEditor',
            cellStyle: {
                'line-height': '25px',
                display: 'flex',
                'align-items': 'center',
            },
            editable: true,
            flex: 0.35,
            cellEditorParams: { maxLength: 1024 },
        },
        {
            headerName: '데이터',
            field: 'macro_value',
            flex: 2,
            cellEditor: 'agLargeTextCellEditor',
            editable: true,
            cellClass: 'cell-wrap-text',
            cellStyle: {
                'line-height': '25px',
                display: 'flex',
                'align-items': 'center',
            },
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
            rowDrag: false,
            flex: 0.1,
        },
        {
            headerName: '매크로 변수',
            field: 'macro_name',
            cellEditor: 'agLargeTextCellEditor',
            editable: false,
            flex: 1,
            cellEditorParams: { maxLength: 1024 },
            cellRenderer: 'rowAddOn',
        },
        {
            headerName: '예시',
            field: 'macro_value',
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
