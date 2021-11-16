1. 전역 값 사용에 TodoContext 사용

-   Context = Context + Reducer + Value

2. const [value, setValue] = useState("");

-   {Object} [배열]

3. 날짜 표현법 (ie(X))

```
const today = new Date();

const dateString = today.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
});

const dayName = today.toLocaleString("ko-KR", { weekday: "long" });
```
