import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { NormalButton, WhiteButton } from '../../../component/button/R2wButton';

function WorkSchCycle({ show, setShowCycle, parentHeight, cycle, setCycle }) {
    const [changePatternDetail, setChangePatternDetail] = useState();
    const [month, setMonth] = useState([]);
    const [day, setDay] = useState([]);
    const [week, setWeek] = useState([]);
    const [weekDay, setWeekDay] = useState([]);

    useEffect(() => {
        setMonth(cycle['month']);
        setDay(cycle['day']);
        setWeek(cycle['week']);
        setWeekDay(cycle['weekDay']);
        setChangePatternDetail(cycle['week'].length === 0 ? '0' : '1');
    }, [cycle]);

    const renderMonth = () => {
        const result = [];
        for (let i = 1; i <= 12; i++) {
            result.push(
                <PatternBtn key={i + '월'} className={month.includes(i) && 'on'} onClick={(e) => toggleBtn(e, i)} value="month">{`${i}월`}</PatternBtn>
            );
        }
        return result;
    };

    const renderDay = () => {
        const result = [];
        for (let i = 1; i <= 31; i++) {
            result.push(<PatternBtn key={i + '일'} className={day.includes(i) && 'on'} onClick={(e) => toggleBtn(e, i)} value={'day'}>{`${i}일`}</PatternBtn>);
        }
        return result;
    };

    const renderWeek = () => {
        const result = [];
        for (let i = 1; i <= 5; i++) {
            result.push(
                <PatternBtn key={i + '주'} className={week.includes(i) && 'on'} onClick={(e) => toggleBtn(e, i)} value={'week'}>{`${i}째주`}</PatternBtn>
            );
        }
        return result;
    };

    const renderWeekDay = () => {
        const result = [];
        const week = ['일', '월', '화', '수', '목', '금', '토'];

        for (let i = 0; i <= 6; i++) {
            result.push(
                <PatternBtn key={i + '요일'} className={weekDay.includes(i) && 'on'} onClick={(e) => toggleBtn(e, i)} value={'weekDay'}>
                    {week[i]}
                </PatternBtn>
            );
        }
        return result;
    };

    const toggleBtn = (e, num) => {
        const target = e.target;
        target.classList.toggle('on');
        if (target.classList.contains('on')) {
            target.value === 'month' && setMonth([...month.filter((m) => m !== num), num]);
            target.value === 'day' && setDay([...day.filter((d) => d !== num), num]);
            target.value === 'week' && setWeek([...week.filter((w) => w !== num), num]);
            target.value === 'weekDay' && setWeekDay([...weekDay.filter((wd) => wd !== num), num]);
        } else {
            target.value === 'month' && setMonth(month.filter((m) => m !== num));
            target.value === 'day' && setDay(day.filter((d) => d !== num));
            target.value === 'week' && setWeek(week.filter((w) => w !== num));
            target.value === 'weekDay' && setWeekDay(weekDay.filter((wd) => wd !== num));
        }
    };

    const numSort = (arr) => {
        return arr.sort((a, b) => a - b);
    };

    const savePattern = () => {
        if ((month.length === 0 || day.length === 0) && changePatternDetail === '0') {
            alert('스케줄 설정은 월, 일별을 선택해 주세요.');
            return;
        }
        if ((month.length === 0 || week.length === 0 || weekDay.length === 0) && changePatternDetail === '1') {
            alert('스케줄 설정은 월, 요일별을 선택해 주세요.');
            return;
        }

        changePatternDetail === '0'
            ? setCycle({ month: numSort(month), day: numSort(day), week: [], weekDay: [] })
            : setCycle({
                  month: numSort(month),
                  day: [],
                  week: numSort(week),
                  weekDay: numSort(weekDay),
              });

        setShowCycle(false);
    };

    return (
        <Modal show={show} onHide={setShowCycle} centered animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>스케줄 사용자 설정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CycleContainer height={`${parentHeight}px`}>
                    <Card>
                        <Card.Header>월별</Card.Header>
                        <Card.Body>{renderMonth()}</Card.Body>
                        <Card>
                            <Card.Header>
                                <Form.Select onChange={(e) => setChangePatternDetail(e.target.value)} value={changePatternDetail}>
                                    <option value="0">일별</option>
                                    <option value="1">요일별</option>
                                </Form.Select>
                            </Card.Header>
                            {changePatternDetail === '0' ? (
                                <Card.Body className="monthBtn">{renderDay()}</Card.Body>
                            ) : (
                                <>
                                    {/* <Card.Text>주간</Card.Text> */}
                                    <Card.Body className="weekBtn">{renderWeek()}</Card.Body>
                                    {/* <Card.Text>요일</Card.Text> */}
                                    <Card.Body className="weekDayBtn">{renderWeekDay()}</Card.Body>
                                </>
                            )}
                        </Card>
                    </Card>
                </CycleContainer>
            </Modal.Body>
            <Modal.Footer>
                <ButtonWrap>
                    <WhiteButton onClick={() => setShowCycle(false)}>닫기</WhiteButton>
                    <NormalButton
                        onClick={() => {
                            savePattern();
                        }}
                    >
                        등록
                    </NormalButton>
                </ButtonWrap>
            </Modal.Footer>
        </Modal>
    );
}
const CycleContainer = styled.div`
    height: ${(props) => props.height};

    & .card-body {
        display: flex;
        flex-wrap: wrap;
        gap: 8px 10px;
    }

    & select {
        width: 25%;
    }

    & input:not(input[type='radio']),
    & select {
        line-height: 1.313;
    }
    & .form-label {
        font-size: 14px;
        white-space: pre-line;
    }

    & .weekBtn button {
        width: 76px;
    }

    & .weekDayBtn button {
        width: 51px;
    }
`;

const PatternBtn = styled.button`
    width: 62px;
    box-shadow: none;
    text-align: center;
    height: 33px;
    transition: 0.15s;
    font-size: 0.875rem;
    padding: 0px 15px;
    color: #383838;
    background-color: #ffffff;
    border: 1px solid;
    border-color: #c4c4c4;
    border-radius: 3px;

    &:hover {
        background-color: #6c757d;
        color: white;
    }

    &.on {
        background-color: #6c757d;
        color: white;
    }

    &.off {
        background-color: white;
        color: #6c757d;
    }
`;

const ButtonWrap = styled.div`
    & button {
        height: 33px;
        margin-left: 15px;
    }
`;

export default WorkSchCycle;
