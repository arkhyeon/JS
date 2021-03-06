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
import { testMsg } from '../../resources/testData';

const MessageList = () => {
    const msgRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    const getMessages = () => {
        msgRef.current.api.setRowData(testMsg);
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

    return (
        <>
            <MessageHeader msgRef={msgRef} />
            <GridContainer className="ag-theme-alpine">
                {location.state === 'RECEIVE' ? (
                    <AgGridReact
                        ref={msgRef}
                        onGridReady={onGridReady}
                        rowSelection="multiple"
                        gridOptions={ReceiveGridOption}
                        onCellClicked={onCellClicked}
                        stopEditingWhenCellsLoseFocus={true}
                        frameworkComponents={{
                            notificationIcon,
                            htmlToText,
                        }}
                        animateRows={true}
                        rowClassRules={rowClassRules}
                        rowHeight="40"
                    ></AgGridReact>
                ) : (
                    <AgGridReact
                        ref={msgRef}
                        onGridReady={onGridReady}
                        rowSelection="multiple"
                        columnDefs={DispatchInfo.HeaderInfo}
                        defaultColDef={DispatchInfo.DefaultInfo}
                        onCellClicked={onCellClicked}
                        stopEditingWhenCellsLoseFocus={true}
                        frameworkComponents={{
                            notificationIcon,
                            htmlToText,
                            isRead,
                        }}
                        animateRows={true}
                        rowHeight="40"
                    ></AgGridReact>
                )}
            </GridContainer>
        </>
    );
};

const GridContainer = styled.div`
    height: 715px;

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
            headerName: '??????',
            field: 'type',
            flex: 0.38,
            cellRenderer: 'notificationIcon',
        },
        {
            headerName: '????????????',
            field: 'writer',
            cellStyle: { cursor: 'pointer' },
        },
        {
            headerName: '??????',
            field: 'contents',
            flex: 5,
            cellStyle: { cursor: 'pointer' },
            cellRenderer: 'htmlToText',
        },
        {
            headerName: '??????',
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
            headerName: '??????',
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
            headerName: '??????',
            field: 'type',
            flex: 0.4,
            cellRenderer: 'notificationIcon',
        },
        {
            headerName: '????????????',
            field: 'receiver',
            cellStyle: { cursor: 'pointer' },
        },
        {
            headerName: '??????',
            field: 'contents',
            flex: 5,
            cellStyle: { cursor: 'pointer' },
            cellRenderer: 'htmlToText',
        },
        {
            headerName: '??????',
            field: 'date',
            flex: 0.8,
        },
        {
            headerName: '??????',
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
            headerName: '??????',
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
    return props.data.read === 1 ? '' : '??????';
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
