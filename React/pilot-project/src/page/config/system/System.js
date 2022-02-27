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
import { MdDeleteOutline } from 'react-icons/md';

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
        //serverMappings();
        //getSystemList();
    };

    // const getSystemList = async () => {
    //     console.log('getSystemList');
    //     axios
    //         .get(process.env.REACT_APP_DB_HOST + '/System')
    //         .then((res) => {
    //             console.log('2222222');
    //             gridRef.current.api.setRowData(res.data);
    //         })
    //         .catch((Error) => {
    //             console.log(Error);
    //         });
    // };

    const serverNames = Object.keys(serverMappings);

    function lookupValue(mappings, key) {
        return mappings[key];
    }

    function cellEditorParams(params) {
        return { values: serverNames };
    }

    const onRowAdd = (systemName, serverSrc, serverDst, owners) => {
        var newRow = {
            system_name: systemName,
            serverid_src: serverSrc,
            serverid_dst: serverDst,
            owners: owners,
        };
        gridApi.applyTransaction({ add: [newRow] });
        rowData = [...rowData, newRow];
    };

    const onRowDel = (node) => {
        gridRef.current.api.updateRowData({ remove: [node.data] });
    };

    const open = () => {
        setShowAddModal(true);
    };

    const rowAddOn = (props) => {
        return (
            <div className="editWrap">
                <div className="editTitle">{props.value}</div>
                <div className="editIcon">
                    <MdDeleteOutline
                        onClick={() => {
                            onRowDel(props.node);
                        }}
                    />
                </div>
            </div>
        );
    };

    return (
        <SystemWrap>
            <Row>
                <Col Column sm={4}>
                    <h3>업무 등록</h3>
                </Col>
                <Col sm={8}>
                    <WhiteButton onClick={open}>등록</WhiteButton>
                </Col>
            </Row>
            <SystemGridWrap className="ag-theme-alpine">
                <AgGridReact
                    rowData={rowData}
                    ref={gridRef}
                    rowSelection="multiple"
                    onGridReady={onGridReady}
                    defaultColDef={defaultColDef}
                    frameworkComponents={{ rowAddOn }}
                    rowHeight="35"
                    headerHeight="40"
                >
                    <AgGridColumn field="system_name" headerName="업무명" editable={true} cellRenderer="rowAddOn" />
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
                    />
                    <AgGridColumn field="owners" headerName="OWNERS" editable={true} flex={1} />
                    <AgGridColumn field="index" headerName="index" hide={true} />
                </AgGridReact>
            </SystemGridWrap>
            <SystemAddModal show={showAddModal} setShow={setShowAddModal} add={onRowAdd}></SystemAddModal>
        </SystemWrap>
    );
};

const SystemWrap = styled.div`
    width: 100%;
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

const SystemGridWrap = styled.div`
    width: 100%;
    height: 747px;
`;

const defaultColDef = {
    suppressMenu: true,
    sortable: false,
};

export default System;
