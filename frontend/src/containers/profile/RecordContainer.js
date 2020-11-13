import React, { useEffect, useState } from 'react';
import Record from '../../components/profile/Record';
import sampleData from '../../sampleData'

import { getAllRecord } from '../../lib/api/game'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const RecordContainer = () => {
  // 유저 정보 => redux
  const [records, setRecords] = useState([]);
  const { user } = useSelector(({user})=>({
    user: user.user
  }))
  const history = useHistory()
  console.log(user)
  useEffect(()=>{
    // 1. 레코드 받아오기
    if (!user) {
      alert("로그인이 필요합니다.")
      history.goBack()
      return
    }
    getAllRecord(user.id)
    .then((res) => {
      // 아래 코드 동작하는지 확인 요망
      setRecords(res.data)
    })
    .catch((err) => {
      const error = err.response
      if (error.status === 404 ){
        console.log("기록이 없습니다.")
      } else {
        console.log("에러가 발생했습니다.")
      }
    })

    // 아래는 목업데이터 => API로 변경해야함
    // setRecords(records.concat(sampleData.getRecords(20))) //n개의 데이터 생성
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
