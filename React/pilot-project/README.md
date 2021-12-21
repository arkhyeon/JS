# 설치 npm 정보

1.  yarn add polished
2.  yarn add react-router-dom
3.  yarn add styled-components
4.  yarn add react-icons (if you use icon)

# 파일

CreateMenu.js

# 기본 구조

1.  BrowserRouter, ThemeProvider 설정

-   ThemeProvider Menu Color = theme.color(배경색) / theme.fontColor(글자색)

2.  HTML
<div>
    <h1>SQLCanvas Trans</h1>
    <R2wCreateMenu menus={[Array]} color={"#0b2444"} />
    <ul>
        <li>로그인 정보</li>
        <li>설정</li>
    </ul>
</div>
3.  reset CSS
    -   {
        margin: 0;
        padding: 0;
        list-style: none;
        text-decoration: none;
        }

# 객체 단위

src > utils > DepthMenu.js 확인
