import React from "react";
import { TextField, Box, Button } from "@mui/material";
import { useState, useCallback } from "react";
import { INote, useNotes } from "../store";
import { findAllHashtags } from "../helpers";
import { Stores, addData, getStoreData, initDB } from "../lib/db";

const Input = () => {
  const { setNotes, setTags } = useNotes();
  const [text, setText] = useState<string>("");

  const changeHandler = (event: any) => {
    setText(event.target.value);
  };

  const handleInitDB = async () => {
    await initDB();
  };

  const handleGetNotes = useCallback(async () => {
    const notes = await getStoreData<INote>(Stores.Notes);
    setNotes(notes);
  }, [setNotes]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const newTags = findAllHashtags(text);
    setNotes((prev) => [
      ...prev,
      { id: Math.random().toString(), value: text },
    ]);
    await addData(Stores.Notes, {
      id: Math.random().toString(),
      value: text,
    });
    setTags((prev) => [...prev, ...newTags]);
    newTags.forEach(async (i) => {
      await addData(Stores.Tags, i);
    });
    setText("");
    handleGetNotes();
  };

  return (
    <form onSubmit={onSubmit}>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <TextField
          value={text}
          onChange={changeHandler}
          label="Note"
          sx={{ width: "740px" }}
        />
        <Button
          type="submit"
          disabled={text.length === 0}
          variant="contained"
          sx={{ width: 150, height: 57, fontSize: 16 }}
        >
          Enter note
        </Button>
      </Box>
      <Button onClick={handleInitDB}>init DB</Button>
      <Button onClick={handleGetNotes}>Get Notes</Button>
    </form>
  );
};

export default Input;
