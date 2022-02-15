export const defaultColDef = () => {
    const defaultColDef = {
        suppressMenu: true,
        sortable: false,
    };
    return defaultColDef;
};

export const valueFormatter = (params) => {
    if (params.value === '1') {
        return '한번';
    } else if (params.value === '2') {
        return '매일';
    } else if (params.value === '3') {
        return '매주';
    } else if (params.value === '4') {
        return '매달';
    } else if (params.value === '5') {
        return '분기별';
    } else if (params.value === '6') {
        return '매일';
    } else if (params.value === '7') {
        return '사용자지정';
    }
};
