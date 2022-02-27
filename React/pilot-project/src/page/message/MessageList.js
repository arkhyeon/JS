import React, { useRef } from 'react';
import axios from 'axios';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import styled from 'styled-components';
import { MdNotificationImportant, MdNotifications } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import MessageHeader from './MessageHeader';
import { WhiteButton } from '../../component/button/R2wButton';

const MessageList = () => {
    const msgRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    const getMessages = () => {
        axios
            .get(process.env.REACT_APP_API_MESSAGES)
            .then((res) => {
                msgRef.current.api.setRowData(res.data);
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const onGridReady = () => {
        getMessages();
    };

    const onCellClicked = (e) => {
        switch (e.colDef.field) {
            case 'writer':
                navigate('/Message/MessageWrite', { state: e.data });
                break;
            case 'contents':
                axios.patch(process.env.REACT_APP_DB_HOST + '/Messages/' + e.data.id, { read: 0 });
                navigate('MessageDetail', { state: e.data });
                break;

            default:
                break;
        }
    };

    const onClearData = () => {
        msgRef.current.api.setRowData(null);
    };

    const onReloadData = () => {
        getMessages();
    };

    const onRowDel = () => {
        const selectedRows = msgRef.current.api.getSelectedRows();

        if (selectedRows.length === 0) {
            alert('삭제할 메시지를 선택해 주세요.');
            return;
        }

        if (!window.confirm('정말 삭제하시겠습니까?')) {
            return;
        }

        for (let i = 0; i < selectedRows.length; i++) {
            axios
                .delete(process.env.REACT_APP_DB_HOST + '/Messages/' + selectedRows[i].id)
                .then(() => {
                    msgRef.current.api.applyTransaction({ remove: selectedRows[i] });
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
    };

    const onRowRead = () => {
        const selectedNodes = msgRef.current.api.getSelectedNodes();

        if (selectedNodes.length === 0) {
            alert('읽음 처리할 메시지를 선택해 주세요.');
            return;
        }

        for (let i = 0; i < selectedNodes.length; i++) {
            axios
                .patch(process.env.REACT_APP_DB_HOST + '/Messages/' + selectedNodes[i].data.id, { read: 0 })
                .then(() => {
                    selectedNodes[i].setDataValue('read', 0);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
    };

    const onRowAllRead = () => {
        axios
            .patch(process.env.REACT_APP_DB_HOST + '/Messages', { read: 0 })
            .then(() => {
                msgRef.current.api.forEachNode(function (rowNode) {
                    rowNode.setDataValue('read', 0);
                });
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    return (
        <>
            <MessageHeader />
            <GridContainer className="ag-theme-alpine">
                <WhiteButton onClick={onRowDel}>삭제</WhiteButton>
                <WhiteButton onClick={onClearData}>전체삭제</WhiteButton>
                <WhiteButton onClick={onReloadData}>새로고침</WhiteButton>
                {location.state === 'RECEIVE' ? (
                    <>
                        <WhiteButton onClick={onRowRead}>읽음</WhiteButton>
                        <WhiteButton onClick={onRowAllRead}>전체읽음</WhiteButton>
                        <AgGridReact
                            ref={msgRef}
                            onGridReady={onGridReady}
                            rowSelection="multiple"
                            gridOptions={ReceiveGridOption}
                            onCellClicked={onCellClicked}
                            stopEditingWhenCellsLoseFocus={true}
                            frameworkComponents={{ notificationIcon, htmlToText }}
                            animateRows={true}
                            rowClassRules={rowClassRules}
                            rowHeight="40"
                        ></AgGridReact>
                    </>
                ) : (
                    <AgGridReact
                        ref={msgRef}
                        onGridReady={onGridReady}
                        rowSelection="multiple"
                        columnDefs={DispatchInfo.HeaderInfo}
                        defaultColDef={DispatchInfo.DefaultInfo}
                        onCellClicked={onCellClicked}
                        stopEditingWhenCellsLoseFocus={true}
                        frameworkComponents={{ notificationIcon, htmlToText, isRead }}
                        animateRows={true}
                        rowHeight="40"
                    ></AgGridReact>
                )}
            </GridContainer>
        </>
    );
};

const GridContainer = styled.div`
    width: 100%;
    height: 651px;
    & button {
        height: 33px;
        margin: 0 7px 15px 0px;
    }
    & a {
        color: black;
        text-decoration: underline;
    }

    & .beforeRead {
        font-weight: bold !important;
        color: #000;
    }

    &.ag-theme-alpine .ag-ltr .ag-cell,
    &.ag-theme-alpine .ag-react-container {
        height: 100%;
        display: flex;
        align-items: center;
    }
`;

const ReceiveGridOption = {
    columnDefs: [
        {
            checkboxSelection: true,
            headerCheckboxSelection: true,
            flex: 0.25,
        },
        {
            headerName: '타입',
            field: 'type',
            flex: 0.38,
            cellRenderer: 'notificationIcon',
        },
        {
            headerName: '보낸사람',
            field: 'writer',
            cellStyle: { cursor: 'pointer' },
        },
        {
            headerName: '내용',
            field: 'contents',
            flex: 5,
            cellStyle: { cursor: 'pointer' },
            cellRenderer: 'htmlToText',
        },
        {
            headerName: '날짜',
            field: 'date',
            flex: 0.8,
        },
        {
            headerName: 'read',
            field: 'read',
            hide: true,
        },
        {
            headerName: 'id',
            field: 'id',
            hide: true,
        },
        {
            headerName: '타입',
            field: 'type',
            hide: true,
        },
    ],
    defaultColDef: {
        editable: false,
        resizable: true,
        sortable: true,
        flex: 1,
    },
    cellStyle: { textAlign: 'center' },
};

const DispatchInfo = {
    HeaderInfo: [
        {
            checkboxSelection: true,
            headerCheckboxSelection: true,
            flex: 0.25,
        },
        {
            headerName: '타입',
            field: 'type',
            flex: 0.4,
            cellRenderer: 'notificationIcon',
        },
        {
            headerName: '받은사람',
            field: 'receiver',
            cellStyle: { cursor: 'pointer' },
        },
        {
            headerName: '내용',
            field: 'contents',
            flex: 5,
            cellStyle: { cursor: 'pointer' },
            cellRenderer: 'htmlToText',
        },
        {
            headerName: '날짜',
            field: 'date',
            flex: 0.8,
        },
        {
            headerName: '읽음',
            field: '',
            cellRenderer: 'isRead',
            flex: 0.4,
        },
        {
            headerName: 'read',
            field: 'read',
            hide: true,
        },
        {
            headerName: 'id',
            field: 'id',
            hide: true,
        },
        {
            headerName: '타입',
            field: 'type',
            hide: true,
        },
    ],
    DefaultInfo: {
        editable: false,
        resizable: true,
        sortable: true,
        flex: 1,
    },
    cellStyle: { textAlign: 'center' },
};

const rowClassRules = {
    beforeRead: 'data.read === 1',
};

const htmlToText = (html) => {
    var divContainer = document.createElement('div');
    divContainer.innerHTML = html.value;
    return divContainer.textContent || divContainer.innerText || '';
};

const isRead = (props) => {
    return props.data.read === 1 ? '' : '읽음';
};

const notificationIcon = (props) => {
    let msgIcon;
    switch (props.value) {
        case 1:
            msgIcon = <MdNotifications />;
            break;
        case 2:
            msgIcon = <MdNotificationImportant style={{ color: '#dc3545' }} />;
            break;
        case 3:
            msgIcon = '';
            break;
        case 4:
            msgIcon = '';
            break;
        case 5:
            msgIcon = '';
            break;
        case 6:
            msgIcon = '';
            break;
        default:
            msgIcon = '';
    }
    return msgIcon;
};

export default MessageList;
