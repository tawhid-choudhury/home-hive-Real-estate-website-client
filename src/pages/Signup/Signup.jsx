import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Avatar, Button, Card, CardContent, Container, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { motion } from "framer-motion"
import { useContext, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { imageUpload } from "../../api/utils";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});



const Signup = () => {
    const [name, setName] = useState('');
    const [nameOk, setNameOk] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordOk, setPasswordOk] = useState(true);
    const [email, setEmail] = useState('');
    const [emailOk, setEmailOk] = useState(true);
    const [image, setImage] = useState(null);
    const [imageOk, setImageOk] = useState(true);
    const [imagePreview, setImagePreview] = useState(null);

    const { googleSignin, signUpEmailPass, updateNamePhoto, setLoading, user } = useContext(AuthContext);
    const nav = useNavigate();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        if (e.target.files) {
            setImageOk(true);
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        // eslint-disable-next-line no-useless-escape
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{6,}$/;
        setPasswordOk(passwordRegex.test(e.target.value));
        if (!e.target.value) {
            setPasswordOk(true);
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (e.target.value) {
            setNameOk(true);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setEmailOk(emailRegex.test(e.target.value));
        if (!e.target.value) {
            setEmailOk(true);
        }
    };

    const handleSubmit = async (e) => {
        // console.log(name, password, email);
        e.preventDefault();
        if (!name || !nameOk) {
            setNameOk(false);
            return
        }
        if (!image || !imageOk) {
            setImageOk(false);
            return
        }
        if (!email || !emailOk) {
            setEmailOk(false);
            return
        }
        if (!password || !passwordOk) {
            setPasswordOk(false);
            return
        }

        console.log(image);
        try {
            const imageData = await imageUpload(image)
            console.log(imageData);
            const result = await signUpEmailPass(email, password)
            console.log(result);
            await updateNamePhoto(name, imageData?.data?.display_url)
            console.log(result);
        } catch (err) {
            console.error(err);
        }
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <motion.div className=" bg-cover min-h-[100vh] flex flex-col justify-center
            bg-gradient-to-bl  from-[#032e4b] from-40% via-emerald-800  to-[#032e4b] animate-gradient
            ">
                <Container maxWidth="xl" sx={{ alignItems: "center", justifyContent: "center" }}>
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12} sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                            <Typography color={'white'} variant="h2">
                                Create an account
                            </Typography>
                        </Grid>
                        <Grid item md={6} xs={12} sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                            <Card sx={{ width: "90%" }}>
                                <CardContent>
                                    <form
                                        onSubmit={handleSubmit}
                                        style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center' }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        {image ?
                                            <Avatar
                                                alt=""
                                                src={imagePreview}
                                                sx={{ width: 150, height: 150, mb: 2 }}
                                            />
                                            : <AccountCircleIcon color="primary" sx={{ width: 150, height: 150 }} />
                                        }

                                        <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
                                            Upload Image
                                            <VisuallyHiddenInput type="file" onChange={handleImageChange} />
                                        </Button>
                                        {!imageOk &&
                                            <Alert severity="error">Please upload an image</Alert>
                                        }
                                        <TextField
                                            onChange={handleNameChange}
                                            sx={{ mt: 3 }}
                                            required id="UserName"
                                            label="User Name"
                                            variant="standard"
                                            fullWidth
                                            error={!nameOk}
                                        />
                                        {!nameOk &&
                                            <Alert sx={{ width: "100%" }} severity="error">Enter your username</Alert>
                                        }
                                        <TextField
                                            sx={{ mt: 3 }}
                                            onChange={handleEmailChange}
                                            required id="Email"
                                            label="Email"
                                            type="email"
                                            variant="standard"
                                            fullWidth
                                            error={!emailOk}
                                        />
                                        {!emailOk ?
                                            <Alert sx={{ width: "100%" }} severity="error">Not a valid email</Alert>
                                            :
                                            email && <Alert sx={{ width: "100%" }} severity="success">Valid email</Alert>
                                        }
                                        <FormControl
                                            sx={{ width: "100%", my: 3 }}
                                            variant="standard"
                                            required
                                            error={!passwordOk}
                                        >
                                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                            <Input
                                                onChange={handlePasswordChange}
                                                id="standard-adornment-password"
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                            {!passwordOk ?
                                                <Alert severity="error">Password does not meet minimum requirements</Alert>
                                                :
                                                password && <Alert severity="success">Valid password</Alert>
                                            }
                                        </FormControl>
                                        <Button
                                            sx={{ my: 3 }}
                                            type="submit"
                                            variant="contained"
                                            fullWidth

                                        >Create Account</Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </motion.div>
        </div>
    );
};

export default Signup;