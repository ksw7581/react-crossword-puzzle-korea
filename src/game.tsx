import {type FC, useState} from 'react';
import Logo from "./logo.tsx";
import Overlay from "./overlay.tsx";

const Game: FC<{
    row: number,
    col: number,
}> = ({
          col, row
      }) => {
    const [board, setBoard] = useState<{
        position: 'width' | 'height',
        index: number,
        word: string,
    }[][]>(Array(row).fill(null).map(() => Array(col).fill("")));
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState<{ row: number, col: number } | null>(null);
    const [selectedCells, setSelectedCells] = useState<{
        position: string,
        word: string,
    }[]>([]);
    const [isOverlay, setIsOverlay] = useState(false);
    const [direction, setDirection] = useState<'' | 'width' | 'height'>('');

    const isValidDirection = (start: { row: number, col: number }, end: { row: number, col: number }) => {
        return start.row === end.row || start.col === end.col;
    };

    const handleMouseDown = (rowIndex: number, colIndex: number, word: string) => {
        setIsDragging(true);
        setDragStart({row: rowIndex, col: colIndex});
        setSelectedCells(prev => [...prev, {
            position: `${rowIndex}-${colIndex}`,
            word,
        }]);
    };

    const handleMouseEnter = (rowIndex: number, colIndex: number, word: string) => {
        if (!isDragging || !dragStart) return;
        const newEnd = {row: rowIndex, col: colIndex};
        if (isValidDirection(dragStart, newEnd)) {
            if (dragStart.row === newEnd.row) {
                setDirection("width");
            } else if (dragStart.col === newEnd.col) {
                setDirection("height");
            }
            setSelectedCells(prev => [...prev, {
                position: `${rowIndex}-${colIndex}`,
                word,
            }]);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        console.log('선택된 셀들:', Array.from(selectedCells));
        console.log('이동한 칸 수:', selectedCells.length);
        // setSelectedCells([]);
        setIsOverlay(true);
    };

    return <div>
        <Logo/>
        <div className={'flex flex-col items-center'}>
            {
                board.map((row, index) => {
                    return <div className={'flex'} key={index}>{
                        row.map((cell, index_c) => {
                            const cellKey = `${index}-${index_c}`;
                            const isSelected = selectedCells.map(item => item.position).includes(cellKey);
                            return <div
                                key={index_c}
                                style={{
                                    background: isSelected ? 'blue' : '#EBEBEB',
                                }}
                                className={'bg-[#EBEBEB] hover:!bg-[#BFBFBF] border-white border w-[60px] h-[60px] cursor-pointer'}
                                onMouseDown={() => handleMouseDown(index, index_c, cell.word)}
                                onMouseEnter={() => handleMouseEnter(index, index_c, cell.word)}
                                onMouseUp={handleMouseUp}
                            >
                                {cell.word}
                            </div>
                        })
                    }</div>
                })
            }
        </div>
        {
            isOverlay && <Overlay
                setBoard={setBoard}
                direction={direction}
                setIsOverlay={setIsOverlay}
                selectedCells={selectedCells}
                setSelectedCells={setSelectedCells}
            />
        }
    </div>
};

export default Game;
