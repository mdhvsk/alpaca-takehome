import HomePage from "./components/home/HomePage";
import NoteCreationForm from "./components/noteCreation/NoteCreationForm";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 text-center">
    {/* <NoteCreationForm/> */}
    <HomePage/>
    </div>
  );
}
