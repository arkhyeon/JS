import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import WorkSchedule from './WorkSchedule';
import Axios from 'axios';
import { WhiteButton } from '../../../component/button/R2wButton';

const SyncList = () => {
    const [showSchedule, setShowSchedule] = useState();
    const [editMode, setEditMode] = useState(false);
    const [editWorkId, setEditWorkId] = useState(0);
    const mainGridRef = useRef();
    const subGridRef = useRef();

    const defaultColDef = {
        suppressMenu: true,
        sortable: false,
    };

    const onMainCellClicked = (params) => {
        getSyncSub(params.data.id);
    };

    const onGridReady = (params) => {
        getSyncMain();
    };

    const getSyncMain = () => {
        Axios.get(process.env.REACT_APP_DB_HOST + '/SyncMain')
            .then((res) => {
                mainGridRef.current.api.setRowData(res.data);
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const getSyncSub = (main_id) => {
        Axios.get(process.env.REACT_APP_DB_HOST + '/SyncSub')
            .then((res) => {
                subGridRef.current.api.setRowData(
                    res.data.filter((item) => item.main_id === main_id),
                );
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const add = (
        schName,
        schDesc,
        schPattern,
        startDate,
        endDate,
        status,
        result,
        next_run_dt,
        last_exe_dt,
        systemGridApi,
    ) => {
        const newRow = {
            work_name: schName,
            period: schPattern,
            start_d: startDate.toISOString().substring(0, 10),
            end_d: endDate.toISOString().substring(0, 10),
            status: 'ON',
            result: result,
            next_run_dt: next_run_dt,
            last_exe_dt: last_exe_dt,
        };
        Axios.post(process.env.REACT_APP_DB_HOST + '/SyncMain', newRow)
            .then((res) => {
                console.log('post result : ', res);
                getSyncMain();
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const del = () => {
        let selectedRows = mainGridRef.current.api.getSelectedRows();
        if (selectedRows.length === 0) {
            alert('삭제할 항목을 선택해주세요.');
            return;
        }
        for (let i = 0; i < selectedRows.length; i++) {
            Axios.delete(process.env.REACT_APP_DB_HOST + '/SyncMain/' + selectedRows[i].id)
                .then(() => {})
                .catch((error) => {
                    console.log(error.response);
                });
        }
        getSyncMain();
    };

    const valueFormatter = (params) => {
        if (params.value === '1') {
            return '한번';
        } else if (params.value === '2') {
            return '매일';
        } else if (params.value === '3') {
            return '매주';
        } else if (params.value === '4') {
            return '매달';
        } else if (params.value === '5') {
            return '분기별';
        } else if (params.value === '6') {
            return '매일';
        } else if (params.value === '7') {
            return '사용자지정';
        }
    };

    const EditRenderer = (props) => {
        return (
            <EditButton
                onClick={() => {
                    setEditWorkId(props.data.id);
                    setShowSchedule(true);
                }}
            >
                수정
            </EditButton>
        );
    };

    const DeleteRenderer = (props) => {
        return <DeleteButton>삭제</DeleteButton>;
    };

    const openAdd = () => {
        setShowSchedule(true);
        setEditMode(false);
    };

    return (
        <>
            <div className="ag-theme-alpine" style={{ height: 200, width: 1500 }}>
                <Head1>테이블 동기화</Head1>
                {/* <Button onClick={toggleEdit}>편집</Button> */}
                <WhiteButton
                    onClick={() => {
                        openAdd();
                    }}
                >
                    등록
                </WhiteButton>
                <WhiteButton
                    onClick={() => {
                        editMode ? setEditMode(false) : setEditMode(true);
                    }}
                >
                    편집
                </WhiteButton>
                {editMode && <DeleteButton onClick={del}>삭제</DeleteButton>}
                <AgGridReact
                    ref={mainGridRef}
                    rowSelection="multiple"
                    onGridReady={onGridReady}
                    onCellClicked={onMainCellClicked}
                    defaultColDef={defaultColDef}
                    frameworkComponents={{ EditRenderer, DeleteRenderer }}
                >
                    {/* <AgGridColumn
                        field="edit"
                        headerName="삭제"
                        hide={editMode}
                        cellRenderer="DeleteRenderer"
                        checkboxSelection={true}
                    /> */}
                    <AgGridColumn
                        field="edit"
                        headerName=""
                        hide={!editMode}
                        cellRenderer="EditRenderer"
                        checkboxSelection={true}
                    />
                    <AgGridColumn
                        field="work_name"
                        headerName="스케줄명"
                        //checkboxSelection={true}
                    />
                    <AgGridColumn
                        field="period"
                        headerName="반복주기"
                        valueFormatter={valueFormatter}
                    />
                    <AgGridColumn field="start_d" headerName="시작일" />
                    <AgGridColumn field="end_d" headerName="종료일" />
                    <AgGridColumn field="status" headerName="상태" />
                    <AgGridColumn field="result" headerName="결과" />
                    <AgGridColumn field="next_run_dt" headerName="다음시작실행일시" />
                    <AgGridColumn field="last_exe_dt" headerName="마지막실행일시" />
                    <AgGridColumn field="index" headerName="index" hide={true} />
                </AgGridReact>
                <Head1>상세내역</Head1>
                <AgGridReact
                    ref={subGridRef}
                    rowData={''}
                    //onGridReady={onSubGridReady}
                    defaultColDef={defaultColDef}
                >
                    <AgGridColumn field="system_name" headerName="업무명" filter={true} />
                    <AgGridColumn field="owner" headerName="OWNER" />
                    <AgGridColumn field="table" headerName="TABLE" />
                    <AgGridColumn field="status" headerName="상태" />
                    <AgGridColumn field="real_size" headerName="RealSize(M)" />
                    <AgGridColumn field="dev_size" headerName="DevSize(M)" />
                    <AgGridColumn field="etc" headerName="비고" />
                    <AgGridColumn field="index" headerName="index" hide={true} />
                </AgGridReact>
            </div>
            {showSchedule && (
                <WorkSchedule
                    show={showSchedule}
                    setShowSchedule={setShowSchedule}
                    add={add}
                    editMode={editMode}
                    editWorkId={editWorkId}
                />
            )}
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

const EditButton = styled.button`
    padding: 6px 12px;
    margin: 0px 10px 10px 0px;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background-color: green;
    :hover {
        background-color: #99c6f5;
    }
`;

const DeleteButton = styled.button`
    padding: 6px 12px;
    margin: 0px 10px 10px 0px;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background-color: red;
    :hover {
        background-color: #99c6f5;
    }
`;

export default SyncList;
