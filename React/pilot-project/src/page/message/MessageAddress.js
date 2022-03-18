import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { NormalButton, WhiteButton } from "../../component/button/R2wButton";
import DraggableModal from "../../utils/DraggableModal";

function MessageAddress({ show, setShowAddress, setAddress, userList }) {
    const addressGrid = useRef(null);
    const [gridApi, setGridApi] = useState();

    const onGridReady = () => {
        setGridApi(addressGrid.current.api);
        addressGrid.current.api.setRowData(userList);
    };

    const selectedWriters = () => {
        let selectedNodes = gridApi.getSelectedNodes();
        let inputWriter = [];

        for (let i = 0; i < selectedNodes.length; i++) {
            inputWriter.push(selectedNodes[i].data.name);
        }

        setAddress((arr) => {
            let concatWriter = arr.concat(inputWriter);
            return concatWriter.filter(
                (item, pos) => concatWriter.indexOf(item) === pos,
            );
        });
    };

    return (
        <Modal dialogAs={DraggableModal} show={show} onHide={setShowAddress}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    유저 리스트
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <GridContainer className="ag-theme-alpine">
                    <AgGridReact
                        ref={addressGrid}
                        onGridReady={onGridReady}
                        gridOptions={GridOption}
                        autoGroupColumnDef={autoGroupColumnDef}
                        rowHeight="35"
                        headerHeight="40"
                    ></AgGridReact>
                </GridContainer>
            </Modal.Body>
            <Modal.Footer>
                <ButtonWrap>
                    <WhiteButton onClick={() => setShowAddress(false)}>
                        닫기
                    </WhiteButton>
                    <NormalButton
                        onClick={() => {
                            setShowAddress(false);
                            selectedWriters();
                        }}
                    >
                        확인
                    </NormalButton>
                </ButtonWrap>
            </Modal.Footer>
        </Modal>
    );
}

const GridContainer = styled.div`
    height: 387px;
    &.ag-theme-alpine .ag-ltr .ag-cell,
    &.ag-theme-alpine .ag-react-container {
        height: 100%;
        display: flex;
        align-items: center;
    }
`;

const ButtonWrap = styled.div`
    & button {
        height: 33px;
        margin-left: 15px;
    }
`;

const autoGroupColumnDef = {
    headerCheckboxSelection: true,
    headerName: '그룹',
    field: 'group',
    cellRendererParams: {
        checkbox: true,
    },
};

const GridOption = {
    groupSelectsChildren: true,
    columnDefs: [
        {
            headerName: '그룹',
            field: 'group',
            flex: 1,
            rowGroup: true,
            hide: true,
        },
        {
            headerName: '이름',
            field: 'name',
            flex: 1,
        },
        {
            headerName: 'id',
            field: 'id',
            hide: true,
        },
    ],
    defaultColDef: {
        editable: false,
        resizable: true,
        sortable: true,
        menuTabs: [],
    },
    rowSelection: 'multiple',
    rowMultiSelectWithClick: true,
};

export default MessageAddress;
