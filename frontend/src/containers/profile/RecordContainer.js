import React, { useEffect, useState } from 'react';
import Record from '../../components/profile/Record';
import sampleData from '../../sampleData'


const RecordContainer = () => {
  // 유저 정보 => redux
  const [records, setRecords] = useState([]);
  useEffect(()=>{
    // 1. 레코드 받아오기
    // 아래는 목업데이터 => API로 변경해야함
    setRecords(records.concat(sampleData.getRecords(20))) //n개의 데이터 생성
  }, [])
  
  console.log(records)   
  return (
    <>
      {records.length === 0?
      <>
        <div>레코드가 없져...</div>
      </>
      :
      <>
        <Record records={records}/>
      </>
      }
    </>
  )

};

export default RecordContainer;
