import React from 'react';
import styled from 'styled-components';

const SummaryBlock = styled.div`
  margin-top: 3rem;
  width: 100%;
`;

const ResultTable = styled.table`
  table-layout: fixed;
  width: 60%;
  border-collapse: collapse;
  border: 1px solid black;
`;

const TableRow = styled.tr`
  margin: 0.5rem 0.75rem;
`;

const TableHead = styled.th`
  margin: 0.5rem 0.75rem;
`;

const TableData = styled.td`
  margin: 0.5rem 0.75rem;
`;

const GuideBlock = styled.div`
  margin-bottom: 3rem;
`;

const Summary = ({ point, end, accuracy }) => {
  return (
    <>
      <SummaryBlock>
        <h3>타자연습 Summary</h3>
        <ResultTable>
          <TableRow>
            <TableHead>소요시간</TableHead>
            <TableHead>정확도</TableHead>
            <TableHead>획득 점수</TableHead>
          </TableRow>
          <TableRow>
            <TableData>{end}초</TableData>
            <TableData>{accuracy}%</TableData>
            <TableData>{point}점</TableData>
          </TableRow>
        </ResultTable>
        <GuideBlock>
          <h5>점수 선정 방식</h5>
          <div>((1 - (틀린 문자 갯수 / 전체 코드 길이)) * 100)점</div>
        </GuideBlock>
      </SummaryBlock>
    </>
  );
};

export default Summary;
