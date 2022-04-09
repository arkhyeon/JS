# React

- **`기본 규칙[Fragment, className, style]`**
    
    ```jsx
    /**
     * 꼭 감싸져야하는 태그
     * 두가지 이상의 태그는 무조건 하나의 태그로 감싸져있어야 한다.
     * 불필요한 태그를 사용하지 않고 Fragment로 감싸줄 수 있다.
     * 해당 태그는 화면에 나타나지 않는다.
     * <></> Fragment
     * <>
     * <div>
     *      <div></div>
     *      <Hello/>
     * </div>
     * </>
     *
     */
    
    import Hello from "./Hello";
    import "./App.css";
    
    function App() {
        const name = "React";
        const style = {
            backgroundColor: "black",
            color: "aqua",
            fontSize: 24,
            padding: "1rem",
        };
    
        return (
            <>
                {/**주석 처리 */}
                <div className="App">
                    <Hello />
                    <Hello />
                    <Hello />
                    <Hello />
                </div>
                <Hello />
                <div className="gray-box" style={style}>
                    {name}
                </div>
            </>
        );
    }
    
    export default App;
    ```
    

<></>, class, style 작성법

- **`Props`**
    1. 구조할당
    
    ```jsx
    function Hello(props) {
      return <div>안녕하세요 {props.name}</div>
    }
    ```
    
    1. 비구조할당
    
    ```jsx
    function Hello({ color, name }) {
      return <div style={{ color }}>안녕하세요 {name}</div>
    }
    ```
    
    1. 기본값할당
    
    ```jsx
    function Hello({ color, name }) {
      return <div style={{ color }}>안녕하세요 {name}</div>
    }
    
    Hello.defaultProps = {
      name: '이름없음'
    }
    ```
    
    1. children(내부 내용 렌더링)
    
    ```jsx
    function Wrapper({ children }) {
      const style = {
        border: '2px solid black',
        padding: '16px',
      };
      return (
        <div style={style}>
          {children}
        </div>
      )
    }
    /**
    		<Wrapper>
          <Hello name="react" color="red"/>
          <Hello color="pink"/>
        </Wrapper>
    */
    ```
    
    1. props 값 생략 ={true}
    
    ```jsx
    <Wrapper>
        <Hello name="react" color="red" isSpecial />
        <Hello color="pink"/>
    </Wrapper>
    ```
    

값을 컴포넌트에게 전달할 때, properties를 사용

- `useState(number [값], setNumber [상태 변화 체크 함수])`
    
    ```jsx
    /**
     * 기존 객체를 복사하여 새로운 객체에 업데이트하는 것을 "불변성을 지킨다" 는 것이다.
    
    불변성을 지켜야 리액트가 컴포넌트의 상태 업데이트를 감지할 수 있고 
    
    필요한 부분만을 리렌더링 할 수 있기 때문이다.
    
    기존 상태를 직접 수정하는 경우 리렌더링이 되지 않는다.
     */
    
    import React, { useState } from "react";
    
    function InputSample() {
    		//const arr = {id : 1} id 변경 가능
    		//어떤 명을 적어도 상관이 없음
    		//useState(inputs Setting)
        const [inputs, setInputs] = useState({
            name: "",
            nickname: "",
        });
        const { name, nickname } = inputs;
    
        const onChange = (e) => {
            const { name, value } = e.target;
            setInputs({ ...inputs, [name]: value });
        };
    
        const onReset = () => {
            setInputs({
                name: "",
                nickname: "",
            });
        };
    
        return (
            <div>
                <input
                    name="name"
                    placeholder="이름"
                    onChange={onChange}
                    value={name}
                />
                <input
                    name="nickname"
                    placeholder="닉네임"
                    onChange={onChange}
                    value={nickname}
                />
                <button onClick={onReset}>초기화</button>
                <div>
                    <b>값: </b>
                    {name} ({nickname})
                </div>
            </div>
        );
    }
    
    export default InputSample;
    ```
    

상태 관리 함수형 컴포넌트

- **`useRef(DOM 접근자)`**
    
    ```jsx
    		const nameInput = useRef();
    
        const onReset = () => {
            setInputs({
                name: "",
                nickname: "",
            });
    				//Dom 접근
            nameInput.current.focus();
        };
    
    //선택자
    <input ref={nameInput}/>
    ```
    
- **`배열 렌더링`**
    
    ```jsx
    function User({ user }) {
        return (
            <div>
                <b>{user.username}</b>
                <span>({user.email})</span>
            </div>
        );
    }
    
    function UserList() {
        const users = [
            {
                id: 1,
                username: "bang",
                email: "arkhyeon@naver.com",
            },
            {
                id: 2,
                username: "test",
                email: "test@naver.com",
            },
            {
                id: 3,
                username: "admin",
                email: "admin@naver.com",
            },
        ];
    
        return (
            <div>
                {users.map((user) => (
                    //key: 누구랑 연결되어 있는지(효율적 렌더링)
                    <User user={user} key={user.id} />
                ))}
            </div>
        );
    }
    
    export default UserList;
    ```
    
- **`예제(추가, 수정, 삭제, Key)`**
    1. User Register Component
    
    ```jsx
    function CreateUser({ username, email, onChange, onCreate }) {
        return (
            <div>
                <input
                    name="username"
                    placeholder="계정명"
                    onChange={onChange}
                    value={username}
                />
                <input
                    name="email"
                    placeholder="이메일"
                    onChange={onChange}
                    value={email}
                />
                <button onClick={onCreate}>등록</button>
            </div>
        );
    }
    ```
    
    1.  App(View / MainFunction)
    
    ```jsx
    function App() {
        const [inputs, setInputs] = useState({
            username: "",
            email: "",
        });
    		//비구조화 할당
        const { username, email } = inputs;
        const onChange = (e) => {
    				//변화 감지
            const { name, value } = e.target;
    				//변화가 감지되면 name value 변경
            setInputs({
                ...inputs,
                [name]: value,
            });
        };
        const [users, setUsers] = useState([
            {
                id: 1,
                username: "bang",
                email: "arkhyeon@naver.com",
                active: true,
            },
            {
                id: 2,
                username: "test",
                email: "test@naver.com",
                active: false,
            },
            {
                id: 3,
                username: "admin",
                email: "admin@naver.com",
                active: false,
            },
        ]);
    		//3번까지 있으니 4번 부터
        const nextId = useRef(4);
    		
        const onCreate = () => {
            const user = {
                id: nextId.current,
                username,
                email,
                //...inputs 동일
            };
            // setUsers([...users, user]);
            setUsers(users.concat(user));
            setInputs({
                username: "",
                email: "",
            });
            nextId.current++;
        };
    
        const onRemove = (id) => {
            setUsers(users.filter((user) => user.id !== id));
        };
    
        const onToggle = (id) => {
            setUsers(
                users.map((user) =>
                    user.id === id ? { ...user, active: !user.active } : user
                )
            );
        };
    
        return (
            <>
                <CreateUser
                    username={username}
                    email={email}
                    onChange={onChange}
                    onCreate={onCreate}
                />
                <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
                <Counter />
                <InputSample />
            </>
        );
    }
    ```
    
    1. UserList View Component
    
    ```jsx
    function User({ user, onRemove, onToggle }) {
        const { username, email, id, active } = user;
        return (
            <div>
                <b
                    style={{ color: active ? "green" : "black", cursor: "pointer" }}
                    onClick={() => onToggle(id)}
                >
                    {username}
                </b>
                &nbsp;
                <span>({email})</span>
                <button onClick={() => onRemove(id)}>삭제</button>
            </div>
        );
    }
    
    function UserList({ users, onRemove, onToggle }) {
        return (
            <div>
                {users.map((user) => (
                    //key: 누구랑 연결되어 있는지(효율적 렌더링)
                    <User
                        user={user}
                        key={user.id}
                        onRemove={onRemove}
                        onToggle={onToggle}
                    />
                ))}
            </div>
        );
    }
    ```
    
- **`useEffect(함수, 배열)`**
    
    ```jsx
    const { username, email, id, active } = user;
    
        //특정 값이 update된 이후 나타남.(mount)
        //부모 컴포넌트가 리렌더링되면 자식 컴포넌트도 리렌더링 됨.
        useEffect(() => {
            console.log(user);
            //뒷정리 함수 업데이트되기 직전에 호출 됨.(unMount)
            return () => {
                console.log(user);
            };
        }, [user]);
    /**
     *deps에 빈배열: 처음에만 함수 호출
     *deps에 의존값 존재 : 처음과 지정값이 변경될 때 호출
     *deps가 아예 없는 경우 : 컴포넌트가 리렌더링 될 때마다 호출
    */
    ```
    

컴포넌트가 마운트 (처음 나타났을 때), 언마운트 (사라질 때), 업데이트  (특정 props가 바뀔 때) 특정 작업을 처리하는 방법

- **useMemo(함수, 배열)**
    
    ```jsx
    function countActiveUsers(users) {
        console.log("활성 사용자 수를 세는중...");
        return users.filter((user) => user.active).length;
    }
    
    const count = useMemo(() => countActiveUsers(users), [users]);
    ```
    

성능 최적화를 위하여 연산된 값을 Hook을 사용하여 재사용

- **`useCallback()`**
    
    ```jsx
    //useCallback : 특정 함수 재사용
    //useMemo: 특정 결과값 재사용
    //deps 배열에 꼭 포함되야 하는 것: 함수 안에서 사용하는 상태 혹은 props
    
    const onCreate = useCallback(() => {
            const user = {
                id: nextId.current,
                username,
                email,
                //...inputs 동일
            };
            // setUsers([...users, user]);
            setUsers((users) => users.concat(user));
            setInputs({
                username: "",
                email: "",
            });
            nextId.current++;
        }, [email, username]);
    ```
    

특정 함수 재사용

- **`React.memo`**
    
    ```jsx
    export default React.memo(CreateUser);
    ```
    

컴포넌트 props 가 안바꼈다면, 리렌더링 방지하여 리렌더링 성능 최적화

- **`useReducer`**
    
    ```jsx
    //상태 업데이트 간단은 userState, 아니면 useReducer 사용
    //useState 의 setState 함수를 여러번 사용하지 않아도 된다
    //리듀서로 로직을 분리 쉽게 재사용을 할 수 있다.
    function reducer(state, action) {
        switch (action.type) {
            case "INCREMENT":
                return state + 1;
            case "DECREMENT":
                return state - 1;
            default:
                return state;
        }
    }
    
    function Counter() {
        //현재상태, 액션을 발생시킨다.
        const [number, dispatch] = useReducer(reducer, 0);
        const onIncrease = () => {
            dispatch({
                type: "INCREMENT",
            });
        };
        const onDecrease = () => {
            dispatch({
                type: "DECREMENT",
            });
        };
        // const [number, setNumber] = useState(0);
        // const onIncrease = () => {
        //     setNumber(number + 1);
        // };
    
        // const onDecrease = () => {
        //     setNumber(number - 1);
        // };
        return (
            <div>
                <h1>{number}</h1>
                <button onClick={onIncrease}>+1</button>
                <button onClick={onDecrease}>-1</button>
            </div>
        );
    }
    
    export default Counter;
    ```
    

상태 업데이트 간단은 useState, 아니면 useReducer 사용

- **`Custom Hooks`**
    
    ```jsx
    커스텀 Hooks `use` 라는 키워드 사용 함수를 작성
    useState, useEffect, useReducer, useCallback 등 
    Hooks를 사용 원하는 기능 구현, 컴포넌트에서 사용하고 싶은 값 반환
    
    //main
    const [form, onChange, reset] = useInputs({ username: "", email: "" });
    const { username, email } = form;
    
    //Custom Hooks
    function reducer(state, action) {
        //Change
        switch (action.type) {
            case "CHANGE":
                return {
                    ...state,
                    [action.name]: action.value,
                };
        //Reset
            case "RESET":
                return Object.keys(state).reduce((acc, current) => {
                    acc[current] = "";
                    return acc;
                }, {});
            default:
                return state;
        }
    }
    //useReducer
    function useInputs(initialForm) {
        const [form, dispatch] = useReducer(reducer, initialForm);
    
        const onChange = useCallback((e) => {
            const { name, value } = e.target;
            dispatch({
                type: "CHANGE",
                name: name,
                value: value,
            });
        }, []);
    
        const reset = useCallback(() => dispatch({ type: "RESET" }), []);
    
        return [form, onChange, reset];
    }
    
    //useState
    // function useInputs(initialForm) {
    //     const [form, setForm] = useState(initialForm);
    //     // change
    //     const onChange = useCallback((e) => {
    //         const { name, value } = e.target;
    //         setForm((form) => ({ ...form, [name]: value }));
    //     }, []);
    //     const reset = useCallback(() => setForm(initialForm), [initialForm]);
    //     return [form, onChange, reset];
    // }
    ```
    
    ```jsx
    Custom Hook
    
    function reducer(state, action) {
      switch (action.type) {
        case 'LOADING':
          return {
            loading: true,
            data: null,
            error: null
          };
        case 'SUCCESS':
          return {
            loading: false,
            data: action.data,
            error: null
          };
        case 'ERROR':
          return {
            loading: false,
            data: null,
            error: action.error
          };
        default:
          throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
    
    function useAsync(callback, deps = [], skip = false) {
      const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: false
      });
    
      const fetchData = async () => {
        dispatch({ type: 'LOADING' });
        try {
          const data = await callback();
          dispatch({ type: 'SUCCESS', data });
        } catch (e) {
          dispatch({ type: 'ERROR', error: e });
        }
      };
    
      useEffect(() => {
    //스킵
        if (skip) return;
        fetchData();
      }, deps);
    
      return [state, fetchData];
    }
    
    export default useAsync;
    ```
    
- **`ContextAPI`**
    
    ```jsx
    1. 호출
    //Provider는 context의 변화를 알리는 역할
    //defaultValue는 Provider를 찾지 못했을 때만 쓰이는 값
    const MyContext = createContext("defaultValue");
    
    function Child() {
        const text = useContext(MyContext);
        return <div>안녕하세요 {text}</div>;
    }
    
    function Parent() {
        return <Child />;
    }
    
    function GrandParent() {
        return (
            <>
                <Parent /> <Child />
            </>
        );
    }
    
    function ContextSample() {
        const [value, setValue] = useState(true);
        return (
            <MyContext.Provider value={value ? "Good" : "Bad"}>
                <GrandParent />
                <button onClick={() => setValue(!value)}>Click Me!</button>
            </MyContext.Provider>
        );
    }
    
    //main
    export const UserDispatch = createContext(null);
    
    <UserDispatch.Provider value={dispatch}>
    </UserDispatch.Provider>
    
    //sub
    const dispatch = useContext(UserDispatch);
    
    const onCreate = useCallback(() => {
            dispatch({
                type: "CREATE_USER",
                user: {
                    id: nextId.current,
                    username,
                    email,
                },
            });
            nextId.current++;
            reset();
            nameInput.current.focus();
        }, [dispatch, username, email, reset]);
    ```
    
    ```jsx
    // UsersContext 에서 사용 할 기본 상태
    const initialState = {
      users: {
        loading: false,
        data: null,
        error: null
      },
      user: {
        loading: false,
        data: null,
        error: null
      }
    };
    
    // 로딩중일 때 바뀔 상태 객체
    const loadingState = {
      loading: true,
      data: null,
      error: null
    };
    
    // 성공했을 때의 상태 만들어주는 함수
    const success = data => ({
      loading: false,
      data,
      error: null
    });
    
    // 실패했을 때의 상태 만들어주는 함수
    const error = error => ({
      loading: false,
      data: null,
      error: error
    });
    
    // 위에서 만든 객체 / 유틸 함수들을 사용하여 리듀서 작성
    function usersReducer(state, action) {
      switch (action.type) {
        case 'GET_USERS':
          return {
            ...state,
            users: loadingState
          };
        case 'GET_USERS_SUCCESS':
          return {
            ...state,
            users: success(action.data)
          };
        case 'GET_USERS_ERROR':
          return {
            ...state,
            users: error(action.error)
          };
        case 'GET_USER':
          return {
            ...state,
            user: loadingState
          };
        case 'GET_USER_SUCCESS':
          return {
            ...state,
            user: success(action.data)
          };
        case 'GET_USER_ERROR':
          return {
            ...state,
            user: error(action.error)
          };
        default:
          throw new Error(`Unhanded action type: ${action.type}`);
      }
    }
    
    // State 용 Context 와 Dispatch 용 Context 따로 만들어주기
    const UsersStateContext = createContext(null);
    const UsersDispatchContext = createContext(null);
    
    // 위에서 선언한 두가지 Context 들의 Provider 로 감싸주는 컴포넌트
    export function UsersProvider({ children }) {
      const [state, dispatch] = useReducer(usersReducer, initialState);
      return (
        <UsersStateContext.Provider value={state}>
          <UsersDispatchContext.Provider value={dispatch}>
            {children}
          </UsersDispatchContext.Provider>
        </UsersStateContext.Provider>
      );
    }
    
    // State 를 쉽게 조회 할 수 있게 해주는 커스텀 Hook
    export function useUsersState() {
      const state = useContext(UsersStateContext);
      if (!state) {
        throw new Error('Cannot find UsersProvider');
      }
      return state;
    }
    
    // Dispatch 를 쉽게 사용 할 수 있게 해주는 커스텀 Hook
    export function useUsersDispatch() {
      const dispatch = useContext(UsersDispatchContext);
      if (!dispatch) {
        throw new Error('Cannot find UsersProvider');
      }
      return dispatch;
    }
    ```
    

프로젝트 내 전역값 관리

- `immer`
    
    ```jsx
    #yarn immer
    
    case "CREATE_USER":
          //immer
          return produce(state, (draft) => {
              draft.users.push(action.user);
          });
      //Common
      // return {
      //     inputs: initialState.inputs,
      //     users: state.users.concat(action.user),
      // };
    case "TOGGLE_USER":
          //immer
          return produce(state, (draft) => {
              const user = draft.users.find((user) => user.id === action.id);
              user.active = !user.active;
          });
      //Common
      // return {
      //     ...state,
      //     users: state.users.map((user) =>
      //         user.id === action.id
      //             ? { ...user, active: !user.active }
      //             : user
      //     ),
      // };
    
    5만개의 데이터 기준 기존의 방식이 6ms immer 방식이 31ms지만 
    큰 차이 없으니 편한대로 사용
    그러나 es5에서는 기존의 방식 사용할 것 immer(es5)는 조금 느림
    ```
    

불변성 해치는 코드여도 대신 불변성을 지켜준다.

- `Route`
    
    ```jsx
    import { Link, Routes, Route } from "react-router-dom";
    //Link 사용법
    <ul>
        <li>
            <Link to="/">home</Link>
        </li>
        <li>
            <Link to="/about">about</Link>
        </li>
    </ul>
    //Route 사용법
    //Element React내에서 DOM node를 가리키는데 사용
    //Component Function, Class이며 state 보유
    <BrowserRouter>
    	<Routes>
    	    <Route path="/" element={<Login />} exact />
    	</Routes>
    </BrowserRouter>
    ```
    
- `Redux`
    
    ```jsx
    1. 액션 (Action)
    상태에 변화가 필요할 때 발생시킴 (객체하나로 표현)
    type을 필수로 그외의 값들은 개발자 마음대로 생성
    
    2. 액션 생성함수 (Action Creator)
    컴포넌트에서 더욱 쉽게 액션을 발생시키기 위함
    필수 아님
    
    3. 리듀서 (Reducer)
    변화를 일으키는 함수
    현재의 상태와 액션을 참조하여 새로운 상태를 반환
    
    4. 스토어 (Store)
    한 애플리케이션당 하나의 스토어
    현재의 앱 상태와, 리듀서, 내장함수 포함
    
    5. 디스패치 (dispatch)
    스토어의 내장함수
    액션을 발생 시키는 것
    
    6. 구독 (subscribe)
    스토어의 내장함수
    subscribe 함수에 특정 함수를 전달해주면, 액션이 디스패치 되었을 때 마다 전달해준 함수가 호출
    (리액트에서는 connect 함수 또는 useSelector Hook 을 사용)
    ```
    
- `Redux Thunk`
    
    ```jsx
    액션 객체가 아닌 함수를 디스패치
     - 디스패치 : 스토어의 내장 함수 중 하나인 리듀서에게 액션을 발생하라고 시키는 것
    ```
    

```jsx
Hooks : 16.8패치 이후 나타난 useState, useEffect...등
				해당 패치로 상태 관리 등을 간단하게 사용 가능
```

[SCSS](https://www.notion.so/SCSS-7ece629561944f0188ea6d002297adb7)

[Winston](https://www.notion.so/Winston-a836ea7ec5944506b486bdd445e334d1)

[AgGrid](https://www.notion.so/AgGrid-078532ca7c714dd7a1435e7ebc9f2013)

[CORS](https://www.notion.so/CORS-7e8ff0ec93f34d44b769c1a8346e8e3a)

[JWT](https://www.notion.so/JWT-9a95c119bb954c42948e0685aeb7de5f)
