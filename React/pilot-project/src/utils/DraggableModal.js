import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { ModalDialog } from 'react-bootstrap';

/**
 * @param size : "xl"|"lg"|"sm" Bootstrap size props (default : sm)
 * @param children : children Modal Inner Component(modalHeader, Body, Footer)
 * @returns {JSX.Element} : Draggable Modal Component
 * @constructor <Modal dialogAs={DraggableModal}>{Something}</Modal>
 */
export const DraggableModal = ({ size, children }) => {
    const nodeRef = useRef();
    const [defaultPositionY, setDefaultPositionY] = useState();

    useEffect(() => {
        setModalCenter();
    }, []);

    const setModalCenter = () => {
        const modalDialog = document.querySelector('.modal-content ');
        if (modalDialog) {
            setDefaultPositionY(
                (window.innerHeight - modalDialog.offsetHeight) / 2 - 28,
            );
        }
    };

    const noEscapeWindow = (e, data) => {
        const currentPosition = nodeRef.current.props.position;
        const movePosition = nodeRef.current.state;
        const widthMarginSize = (window.innerWidth - data.node.offsetWidth) / 2;
        const heightMarginSize =
            window.innerHeight - data.node.offsetHeight - 28;

        currentPosition.x = movePosition.x;
        currentPosition.y = movePosition.y;

        if (data.x <= -widthMarginSize) {
            currentPosition.x = -widthMarginSize;
        }

        if (data.x >= widthMarginSize) {
            currentPosition.x = widthMarginSize;
        }
        if (
            data.y >= heightMarginSize &&
            window.innerHeight > data.node.offsetHeight
        ) {
            currentPosition.y = heightMarginSize;
        }
        if (data.y <= -28) {
            currentPosition.y = -28;
        }
    };

    return (
        <Draggable
            ref={nodeRef}
            handle=".modal-header"
            position={{ x: 0, y: defaultPositionY }}
            onStop={(e, data) => noEscapeWindow(e, data)}
        >
            <ModalDialog size={size}>{children}</ModalDialog>
        </Draggable>
    );
};

export default DraggableModal;
