import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import SystemAddModal from './SystemAddModal';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { WhiteButton } from '../../../component/button/R2wButton';

let rowData = [
    {
        system_name: '정보계',
        serverid_src: 1,
        serverid_dst: 4,
        owners: 'TRANS1, TRANS2, TRANS3',
        index: 1,
    },
    {
        system_name: '계정계',
        serverid_src: 2,
        serverid_dst: 5,
        owners: 'SCOTT1, SCOTT2',
        index: 2,
    },
    {
        system_name: '대외계',
        serverid_src: 3,
        serverid_dst: 6,
        owners: 'AAA, BBB',
        index: 3,
    },
];

const serverMappings = {
    1: 'ORA1',
    2: 'ORA2',
    3: 'ORA3',
    4: 'ORA1_DST',
    5: 'ORA2_DST',
    6: 'ORA3_DST',
};

const System = () => {
    const [gridApi, setGridApi] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const gridRef = useRef(null);

    // const serverMappings = async () => {
    //     axios
    //         .get(process.env.REACT_APP_DB_HOST + '/serverMappings')
    //         .then((res) => {
    //             console.log('111111111');
    //             console.log('res', res);
    //             return res;
    //         })
    //         .catch((Error) => {
    //             console.log('Error: ', Error);
    //         });
    // };

    const onGridReady = (params) => {
        setGridApi(params.api);
        console.log('onGridReady', params);

        //serverMappings();
        //getSystemList();
    };

    const getSystemList = async () => {
        console.log('getSystemList');
        axios
            .get(process.env.REACT_APP_DB_HOST + '/System')
            .then((res) => {
                console.log('2222222');
                gridRef.current.api.setRowData(res.data);
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const serverNames = Object.keys(serverMappings);

    function lookupValue(mappings, key) {
        return mappings[key];
    }

    const onCellValueChanged = (event) => {
        console.log('before: ', event.oldValue, 'after: ', event.newValue);
    };

    function cellEditorParams(params) {
        console.log('params', params);
        return { values: serverNames };
    }

    const onRowAdd = (systemName, serverSrc, serverDst, owners) => {
        console.log('onRowAdd');
        var newRow = {
            system_name: systemName,
            serverid_src: serverSrc,
            serverid_dst: serverDst,
            owners: owners,
        };
        gridApi.applyTransaction({ add: [newRow] });
        rowData = [...rowData, newRow];
        console.log(rowData);
    };

    const onRowDel = () => {
        let selectedRows = gridApi.getSelectedRows();
        console.log(selectedRows);
        for (let i = 0; i < selectedRows.length; i++) {
            rowData = rowData.filter((item) => item.index !== selectedRows[i].index);
        }
        gridApi.applyTransaction({ remove: selectedRows });
        console.log(rowData);
    };

    const open = () => {
        setShowAddModal(true);
    };

    const defaultColDef = {
        suppressMenu: true,
        sortable: false,
    };

    return (
        <SystemWrap>
            <Row>
                <Col Column sm={4}>
                    <h3>업무 등록</h3>
                </Col>
                <Col sm={8}>
                    <WhiteButton onClick={onRowDel}>삭제</WhiteButton>
                    <WhiteButton onClick={open}>등록</WhiteButton>
                </Col>
            </Row>
            <hr />
            <SystemGridWrap className="ag-theme-alpine">
                <AgGridReact
                    rowData={rowData}
                    ref={gridRef}
                    rowSelection="multiple"
                    // editType={'fullRow'}
                    onGridReady={onGridReady}
                    defaultColDef={defaultColDef}
                    rowHeight="35"
                    headerHeight="40"
                >
                    <AgGridColumn field="system_name" headerName="업무명" editable={true} onCellValueChanged={onCellValueChanged} checkboxSelection={true} />
                    <AgGridColumn
                        field="serverid_src"
                        headerName="원본서버"
                        editable={true}
                        cellEditor="agRichSelectCellEditor" // cell 수정시 html <select> 처럼 사용
                        cellEditorParams={cellEditorParams} // <select> 선택 목록
                        valueFormatter={(params) => {
                            // formatter로 데이터 변경해서 보여준다
                            return lookupValue(serverMappings, params.value);
                        }}
                        onCellValueChanged={onCellValueChanged}
                    />
                    <AgGridColumn
                        field="serverid_dst"
                        headerName="대상서버"
                        editable={true}
                        cellEditor="agRichSelectCellEditor"
                        cellEditorParams={{ values: serverNames }}
                        valueFormatter={(params) => {
                            return lookupValue(serverMappings, params.value);
                        }}
                        onCellValueChanged={onCellValueChanged}
                    />
                    <AgGridColumn field="owners" headerName="OWNERS" editable={true} onCellValueChanged={onCellValueChanged} flex={1} />
                    <AgGridColumn field="index" headerName="index" hide={true} />
                </AgGridReact>
            </SystemGridWrap>
            <SystemAddModal show={showAddModal} setShow={setShowAddModal} add={onRowAdd}></SystemAddModal>
        </SystemWrap>
    );
};

const SystemWrap = styled.div`
    width: 100%;
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

const SystemGridWrap = styled.div`
    width: 100%;
    height: 723px;
`;

export default System;
