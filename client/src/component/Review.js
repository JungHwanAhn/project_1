import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';
import Button from '@mui/material/Button';

const EXPRESS_URL = 'https://drama-review.run.goorm.io'

export default function Review() {
  const [reviewList, setReviewList] = useState([]);
  useEffect(() => {
    getReview()
  }, [])
  
  const getReview = async() => {
    try {
      const res = await axios.get(EXPRESS_URL + '/api/review')
      setReviewList(res.data)
    } catch(err) {
      console.log(err)
    }
  }
  
  return (
    <React.Fragment>
      <Title>리뷰 목록</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>제목</TableCell>
            <TableCell>장르</TableCell>
            <TableCell>별점</TableCell>
            <TableCell>댓글작성</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviewList.map((val, key) =>
              <TableRow key = {key}>
                <TableCell>{val.r_title}</TableCell>
                <TableCell>{val.r_genre}</TableCell>
                <TableCell>{val.r_score}</TableCell>
                <TableCell>
                  <Button variant="contained" href="/Write" size="small">
                    Go
                  </Button>
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </React.Fragment>
  );
}