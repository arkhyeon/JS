import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import styled from 'styled-components';
import { NormalButton, WhiteButton } from '../../component/button/R2wButton';
import WorkDbOption from './WorkDbOption';
import DraggableModal from '../../utils/DraggableModal';

function WorkRegist({
    show,
    setShowRegistWork,
    registWorks,
    parentGrid,
    serverIdSrc,
    serverIdDst,
}) {
    const gridRef = useRef(null);
    const target = useRef(null);
    const [showDbOption, setShowDbOption] = useState(false);
    const [prefix, setPrefix] = useState('');
    const [option, setOption] = useState(defaultOption);
    const [dbmsType, setDbmsType] = useState([]);
    const [jconnectFlag, setJconnectFlag] = useState([]);
    const [r2wtrans, setR2wtrans] = useState({
        use_r2wotr: null,
        use_r2watr: null,
        use_r2wetr: null,
        use_r2wjtr: null,
    });

    useEffect(() => {
        getDbInfo();
    }, []);

    const getDbInfo = () => {
        axios
            .get(
                process.env.REACT_APP_DB_HOST +
                    '/server_master?server_id=' +
                    serverIdSrc +
                    '&server_id=' +
                    serverIdDst,
            )
            .then((res) => {
                setDbmsType([res.data[0].dbms_type, res.data[1].dbms_type]);
                setJconnectFlag([res.data[0].jconnect_flag, res.data[1].jconnect_flag]);
            })
            .catch((Error) => {
                console.log(Error);
            });

        axios
            .get(process.env.REACT_APP_DB_HOST + '/app_global')
            .then((res) => {
                setR2wtrans(res.data);
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const onGridReady = () => {
        gridRef.current.api.setRowData(registWorks);
    };

    const onFirstDataRendered = (props) => {
        let allColumnIds = [];
        props.columnApi.getAllColumns().forEach((column) => {
            allColumnIds.push(column.colId);
        });
        props.columnApi.autoSizeColumns(allColumnIds, false);
    };

    const saveWork = () => {
        if (!prefix) {
            alert('직업명을 입력해 주세요');
            return;
        }
        registWorks.forEach((registWork) => {
            axios
                .patch(process.env.REACT_APP_DB_HOST + '/Works/' + registWork.id, {
                    enroll: 1,
                })
                .then(() => {
                    setShowRegistWork(false);
                    parentGrid.current.api.getRowNode(registWork.id).setDataValue('enroll', 1);
                })
                .catch((Error) => {
                    console.log(Error);
                    parentGrid.current.api.deselectAll();
                });
        });
        parentGrid.current.api.deselectAll();
        alert('작업이 등록되었습니다.');
    };

    return (
        <>
            <Modal size={'xl'} dialogAs={DraggableModal} show={show} onHide={setShowRegistWork}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">작업 등록</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <StyledRow>
                        <Col sm={3}>
                            <OverlayTrigger
                                placement={'right'}
                                overlay={<Tooltip>작업명 : Prefix.DB.owner.table</Tooltip>}
                            >
                                <Form.Control
                                    ref={target}
                                    type="text"
                                    placeholder="Prefix"
                                    onChange={(e) => setPrefix(e.target.value)}
                                />
                            </OverlayTrigger>
                        </Col>
                        <Col sm={9}>
                            <WhiteButton
                                onClick={() => {
                                    setShowDbOption(true);
                                }}
                            >
                                옵션
                            </WhiteButton>
                        </Col>
                    </StyledRow>
                    <GridContainer className="ag-theme-alpine">
                        <AgGridReact
                            ref={gridRef}
                            onGridReady={onGridReady}
                            gridOptions={GridOption}
                            rowHeight="35"
                            headerHeight="40"
                            onFirstDataRendered={onFirstDataRendered}
                        ></AgGridReact>
                    </GridContainer>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonWrap>
                        <WhiteButton onClick={() => setShowRegistWork(false)}>닫기</WhiteButton>
                        <NormalButton
                            onClick={() => {
                                saveWork();
                            }}
                        >
                            등록
                        </NormalButton>
                    </ButtonWrap>
                </Modal.Footer>
            </Modal>
            <WorkDbOption
                show={showDbOption}
                setShowDbOption={setShowDbOption}
                dbmsType={dbmsType}
                option={option}
                setOption={setOption}
                jconnectFlag={jconnectFlag}
                r2wtrans={r2wtrans}
            />
        </>
    );
}

const StyledRow = styled(Row)`
    & input {
        height: 33px;
        font-size: 14px;
    }
    & button {
        float: right;
        height: 33px;
    }
`;

const GridContainer = styled.div`
    height: 387px;
    margin-top: 15px;
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
            headerName: '시스템명',
            field: 'system_name',
            width: 110,
        },
        {
            headerName: 'DB Name',
            field: 'dbms_dbname',
            width: 110,
        },
        {
            headerName: 'SID',
            field: 'server_name',
            width: 110,
        },
        {
            headerName: 'OWNER',
            field: 'tbl_owner',
            width: 110,
        },
        {
            headerName: 'Table 영문명',
            field: 'tbl_name',
            width: 110,
        },
        {
            headerName: '추출조건',
            field: 'extract_sql',
            width: 400,
        },
        {
            field: 'task_id',
            hide: true,
            suppressColumnsToolPanel: true,
        },
        {
            field: 'system_id',
            hide: true,
            suppressColumnsToolPanel: true,
        },
        {
            field: 'exe_cnt',
            hide: true,
            suppressColumnsToolPanel: true,
        },
        {
            field: 'serverid_src',
            suppressColumnsToolPanel: true,
        },
        {
            field: 'serverid_dst',
            suppressColumnsToolPanel: true,
        },
    ],
    defaultColDef: {
        editable: false,
        resizable: true,
        sortable: true,
    },
};

export default React.memo(WorkRegist);

const defaultOption = {
    array_count: '5000',
    buffer_size: '',
    coldeli: ',',
    convert_char_yn: 'off',
    dq_yn: 'y',
    enc_yn: 'y',
    escape_char: '',
    extract_num: '1',
    fastload_yn: 'off',
    hint_degree: '0',
    incount: '',
    last_col_yn: 'n',
    load_message: '',
    load_mode: 'insert',
    load_num: '1',
    load_opt: 'ignore',
    max_extract_cnt: '0',
    multi_thread: 'on',
    no_log: 'n',
    null_char: '',
    parallel: 'n',
    parallel_hint: '0',
    partition_dst: '',
    partition_src: '',
    print_row: '1000000',
    remote_mode_yn: 'on',
    rowdeli: '0x0a',
    session_option: '',
    size_mode_yn: 'off',
    skip_yn: 'n',
    temp_space: '',
    trans_method: 'bind',
    trrule_yn: 'y',
    warning_count: '',
};
