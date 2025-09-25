import Logo from "./logo.tsx";
import type {FC} from "react";
import type {BoardCell} from "./types.ts";
import html2canvas from "html2canvas";
// import {Sample} from "./const TestSample.ts";

const Game: FC<{
    board: BoardCell[][],
}> = ({
          board
      }) => {

    const onShareImage = async () => {
        const PuzzleImage = document.getElementById("PuzzleImage");
        const canvas = await html2canvas(PuzzleImage!, {
            scale: 1,
            useCORS: true,
            allowTaint: true
        });
        const imgData = canvas.toDataURL("image/jpeg", 1);
        const link = document.createElement('a');
        link.download = 'crossword-puzzle.jpg';
        link.href = imgData;
        link.click();
    };

    return <div>
        <div id={"PuzzleImage"} className={'p-[20px]'}>
            <Logo/>
            <div className={'flex flex-col items-center mb-[20px]'}>
                {
                    board.map((row, index) => {
                        return <div className={'flex'} key={index}>{
                            row.map((cell, index_c) => {
                                let backgroundColor = 'navy';
                                if (cell.word !== "") {
                                    backgroundColor = '#F0F0F0';
                                }
                                return <div
                                    key={index_c}
                                    style={{
                                        background: backgroundColor,
                                    }}
                                    className={'bg-[#EBEBEB] border-white border w-[60px] h-[60px] text-[12px] font-bold leading-[20px] px-[10px] box-border text-left cursor-pointer'}
                                >
                                    {
                                        cell.position === 'width' && <>가{cell.index}</>
                                    }
                                    {
                                        cell.position === 'height' && <>세{cell.index}</>
                                    }
                                </div>
                            })
                        }</div>
                    })
                }
            </div>
            <div className={'flex p-[20px] border-black border '}>
                <div className={'mr-[20px] w-[calc(50%_-_20px)]'}>
                    <h2 className={'text-[18px] font-bold'}>가로</h2>
                    {
                        board.map((row, index) => {
                            return row.filter(item => item.position === 'width').sort((a, b) => a.index - b.index).map((cell, index_c) => {
                                return <div className={'text-left'} key={`${index}-${index_c}`}>{cell.index}. {cell.description}</div>
                            });
                        })
                    }
                </div>
                <div className={'w-[calc(50%_-_20px)]'}>
                    <h2 className={'text-[18px] font-bold'}>세로</h2>
                    {
                        board.map((row, index) => {
                            return row.filter(item => item.position === 'height').sort((a, b) => a.index - b.index).map((cell, index_c) => {
                                return <div className={'text-left'} key={`${index}-${index_c}`}>{cell.index}. {cell.description}</div>
                            });
                        })
                    }
                </div>
            </div>
        </div>
        <div className={'mt-[20px]'}>
            <button onClick={onShareImage} className={'bg-sky-300'}>공유</button>
        </div>
    </div>
};

export default Game;
