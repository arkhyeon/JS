```
1. index.js

-   BrowserRouter 선언
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,

2. App.js
- Route는 Routes의 직속 자식 필수
- elemental로 값 전달
- exact는 기본 설정
- path="test/:id"
- 중첩 경로
    <Route path="invoices" element={<Invoices />}>
        <Route path=":invoiceId" element={<Invoice />} />
        <Route path="sent" element={<SentInvoices />} />
    </Route>

    <Outlet />

    "/invoices"
    "/invoices/sent"
    "/invoices/:invoiceId"
- 인덱스 경로
    <Route path="/" element={<Layout />}>
        <Route index element={<Activity />}>
        <Route path="invoices" element={<Invoices />} />
        <Route path="activity" element={<Activity />} />
      </Route>
 - *
 불분명 경로에 따른 에러 페이지 처리
 <Route path="*" element={<NotFound />} />
3. Home.js
 - 브라우저의 주소만 바꿀 뿐, 페이지를 새로 불러오지는 않음.

4. Optional.js
   import { useParams } from "react-router";
 - useParams() path의 parameter 정보

5. Post.js
 - useNavigate()
 - navigate("/path") -1 뒤 -2 두번 뒤
 - navigate(`/posts/${parseInt(id) + 1}`);
```
