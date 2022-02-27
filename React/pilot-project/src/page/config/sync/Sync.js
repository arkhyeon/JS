import { AgGridColumn, AgGridReact } from "ag-grid-react";
import Axios from "axios";
import React, { useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { MdDeleteOutline, MdEditCalendar } from "react-icons/md";
import styled from "styled-components";
import { WhiteButton } from "../../../component/button/R2wButton";
import WorkSchedule from "./WorkSchedule";

function Main() {
  const [showSchedule, setShowSchedule] = useState();
  const [editSyncData, setEditSyncData] = useState();
  const mainGridRef = useRef();
  const subGridRef = useRef();

  const onGridReady = () => {
    getSyncMain();
    subGridRef.current.api.setRouwData([
      { system_name: "개발계", status: "성공" },
      { system_name: "계정계", status: "실패" },
    ]);
  };

  const getSyncMain = () => {
    Axios.get(process.env.REACT_APP_DB_HOST + "/SyncMain")
      .then((res) => {
        mainGridRef.current.api.setRowData(res.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  const getSyncSub = (id) => {
    Axios.get(process.env.REACT_APP_DB_HOST + "/SyncSub?main_id=" + id)
      .then((res) => {
        subGridRef.current.api.setRowData(res.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  const rowAddOn = (props) => {
    return (
      <div className="editWrap">
        <div className="editTitle">{props.value}</div>
        <div className="editIcon">
          <MdDeleteOutline
            onClick={() => {
              deleteRow(props);
            }}
          />
          <MdEditCalendar
            onClick={() => {
              setEditSyncData(props.node.data);
              setShowSchedule(true);
            }}
          />
        </div>
      </div>
    );
  };

  const deleteRow = (node) => {
    if (window.confirm(node.data.schName + "을 정말 삭제하시겠습니까?")) {
      Axios.delete(process.env.REACT_APP_DB_HOST + "/SyncMain/" + node.data.id)
        .then(() => {
          mainGridRef.current.api.updateRowData({ remove: [node.data] });
        })
        .catch((Error) => {
          alert(Error);
        });
    }
  };

  return (
    <SyncWrap>
      <Row>
        <Col Column sm={4}>
          <h3>테이블 동기화</h3>
        </Col>
        <Col sm={8}>
          <WhiteButton
            onClick={() => {
              setEditSyncData();
              setShowSchedule(true);
            }}
          >
            등록
          </WhiteButton>
        </Col>
      </Row>
      <SyncGridWrap className="ag-theme-alpine">
        {/* 스케줄 목록 */}
        <AgGridReact
          ref={mainGridRef}
          gridOptions={syncGridOption}
          onGridReady={onGridReady}
          onCellClicked={getSyncSub}
          defaultColDef={defaultColDef}
          frameworkComponents={{ rowAddOn }}
          rowHeight={35}
          headerHeight={40}
        />
      </SyncGridWrap>

      {/* 상세내역 */}
      <Row>
        <Col Column sm={12}>
          <DetailWrap>상세내역</DetailWrap>
        </Col>
      </Row>
      <SyncGridWrap className="ag-theme-alpine">
        <AgGridReact
          ref={subGridRef}
          rowData={"defaultValue"}
          gridOptions={syncDetailGridOption}
          defaultColDef={defaultColDef}
          overlayNoRowsTemplate={"해당 테이블은 상세 내역이 없습니다"}
          rowHeight={35}
          headerHeight={40}
        />
      </SyncGridWrap>
      {showSchedule && (
        <WorkSchedule
          show={showSchedule}
          setShowSchedule={setShowSchedule}
          editSyncData={editSyncData}
          getSyncMain={getSyncMain}
        />
      )}
    </SyncWrap>
  );
}

const a = styled.div`
    & hr{
        displa
    }
`;

const SyncWrap = styled.div`
  & hr {
    margin: 15px 0px;
  }
  & .row {
    align-items: center;
    margin-bottom: 15px;
    & .col-sm-4 {
      margin-top: 4px;
    }
    & button {
      height: 33px;
      float: right;
      margin-left: 7px;
    }

    & h3 {
      font-size: 1.2rem;
    }
  }
`;

const SyncGridWrap = styled.div`
  width: 100%;
  height: 339px;

  & .ag-react-container button {
    padding: 0px 5px;
  }
`;

const DetailWrap = styled.h3`
  margin-top: 15px;
`;

const patternFmt = (props) => {
  switch (props.value) {
    case "1":
      return "한번";
    case "2":
      return "매일";
    case "3":
      return "매주";
    case "4":
      return "매달";
    case "5":
      return "분기별";
    case "6":
      return "매년";
    case "7":
      return "사용자 지정";
    default:
      break;
  }
};

const defaultColDef = {
  suppressMenu: true,
  sortable: false,
  resizable: true,
};

const syncGridOption = {
  columnDefs: [
    {
      headerName: "스케줄명",
      field: "schName",
      cellRenderer: "rowAddOn",
    },
    {
      headerName: "스케줄 설명",
      field: "schDesc",
    },
    {
      headerName: "주기",
      field: "schPattern",
      valueFormatter: patternFmt,
    },
    {
      headerName: "시작 일시",
      field: "startDate",
      valueFormatter: (props) => {
        return props.value + " " + props.data.startTime;
      },
    },
    {
      headerName: "종료일",
      field: "endDate",
    },
    {
      headerName: "상태",
      field: "status",
    },
    {
      headerName: "결과",
      field: "result",
    },
    {
      headerName: "다음 시작 실행 일시",
      field: "next_run_dt",
    },
    {
      headerName: "마지막 실행 일시",
      field: "last_exe_dt",
    },
    {
      headerName: "id",
      field: "id",
      hide: true,
    },
  ],
};

const syncDetailGridOption = {
  columnDefs: [
    {
      headerName: "업무명",
      field: "system_name",
      filter: true,
    },
    {
      headerName: "소유자",
      field: "owner",
    },
    {
      headerName: "테이블",
      field: "table",
    },
    {
      headerName: "상태",
      field: "status",
    },
    {
      headerName: "Readl Size(MB)",
      field: "real_size",
    },
    {
      headerName: "Dev Size(MB)",
      field: "dev_size",
    },
    {
      headerName: "비고",
      field: "etc",
    },
    {
      headerName: "id",
      field: "id",
      hide: true,
    },
  ],
};

export default Main;
