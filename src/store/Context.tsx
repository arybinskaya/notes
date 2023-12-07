import {
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useContext,
  useState,
  useMemo,
} from "react";
import { findAllHashtags } from "../helpers";
import { Stores, deleteData } from "../lib/db";

export interface INote {
  id: string;
  value: string;
}

type NoteProviderProps = {
  children: ReactNode;
};

type TNotesContextValues = {
  notes: INote[];
  setNotes: Dispatch<SetStateAction<INote[]>>;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  removeNote: (value: string) => void;
  editNote: (id: string, newItem: INote) => void;
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
  selectedTags: string[];
};

const NoteContext = createContext<TNotesContextValues>({
  notes: [],
  tags: [],
  setNotes: () => null,
  setTags: () => null,
  removeNote: () => null,
  editNote: () => null,
  setSelectedTags: () => null,
  selectedTags: [],
});

const { Provider } = NoteContext;

const NoteProvider = ({ children }: NoteProviderProps) => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const removeNote = async (id: string) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    await deleteData(Stores.Notes, id);
    setNotes(filteredNotes);
  };

  const editNote = (id: string, newItem: INote) => {
    setTags((prev) => [...prev, ...findAllHashtags(newItem.value)]);
    setNotes((prevData) => {
      const newData = [...prevData];
      const indexToReplace = newData.findIndex((item) => item.id === id);

      if (indexToReplace !== -1) {
        newData[indexToReplace] = { ...newItem, id };
      }

      return newData;
    });
  };

  const filteredNotes = useMemo(
    () =>
      !!selectedTags.length
        ? notes.filter((note) =>
            selectedTags.some((substring) => note.value.includes(substring))
          )
        : notes,
    [notes, selectedTags]
  );

  const value: TNotesContextValues = {
    notes: filteredNotes,
    setNotes,
    tags,
    setTags,
    removeNote,
    editNote,
    setSelectedTags,
    selectedTags,
  };

  return <Provider value={value}>{children} </Provider>;
};

const useNotes = (): TNotesContextValues => {
  return useContext(NoteContext);
};

export { NoteProvider, NoteContext, useNotes };
