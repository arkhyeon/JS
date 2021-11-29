import { useParams } from "react-router";

function Optional() {
    const { value } = useParams();
    return <div>value : {value ?? "None"} </div>;
}

export default Optional;
