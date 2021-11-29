import React from "react";
import Counter from "../components/Counter";
import { useSelector, useDispatch, shallowEqual, connect } from "react-redux";
import { decrease, increase, setDiff } from "../modules/counter";

function CounterContainer({ number, diff, onIncrease, onDecrease, onSetDiff }) {
    return (
        <Counter
            number={number}
            diff={diff}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onSetDiff={onSetDiff}
        />
    );
}

const mapStateToProps = (state) => ({
    number: state.counter.number,
    diff: state.counter.diff,
});

const mapDispatchToProps = (dispatch) => ({
    onIncrease: () => dispatch(increase()),
    onDecrease: () => dispatch(decrease()),
    onSetDiff: (diff) => dispatch(setDiff(diff)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
