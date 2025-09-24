import {type Dispatch, type FC, type SetStateAction, useEffect, useRef, useState} from "react";
import type {BoardCell, SelectedCell, Direction, RowColDimensions} from './types';
import {produce} from "immer";

const Overlay: FC<{
    board: BoardCell[][];
    order: RowColDimensions;
    setOrder: Dispatch<SetStateAction<RowColDimensions>>;
    setBoard: Dispatch<SetStateAction<BoardCell[][]>>;
    direction: Direction;
    setIsOverlay: Dispatch<SetStateAction<boolean>>;
    selectedCells: SelectedCell[];
    setSelectedCells: Dispatch<SetStateAction<SelectedCell[]>>;
}> = ({
          board,
          order,
          setOrder,
          setBoard,
          direction,
          setIsOverlay,
          selectedCells,
          setSelectedCells,
      }) => {

    console.log(selectedCells);
    const [words, setWords] = useState<string[]>([]);
    const [description, setDescription] = useState<string>('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        setWords(Array(selectedCells.length).fill(""));
        const nextWords = produce(words, draft => {
            draft.length = 0;
            for(const cell of selectedCells) {
                draft.push(cell.word);
            }
        });
        setWords(nextWords);
        inputRefs.current = Array(selectedCells.length).fill(null);
    }, [selectedCells.length]);

    const onChangeWord = (value: string, index: number) => {
        const newWords = [...words];
        newWords[index] = value;
        setWords(newWords);
    };

    const onResetWord = () => {
        setWords(Array(selectedCells.length).fill(""));
    };

    const onWriteWord = () => {
        const nextState = produce(board, draft => {
            for (let i = 0; i < selectedCells.length; i++) {
                const [rowIndexStr, colIndexStr] = selectedCells[i].position.split('-');
                const rowIndex = Number(rowIndexStr);
                const colIndex = Number(colIndexStr);
                if (i === 0 && draft[rowIndex][colIndex].position === '') {
                    draft[rowIndex][colIndex].position = direction as 'width' | 'height';
                    draft[rowIndex][colIndex].index = direction === 'width' ? order.row : order.col;
                    draft[rowIndex][colIndex].description = description;
                }
                draft[rowIndex][colIndex].word = words[i];
            }
        });
        if(direction === "width") {
            setOrder({...order, row : order.row + 1});
        } else if(direction === "height") {
            setOrder({...order, col : order.col + 1});
        }
        setBoard(nextState);
        setIsOverlay(false);
        setSelectedCells([]);
    };

    return <div id={'overlay'} className="fixed inset-0 bg-white/20 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <div className="text-xl font-bold mb-4">문제 (<>
                {
                    direction === "width" && `가로 ${order.row}번`
                }
                {
                    direction === "height" && `세로 ${order.col}번`
                }
            </>
                )
            </div>
            <div className="text-gray-600 mb-4">
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-20"
                    placeholder="문제를 입력하세요."
                />
            </div>
            <div className="text-xl font-bold mb-4">정답</div>
            <div className="flex flex-wrap justify-center mb-[20px] gap-2">{
                words.map((word, index) => (
                    <input
                        key={index}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        type={'text'}
                        maxLength={1}
                        value={word}
                        onChange={(e) => onChangeWord(e.target.value, index)}
                        onCompositionEnd={() => {
                            inputRefs.current[index + 1]?.focus();
                        }}
                        className="w-12 h-12 text-center border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-bold"
                    />
                ))
            }</div>
            <div>
                <button onClick={onWriteWord} className={'mr-[10px]'}>확인</button>
                <button onClick={onResetWord} className={'mr-[10px]'}>초기화</button>
                <button onClick={() => {
                    setIsOverlay(false);
                    setSelectedCells([]);
                }}>취소
                </button>
            </div>
        </div>
    </div>
};

export default Overlay;
