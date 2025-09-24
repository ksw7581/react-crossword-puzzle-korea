export interface RowColDimensions {
    row: number;
    col: number;
}

export interface CellPosition {
    row: number;
    col: number;
}

export interface BoardCell {
    position: 'width' | 'height' | '';
    index: number;
    word: string;
    description: string;
}

export interface SelectedCell {
    position: string;
    word: string;
}

export type Direction = '' | 'width' | 'height';
