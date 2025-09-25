import reactLogo from "./assets/react.svg";

const Logo = () => {
    return <div>
        <div className={'flex items-center justify-center'}>
            <img src={reactLogo} className="logo react" alt="React logo"/>
            <h1>React CrossWord Puzzle</h1>
        </div>
    </div>
};

export default Logo;
