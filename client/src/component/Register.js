import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';

const EXPRESS_URL = 'https://drama-review.run.goorm.io'

const FormHelperTexts = styled(FormHelperText)`
  width: 100% !important;
  padding-left: 16px !important;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Register() {
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const theme = createTheme();
  const [pw, setPw] = useState("");
  const [rePw, setrePw] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [idError, setIdError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const history = useHistory();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    
     // 이름 유효성 검사
    const nameRegex = /^[가-힣a-za-z]+$/;
    if (!nameRegex.test(name) || name.length < 1) {
      setNameError('올바른 이름을 입력해주세요.');
    } else {
      setNameError('');
    }
    
    // 아이디 유효성 검사
    const idRegex = /^(?=.*[a-za-z])(?=.*[0-9]).{5,20}$/;
    if (!idRegex.test(id)) {
      setIdError('숫자+영문자 조합으로 5자리 이상 입력해주세요!');
    } else {
      setIdError('');
    }

    // 비밀번호 유효성 검사
    const passwordRegex = /^(?=.*[a-za-z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    if (!passwordRegex.test(pw)) {
      setPasswordState('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
    } else {
      setPasswordState('');
    }

    // 비밀번호 같은지 검사
    if (pw !== rePw) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }
    
    // 이메일 유효성 검사
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-za-z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
    } else {
      setEmailError('');
    }
    
    
    if (!checked) alert('회원가입 약관에 동의해주세요.');
    if (nameRegex.test(name) &&
      idRegex.test(id) &&
			passwordRegex.test(pw) &&
			pw === rePw &&
      emailRegex.test(email) &&
			checked) {
      axios.post(EXPRESS_URL + '/api/create',{
      name : name,
      id : id,
      pw : pw,
      email : email
    }).then(function(response) {
        if (response.status === 200) {
          alert('회원가입 성공!!');
          history.push('/Home');
      }
      
    })
    .catch(function (err) {
      setRegisterError('회원가입에 실패하였습니다. 입력하신 정보를 확인해 주세요.');
    });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Boxs component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    id="name"
                    label="이름"
                    name="name"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    error={nameError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{nameError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="id"
                    label="아이디"
                    name="id"
                    onChange={(event) => {
                      setId(event.target.value);
                    }}
                    error={idError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{idError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="비밀번호"
                    type="password"
                    id="pw"
                    onChange={(event) => {
                      setPw(event.target.value);
                    }}
                    error={passwordState !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordState}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="rePassword"
                    label="비밀번호 재입력"
                    type="password"
                    id="rePassword"
                    onChange={(event) => {
                      setrePw(event.target.value);
                    }}
                    error={passwordError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    name="email"
                    label="이메일 주소"
                    type="email"
                    id="email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    error={emailError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{emailError}</FormHelperTexts>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox onChange={(event) => {
                      setChecked(event.target.checked);
                    }} color="primary" />}
                    label="회원가입 약관에 동의합니다."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                회원가입
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    이미 계정이 있으신가요?
                  </Link>
                </Grid>
              </Grid>
            </FormControl>
            <FormHelperTexts>{registerError}</FormHelperTexts>
          </Boxs>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};