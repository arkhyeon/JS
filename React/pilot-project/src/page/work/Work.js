import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { WhiteButton } from '../../component/button/R2wButton';
import { getCookie } from '../../utils/Cookie';
import WorkDueDate from './WorkDueDate';
import { adminGridOption, commonGridOption, userGridOption } from './WorkGridOption';
import WorkMacroTab from './WorkMacroTab';
import WorkRegist from './WorkRegist';
import moment from 'moment';
import _ from 'lodash';
import { testData } from '../../resources/testData';

function Work() {
    const [isOpen, setIsOpen] = useState(false);
    const [workDate, setWorkDate] = useState('');
    const [showDueDate, setShowDueDate] = useState(false);
    const [servers, setServers] = useState([]);
    const [showRegistWork, setShowRegistWork] = useState(false);
    const [registWorks, setRegistWorks] = useState([]);
    const [showMacroTab, setShowMacroTab] = useState(false);
    const [currentServerId, setCurrentServerId] = useState();
    const gridRef = useRef();

    useEffect(() => {
        getWorkIsOpen();
        getServers();

        const interval = setInterval(() => {
            getWorkIsOpen();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const getWorks = (systemId) => {
        gridRef.current.api.setRowData([]);
        let urlInfo = '';
        if (getCookie('ulevel') === '1') {
            urlInfo = '/find/task-admin/' + systemId;
        } else {
            // urlInfo = '/find/task-user/' + getCookie('uid') + '/' + systemId;
            urlInfo = '/find/task-user/cms/' + systemId;
        }
        axios.get(urlInfo).then((res) => {
            gridRef.current.api.setRowData(res);
        });
    };

    const getServers = () => {
        axios.get('find/systems').then((res) => {
            setServers(res);
            getWorks(res[0].system_id);
            setCurrentServerId([res[0].serverid_src, res[0].serverid_dst]);
        });
    };

    const getWorkIsOpen = () => {
        axios.get('find/task-status').then((res) => {
            setIsOpen(JSON.parse(res[0].task_open));

            const startDate = moment(res[0].start_date).format('yyyy-MM-DD');
            const endDate = moment(res[0].deadline_date).format('yyyy-MM-DD');
            const workDate = moment(res[0].work_date).format('yyyy-MM-DD');

            const stringBuilder = `[${JSON.parse(res[0].task_open) ? '개시' : '마감'}]
                ${startDate} ~ ${endDate} (기준일 : ${workDate || '미지정'})`;

            setWorkDate(stringBuilder);
        });
    };

    const onGridReady = () => {
        gridRef.current.api.closeToolPanel();
    };

    const onFirstDataRendered = (props) => {
        let allColumnIds = [];
        props.columnApi.getAllColumns().forEach((column) => {
            if (column.colId !== 'extract_sql') {
                allColumnIds.push(column.colId);
            }
        });
        props.columnApi.autoSizeColumns(allColumnIds, false);
    };

    const collapseAll = () => {
        gridRef.current.api.forEachNode((node) => {
            node.expanded = false;
        });
        gridRef.current.api.deselectAll();
        gridRef.current.api.onGroupExpandedOrCollapsed();
    };

    const registWork = () => {
        const selectedRows = gridRef.current.api.getSelectedRows();

        if (selectedRows.length === 0) {
            alert('작업을 선택해 주세요.');
            return;
        }

        let alertText = '';

        selectedRows.forEach((selectedRow) => {
            if (!selectedRow.extract_sql || selectedRow.trans_yn === 'NO') {
                alertText += `${selectedRow.table_name}\n`;
            }
        });

        if (alertText) {
            alertText += '위 테이블은 이관 작업 대상이 아니거나 추출조건이 없습니다.';
            alert(alertText);
            return;
        }

        setRegistWorks(selectedRows);
        setShowRegistWork(true);
    };

    return (
        <>
            <WorkHeader>
                <Col sm={2}>
                    <Form.Select
                        onChange={(e) => {
                            // console.log(servers.);
                            const mappingServer = _.find(servers, {
                                system_id: Number(e.target.value),
                            });
                            setCurrentServerId([
                                mappingServer.serverid_src,
                                mappingServer.serverid_dst,
                            ]);
                            getWorks(e.target.value);
                        }}
                    >
                        {servers.map((server) => {
                            return (
                                <option key={server.system_id} value={server.system_id}>
                                    {server.system_name}
                                </option>
                            );
                        })}
                    </Form.Select>
                </Col>
                <Col sm={6}>{workDate}</Col>
                <Col sm={4}>
                    {getCookie('ulevel') === '1' ? (
                        !isOpen ? (
                            <>
                                <WhiteButton onClick={() => registWork()}>작업 등록</WhiteButton>
                                <WhiteButton
                                    onClick={() => {
                                        collapseAll();
                                        setShowDueDate(true);
                                    }}
                                >
                                    업무 개시
                                </WhiteButton>
                            </>
                        ) : (
                            <WhiteButton
                                onClick={() => {
                                    collapseAll();
                                    setShowDueDate(true);
                                }}
                            >
                                업무 마감
                            </WhiteButton>
                        )
                    ) : (
                        <WhiteButton
                            onClick={() => {
                                setShowMacroTab(true);
                            }}
                        >
                            매크로 정보
                        </WhiteButton>
                    )}
                </Col>
            </WorkHeader>
            <WorkWrap className="ag-theme-alpine">
                {getCookie('ulevel') === '1' ? (
                    <AgGridReact
                        ref={gridRef}
                        rowSelection="multiple"
                        stopEditingWhenCellsLoseFocus={true}
                        animateRows={true}
                        onGridReady={onGridReady}
                        gridOptions={adminGridOption()}
                        rowHeight="35"
                        headerHeight="40"
                        columnDefs={adminGridOption(isOpen).columnDefs}
                        defaultColDef={commonGridOption.defaultColDef}
                        detailCellRendererParams={adminGridOption(isOpen).detailCellRendererParams}
                        sideBar={commonGridOption.sideBar}
                        onFirstDataRendered={onFirstDataRendered}
                    />
                ) : (
                    <AgGridReact
                        ref={gridRef}
                        rowSelection="multiple"
                        stopEditingWhenCellsLoseFocus={true}
                        animateRows={true}
                        rowHeight="35"
                        headerHeight="40"
                        onGridReady={onGridReady}
                        singleClickEdit={true}
                        gridOptions={userGridOption()}
                        columnDefs={userGridOption(isOpen).columnDefs}
                        defaultColDef={commonGridOption.defaultColDef}
                        sideBar={commonGridOption.sideBar}
                        onFirstDataRendered={onFirstDataRendered}
                    />
                )}
            </WorkWrap>
            {showDueDate && (
                <WorkDueDate show={showDueDate} setShowDueDate={setShowDueDate} open={isOpen} />
            )}
            {showRegistWork && (
                <WorkRegist
                    show={showRegistWork}
                    setShowRegistWork={setShowRegistWork}
                    registWorks={registWorks}
                    parentGrid={gridRef}
                    serverIdSrc={currentServerId[0]}
                    serverIdDst={currentServerId[1]}
                />
            )}
            {showMacroTab && <WorkMacroTab show={showMacroTab} setShowMacroTab={setShowMacroTab} />}
        </>
    );
}

const WorkHeader = styled.div`
    display: flex;
    margin: 15px 15px 0;
    font-size: 0.875rem;
    align-items: center;

    & .col-sm-6 {
        padding-left: 15px;
        color: #4caf50;
    }

    & .col-sm-4 {
        display: flex;
        justify-content: flex-end;
    }

    & button {
        height: 33px;
        margin-left: 7px;
    }
    & select {
        height: 33px;
        font-size: 0.875rem;
    }
`;

const WorkWrap = styled.div`
    width: 100%;
    min-height: 793px;
    height: 84vh;
    padding: 15px;
`;
export default Work;
