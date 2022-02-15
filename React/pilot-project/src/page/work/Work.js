import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { WhiteButton } from '../../component/button/R2wButton';
import WorkDueDate from './WorkDueDate';
import { adminGridOption, commonGridOption, userGridOption } from './WorkGridOption';
import WorkRegist from './WorkRegist';

function Work() {
    const [isOpen, setIsOpen] = useState(false);
    const [workDate, setWorkDate] = useState('');
    const [showDueDate, setShowDueDate] = useState(false);
    const [servers, setServers] = useState([]);
    const [showRegistWork, setShowRegistWork] = useState(false);
    const [registWorks, setRegistWorks] = useState([]);
    const gridRef = useRef();

    useEffect(() => {
        getWorkIsOpen();
        getServers();
        getWorks();
        const interval = setInterval(() => {
            getWorkIsOpen();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const getWorks = (search = '정보계') => {
        axios
            .get(process.env.REACT_APP_DB_HOST + '/Works?server_name=' + search)
            .then((res) => {
                gridRef.current.api.setRowData(res.data);
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const getServers = () => {
        axios
            .get(process.env.REACT_APP_DB_HOST + '/Servers')
            .then((res) => {
                setServers(res.data);
                console.log(res.data);
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const getWorkIsOpen = () => {
        axios
            .get(process.env.REACT_APP_DB_HOST + '/IsOpen')
            .then((res) => {
                setIsOpen(res.data.open);
                setWorkDate(`[${res.data.open ? '개시' : '마감'}] ${res.data.startDate} ~ ${res.data.endDate} (기준일 : ${res.data.refDate})`);
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const onGridReady = () => {
        getWorks();
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
            if (!selectedRow.extract_sql) {
                alertText += `${selectedRow.table_name}\n`;
            }
        });

        if (alertText) {
            alertText += '위 테이블은 추출조건이 없습니다.';
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
                    <Form.Select onChange={(e) => getWorks(e.target.value)}>
                        {servers.map((server) => {
                            return (
                                <option key={server.id} value={server.name}>
                                    {server.name}
                                </option>
                            );
                        })}
                    </Form.Select>
                </Col>
                <Col sm={6}>{workDate}</Col>
                <Col sm={4}>
                    {sessionStorage.getItem('userAuth') === '0' &&
                        (!isOpen ? (
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
                        ))}
                </Col>
            </WorkHeader>
            <WorkWrap className="ag-theme-alpine">
                {sessionStorage.getItem('userAuth') === '0' ? (
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
                    ></AgGridReact>
                ) : (
                    <AgGridReact
                        ref={gridRef}
                        rowSelection="multiple"
                        stopEditingWhenCellsLoseFocus={true}
                        animateRows={true}
                        rowHeight="35"
                        headerHeight="40"
                        onGridReady={onGridReady}
                        columnDefs={userGridOption(isOpen).columnDefs}
                        defaultColDef={commonGridOption.defaultColDef}
                        sideBar={commonGridOption.sideBar}
                        onFirstDataRendered={onFirstDataRendered}
                    ></AgGridReact>
                )}
            </WorkWrap>
            {showDueDate && <WorkDueDate show={showDueDate} setShowDueDate={setShowDueDate} open={isOpen} />}
            {showRegistWork && <WorkRegist show={showRegistWork} setShowRegistWork={setShowRegistWork} registWorks={registWorks} parentGrid={gridRef} />}
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
    height: 761px;
    padding: 15px;
`;
export default Work;
