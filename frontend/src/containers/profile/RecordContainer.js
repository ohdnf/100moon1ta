import React, { useEffect, useState } from 'react';
import Record from '../../components/profile/Record';

import { getAllRecord } from '../../lib/api/game'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const RecordContainer = () => {
  const [records, setRecords] = useState([]);
  const { user } = useSelector(({ user }) => ({
    user: user.user
  }))
  const history = useHistory()
  useEffect(() => {
    if (!user) {
      alert("로그인이 필요합니다.")
      history.goBack()
      return
    }
    getAllRecord(user.id)
    .then((res) => {
      setRecords(res.data)
    })
    .catch((err) => {
      const error = err.response;
      if (error?.status === 404 ){
        console.log("기록이 없습니다.")
      } else {
        console.log("에러가 발생했습니다.")
      }
    })
  }, [])

  return (
    <>
      {records.length === 0?
      <>
        <div>레코드가 없습니다.</div>
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
