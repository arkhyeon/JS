import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { MdDeleteOutline, MdEditCalendar } from 'react-icons/md';
import styled from 'styled-components';
import { WhiteButton } from '../../../component/button/R2wButton';
import WorkSchedule from './WorkSchedule';
import SyncFailLog from './SyncFailLog';
import { testSync, testSyncDetail } from '../../../resources/testData';

function Main() {
    const [showSchedule, setShowSchedule] = useState(false);
    const [showFailLog, setShowFailLog] = useState(false);
    const [editSyncData, setEditSyncData] = useState();
    const [clickedWid, setClickedWid] = useState(0);
    const mainGridRef = useRef();
    const subGridRef = useRef();

    const onGridReady = () => {
        getSyncMain();
    };

    const getSyncMain = () => {
        axios
            .get('find/works')
            .then((res) => {
                mainGridRef.current.api.setRowData(res);
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const getSyncSub = (wid) => {
        subGridRef.current.api.setRowData([]);
        axios
            .get('find/works/' + wid)
            .then((res) => {
                subGridRef.current.api.setRowData(res);
            })
            .catch((Error) => {
                console.log(Error);
            });
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
                    <MdEditCalendar
                        onClick={() => {
                            const syncData = props.node.data;
                            console.log({
                                ...syncData,
                                emonth: syncData.emonth.split(' '),
                                eday: syncData.eday.split(' '),
                                ewday: syncData.ewday.split(' '),
                                ewday_no: syncData.ewday_no.split(' '),
                            });
                            setEditSyncData({
                                ...syncData,
                                emonth: syncData.emonth.length ? syncData.emonth.split(' ') : [],
                                eday: syncData.eday.length ? syncData.eday.split(' ') : [],
                                ewday: syncData.ewday.length ? syncData.ewday.split(' ') : [],
                                ewday_no: syncData.ewday_no.length
                                    ? syncData.ewday_no.split(' ')
                                    : [],
                            });
                            setShowSchedule(true);
                        }}
                    />
                </div>
            </div>
        );
    };

    const deleteRow = (node) => {
        console.log(node.data.wid);
        if (window.confirm(node.data.wname + '을 정말 삭제하시겠습니까?')) {
            axios
                .post('delete/works/' + node.data.wid)
                .then(() => {
                    mainGridRef.current.api.updateRowData({
                        remove: [node.data],
                    });
                })
                .catch((Error) => {
                    alert(Error);
                });
        }
    };

    const resultClick = (e) => {
        if (e.value === '실패') {
            setClickedWid(e.node.data.id);
            setShowFailLog(true);
        }
    };

    return (
        <SyncWrap>
            <Row>
                <Col sm={4}>
                    <h3>테이블 동기화</h3>
                </Col>
                <Col sm={8}>
                    <WhiteButton
                        onClick={() => {
                            setEditSyncData();
                            setShowSchedule(true);
                        }}
                    >
                        등록
                    </WhiteButton>
                </Col>
            </Row>
            <SyncGridWrap className="ag-theme-alpine">
                {/* 스케줄 목록 */}
                <AgGridReact
                    ref={mainGridRef}
                    gridOptions={syncGridOption}
                    onGridReady={onGridReady}
                    onCellClicked={(e) => {
                        resultClick(e);
                        if (
                            e.event.target.nodeName !== 'svg' ||
                            e.event.target.nodeName !== 'path'
                        ) {
                            getSyncSub(e.data.wid);
                        }
                    }}
                    defaultColDef={defaultColDef}
                    frameworkComponents={{ rowAddOn }}
                    rowHeight={35}
                    headerHeight={40}
                />
            </SyncGridWrap>

            {/* 상세내역 */}
            <Row>
                <Col sm={12}>
                    <DetailWrap>상세내역</DetailWrap>
                </Col>
            </Row>
            <SyncGridWrap className="ag-theme-alpine">
                <AgGridReact
                    ref={subGridRef}
                    rowData={[]}
                    gridOptions={syncDetailGridOption}
                    defaultColDef={defaultColDef}
                    overlayNoRowsTemplate={'해당 테이블은 상세 내역이 없습니다'}
                    rowHeight={35}
                    headerHeight={40}
                />
            </SyncGridWrap>
            {showSchedule && (
                <WorkSchedule
                    show={showSchedule}
                    setShowSchedule={setShowSchedule}
                    editSyncData={editSyncData}
                    getSyncMain={getSyncMain}
                />
            )}
            {showFailLog && (
                <SyncFailLog show={showFailLog} setShowFailLog={setShowFailLog} wid={clickedWid} />
            )}
        </SyncWrap>
    );
}

const SyncWrap = styled.div`
    & hr {
        margin: 15px 0px;
    }

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
        }
    }
`;

const SyncGridWrap = styled.div`
    width: 100%;
    height: 339px;

    & .ag-react-container button {
        padding: 0px 5px;
    }
`;

const DetailWrap = styled.h3`
    margin-top: 15px;
`;

const patternFmt = (props) => {
    switch (props.value) {
        case '1':
            return '한번';
        case '2':
            return '매일';
        case '3':
            return '매주';
        case '4':
            return '매달';
        case '5':
            return '분기별';
        case '6':
            return '매년';
        case '7':
            return '사용자 지정';
        default:
            break;
    }
};

const defaultColDef = {
    suppressMenu: true,
    sortable: false,
    resizable: true,
};

const syncGridOption = {
    columnDefs: [
        {
            headerName: '스케줄명',
            field: 'wname',
            cellRenderer: 'rowAddOn',
        },
        {
            headerName: '스케줄 설명',
            field: 'wdesc',
        },
        {
            headerName: '주기',
            field: 'pattern',
            valueFormatter: patternFmt,
        },
        {
            headerName: '시작 일시',
            field: 'start_d',
            valueFormatter: (props) => {
                return props.value + ' ' + props.data.ehour + ':' + props.data.emin;
            },
        },
        {
            headerName: '종료일',
            field: 'end_d',
        },
        {
            headerName: '상태',
            field: 'status',
        },
        {
            headerName: '결과',
            field: 'success_yn',
        },
        {
            headerName: '다음 시작 실행 일시',
            field: 'next_run_dt',
        },
        {
            headerName: '마지막 실행 일시',
            field: 'last_exe_dt',
        },
        {
            headerName: 'wid',
            field: 'wid',
            hide: true,
        },
        {
            headerName: 'exe_cnt',
            field: 'exe_cnt',
            hide: true,
        },
        {
            headerName: 'emin',
            field: 'emin',
            hide: true,
        },
        {
            headerName: 'ehour',
            field: 'ehour',
            hide: true,
        },
        {
            headerName: 'eday',
            field: 'eday',
            hide: true,
        },
        {
            headerName: 'emonth',
            field: 'emonth',
            hide: true,
        },
        {
            headerName: 'ewday',
            field: 'wid',
            hide: true,
        },
        {
            headerName: 'ewday_no',
            field: 'ewday_no',
            hide: true,
        },
        {
            headerName: 'system_list',
            field: 'system_list',
            hide: true,
        },
    ],
};

const syncDetailGridOption = {
    columnDefs: [
        {
            headerName: '업무명',
            field: 'system_name',
            filter: true,
        },
        {
            headerName: '소유자',
            field: 'tbl_owner',
        },
        {
            headerName: '테이블',
            field: 'tbl_name',
        },
        {
            headerName: '상태',
            field: 'status',
        },
        {
            headerName: 'Readl Size(MB)',
            field: 'real_size',
        },
        {
            headerName: 'Dev Size(MB)',
            field: 'dev_size',
        },
        {
            headerName: '비고',
            field: 'notes',
        },
        {
            headerName: 'wid',
            field: 'wid',
            hide: true,
        },
        {
            headerName: 'system_id',
            field: 'system_id',
            hide: true,
        },
    ],
};

export default Main;
