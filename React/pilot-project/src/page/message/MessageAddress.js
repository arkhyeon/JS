import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { NormalButton, WhiteButton } from '../../component/button/R2wButton';

function MessageAddress({ show, setShowAddress, setCompWriter }) {
    const addressGrid = useRef(null);
    const [gridApi, setGridApi] = useState();

    const getAddress = () => {
        axios
            .get(process.env.REACT_APP_DB_HOST + '/Users')
            .then((res) => {
                addressGrid.current.api.setRowData(res.data);
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const onGridReady = () => {
        setGridApi(addressGrid.current.api);
        getAddress();
    };

    const selectedWriters = () => {
        let selectedNodes = gridApi.getSelectedNodes();
        let inputWriter = [];

        for (let i = 0; i < selectedNodes.length; i++) {
            inputWriter.push(selectedNodes[i].data.name);
        }

        setCompWriter((arr) => {
            let concatWriter = arr.concat(inputWriter);
            return concatWriter.filter((item, pos) => concatWriter.indexOf(item) === pos);
        });
    };

    return (
        <Modal show={show} onHide={setShowAddress} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">유저 리스트</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <GridContainer className="ag-theme-alpine">
                    <AgGridReact ref={addressGrid} onGridReady={onGridReady} gridOptions={GridOption} rowHeight="35" headerHeight="40"></AgGridReact>
                </GridContainer>
            </Modal.Body>
            <Modal.Footer>
                <ButtonWrap>
                    <WhiteButton onClick={() => setShowAddress(false)}>닫기</WhiteButton>
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

const GridOption = {
    columnDefs: [
        {
            checkboxSelection: true,
            headerCheckboxSelection: true,
            flex: 0.1,
            menuTabs: [],
        },
        {
            headerName: 'name',
            field: 'name',
            flex: 0.9,
            menuTabs: [],
        },
    ],
    defaultColDef: {
        editable: false,
        resizable: true,
        sortable: true,
    },
    rowSelection: 'multiple',
    rowMultiSelectWithClick: true,
    stopEditingWhenCellsLoseFocus: true,
};

export default MessageAddress;
