import React, { useCallback, useEffect, useState } from "react";
import { Accordion, Col, Form, Modal, Row } from "react-bootstrap";
import styled from "styled-components";
import { NormalButton, WhiteButton } from "../../component/button/R2wButton";
import { useForm } from "react-hook-form";
import Otr from "./dataAdapter/Otr";
import Etr from "./dataAdapter/Etr";
import Atr from "./dataAdapter/Atr";
import {
    ExtAltibase,
    ExtASA,
    ExtASE,
    ExtCommon,
    ExtDB2,
    ExtGREENPLUM,
    ExtINFOMIX,
    ExtIQ,
    ExtJava,
    ExtMainFrameDb2,
    ExtMSSQL,
    ExtMYSQL,
    ExtORACLE,
    ExtPostgreSQL,
    ExtRainStor,
    ExtSAPHana,
    ExtTIBERO,
    LoadCommon,
    LoadDB2,
    LoadIQ,
    LoadJava,
    LoadORACLE
} from "./dataAdapter/Sql";
import Jtr from "./dataAdapter/Jtr";
import {
    ALTIBASE,
    ASA,
    ASE,
    DB2,
    DB2_MF,
    GREENPLUM,
    HANA,
    INFORMIX,
    IQ,
    MSSQL,
    MYSQL,
    ORACLE,
    POSTGRES,
    RAINSTOR,
    TIBERO
} from "./dataAdapter/DbInfo";
import { StyledAlert } from "../../component/alert/R2wAlert";
import DraggableModal from "../../utils/DraggableModal";

function WorkDbOption({
    show,
    setShowDbOption,
    option,
    setOption,
    dbmsType,
    jconnectFlag,
    r2wtrans,
}) {
    const [accordionControl, setAccordionControl] = useState(0);
    const [desc, setDesc] = useState(['추출 건수', objDesc['추출 건수']]);
    const { register, handleSubmit } = useForm({
        defaultValues: { ...option },
    });
    const [srcTransType, setSrcTransType] = useState();
    const [dstTransType, setDstTransType] = useState();
    useEffect(() => {
        if (dbmsType.length !== 0 && jconnectFlag.length !== 0) {
            setSrcTransType(getTransType(jconnectFlag[0]));
            setDstTransType(getTransType(jconnectFlag[1]));
        }
    }, [r2wtrans]);

    const getTransType = (java) => {
        let type = '';

        if (java === 1) {
            type = 'hsql';
        } else {
            type = 'xsql';
        }

        if (dbmsType[0] === dbmsType[1]) {
            if (dbmsType[0] === ORACLE && r2wtrans.use_r2wotr === 1) {
                type = 'otr';
            } else if (
                (dbmsType[0] === ASE || dbmsType[0] === IQ) &&
                r2wtrans.use_r2wetr === 1
            ) {
                type = 'etr';
            } else if (dbmsType[0] === ALTIBASE && r2wtrans.use_r2watr === 1) {
                type = 'atr';
            } else if (r2wtrans.use_r2wjtr === 1) {
                type = 'jtr';
            }
        }
        console.log('type : ' + type);
        return type;
    };

    const onSubmit = (data) => {
        setOption(data);
        setShowDbOption(false);
        alert('옵션이 저장되었습니다.');
    };

    const Collapse = () => {
        return (
            <NormalButton
                onClick={() => {
                    document
                        .querySelectorAll('.accordion-button')
                        .forEach((el) => {
                            el.click();
                        });
                    setAccordionControl(2);
                }}
            >
                전체 접기
            </NormalButton>
        );
    };

    const Expand = () => {
        return (
            <NormalButton
                onClick={() => {
                    document
                        .querySelectorAll('.accordion-button.collapsed')
                        .forEach((el) => {
                            el.click();
                        });
                    setAccordionControl(0);
                }}
            >
                전체 펼치기
            </NormalButton>
        );
    };

    const eachControl = (btn) => {
        if (btn.target.getAttribute('aria-expanded') === 'true') {
            setAccordionControl(accordionControl + 1);
        } else {
            setAccordionControl(accordionControl - 1);
        }
    };

    const CustomForm = useCallback(({ title, children }) => {
        return (
            <Form.Group as={Row}>
                <Form.Label
                    column
                    xs={4}
                    onClick={() => setDesc([title, objDesc[title]])}
                >
                    {title}
                </Form.Label>
                <Col xs={8}>{children}</Col>
            </Form.Group>
        );
    }, []);

    return (
        <Modal dialogAs={DraggableModal} show={show} onHide={setShowDbOption}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        작업 옵션
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflowY: 'scroll', height: '500px' }}>
                    <GridContainer>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header
                                    onClick={(e) => eachControl(e)}
                                >
                                    공통 옵션 - {srcTransType} / {dstTransType}
                                </Accordion.Header>
                                <Accordion.Body>
                                    {srcTransType === 'otr' &&
                                        dstTransType === 'otr' && (
                                            <Otr
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {srcTransType === 'etr' &&
                                        dstTransType === 'etr' && (
                                            <Etr
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {srcTransType === 'atr' &&
                                        dstTransType === 'atr' && (
                                            <Atr
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {srcTransType === 'jtr' &&
                                        dstTransType === 'jtr' && (
                                            <Jtr
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {srcTransType === 'hsql' &&
                                        dstTransType === 'hsql' &&
                                        srcTransType === 'xsql' &&
                                        dstTransType === 'xsql' && (
                                            <ExtCommon
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header
                                    onClick={(e) => eachControl(e)}
                                >
                                    추출 옵션
                                </Accordion.Header>
                                <Accordion.Body>
                                    {(srcTransType === 'hsql' ||
                                        srcTransType === 'jtr') && (
                                        <ExtJava
                                            register={register}
                                            CustomForm={CustomForm}
                                        />
                                    )}
                                    {srcTransType !== 'hsql' &&
                                        dbmsType[0] === ASA && (
                                            <ExtASA
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {srcTransType !== 'hsql' &&
                                        dbmsType[0] === IQ && (
                                            <ExtIQ
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {srcTransType !== 'hsql' &&
                                        dbmsType[0] === ORACLE && (
                                            <ExtORACLE
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {srcTransType !== 'hsql' &&
                                        dbmsType[0] === DB2 && (
                                            <ExtDB2
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {srcTransType !== 'hsql' &&
                                        dbmsType[0] === ASE && (
                                            <ExtASE
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {srcTransType !== 'hsql' &&
                                        dbmsType[0] === MSSQL && (
                                            <ExtMSSQL
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {srcTransType !== 'hsql' &&
                                        dbmsType[0] === TIBERO && (
                                            <ExtTIBERO
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {srcTransType !== 'hsql' &&
                                        dbmsType[0] === INFORMIX && (
                                            <ExtINFOMIX
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {srcTransType !== 'hsql' &&
                                        dbmsType[0] === GREENPLUM && (
                                            <ExtGREENPLUM
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {srcTransType !== 'hsql' &&
                                        dbmsType[0] === MYSQL && (
                                            <ExtMYSQL
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {srcTransType !== 'hsql' &&
                                        dbmsType[0] === DB2_MF && (
                                            <ExtMainFrameDb2
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {srcTransType !== 'hsql' &&
                                        dbmsType[0] === ALTIBASE && (
                                            <ExtAltibase />
                                        )}
                                    {srcTransType !== 'hsql' &&
                                        dbmsType[0] === HANA && (
                                            <ExtSAPHana
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {srcTransType !== 'hsql' &&
                                        dbmsType[0] === RAINSTOR && (
                                            <ExtRainStor
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {srcTransType !== 'hsql' &&
                                        dbmsType[0] === POSTGRES && (
                                            <ExtPostgreSQL
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header
                                    onClick={(e) => eachControl(e)}
                                >
                                    로드 옵션
                                </Accordion.Header>
                                <Accordion.Body>
                                    {(dstTransType === 'hsql' ||
                                        dstTransType === 'jtr') && (
                                        <LoadJava
                                            register={register}
                                            CustomForm={CustomForm}
                                            dstTransType={dstTransType}
                                        />
                                    )}
                                    {dstTransType !== 'hsql' &&
                                        dbmsType[1] === ASA && (
                                            <LoadCommon
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {dstTransType !== 'hsql' &&
                                        dbmsType[1] === IQ && (
                                            <LoadIQ
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {dstTransType !== 'hsql' &&
                                        dbmsType[1] === ORACLE && (
                                            <LoadORACLE
                                                register={register}
                                                CustomForm={CustomForm}
                                                transMethod={
                                                    option.trans_method
                                                }
                                            />
                                        )}
                                    {dstTransType !== 'hsql' &&
                                        dbmsType[1] === DB2 && (
                                            <LoadDB2
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {dstTransType !== 'hsql' &&
                                        dbmsType[1] === ASE && (
                                            <LoadCommon
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {dstTransType !== 'hsql' &&
                                        dbmsType[1] === MSSQL && (
                                            <LoadCommon
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {dstTransType !== 'hsql' &&
                                        dbmsType[1] === TIBERO && (
                                            <LoadCommon
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {dstTransType !== 'hsql' &&
                                        dbmsType[1] === INFORMIX && (
                                            <LoadCommon
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {dstTransType !== 'hsql' &&
                                        dbmsType[1] === GREENPLUM && (
                                            <LoadCommon
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {dstTransType !== 'hsql' &&
                                        dbmsType[1] === MYSQL && (
                                            <LoadCommon
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {dstTransType !== 'hsql' &&
                                        dbmsType[1] === DB2_MF && (
                                            <LoadCommon
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {dstTransType !== 'hsql' &&
                                        dbmsType[1] === ALTIBASE && (
                                            <LoadCommon
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {dstTransType !== 'hsql' &&
                                        dbmsType[1] === HANA && (
                                            <LoadCommon
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {dstTransType !== 'hsql' &&
                                        dbmsType[1] === RAINSTOR && (
                                            <LoadCommon
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                    {dstTransType !== 'hsql' &&
                                        dbmsType[1] === POSTGRES && (
                                            <LoadCommon
                                                register={register}
                                                CustomForm={CustomForm}
                                            />
                                        )}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </GridContainer>
                </Modal.Body>
                <ModalAddOn>
                    <StyledAlert>
                        {desc[0]}
                        {desc[1]}
                    </StyledAlert>
                    {accordionControl ? <Expand /> : <Collapse />}
                </ModalAddOn>
                <Modal.Footer>
                    <ButtonWrap>
                        <WhiteButton onClick={() => setShowDbOption(false)}>
                            닫기
                        </WhiteButton>
                        <NormalButton type="submit">저장</NormalButton>
                    </ButtonWrap>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

const GridContainer = styled.div`
    & .accordion {
        margin-bottom: 15px;

        & .accordion-body .row {
            margin-bottom: 10px;

            & input:not(input[type='radio']),
            & select {
                line-height: 1.313;
            }

            & .col-8 {
                display: flex;
                align-items: center;
                & .form-check {
                    width: 90px;
                }
            }
            & * {
                font-size: 14px;
                white-space: pre-line;
            }
        }
    }
`;

const ModalAddOn = styled.div`
    padding: 20px;

    & button {
        width: 100%;
        height: 33px;
        margin-top: 15px;
    }
`;

const ButtonWrap = styled.div`
    & button {
        height: 33px;
        margin-left: 15px;
    }
`;

export default React.memo(WorkDbOption);

const objDesc = {
    '추출 건수': '추출 건수를 지정합니다. (0 : 그룹 최대 추출 건수).',
    '변환 규칙 사용': '변환 규칙 적용 여부를 설정합니다.',
    'Array Count':
        '한 번에 가져올 로우의 수를 설정합니다.\n(기본값: 5000, 최댓값: 65535)',
    '더블 쿼테이션':
        '더블 쿼테이션 사용 여부를 설정합니다.\n더블 쿼테이션 사용 시, 컬럼 구분자와 로우 구분자의 입력이 제한됩니다.',
    '암호화 설정 적용': '테이블에 설정된 암호화 규칙의 적용 여부를 설정합니다.',
    '전송 방식':
        '데이터 베이스에 접속하여, 데이터를 전송하기 위한 방식을 선택합니다.',
    '컬럼 구분자':
        '데이터 전송 시 사용되는 컬럼 구분자를 입력합니다.\n더블 쿼테이션 사용 시 입력할 수 없습니다.',
    '로우 구분자':
        '데이터 전송 시 사용되는 로우 구분자를 입력합니다.\n더블 쿼테이션 사용 시 입력할 수 없습니다.',
    '추출 동시 작업 수': '추출 시 지정한 작업 수로 추출합니다.',
    '로드 동시 작업 수': '로드 시 지정한 작업 수로 추출합니다.',
    '마지막 컬럼구분자':
        '데이터 전송할 때 마지막에 컬럼 구분자를 적용 여부를 설정합니다.',
    'Size Mode':
        '컬럼 개수를 전송하고 컬럼 데이터 크기, 컬럼 데이터를 반복하여 전송합니다.\nSize Mode 사용 시 더블쿼테이션은 사용할 수 없습니다.',
    'Convert Char':
        '숫자형 컬럼 타입(NUMBER, NUMERIC, INT 등)을 character로 전환하여 추출 및 로드합니다.',
    'Print Row':
        '설정된 수만큼 데이터가 전송되면 정보를 출력합니다.\n(기본값 : 1000000, 최솟값 : 100000)',
    'NULL 처리 문자열': 'NULL 처리 문자열을 설정합니다.',
    '원본 파티션': '원본 테이블에서 추출할 파티션 이름을 입력합니다.',
    'Parallel Hint':
        '오라클의 PARALLEL 힌트를 사용하도록 설정할 수 있습니다.\n이 옵션은 추출 및 로드 속도를 개선할 수 있으나, 시스템에 따라서 효과가 없을 수도 있습니다.',
    'Hint Degree':
        '오라클의 PARALLEL 힌트에 사용되는 degree 값을 설정합니다.\n오라클이 설치된 시스템의 CPU 개수 등을 고려하여 이 값을 지정해 주시기 바랍니다.',
    'Warning Count':
        '로드중 발생하는 warning의 개수가 설정한 값에 도달하면 작업을 중단합니다.',
    'ESCAPE 문자': '추출이나 로드 시 무시할 문자를 입력합니다.',
    '원격 접속': 'r2whsql이 물리적으로 다른 시스템에서 동작할 경우 사용합니다.',
    '중복 제거': '중복된 ROW에 대하여 스킵 여부를 결정합니다.',
    '세션 옵션': '사용할 세션 개수를 설정합니다. (Session 옵션 설정)',
    '임시 테이블 \n 생성 영역': '임시 테이블 생성 영역을 설정합니다.',
    'FASTLOAD 방식':
        '임시 테이블에서 대상 테이블로 로드할 때 사용되는 방식을 설정합니다. ON(merge), OFF(insert).',
    '로드 건수':
        '임시 테이블 영역에서 대상 테이블로 몇 건 단위로 로드할지 설정합니다. (0 : 한꺼번에 처리)',
    '대상 파티션': '대상 테이블에 로드할 파티션 이름을 입력합니다.',
    'No Log': 'Log 정보를 저장하지 않습니다.',
    '병렬 모드': '병렬 모드 사용 여부를 결정합니다.',
    'Buffer Size(MB)':
        '로드 시 사용되는 버퍼의 크기를 설정합니다. (기본값 : 256 MB)',
    'Load Mode':
        'Insert : 기존 데이터를 변경하지 않고 데이터를 추가합니다.\nReplace : 기존 데이터를 삭제하고 데이터를 추가합니다.',
    'Load Message':
        '로드의 로그 파일이 저장될 경로입니다.\n파일명까지 같이 지정해야 합니다.',
    'Load Option':
        'Identify column인 경우\nIGNORE : 사용자 지정 값을 무시하고 로드합니다.\nOVERRIDE : 사용자 지정 값으로 로드합니다.',
    'Multi Thread': '멀티 스레드 사용 여부를 설정합니다.',
};
