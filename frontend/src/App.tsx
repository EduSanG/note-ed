
import MenuBar from "./components/MenuBar"
import NoteList from "./components/NoteList"
import TextEditor from "./components/TextEditor"
import Controller from "./components/Controller"
import NewNoteButton from "./components/NewNoteButton"

function App() {

  return (
    <Controller>
      <div className="h-screen bg-slate-300 flex flex-col">
        <header className="w-100 min-h-11 bg-blue-500 flex justify-center items-center">
          <img src="/Note-ed.svg" className="filter invert h-9 m-0" alt="" />
        </header>
        <div className="flex-1 p-4 grid grid-cols-3 grid-rows-12 gap-2">
          <div className="col-span-2"><MenuBar /></div>
          <div className="row-span-12"><TextEditor /></div>
          <div className="col-span-2 row-span-9"><NoteList /></div>
          <div className="col-span-2 row-span-2 flex justify-end items-center border-t border-slate-400"><NewNoteButton /></div>
        </div>
      </div>
    </Controller>
  ) 
}

export default App
