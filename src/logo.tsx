import reactLogo from "./assets/react.svg";

const Logo = () => {
    return <div>
        <a href="https://react.dev" target="_blank" className={'flex items-center'}>
            <img src={reactLogo} className="logo react" alt="React logo"/>
            <h1>React CrossWord Puzzle</h1>
        </a>
    </div>
};

export default Logo;
