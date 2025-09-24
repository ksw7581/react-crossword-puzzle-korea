import {type FC, useState} from 'react';
import Logo from "./logo.tsx";
import Overlay from "./overlay.tsx";
import type {BoardCell, SelectedCell, CellPosition, Direction, RowColDimensions} from './types';

const Game: FC<{
    row: number;
    col: number;
}> = ({
          col, row
      }) => {
    const [board, setBoard] = useState<BoardCell[][]>(Array(row).fill(null).map(() => Array(col).fill(null).map(() => ({
        position: '' as 'width' | 'height' | '',
        index: 0,
        word: '',
        description: ''
    }))));
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState<CellPosition | null>(null);
    const [selectedCells, setSelectedCells] = useState<SelectedCell[]>([]);
    const [isOverlay, setIsOverlay] = useState(false);
    const [direction, setDirection] = useState<Direction>('');
    const [order, setOrder] = useState<RowColDimensions>({
        row: 1,
        col: 1,
    });

    const isValidDirection = (start: CellPosition, end: CellPosition) => {
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
            if(!selectedCells.map(item => item.position).includes(`${newEnd.row}-${newEnd.col}`)) {
                setSelectedCells(prev => [...prev, {
                    position: `${rowIndex}-${colIndex}`,
                    word,
                }]);
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsOverlay(true);
    };

    return <div>
        <Logo/>
        <div className={'flex flex-col items-center'}>
            {
                board.map((row, index) => {
                    return <div className={'flex'} key={index}>{
                        row.map((cell, index_c) => {
                            let backgroundColor = '#EBEBEB';
                            const cellKey = `${index}-${index_c}`;
                            const isSelected = selectedCells.map(item => item.position).includes(cellKey);
                            if(isSelected) {
                                backgroundColor = 'blue'
                            }
                            if(cell.word !== "") {
                                backgroundColor = 'gold';
                            }
                            return <div
                                key={index_c}
                                style={{
                                    background: backgroundColor,
                                }}
                                className={'bg-[#EBEBEB] hover:!bg-[#BFBFBF] border-white border w-[60px] h-[60px] text-[24px] font-bold leading-[60px] cursor-pointer'}
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
                board={board}
                order={order}
                setOrder={setOrder}
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
