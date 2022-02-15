import React from "react";
import { Form } from "react-bootstrap";
import { GrayRadioButton } from "../../../component/radio/R2wRadioButton";

export default function Otr({ register, CustomForm }) {
    return (
        <>
            <CustomForm title="추출 건수">
                <Form.Control {...register("max_extract_cnt")} type="number" />
            </CustomForm>

            <CustomForm title="변환 규칙 사용">
                <GrayRadioButton id="trryle_y" label="사용" reg={{ ...register("trrule_yn") }} defaultValue="y" />
                <GrayRadioButton id="trryle_n" label="사용안함" reg={{ ...register("trrule_yn") }} defaultValue="n" />
            </CustomForm>

            <CustomForm title="암호화 설정 적용">
                <GrayRadioButton id="enc_y" label="적용" reg={{ ...register("enc_yn") }} defaultValue="y" />
                <GrayRadioButton id="enc_n" label="적용안함" reg={{ ...register("enc_yn") }} defaultValue="n" />
            </CustomForm>

            <CustomForm title="전송 방식">
                <GrayRadioButton id="Bind" label="Bind" reg={{ ...register("trans_method") }} defaultValue="bind" />
                <GrayRadioButton
                    id="Bulk"
                    label="Bulk"
                    reg={{
                        ...register("trans_method", {
                            onChange: (e) => {
                                if (e.target.value === "bulk") {
                                    document.querySelectorAll("input[name='skip_yn']")[0].setAttribute("disabled", true);
                                    document.querySelectorAll("input[name='skip_yn']")[1].setAttribute("disabled", true);
                                    document.querySelectorAll("input[name='no_log']")[0].removeAttribute("disabled");
                                    document.querySelectorAll("input[name='no_log']")[1].removeAttribute("disabled");
                                    document.querySelectorAll("input[name='parallel']")[0].removeAttribute("disabled");
                                    document.querySelectorAll("input[name='parallel']")[1].removeAttribute("disabled");
                                    document.querySelector("input[name='buffer_size']").removeAttribute("disabled");
                                } else {
                                    document.querySelectorAll("input[name='skip_yn']")[0].removeAttribute("disabled");
                                    document.querySelectorAll("input[name='skip_yn']")[1].removeAttribute("disabled");
                                    document.querySelectorAll("input[name='no_log']")[0].setAttribute("disabled", true);
                                    document.querySelectorAll("input[name='no_log']")[1].setAttribute("disabled", true);
                                    document.querySelectorAll("input[name='parallel']")[0].setAttribute("disabled", true);
                                    document.querySelectorAll("input[name='parallel']")[1].setAttribute("disabled", true);
                                    document.querySelector("input[name='buffer_size']").setAttribute("disabled", true);
                                }
                            },
                        }),
                    }}
                    defaultValue="bulk"
                />
            </CustomForm>

            <CustomForm title="Array Count">
                <Form.Control {...register("array_count")} type="number" />
            </CustomForm>

            <CustomForm title="더블 쿼테이션">
                <GrayRadioButton id="dq_y" label="사용" reg={{ ...register("dq_yn") }} defaultValue="y" />
                <GrayRadioButton id="dq_n" label="사용안함" reg={{ ...register("dq_yn") }} defaultValue="n" />
            </CustomForm>

            <CustomForm title="컬럼 구분자">
                <Form.Control {...register("coldeli")} type="text" />
            </CustomForm>

            <CustomForm title="로우 구분자">
                <Form.Control {...register("rowdeli")} type="text" />
            </CustomForm>

            <CustomForm title="추출 동시 작업 수">
                <Form.Control {...register("extract_num")} type="number" readOnly />
            </CustomForm>

            <CustomForm title="로드 동시 작업 수">
                <Form.Control {...register("load_num")} type="number" readOnly />
            </CustomForm>

            <CustomForm title="마지막 컬럼구분자">
                <GrayRadioButton id="lastcol_y" label="적용" reg={{ ...register("last_col_yn") }} defaultValue="y" />
                <GrayRadioButton id="lastcol_n" label="적용안함" reg={{ ...register("last_col_yn") }} defaultValue="n" />
            </CustomForm>

            <CustomForm title="Multi Thread">
                <GrayRadioButton id="multi_thread_y" label="ON" reg={{ ...register("multi_thread") }} defaultValue="on" />
                <GrayRadioButton id="multi_thread_n" label="OFF" reg={{ ...register("multi_thread") }} defaultValue="off" />
            </CustomForm>
        </>
    );
}
