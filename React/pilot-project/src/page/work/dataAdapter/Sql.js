import React from "react";
import { Form } from "react-bootstrap";
import { GrayRadioButton } from "../../../component/radio/R2wRadioButton";
import { IQ, TERADATA, VERTICA } from "./DbInfo";

export const ExtCommon = ({ register, CustomForm }) => {
    return (
        <>
            <CustomForm title="추출 건수">
                <Form.Control {...register('max_extract_cnt')} type="number" />
            </CustomForm>

            <CustomForm title="변환 규칙 사용">
                <GrayRadioButton
                    id="trryle_y"
                    label="사용"
                    reg={{ ...register('trrule_yn') }}
                    defaultValue="y"
                />
                <GrayRadioButton
                    id="trryle_n"
                    label="사용안함"
                    reg={{ ...register('trrule_yn') }}
                    defaultValue="n"
                />
            </CustomForm>

            <CustomForm title="암호화 설정 적용">
                <GrayRadioButton
                    id="enc_y"
                    label="적용"
                    reg={{ ...register('enc_yn') }}
                    defaultValue="y"
                />
                <GrayRadioButton
                    id="enc_n"
                    label="적용안함"
                    reg={{ ...register('enc_yn') }}
                    defaultValue="n"
                />
            </CustomForm>

            <CustomForm title="전송 방식">
                <GrayRadioButton
                    id="Bind"
                    label="Bind"
                    reg={{ ...register('trans_method') }}
                    defaultValue="bind"
                />
                <GrayRadioButton
                    id="Bulk"
                    label="Bulk"
                    reg={{ ...register('trans_method') }}
                    defaultValue="bulk"
                />
            </CustomForm>

            <CustomForm title="Array Count">
                <Form.Control {...register('array_count')} type="number" />
            </CustomForm>

            <CustomForm title="더블 쿼테이션">
                <GrayRadioButton
                    id="dq_y"
                    label="사용"
                    reg={{ ...register('dq_yn') }}
                    defaultValue="y"
                />
                <GrayRadioButton
                    id="dq_n"
                    label="사용안함"
                    reg={{ ...register('dq_yn') }}
                    defaultValue="n"
                />
            </CustomForm>

            <CustomForm title="컬럼 구분자">
                <Form.Control {...register('coldeli')} type="text" />
            </CustomForm>

            <CustomForm title="로우 구분자">
                <Form.Control {...register('rowdeli')} type="text" />
            </CustomForm>

            <CustomForm title="추출 동시 작업 수">
                <Form.Control
                    {...register('extract_num')}
                    type="number"
                    readOnly={true}
                />
            </CustomForm>

            <CustomForm title="로드 동시 작업 수">
                <Form.Control
                    {...register('load_num')}
                    type="number"
                    readOnly={true}
                />
            </CustomForm>

            <CustomForm title="마지막 컬럼구분자">
                <GrayRadioButton
                    id="lastcol_y"
                    label="적용"
                    reg={{ ...register('last_col_yn') }}
                    defaultValue="y"
                />
                <GrayRadioButton
                    id="lastcol_n"
                    label="적용안함"
                    reg={{ ...register('last_col_yn') }}
                    defaultValue="n"
                />
            </CustomForm>
        </>
    );
};

export const ExtIQ = ({ register, CustomForm }) => {
    return <></>;
};

export const LoadIQ = ({ register, CustomForm }) => {
    return (
        <>
            <CustomForm title="중복 제거">
                <GrayRadioButton
                    id="skip_y"
                    label="사용"
                    reg={{ ...register('skip_yn') }}
                    defaultValue="y"
                />
                <GrayRadioButton
                    id="skip_n"
                    label="사용안함"
                    reg={{ ...register('skip_yn') }}
                    defaultValue="n"
                />
            </CustomForm>
        </>
    );
};

export const ExtORACLE = ({ register, CustomForm }) => {
    return (
        <>
            <CustomForm title="Size Mode">
                <GrayRadioButton
                    id="size_mode_y"
                    label="ON"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="on"
                />
                <GrayRadioButton
                    id="size_mode_n"
                    label="OFF"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="off"
                />
            </CustomForm>

            <CustomForm title="Convert Char">
                <GrayRadioButton
                    id="convert_char_y"
                    label="ON"
                    reg={{ ...register('convert_char_yn') }}
                    defaultValue="on"
                />
                <GrayRadioButton
                    id="convert_char_n"
                    label="OFF"
                    reg={{ ...register('convert_char_yn') }}
                    defaultValue="off"
                />
            </CustomForm>

            <CustomForm title="Print Row">
                <Form.Control {...register('print_row')} type="number" />
            </CustomForm>

            <CustomForm title="NULL 처리 문자열">
                <Form.Control {...register('null_char')} type="text" />
            </CustomForm>

            <CustomForm title="원본 파티션">
                <Form.Control {...register('partition_src')} type="text" />
            </CustomForm>

            <CustomForm title="Parallel Hint">
                <Form.Select {...register('parallel_hint')} defaultValue="0">
                    <option value="0">사용안함</option>
                    <option value="1">자동</option>
                    <option value="2">사용자 정의</option>
                </Form.Select>
            </CustomForm>

            <CustomForm title="Hint Degree">
                <Form.Control
                    {...register('hint_degree')}
                    type="number"
                    readOnly={true}
                />
            </CustomForm>

            <CustomForm title="Warning Count">
                <Form.Control {...register('warning_count')} type="number" />
            </CustomForm>
        </>
    );
};

export const LoadORACLE = ({ register, CustomForm, transMethod }) => {
    return (
        <>
            <CustomForm title="대상 파티션">
                <Form.Control {...register('partition_dst')} type="text" />
            </CustomForm>

            <CustomForm title="중복 제거">
                <GrayRadioButton
                    id="skip_y"
                    label="사용"
                    reg={{
                        ...register('skip_yn', {
                            disabled: transMethod !== 'bind',
                        }),
                    }}
                    defaultValue="y"
                />
                <GrayRadioButton
                    id="skip_n"
                    label="사용안함"
                    reg={{
                        ...register('skip_yn', {
                            disabled: transMethod !== 'bind',
                        }),
                    }}
                    defaultValue="n"
                />
            </CustomForm>

            <CustomForm title="No Log">
                <GrayRadioButton
                    id="no_log_y"
                    label="사용"
                    reg={{
                        ...register('no_log', {
                            disabled: transMethod === 'bind',
                        }),
                    }}
                    defaultValue="y"
                />
                <GrayRadioButton
                    id="no_log_n"
                    label="사용안함"
                    reg={{
                        ...register('no_log', {
                            disabled: transMethod === 'bind',
                        }),
                    }}
                    defaultValue="n"
                />
            </CustomForm>

            <CustomForm title="병렬 모드">
                <GrayRadioButton
                    id="parallel_y"
                    label="사용"
                    reg={{
                        ...register('parallel', {
                            disabled: transMethod === 'bind',
                        }),
                    }}
                    defaultValue="y"
                />
                <GrayRadioButton
                    id="parallel_n"
                    label="사용안함"
                    reg={{
                        ...register('parallel', {
                            disabled: transMethod === 'bind',
                        }),
                    }}
                    defaultValue="n"
                />
            </CustomForm>

            <CustomForm title="Buffer Size(MB)">
                <Form.Control
                    {...register('buffer_size', {
                        disabled: transMethod === 'bind',
                    })}
                    type="number"
                />
            </CustomForm>
        </>
    );
};

export const ExtDB2 = ({ register, CustomForm }) => {
    return (
        <>
            <CustomForm title="Size Mode">
                <GrayRadioButton
                    id="size_mode_y"
                    label="ON"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="on"
                />
                <GrayRadioButton
                    id="size_mode_n"
                    label="OFF"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="off"
                />
            </CustomForm>

            <CustomForm title="Convert Char">
                <GrayRadioButton
                    id="convert_char_y"
                    label="ON"
                    reg={{ ...register('convert_char_yn') }}
                    defaultValue="on"
                />
                <GrayRadioButton
                    id="convert_char_n"
                    label="OFF"
                    reg={{ ...register('convert_char_yn') }}
                    defaultValue="off"
                />
            </CustomForm>

            <CustomForm title="Print Row">
                <Form.Control {...register('print_row')} type="number" />
            </CustomForm>

            <CustomForm title="NULL 처리 문자열">
                <Form.Control {...register('null_char')} type="text" />
            </CustomForm>

            <CustomForm title="Warning Count">
                <Form.Control {...register('warning_count')} type="number" />
            </CustomForm>
        </>
    );
};

export const LoadDB2 = ({ register, CustomForm }) => {
    return (
        <>
            <CustomForm title="중복 제거">
                <GrayRadioButton
                    id="skip_y"
                    label="사용"
                    reg={{ ...register('skip_yn') }}
                    defaultValue="y"
                />
                <GrayRadioButton
                    id="skip_n"
                    label="사용안함"
                    reg={{ ...register('skip_yn') }}
                    defaultValue="n"
                />
            </CustomForm>

            <CustomForm title="Load Mode">
                <GrayRadioButton
                    id="insert"
                    label="Insert"
                    reg={{ ...register('load_mode') }}
                    defaultValue="insert"
                />
                <GrayRadioButton
                    id="replace"
                    label="Replace"
                    reg={{ ...register('load_mode') }}
                    defaultValue="replace"
                />
            </CustomForm>

            <CustomForm title="Load Message">
                <Form.Control {...register('load_message')} type="text" />
            </CustomForm>

            <CustomForm title="Load Option">
                <GrayRadioButton
                    id="ignore"
                    label="IGNORE"
                    reg={{ ...register('load_opt') }}
                    defaultValue="ignore"
                />
                <GrayRadioButton
                    id="override"
                    label="OVERRIDE"
                    reg={{ ...register('load_opt') }}
                    defaultValue="override"
                />
            </CustomForm>
        </>
    );
};

export const ExtASE = ({ register, CustomForm }) => {
    return (
        <>
            <CustomForm title="Size Mode">
                <GrayRadioButton
                    id="size_mode_y"
                    label="ON"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="on"
                />
                <GrayRadioButton
                    id="size_mode_n"
                    label="OFF"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="off"
                />
            </CustomForm>

            <CustomForm title="NULL 처리 문자열">
                <Form.Control {...register('null_char')} type="text" />
            </CustomForm>
        </>
    );
};

export const ExtMSSQL = ({ register, CustomForm }) => {
    return (
        <>
            <CustomForm title="Size Mode">
                <GrayRadioButton
                    id="size_mode_y"
                    label="ON"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="on"
                />
                <GrayRadioButton
                    id="size_mode_n"
                    label="OFF"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="off"
                />
            </CustomForm>

            <CustomForm title="Convert Char">
                <GrayRadioButton
                    id="convert_char_y"
                    label="ON"
                    reg={{ ...register('convert_char_yn') }}
                    defaultValue="on"
                />
                <GrayRadioButton
                    id="convert_char_n"
                    label="OFF"
                    reg={{ ...register('convert_char_yn') }}
                    defaultValue="off"
                />
            </CustomForm>

            <CustomForm title="Print Row">
                <Form.Control {...register('print_row')} type="number" />
            </CustomForm>

            <CustomForm title="NULL 처리 문자열">
                <Form.Control {...register('null_char')} type="text" />
            </CustomForm>
        </>
    );
};

export const ExtTIBERO = ({ register, CustomForm }) => {
    return (
        <>
            <CustomForm title="Size Mode">
                <GrayRadioButton
                    id="size_mode_y"
                    label="ON"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="on"
                />
                <GrayRadioButton
                    id="size_mode_n"
                    label="OFF"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="off"
                />
            </CustomForm>

            <CustomForm title="NULL 처리 문자열">
                <Form.Control {...register('null_char')} type="text" />
            </CustomForm>

            <CustomForm title="ESCAPE 문자">
                <Form.Control {...register('escape_char')} type="text" />
            </CustomForm>
        </>
    );
};

export const ExtINFOMIX = ({ register, CustomForm }) => {
    return (
        <>
            <CustomForm title="NULL 처리 문자열">
                <Form.Control {...register('null_char')} type="text" />
            </CustomForm>
        </>
    );
};

export const ExtGREENPLUM = ({ register, CustomForm }) => {
    return (
        <>
            <CustomForm title="NULL 처리 문자열">
                <Form.Control {...register('null_char')} type="text" />
            </CustomForm>
        </>
    );
};

export const ExtASA = ({ register, CustomForm }) => {
    return (
        <>
            <CustomForm title="NULL 처리 문자열">
                <Form.Control {...register('null_char')} type="text" />
            </CustomForm>
        </>
    );
};

export const ExtMYSQL = ({ register, CustomForm }) => {
    return (
        <>
            <CustomForm title="Size Mode">
                <GrayRadioButton
                    id="size_mode_y"
                    label="ON"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="on"
                />
                <GrayRadioButton
                    id="size_mode_n"
                    label="OFF"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="off"
                />
            </CustomForm>

            <CustomForm title="Print Row">
                <Form.Control {...register('print_row')} type="number" />
            </CustomForm>

            <CustomForm title="NULL 처리 문자열">
                <Form.Control {...register('null_char')} type="text" />
            </CustomForm>
        </>
    );
};

export const ExtMainFrameDb2 = ({ register, CustomForm }) => {
    return (
        <>
            <CustomForm title="Size Mode">
                <GrayRadioButton
                    id="size_mode_y"
                    label="ON"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="on"
                />
                <GrayRadioButton
                    id="size_mode_n"
                    label="OFF"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="off"
                />
            </CustomForm>

            <CustomForm title="NULL 처리 문자열">
                <Form.Control {...register('null_char')} type="text" />
            </CustomForm>
        </>
    );
};

export const ExtAltibase = ({ register, CustomForm }) => {
    return (
        <>
            <CustomForm title="Size Mode">
                <GrayRadioButton
                    id="size_mode_y"
                    label="ON"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="on"
                />
                <GrayRadioButton
                    id="size_mode_n"
                    label="OFF"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="off"
                />
            </CustomForm>

            <CustomForm title="NULL 처리 문자열">
                <Form.Control {...register('null_char')} type="text" />
            </CustomForm>
        </>
    );
};

export const ExtSAPHana = ({ register, CustomForm }) => {
    return (
        <>
            <CustomForm title="Size Mode">
                <GrayRadioButton
                    id="size_mode_y"
                    label="ON"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="on"
                />
                <GrayRadioButton
                    id="size_mode_n"
                    label="OFF"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="off"
                />
            </CustomForm>

            <CustomForm title="NULL 처리 문자열">
                <Form.Control {...register('null_char')} type="text" />
            </CustomForm>
        </>
    );
};

export const ExtRainStor = ({ register, CustomForm }) => {
    return (
        <>
            <CustomForm title="Size Mode">
                <GrayRadioButton
                    id="size_mode_y"
                    label="ON"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="on"
                />
                <GrayRadioButton
                    id="size_mode_n"
                    label="OFF"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="off"
                />
            </CustomForm>

            <CustomForm title="NULL 처리 문자열">
                <Form.Control {...register('null_char')} type="text" />
            </CustomForm>
        </>
    );
};

export const ExtPostgreSQL = ({ register, CustomForm }) => {
    return (
        <>
            <CustomForm title="Size Mode">
                <GrayRadioButton
                    id="size_mode_y"
                    label="ON"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="on"
                />
                <GrayRadioButton
                    id="size_mode_n"
                    label="OFF"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="off"
                />
            </CustomForm>

            <CustomForm title="Print Row">
                <Form.Control {...register('print_row')} type="number" />
            </CustomForm>

            <CustomForm title="NULL 처리 문자열">
                <Form.Control {...register('null_char')} type="text" />
            </CustomForm>
        </>
    );
};

export const ExtJava = ({ register, CustomForm, srcTransType }) => {
    return (
        <>
            <CustomForm title="Size Mode">
                <GrayRadioButton
                    id="size_mode_y"
                    label="ON"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="on"
                />
                <GrayRadioButton
                    id="size_mode_n"
                    label="OFF"
                    reg={{ ...register('size_mode_yn', { disabled: true }) }}
                    defaultValue="off"
                />
            </CustomForm>

            <CustomForm title="NULL 처리 문자열">
                <Form.Control {...register('null_char')} type="text" />
            </CustomForm>

            {srcTransType === VERTICA && (
                <CustomForm title="ESCAPE 문자">
                    <Form.Control {...register('escape_char')} type="text" />
                </CustomForm>
            )}
        </>
    );
};

export const LoadJava = ({ register, CustomForm, dstTransType }) => {
    return (
        <>
            {(dstTransType === IQ || dstTransType === VERTICA) && (
                <CustomForm title="원격 접속">
                    <GrayRadioButton
                        id="remote_mode_y"
                        label="ON"
                        reg={{ ...register('remote_mode_yn') }}
                        defaultValue="on"
                    />
                    <GrayRadioButton
                        id="remote_mode_n"
                        label="OFF"
                        reg={{ ...register('remote_mode_yn') }}
                        defaultValue="off"
                    />
                </CustomForm>
            )}

            <CustomForm title="중복 제거">
                <GrayRadioButton
                    id="skip_y"
                    label="사용"
                    reg={{ ...register('skip_yn') }}
                    defaultValue="y"
                />
                <GrayRadioButton
                    id="skip_n"
                    label="사용안함"
                    reg={{ ...register('skip_yn') }}
                    defaultValue="n"
                />
            </CustomForm>

            {dstTransType === TERADATA && (
                <>
                    <CustomForm title="세션 옵션">
                        <Form.Control
                            {...register('session_option')}
                            type="number"
                        />
                    </CustomForm>

                    <CustomForm title={'임시 테이블 \n 생성 영역'}>
                        <Form.Control {...register('temp_space')} />
                    </CustomForm>

                    <CustomForm title="FASTLOAD 방식">
                        <GrayRadioButton
                            id="fastload_y"
                            label="ON"
                            reg={{ ...register('fastload_yn') }}
                            defaultValue="on"
                        />
                        <GrayRadioButton
                            id="fastload_n"
                            label="OFF"
                            reg={{ ...register('fastload_yn') }}
                            defaultValue="off"
                        />
                    </CustomForm>

                    <CustomForm title="로드 건수">
                        <Form.Control {...register('incount')} type="number" />
                    </CustomForm>
                </>
            )}
        </>
    );
};

/**
 *
 * @param
 * ASE, MSSQL, TIBERO, INFOMIX, GREENPLUM, ASA MYSQL, MAINFRAME DB2, ALTIBASE, RAINSTOR, SAPHANA, POSTGRESQL
 * @returns
 */
export const LoadCommon = ({ register, CustomForm }) => {
    return (
        <>
            <CustomForm title="중복 제거">
                <GrayRadioButton
                    id="skip_y"
                    label="사용"
                    reg={{ ...register('skip_yn') }}
                    defaultValue="y"
                />
                <GrayRadioButton
                    id="skip_n"
                    label="사용안함"
                    reg={{ ...register('skip_yn') }}
                    defaultValue="n"
                />
            </CustomForm>
        </>
    );
};
