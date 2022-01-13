import React from "react";
import "./login2.css";

function Login2() {
    return (
        <div className="container">
            <div className="col-12">
                <div className="row">
                    <div className="col-6">
                        <h2>
                            <b>SQLCanvas Trans Pilot</b>
                        </h2>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <div className="login">
                                <input type={"text"} placeholder="User ID" />
                                <input type={"password"} placeholder="Password" />
                                <div className="row">
                                    <div className="form-check-log ">
                                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                                        <label className="form-label-2" for="inlineCheckbox1">
                                            사용자 계정 저장
                                        </label>
                                    </div>
                                </div>
                                <button className="w-100 btn btn-lg btn-graygreen" type="submit">
                                    Login
                                </button>
                                <footer className="my-2 text-muted text-center text-small">
                                    <p className="mt-3 mb-3 copyright">Copyright(c)R2ware, All rights reserved. SQLCanvas Trans Pilot </p>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login2;
