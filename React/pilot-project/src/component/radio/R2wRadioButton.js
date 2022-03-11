import React from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';

/**
 *
 * @param {String} id 선택자 (필수)
 *  - 버튼 체크 on off 안된다면 id 문제
 * @param {String} name 라디오 버튼 묶음 (필수)
 *  - 버튼이 서로 다르게 움직이면 name이 다른게 문제
 * @param {String} label 버튼 라벨 텍스트 (필수)
 *  - 버튼 옆에 이름이 안나온다면 label 문제
 * @param {Boolean} checked defaultChecked
 *  - 라디오 버튼은 최소 두 개를 사용하며 한 쪽이 선택되어있는게 일반적이므로
 *    한 쪽에는 넣어줍시다.
 * 
 * @returns GrayRadioButton Component
 * 
 * 
 * @example 아래와 같이 묶어서 사용
 * 
   <div or Col(Bootstrap) or 무언가...>
        <GrayRadioButton id={"trryle_y"} label={"사용"} name={"trrule_yn"} checked={true} />
        <GrayRadioButton id={"trryle_n"} label={"사용안함"} name={"trrule_yn"} />
    </div or Col(Bootstrap) or 무언가...>

    div{
        display: flex;         >> 두 버튼을 나란히 
        align-items: center; >> 세로 중앙 정렬
    }
 */
export const GrayRadioButton = ({
    id,
    name,
    label,
    checked = false,
    reg,
    defaultValue = '',
}) => {
    return (
        <RadioItem>
            <Form.Check
                type="radio"
                label={label}
                name={name}
                id={id}
                {...reg}
                defaultChecked={checked}
                defaultValue={defaultValue}
            />
        </RadioItem>
    );
};

const RadioItem = styled.div`
    position: relative;
    height: 26px;

    & * {
        cursor: pointer;
    }

    & label {
        font-size: 14px;
    }

    & .form-check {
        padding: 0;
        margin-right: 15px;
    }

    & input[type='radio'] {
        display: none;
    }

    & label:before {
        content: '';
        display: inline-block;
        position: relative;
        top: 4px;
        margin: 0 5px 0 0;
        width: 16px;
        height: 16px;
        border-radius: 11px;
        background-color: gray;
    }

    & input[type='radio']:checked + label:after {
        border-radius: 9px;
        width: 8px;
        height: 8px;
        position: absolute;
        margin: -13px 0px 24px 4px;
        content: '';
        display: block;
        background: white;
    }
`;
