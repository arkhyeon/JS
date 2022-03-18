import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Offcanvas } from 'react-bootstrap';
import { MdBuildCircle, MdContentCopy } from 'react-icons/md';
import styled from 'styled-components';
import { WhiteButton } from '../../component/button/R2wButton';
import axios from 'axios';

function WorkMacroTab({ show, setShowMacroTab }) {
    const [copyTip, setCopyTip] = useState(false);
    const [copyTarget, setCopyTarget] = useState('');

    const getMacro = (api) => {
        axios.get('find/macros').then((res) => api.setRowData(res));
    };

    const onGridReady = (params) => {
        getMacro(params.api);
    };

    const onCellClicked = (props) => {
        if (props.column.colId === 'macro_name') {
            navigator.clipboard.writeText(props.value);
            setCopyTarget(props.value);
            setCopyTip(true);
            setTimeout(() => {
                setCopyTip(false);
            }, 800);
        }
    };

    return (
        <StyledOffcanvas show={show} onHide={setShowMacroTab} placement="end">
            <StyledOffHeader closeButton>
                <Offcanvas.Title>
                    <MdBuildCircle />
                    매크로 정보
                </Offcanvas.Title>
            </StyledOffHeader>
            <StyledOffBody className="ag-theme-alpine">
                <AgGridReact
                    rowSelection="multiple"
                    columnDefs={ColumnInfo.HeaderInfo}
                    defaultColDef={ColumnInfo.DefaultInfo}
                    sideBar={ColumnInfo.sideBar}
                    stopEditingWhenCellsLoseFocus={true}
                    rowDragManaged={true}
                    onCellClicked={onCellClicked}
                    animateRows={true}
                    frameworkComponents={{ copyContent }}
                    onGridReady={onGridReady}
                    rowHeight="35"
                    headerHeight="40"
                ></AgGridReact>
                <TipWrap>
                    <ToolTip
                        style={{
                            opacity: copyTip ? '100' : '0',
                            marginTop: copyTip ? '0px' : '15px',
                        }}
                    >
                        <svg viewBox="0 0 426.667 426.667" width="18" height="18">
                            <path
                                d="M213.333 0C95.518 0 0 95.514 0 213.333s95.518 213.333 213.333 213.333c117.828 0 213.333-95.514 213.333-213.333S331.157 0 213.333 0zm-39.134 322.918l-93.935-93.931 31.309-31.309 62.626 62.622 140.894-140.898 31.309 31.309-172.203 172.207z"
                                fill="#546e7a"
                            ></path>
                        </svg>
                        {copyTarget} 복사되었습니다.
                    </ToolTip>
                </TipWrap>
            </StyledOffBody>
            <StyledOffFooter>
                <WhiteButton
                    onClick={() => {
                        setShowMacroTab(false);
                    }}
                >
                    닫기
                </WhiteButton>
            </StyledOffFooter>
        </StyledOffcanvas>
    );
}

const StyledOffcanvas = styled(Offcanvas)`
    width: 450px;
    top: 50px;
`;

const StyledOffHeader = styled(Offcanvas.Header)`
    background-color: ${({ theme }) => theme.colors.light_1};
    padding: 15px;
    & .offcanvas-title {
        display: flex;
        align-items: center;
        & svg {
            font-size: 26px;
            margin-right: 5px;
        }
    }
`;

const StyledOffBody = styled(Offcanvas.Body)`
    padding: 15px;
    & .ag-react-container {
        float: left;
        cursor: pointer;
        justify-content: flex-start;
    }
`;
const TipWrap = styled.div`
    width: 419px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 55%;
`;

const ToolTip = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 20px;
    background-color: #fff;
    box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
    color: #000;
    border-radius: 4px;
    margin: 15px 0px 0px;
    opacity: 1;
    transition: 0.3s all ease-in-out;
    min-height: 45px;
    border-left: 3px solid ${({ theme }) => theme.colors.normal_4};
    gap: 15px;
    max-width: 400px;
`;

const StyledOffFooter = styled(Offcanvas.Header)`
    background-color: ${({ theme }) => theme.colors.light_2};
    padding: 15px;
    flex-direction: row-reverse;
    & button {
        float: right;
        height: 33px;
    }
`;

const copyContent = (props) => {
    return (
        <>
            <MdContentCopy />
            {props.value}
        </>
    );
};

const ColumnInfo = {
    HeaderInfo: [
        {
            headerName: '매크로 변수',
            field: 'macro_name',
            flex: 1,
            cellRenderer: 'copyContent',
        },
        {
            headerName: '매크로 값',
            field: 'macro_value',
            flex: 0.8,
        },
    ],
    DefaultInfo: {
        headerClass: 'ag-header-cell-label',
        editable: false,
        resizable: true,
        sortable: false,
    },
    sideBar: {
        hiddenByDefault: true,
    },
};

export default WorkMacroTab;
