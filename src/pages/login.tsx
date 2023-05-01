// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react';

// ** Next Imports
import Link from 'next/link';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';

// ** MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import MuiCard, { CardProps } from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';

// ** Configs
import themeConfig from 'src/configs/themeConfig';

// ** Layout Import
import BlankLayout from 'src/helpers/layout/BlankLayout';

// ** Demo Imports
import { IDataOpenAlert, useStatusAlert } from 'src/stores/useStatusAlert';
import { AlertColorEnum, USER_INFO } from 'src/helpers/constants';
import { login } from 'src/helpers/utils/api/auth';
import { LoginDataResponse } from 'src/helpers/constants/api/auth.interface';

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' },
}));

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main,
}));

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
  },
}));

const LoginPage = () => {
  const [update] = useStatusAlert((state: IDataOpenAlert) => [state.update]);

  // ** State
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    showPassword: false,
  });

  // ** Hook
  const router = useRouter();

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();

      const { success, message, data } = (await login(values)) as LoginDataResponse;

      if (success) {
        router.push('/');
        setCookie(USER_INFO, JSON.stringify(data));
        update({ message: 'Welcome to the page', severity: AlertColorEnum.SUCCESS, open: true });
      } else {
        update({ message, severity: AlertColorEnum.ERROR, open: true });
      }
    } catch (error) {
      update({
        message: 'Something went wrong',
        severity: AlertColorEnum.ERROR,
        open: true,
      });
    }
  };

  return (
    <Box
      className="content-center"
      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
    >
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: (theme) => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant="h6"
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important',
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to {themeConfig.templateName}! 👋🏻
            </Typography>
            <Typography variant="body2">
              Please sign-in to your account and start the adventure
            </Typography>
          </Box>
          <form noValidate autoComplete="off" onSubmit={handleLogin}>
            <TextField
              autoFocus
              fullWidth
              id="email"
              label="Email"
              sx={{ marginBottom: 4 }}
              value={values.email}
              onChange={handleChange('email')}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="auth-login-password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                value={values.password}
                id="auth-login-password"
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label="toggle password visibility"
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <FormControlLabel control={<Checkbox />} label="Remember Me" />
              <Link passHref href="/">
                <LinkStyled onClick={(e) => e.preventDefault()}>Forgot Password?</LinkStyled>
              </Link>
            </Box>
            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{ marginBottom: 7 }}
              type="submit"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default LoginPage;