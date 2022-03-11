import React from 'react';
import { Modal } from 'react-bootstrap';
import { NormalButton } from '../../../component/button/R2wButton';
import styled from 'styled-components';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DraggableModal from '../../../utils/DraggableModal';

function DetailLog({ show, setShowDetailLog, log }) {
    return (
        <Modal
            dialogAs={DraggableModal}
            show={show}
            onHide={setShowDetailLog}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>상세 로그</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <GridContainer>
                    <CKEditor
                        editor={ClassicEditor}
                        data={log}
                        disabled
                        config={{ toolbar: [] }}
                    />
                </GridContainer>
            </Modal.Body>
            <Modal.Footer>
                <ButtonWrap>
                    <NormalButton
                        variant="primary"
                        onClick={() => {
                            setShowDetailLog(false);
                        }}
                    >
                        닫기
                    </NormalButton>
                </ButtonWrap>
            </Modal.Footer>
        </Modal>
    );
}

const GridContainer = styled.div`
    font-size: 14px;
    height: 390px;

    & .ck-editor__editable {
        min-height: 390px;
        max-height: 390px;
        padding-left: 0px;
        border: none;
    }

    & .ck.ck-reset_all {
        display: none;
    }
`;

const ButtonWrap = styled.div`
    & button {
        height: 33px;
        margin-left: 10px;
    }
`;

export default DetailLog;
