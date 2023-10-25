import React, { useState } from "react";

const RegisterAccount = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [sex, setSex] = useState(1);


    //Error variables
    const [errorUserName, setErrorUserName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorRepeatPassword, setErrorRepeatPassword] = useState("");
    const [thongBao, setThongBao] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        setErrorUserName('');
        setErrorEmail('');
        setErrorPassword('');
        setErrorRepeatPassword('');

        e.preventDefault();

        const isUsernameValid = !await checkUsernameExist(userName);
        const isEmailValid = !await checkEmailExist(email);
        const isPasswordvalid = !await checkPassword(password);
        const isRepeatPasswordValid = !await checkRepeatPassword(repeatPassword);

        if (isUsernameValid && isEmailValid && isPasswordvalid && isRepeatPasswordValid) {
            try {
                const url = 'http://localhost:8080/api/account/register';

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        userName: userName,
                        email: email,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                        phoneNumber: phoneNumber
                    })
                }
                );

                if (response.ok) {
                    setThongBao("Đăng ký thành công, vui lòng kiểm tra email để kích hoạt!")
                } else {
                    console.log(response.text());
                    setThongBao("Đã xảy ra lỗi trong quá trình đăng ký tài khoản!")
                }
            } catch (error) {
                setThongBao("Đã xảy ra lỗi trong quá trình đăng ký tài khoản!")
            }
        }
    }
    const checkUsernameExist = async (userName: string) => {
        const url = `http://localhost:8080/users/search/existsByUserName?userName=${userName}`;
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === 'true') {
                setErrorUserName("Tên đăng nhập đã tồn tại");
                return true;
            }
            return false;
        } catch (error) {

        }
    }
    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);

        setErrorUserName("");
        return checkUsernameExist(e.target.value);

    }

    const checkEmailExist = async (email: string) => {
        const url = `http://localhost:8080/users/search/existsByEmail?email=${email}`;
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === 'true') {
                setErrorEmail("Email đã tồn tại");
                return true;
            }
            return false;
        } catch (error) {

        }
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);

        setErrorEmail("");
        return checkEmailExist(e.target.value);

    }
    const checkPassword = (password: string) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setErrorPassword("Mật khẩu phải có ít nhất 8 ký tự và bao gồm ít nhất 1 ký tự đặc biệt (!@#$%^&*)");
            return true;
        } else {
            setErrorPassword("");
            return false;
        }
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setErrorPassword("");
        return checkPassword(e.target.value);

    }
    const checkRepeatPassword = (repeatPassword: string) => {
        if (repeatPassword !== password) {
            setErrorRepeatPassword("Mật khẩu không trùng khớp!")
            return true;
        } else {
            setErrorRepeatPassword("");
            return false;
        }
    }
    const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.target.value);
        setErrorRepeatPassword("");
        return checkRepeatPassword(e.target.value);

    }

    return (
        <div className="container">
            <h1 className="mt-5 text-center">Đăng ký</h1>
            <div className="mb-3 col-md-6 col-12 mx-auto">
                <form onSubmit={handleSubmit} className="form">
                    <div className="mb-3">
                        <label htmlFor="username"
                            className="form-label"
                        >Tên đăng nhập</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            value={userName}
                            onChange={handleUserNameChange}
                        />
                        <div style={{ color: "red" }}>{errorUserName}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="text"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <div style={{ color: "red" }}>{errorEmail}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <div style={{ color: "red" }}>{errorPassword}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mật khẩu lặp lại</label>
                        <input
                            type="password"
                            id="password-repeat"
                            className="form-control"
                            value={repeatPassword}
                            onChange={handleRepeatPasswordChange}
                        />
                        <div style={{ color: "red" }}>{errorRepeatPassword}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="firstname" className="form-label">Họ đệm</label>
                        <input
                            type="text"
                            id="firstname"
                            className="form-control"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastname" className="form-label">Tên</label>
                        <input
                            type="text"
                            id="lastname"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Số điện thoại</label>
                        <input
                            type="text"
                            id="phone"
                            className="form-control"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-primary col-md-3"
                        >Đăng ký</button>

                        <div style={{ color: "green" }}>{thongBao}</div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterAccount;