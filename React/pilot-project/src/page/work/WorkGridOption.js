import { MdOutlineOpenInNew, MdOutlineOpenInNewOff } from 'react-icons/md';
import styled from 'styled-components';
import { NormalButton } from '../../component/button/R2wButton';
import axios from 'axios';

const AffectSqlRenderer = (props) => {
    const setExtSql = (e) => {
        props.context.masterGrid.node.setDataValue('extract_sql', e.target.value);
        props.context.masterGrid.props.api.flashCells({
            rowNodes: [props.context.masterGrid.node],
        });
    };

    return (
        <GridButtonWrap>
            <NormalButton onClick={setExtSql} value={props.data.extract_sql}>
                쿼리 적용
            </NormalButton>
        </GridButtonWrap>
    );
};

const GridButtonWrap = styled.div`
    display: flex;
    align-items: center;
`;

const cellEditorSelector = () => {
    return {
        component: 'agRichSelectCellEditor',
        params: {
            values: ['Y', 'N'],
        },
    };
};

const onCellValueChanged = (props) => {
    console.log('onCellValueChanged');
    console.log(props);
    if (props.colDef.field === 'tx_yn') {
        if (props.newValue === 'YES' && props.data.extract_sql === '') {
            props.node.setDataValue('extract_sql', `select * from ${props.data.table_name}`);
        } else if (props.newValue === 'NO') {
            if (
                window.confirm(
                    '이관 작업 등록을 해제하시면 추출 조건이 삭제됩니다.\n그래도 해제하시겠습니까?',
                )
            ) {
                props.node.setDataValue('extract_sql', '');
            } else {
                props.node.setDataValue('tx_yn', 'YES');
                return;
            }
        }
    }

    if (props.colDef.field === 'truncate_yn' || props.colDef.field === 'extract_sql') {
        updateTask(props);
    }

    props.api.flashCells({ rowNodes: [props.node] });
};

const updateTask = (props) => {
    const data = {
        task_id: props.data.task_id,
        truncate_yn: props.data.truncate_yn,
        extract_sql: props.data.extract_sql,
    };

    axios.post('update/task-admin', data).then((res) => {});
};

const enrollCheck = (props) => {
    if (props.data.enroll === 1) {
        return <MdOutlineOpenInNew style={{ fontSize: '24px', fill: '#19972c' }} />;
    } else {
        return <MdOutlineOpenInNewOff style={{ fontSize: '24px', fill: '#929292' }} />;
    }
};

export const commonGridOption = {
    sideBar: {
        toolPanels: [
            {
                id: 'columns',
                labelDefault: 'Columns',
                labelKey: 'columns',
                iconKey: 'columns',
                toolPanel: 'agColumnsToolPanel',
                toolPanelParams: {
                    suppressRowGroups: true,
                    suppressValues: true,
                    suppressPivotMode: true,
                },
            },
        ],
    },
    defaultColDef: {
        enableCellChangeFlash: true,
        suppressMenu: false,
        headerClass: 'ag-header-cell-label',
        editable: false,
        resizable: true,
        sortable: true,
        filter: true,
        menuTabs: ['filterMenuTab'],
    },
};

export const adminGridOption = (isOpen) => {
    const adminGridOption = {
        masterDetail: true,
        detailRowAutoHeight: true,
        isRowMaster: function (props) {
            return props ? props.users_query.length > 1 : false;
        },
        frameworkComponents: { enrollCheck },
        rowMultiSelectWithClick: () => {
            return !isOpen;
        },
        onCellValueChanged: onCellValueChanged,
        columnDefs: [
            {
                headerName: '시스템 명',
                field: 'system_name',
                checkboxSelection: () => {
                    return !isOpen;
                },
                pinned: 'left',
                headerCheckboxSelection: () => {
                    return !isOpen;
                },
                cellRenderer: 'agGroupCellRenderer',
            },
            {
                headerName: '등록',
                field: 'enroll',
                pinned: 'left',
                cellRenderer: 'enrollCheck',
            },
            {
                headerName: 'DB Name',
                field: 'dbms_dbname',
                pinned: 'left',
            },
            {
                headerName: 'SID',
                field: 'server_name',
                pinned: 'left',
            },
            {
                headerName: 'OWNER',
                field: 'tbl_owner',
                pinned: 'left',
            },
            {
                headerName: 'Table 영문명',
                field: 'tbl_name',
                pinned: 'left',
            },
            {
                headerName: 'Table 한글명',
                field: 'tbl_desc',
                pinned: 'left',
            },
            {
                headerName: '변환 컬럼 존재',
                field: 'trrule_yn',
                valueFormatter: (props) => {
                    return props.value.toUpperCase();
                },
            },
            {
                headerName: '상태(신규,변경)',
                field: 'status',
                cellStyle: (params) => {
                    if (params.value === 1) {
                        return { color: '#e91e63' };
                    } else if (params.value === 2) {
                        return { color: '#1976d2' };
                    }
                    return { color: '#000' };
                },
                valueFormatter: (props) => {
                    if (props.value === 1) {
                        return '신규';
                    } else if (props.value === 2) {
                        return '변경';
                    }
                    return '';
                },
            },
            {
                headerName: '이관 작업 등록',
                field: 'tx_yn',
                valueFormatter: (props) => {
                    return props.value.toUpperCase();
                },
                // editable: !isOpen,
                // cellEditorSelector: cellEditorSelector,
            },
            {
                headerName: '원장 구분',
                field: 'ledger',
            },
            {
                headerName: '@Truncate 대상',
                field: 'truncate_yn',
                editable: !isOpen,
                cellEditorSelector: cellEditorSelector,
                valueFormatter: (props) => {
                    return props.value.toUpperCase();
                },
            },
            {
                headerName: '@추출 조건',
                field: 'extract_sql',
                cellEditor: 'agLargeTextCellEditor',
                editable: !isOpen,
                width: 400,
                cellEditorParams: { maxLength: 1024 },
            },
            {
                headerName: '등록 사용자 수',
                field: 'users',
                cellStyle: { textAlign: 'right' },
                valueFormatter: (props) => {
                    return props.data.users_query.length;
                },
            },
            {
                headerName: 'Real Size(M)',
                field: 'real_size',
            },
            {
                headerName: 'Dev Size(M)',
                field: 'dev_size',
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
                hide: true,
                suppressColumnsToolPanel: true,
            },
        ],
        detailCellRendererParams: (props) => ({
            detailGridOptions: {
                columnDefs: [
                    { headerName: '사용자', field: 'uid' },
                    {
                        headerName: '등록 쿼리',
                        field: 'extract_sql',
                        width: 450,
                    },
                    {
                        headerName: '쿼리 적용',
                        field: 'affect_sql',
                        width: 50,
                        hide: isOpen,
                        cellRenderer: 'affectsqlRenderer',
                    },
                ],
                context: {
                    masterGrid: {
                        props: props,
                        node: props.node.parent,
                        data: props.data,
                    },
                },
                defaultColDef: {
                    editable: false,
                    resizable: true,
                    sortable: true,
                    minWidth: 150,
                    suppressMenu: false,
                },
                rowHeight: 35,
                headerHeight: 40,
                frameworkComponents: {
                    affectsqlRenderer: AffectSqlRenderer,
                },
            },
            getDetailRowData: function (params) {
                params.successCallback(params.data.users_query);
            },
        }),
    };

    return adminGridOption;
};

/**
 * userGridOption
 */

export const userGridOption = (isOpen) => {
    const userGridOption = {
        onCellValueChanged: onCellValueChanged,
        columnDefs: [
            {
                headerName: '시스템 명',
                field: 'system_name',
                pinned: 'left',
            },
            {
                headerName: 'DB Name',
                field: 'dbms_dbname',
                pinned: 'left',
            },
            {
                headerName: 'SID',
                field: 'server_name',
                pinned: 'left',
            },
            {
                headerName: 'OWNER',
                field: 'tbl_owner',
                pinned: 'left',
            },
            {
                headerName: 'Table 영문명',
                field: 'tbl_name',
                suppressMenu: false,
                pinned: 'left',
            },
            {
                headerName: 'Table 한글명',
                field: 'tbl_desc',
                pinned: 'left',
            },
            {
                headerName: '변환 컬럼 존재',
                field: 'trrule_yn',
            },
            {
                headerName: '상태(신규,변경)',
                field: 'status',
                cellStyle: (params) => {
                    if (params.value === '신규') {
                        return { color: '#e91e63' };
                    } else if (params.value === '변경') {
                        return { color: '#1976d2' };
                    }
                    return { color: '#000' };
                },
            },
            {
                headerName: '＠이관 작업 등록',
                field: 'tx_yn',
                editable: isOpen,
                cellStyle: { textAlign: 'center' },
                cellEditorSelector: cellEditorSelector,
            },
            {
                headerName: '원장 구분',
                field: 'ledger',
            },
            {
                headerName: '＠Truncate 대상',
                field: 'truncate_yn',
                editable: (props) => {
                    return isOpen && props.data.trans_yn === 'YES';
                },
                cellStyle: { textAlign: 'center' },
                cellEditorSelector: cellEditorSelector,
            },
            {
                headerName: '＠추출 조건',
                field: 'extract_sql',
                cellEditor: 'agLargeTextCellEditor',
                editable: (props) => {
                    return isOpen && props.data.trans_yn === 'YES';
                },
                width: 400,
                cellEditorParams: { maxLength: 1024 },
                suppressMenu: true,
            },
            {
                headerName: 'Real Size(M)',
                field: 'real_size',
                width: 120,
            },
            {
                headerName: 'Dev Size(M)',
                field: 'dev_size',
                width: 120,
            },
            {
                headerName: 'id',
                field: 'id',
                hide: true,
            },
            {
                headerName: 'task_id',
                field: 'task_id',
                hide: true,
            },
            {
                headerName: 'system_id',
                field: 'system_id',
                hide: true,
            },
            {
                headerName: 'server_src',
                field: 'server_src',
                hide: true,
            },
            {
                headerName: 'exe_cnt',
                field: 'exe_cnt',
                hide: true,
            },
        ],
    };

    return userGridOption;
};
