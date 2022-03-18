import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import SystemAddModal from './SystemAddModal';
import { Col, Row } from 'react-bootstrap';
import { WhiteButton } from '../../../component/button/R2wButton';
import { MdDeleteOutline } from 'react-icons/md';
import axios from 'axios';
import { testSystem } from '../../../resources/testData';

const System = () => {
    const [gridApi, setGridApi] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [serverList, setServerList] = useState([]);
    const gridRef = useRef(null);

    const onGridReady = (params) => {
        setGridApi(params.api);
        getSystemList();
    };

    const getSystemList = async () => {
        await serverMappings();

        await axios
            .get('find/systems')
            .then((res) => {
                gridRef.current.api.setRowData(res);
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const serverMappings = () => {
        axios
            .get('find/servers')
            .then((res) => {
                let objectification = {};
                for (let key in res) {
                    objectification[res[key].serverid] = res[key].server_name;
                }
                setServerList(objectification);
            })
            .catch((Error) => {
                console.log('Error: ', Error);
            });
    };

    const addSystem = (systemName, serverSrc, serverDst, owners) => {
        const newRow = {
            system_name: systemName,
            serverid_src: serverSrc,
            serverid_dst: serverDst,
            owner_list: owners,
        };
        gridApi.applyTransaction({ add: [newRow] });
    };

    const onRowDel = (node) => {
        axios
            .post('delete/systems', { delete_ids: [node.data.system_id] })
            .then((res) => {
                console.log(res);
                gridRef.current.api.updateRowData({ remove: [node.data] });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const onCellValueChanged = (e) => {
        let newItem = { ...e.data };
        const field = e.colDef.field;

        if (field === 'serverid_src') {
            newItem = { ...newItem, serverid_src: getKeyByValue(newItem[field]) };
        }
        if (field === 'serverid_dst') {
            newItem = { ...newItem, serverid_dst: getKeyByValue(newItem[field]) };
        }

        updateSystem(newItem);
    };

    function getKeyByValue(value) {
        return Object.keys(serverList).find((key) => serverList[key] === value);
    }

    const updateSystem = (newItem) => {
        axios
            .post('update/systems', newItem)
            .then((res) => {})
            .catch((Error) => {
                console.log('schedule add error : ', Error);
            });
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
                    <WhiteButton
                        onClick={() => {
                            setShowAddModal(true);
                        }}
                    >
                        등록
                    </WhiteButton>
                </Col>
            </Row>
            <SystemGridWrap className="ag-theme-alpine">
                <AgGridReact
                    ref={gridRef}
                    rowSelection="multiple"
                    onGridReady={onGridReady}
                    defaultColDef={defaultColDef}
                    frameworkComponents={{ rowAddOn }}
                    onCellValueChanged={onCellValueChanged}
                    rowHeight="35"
                    headerHeight="40"
                >
                    <AgGridColumn
                        field="system_name"
                        headerName="업무명"
                        editable={true}
                        cellRenderer="rowAddOn"
                    />
                    <AgGridColumn
                        field="serverid_src"
                        headerName="원본서버"
                        editable={true}
                        cellEditor="agRichSelectCellEditor"
                        cellEditorParams={{ values: Object.values(serverList) }} // <select> 선택 목록
                        valueFormatter={(params) => {
                            return serverList[params.value];
                        }}
                    />
                    <AgGridColumn
                        field="serverid_dst"
                        headerName="대상서버"
                        editable={true}
                        cellEditor="agRichSelectCellEditor"
                        cellEditorParams={{ values: Object.values(serverList) }}
                        valueFormatter={(params) => {
                            return serverList[params.value];
                        }}
                    />
                    <AgGridColumn field="owner_list" headerName="OWNERS" editable={true} flex={1} />
                    <AgGridColumn field="system_id" headerName="system_id" hide={true} />
                </AgGridReact>
            </SystemGridWrap>
            <SystemAddModal
                show={showAddModal}
                setShow={setShowAddModal}
                addSystem={addSystem}
                serverList={serverList}
            ></SystemAddModal>
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
