import {type Dispatch, type FC, type SetStateAction, useEffect, useRef, useState} from "react";

const Overlay: FC<{
    setBoard: Dispatch<SetStateAction<{
        position: 'width' | 'height',
        index: number,
        word: string,
    }[][]>>,
    direction: "" | "width" | "height";
    setIsOverlay: Dispatch<SetStateAction<boolean>>,
    selectedCells: {
        position: string,
        word: string,
    }[],
    setSelectedCells: Dispatch<SetStateAction<{
        position: string,
        word: string,
    }[]>>,
}> = ({
          setBoard,
          direction,
          setIsOverlay,
          selectedCells,
          setSelectedCells,
      }) => {

    console.log(selectedCells);

    const [words, setWords] = useState<string[]>([]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        setWords(Array(selectedCells.length).fill(""));
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
        // setBoard()
        setIsOverlay(false);
        setSelectedCells([]);
    };

    return <div id={'overlay'} className="fixed inset-0 bg-white/20 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <div className="text-xl font-bold mb-4">문제 (<>
                {
                    direction === "width" && '가로'
                }
                {
                    direction === "height" && '세로'
                }
            </>
                )
            </div>
            <div className="text-gray-600 mb-4">
                <textarea
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
