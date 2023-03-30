import ReactDOM from 'react-dom/client';

function Test(props) {
    return <h1>Hello, {props.name}</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
const element = <Test name="Sara" />;
root.render(element);
