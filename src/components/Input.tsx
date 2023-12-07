import React from "react";
import { TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import { useNotes } from "../store";
import { findAllHashtags } from "../helpers";

const Input = () => {
  const { setNotes, setTags } = useNotes();
  const [text, setText] = useState<string>("");

  const changeHandler = (event: any) => {
    setText(event.target.value);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const newTags = findAllHashtags(text);
    setNotes((prev) => [
      ...prev,
      { id: Math.random().toString(), value: text },
    ]);
    setTags((prev) => [...prev, ...newTags]);
    newTags.forEach(async (i) => {});
    setText("");
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
    </form>
  );
};

export default Input;
