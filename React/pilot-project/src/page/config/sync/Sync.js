import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import Axios from 'axios';
import React, { useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { WhiteButton, GreenButton, GrayButton } from '../../../component/button/R2wButton';
import { defaultColDef } from './SyncGridOption';
import WorkSchedule from './WorkSchedule';

function Main() {
    const [showSchedule, setShowSchedule] = useState();
    const [editMode, setEditMode] = useState(false);
    const [editWorkId, setEditWorkId] = useState(0);
    const mainGridRef = useRef();
    const subGridRef = useRef();

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

    const onMainCellClicked = (params) => {
        getSyncSub(params.data.id);
    };

    const getSyncSub = (id) => {
        Axios.get(process.env.REACT_APP_DB_HOST + '/SyncSub')
            .then((res) => {
                subGridRef.current.api.setRowData(res.data.filter((item) => item.main_id === id));
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const openAdd = () => {
        setShowSchedule(true);
        setEditMode(false);
    };

    const add = (
        schName,
        schDesc,
        schPattern,
        directRun,
        noneEndDt,
        startDate,
        startTime,
        endDate,
        systemList,
        cycle
        //status,
        //result,
        //next_run_dt,
        //last_exe_dt,
    ) => {
        const newRow = {
            schName: schName,
            schDesc: schDesc,
            schPattern: schPattern,
            directRun: directRun,
            noneEndDt: noneEndDt,
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            systemList: systemList,
            cycle: cycle,
        };
        Axios.post(process.env.REACT_APP_DB_HOST + '/SyncMain', newRow)
            .then((res) => {
                console.log('schedule add res : ', res);
                getSyncMain();
            })
            .catch((Error) => {
                console.log('schedule add error : ', Error);
            });
    };

    const edit = (schName, schDesc, schPattern, directRun, noneEndDt, startDate, startTime, endDate, systemList, cycle) => {
        const newRow = {
            schName: schName,
            schDesc: schDesc,
            schPattern: schPattern,
            directRun: directRun,
            noneEndDt: noneEndDt,
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            systemList: systemList,
            cycle: cycle,
        };
        Axios.put(process.env.REACT_APP_DB_HOST + '/SyncMain/' + editWorkId, newRow)
            .then((res) => {
                console.log('schedule edit res : ', res);
                getSyncMain();
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const EditRenderer = (props) => {
        return (
            <GreenButton
                onClick={() => {
                    setEditWorkId(props.data.id);
                    setShowSchedule(true);
                }}
            >
                수정
            </GreenButton>
        );
    };

    const DeleteRenderer = (props) => {
        return <DeleteButton>삭제</DeleteButton>;
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

    return (
        <>
            {/* <SyncList>SubMenu3 {value.id}</SyncList> */}
            <SyncWrap>
                {/* 버튼목록 */}
                <Row>
                    <Col Column sm={4}>
                        <h3>테이블 동기화</h3>
                    </Col>
                    <Col sm={8}>
                        {!editMode && (
                            <WhiteButton
                                onClick={() => {
                                    editMode ? setEditMode(false) : setEditMode(true);
                                }}
                            >
                                편집
                            </WhiteButton>
                        )}
                        {editMode && (
                            <GrayButton
                                onClick={() => {
                                    editMode ? setEditMode(false) : setEditMode(true);
                                }}
                            >
                                완료
                            </GrayButton>
                        )}

                        <WhiteButton
                            onClick={() => {
                                openAdd();
                            }}
                        >
                            등록
                        </WhiteButton>
                        {editMode && <DeleteButton onClick={del}>삭제</DeleteButton>}
                    </Col>
                </Row>
                <hr />
                <SyncGridWrap className="ag-theme-alpine">
                    {/* 스케줄 목록 */}
                    <AgGridReact
                        ref={mainGridRef}
                        rowSelection="multiple"
                        onGridReady={onGridReady}
                        onCellClicked={onMainCellClicked}
                        defaultColDef={defaultColDef()}
                        frameworkComponents={{ EditRenderer, DeleteRenderer }}
                        rowHeight="35"
                        headerHeight="40"
                    >
                        <AgGridColumn field="edit" headerName="" hide={!editMode} cellRenderer="EditRenderer" checkboxSelection={true} width={100} />
                        <AgGridColumn field="schName" headerName="스케줄명" />
                        <AgGridColumn field="schPattern" headerName="반복주기" valueFormatter={valueFormatter} />
                        <AgGridColumn field="startDate" headerName="시작일" />
                        <AgGridColumn field="endDate" headerName="종료일" />
                        <AgGridColumn field="status" headerName="상태" />
                        <AgGridColumn field="result" headerName="결과" />
                        <AgGridColumn field="next_run_dt" headerName="다음시작실행일시" />
                        <AgGridColumn field="last_exe_dt" headerName="마지막실행일시" />
                        <AgGridColumn field="id" headerName="id" hide={true} />
                    </AgGridReact>
                </SyncGridWrap>

                {/* 상세내역 */}
                <Row>
                    <Col Column sm={12}>
                        <DetailWrap>상세내역</DetailWrap>
                    </Col>
                </Row>
                <hr />
                <SyncGridWrap className="ag-theme-alpine">
                    <AgGridReact ref={subGridRef} rowData={''} defaultColDef={defaultColDef} rowHeight="35" headerHeight="40">
                        <AgGridColumn field="system_name" headerName="업무명" filter={true} />
                        <AgGridColumn field="owner" headerName="OWNER" />
                        <AgGridColumn field="table" headerName="TABLE" />
                        <AgGridColumn field="status" headerName="상태" />
                        <AgGridColumn field="real_size" headerName="RealSize(M)" />
                        <AgGridColumn field="dev_size" headerName="DevSize(M)" />
                        <AgGridColumn field="etc" headerName="비고" />
                        <AgGridColumn field="id" headerName="id" hide={true} />
                    </AgGridReact>
                </SyncGridWrap>

                {/* 등록/수정 모달 */}
                {showSchedule && (
                    <WorkSchedule show={showSchedule} setShowSchedule={setShowSchedule} add={add} editMode={editMode} editWorkId={editWorkId} edit={edit} />
                )}
            </SyncWrap>
        </>
    );
}

const SyncWrap = styled.div`
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

const SyncGridWrap = styled.div`
    width: 100%;
    height: 330px;
`;

const DetailWrap = styled.h3`
    margin-top: 15px;
`;

const DeleteButton = styled.button`
    font-size: 0.875rem;
    padding: 0px 15px;
    color: white;
    background-color: red;
    border: 1px solid;
    border-color: ${({ theme }) => theme.colors.gray_2};
    border-radius: 3px;

    &:hover,
    &:active,
    &:focus {
        font-size: 0.875rem;
        color: white;
        background-color: #bb0000;
        border: 1px solid;
        border-color: ${({ theme }) => theme.colors.gray_2};
    }
`;

export default Main;
