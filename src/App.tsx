import {useState} from 'react'
import './App.css'
import {Route, Routes, useNavigate} from "react-router";
import Setting from "./setting.tsx";
import Logo from "./logo.tsx";
import type {BoardCell, RowColDimensions} from './types';
import Game from "./game.tsx";

const DEFAULT_ROW_COL = 10;
const MIN_ROW_COL = 4;
const MAX_ROW_COL = 25;

function App() {
    const navigate = useNavigate();
    const [board, setBoard] = useState<BoardCell[][]>(Array(0).fill(null).map(() => Array(0).fill(null).map(() => ({
        position: '' as 'width' | 'height' | '',
        index: 0,
        word: '',
        description: ''
    }))));
    const [rowCols, setRowCols] = useState<RowColDimensions>({row: DEFAULT_ROW_COL, col: DEFAULT_ROW_COL});

    const onChangeValue = (value: number, name: 'row' | 'col') => {
        setRowCols({...rowCols, [name]: value});
    };

    const onBlurValue = (value: number, name: 'row' | 'col') => {
        if (value > MAX_ROW_COL) {
            setRowCols({...rowCols, [name]: MAX_ROW_COL});
            return alert(`행 또는 열을 ${MAX_ROW_COL}개를 초과할 수 없습니다.`);
        } else if (value < MIN_ROW_COL) {
            setRowCols({...rowCols, [name]: MIN_ROW_COL});
            return alert(`행 또는 열이 ${MIN_ROW_COL}개 미만일 수 없습니다.`);
        }
    };

    return (
        <Routes>
            <Route path={"/"} element={<>
                <Logo/>
                <div className="bg-[#FAFAFA] p-[16px] w-fit flex flex-col items-center mx-auto">
                    <div className={"flex h-[40px] items-center justify-start"}>
                        <p>행을 입력하세요.</p>
                        <input
                            type={'text'}
                            className={'ml-[20px] border-[#bfbfbf] border rounded-[4px] box-border px-[10px]'}
                            value={rowCols.row}
                            onBlur={(e) => {
                                if (!isNaN(Number(e.target.value))) {
                                    onBlurValue(Number(e.target.value), 'row');
                                }
                            }}
                            onChange={(e) => {
                                if (!isNaN(Number(e.target.value))) {
                                    onChangeValue(Number(e.target.value), 'row');
                                }
                            }}/>
                    </div>
                    <div className={"flex h-[40px] items-center justify-start"}>
                        <p>열을 입력하세요.</p>
                        <input
                            type={'text'}
                            className={'ml-[20px] border-[#bfbfbf] border rounded-[4px] box-border px-[10px]'}
                            value={rowCols.col}
                            onBlur={(e) => {
                                if (!isNaN(Number(e.target.value))) {
                                    onBlurValue(Number(e.target.value), 'col');
                                }
                            }}
                            onChange={(e) => {
                                if (!isNaN(Number(e.target.value))) {
                                    onChangeValue(Number(e.target.value), 'col');
                                }
                            }}/>
                    </div>
                </div>
                <button onClick={() => {
                    setBoard(Array(rowCols.row).fill(null).map(() => Array(rowCols.col).fill(null).map(() => ({
                        position: '' as 'width' | 'height' | '',
                        index: 0,
                        word: '',
                        description: ''
                    }))));
                    navigate('/setting');
                }} className={'mt-[20px] w-[160px] h-[40px] p-[0px]'}>확인
                </button>
            </>}/>
            <Route path={"/setting"} element={<Setting
                board={board}
                setBoard={setBoard}
            />}/>
            <Route path={"/game"} element={<Game
                board={board}
            />}/>
        </Routes>
    )
}

export default App
