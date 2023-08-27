import { useState } from 'react';

export default function App() {
  const [color, setColor] = useState('#000000');
  const [savedColor, setSavedColor] = useState(JSON.parse(localStorage.getItem('saved-color')) || []);

  const generateNewColor = () => {
    const char = '0123456789ABCDEF';
    let newColor = '#';

    let randomNumber = 0;
    for (let i = 0; i < 6; i++) {
      randomNumber = Math.floor(Math.random() * char.length) % char.length;
      newColor += char[randomNumber];
    }
    setColor(newColor);
  };

  const saveColor = () => {
    setSavedColor([...savedColor, color]);
    localStorage.setItem('saved-color', JSON.stringify([...savedColor, color]));
  };

  const clearSavedColor = () => {
    setSavedColor([]);
    localStorage.removeItem('saved-color');
  };

  return (
    <div className='bg-slate-200 w-screen h-screen flex flex-col justify-center items-center gap-8'>
      <div className='text-4xl font-bold'>COLOR RANDOMIZER</div>
      <div className='bg-slate-100 p-4 rounded-xl flex justify-center items-center gap-4'>
        <div className='flex flex-col justify-center items-center gap-2'>
          <div className='w-[200px] h-[200px] rounded-xl' style={{ background: color }}></div>
          <div className='font-medium text-xl'>{color}</div>
        </div>
        <div className='flex flex-col items-center justify-center gap-2'>
          <div
            className='font-medium text-lg border-2 border-slate-500 bg-slate-500 text-white rounded-xl px-2 py-1 cursor-pointer hover:border-slate-700 hover:bg-slate-700 active:border-slate-400 active:bg-slate-400'
            onClick={generateNewColor}>
            Generate New Color
          </div>
          <div
            className='font-medium text-lg border-2 border-slate-500 bg-slate-500 text-white rounded-xl px-2 py-1 cursor-pointer hover:border-slate-700 hover:bg-slate-700 active:border-slate-400 active:bg-slate-400'
            onClick={saveColor}>
            Save Color
          </div>
        </div>
      </div>
      <div className='bg-slate-100 p-8 rounded-xl flex flex-col justify-center items-center gap-4 mx-16'>
        <div className='font-medium text-xl'>SAVED COLOR</div>
        {savedColor.length > 0 ? (
          <>
            <div className='flex justify-center items-center gap-4 flex-wrap'>
              {savedColor.map((val, idx) => {
                return (
                  <div key={idx} className='flex flex-col justify-center items-center gap-2'>
                    <div className='w-[75px] h-[75px] rounded-xl' style={{ background: val }}></div>
                    <div className='font-medium text-md'>{val}</div>
                  </div>
                );
              })}
            </div>
            <div
              className='font-medium text-lg border-2 border-slate-500 bg-slate-500 text-white rounded-xl px-2 py-1 cursor-pointer hover:border-slate-700 hover:bg-slate-700 active:border-slate-400 active:bg-slate-400'
              onClick={clearSavedColor}>
              Clear Saved Color
            </div>
          </>
        ) : (
          'No color saved'
        )}
      </div>
    </div>
  );
}
