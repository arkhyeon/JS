import { MdOutlineOpenInNew, MdOutlineOpenInNewOff } from 'react-icons/md';
import styled from 'styled-components';
import { NormalButton } from '../../component/button/R2wButton';

const AffectSqlRenderer = (props) => {
    const setExtSql = (e) => {
        props.context.masterGrid.node.setDataValue('extract_sql', e.target.value);
        props.context.masterGrid.props.api.flashCells({ rowNodes: [props.context.masterGrid.node] });
    };

    return (
        <GridButtonWrap>
            <NormalButton onClick={setExtSql} value={props.data.user_extract_sql}>
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
            values: ['YES', 'NO'],
        },
    };
};

const onCellEditingStopped = (props) => {
    //이관 변경
    if (props.newValue !== props.oldValue) {
        if (props.colDef.field === 'trans_yn') {
            //YES
            if (props.newValue === 'YES' && props.data.extract_sql === '') {
                props.node.setDataValue('extract_sql', `select * from ${props.data.table_name}`);
            } else if (props.newValue === 'NO') {
                //NO
                if (window.confirm('이관 작업 등록을 해제하시면 추출 조건이 삭제됩니다.\n그래도 해제하시겠습니까?')) {
                    props.node.setDataValue('extract_sql', '');
                } else {
                    props.node.setDataValue('trans_yn', 'YES');
                    return;
                }
            }
        }

        props.api.flashCells({ rowNodes: [props.node] });
    }
};

const enrollCheck = (props) => {
    if (props.data.enroll === 1) {
        return <MdOutlineOpenInNew style={{ 'font-size': '24px', fill: '#19972c' }} />;
    } else {
        return <MdOutlineOpenInNewOff style={{ 'font-size': '24px', fill: '#929292' }} />;
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
        rowClassRules: {
            //css70line
            // alreadyEnroll: function (params) {
            //     return params.data.enroll === 1;
            // },
        },
        getRowNodeId: function (data) {
            return data.id;
        },
        rowMultiSelectWithClick: () => {
            return !isOpen;
        },
        onCellEditingStopped: onCellEditingStopped,
        columnDefs: [
            {
                headerName: '시스템 명',
                field: 'server_name',
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
                field: 'enroll1',
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
                field: 'dbms_dsn',
                pinned: 'left',
            },
            {
                headerName: 'OWNER',
                field: 'owner',
                pinned: 'left',
            },
            {
                headerName: 'Table 영문명',
                field: 'table_name',
                pinned: 'left',
            },
            {
                headerName: 'Table 한글명',
                field: 'table_desc',
                pinned: 'left',
            },
            {
                headerName: '변환 컬럼 존재',
                field: 'trrule_yn',
            },
            {
                headerName: '상태(신규,변경)',
                field: 'table_status',
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
                headerName: '이관 작업 등록',
                field: 'trans_yn',
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
            },
            {
                headerName: 'Real Size(M)',
                field: 'table_real_size',
            },
            {
                headerName: 'Dev Size(M)',
                field: 'table_dev_size',
            },
            {
                field: 'id',
                hide: true,
                suppressColumnsToolPanel: true,
            },
            {
                field: 'enroll',
                hide: true,
                suppressColumnsToolPanel: true,
            },
        ],
        detailCellRendererParams: (props) => ({
            detailGridOptions: {
                columnDefs: [
                    { headerName: '사용자', field: 'userid' },
                    { headerName: '등록 쿼리', field: 'user_extract_sql', width: 450 },
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
        onCellEditingStopped: onCellEditingStopped,
        columnDefs: [
            {
                headerName: '시스템 명',
                field: 'server_name',
                pinned: 'left',
            },
            {
                headerName: 'DB Name',
                field: 'dbms_dbname',
                pinned: 'left',
            },
            {
                headerName: 'SID',
                field: 'dbms_dsn',
                pinned: 'left',
            },
            {
                headerName: 'OWNER',
                field: 'owner',
                pinned: 'left',
            },
            {
                headerName: 'Table 영문명',
                field: 'table_name',
                suppressMenu: false,
                pinned: 'left',
            },
            {
                headerName: 'Table 한글명',
                field: 'table_desc',
                pinned: 'left',
            },
            {
                headerName: '변환 컬럼 존재',
                field: 'trrule_yn',
            },
            {
                headerName: '상태(신규,변경)',
                field: 'table_status',
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
                field: 'trans_yn',
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
                field: 'table_real_size',
                width: 120,
            },
            {
                headerName: 'Dev Size(M)',
                field: 'table_dev_size',
                width: 120,
            },
        ],
    };

    return userGridOption;
};
