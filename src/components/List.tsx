import { Box, Button, Typography } from "@mui/material";
import Note from "./Note";
import { useNotes } from "../store";
import { getUniqueTags } from "../helpers";

const List = () => {
  const { notes, tags, setSelectedTags, selectedTags } = useNotes();
  if (!notes.length)
    return (
      <Typography
        sx={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          fontSize: "50",
        }}
        color="error"
      >
        Nothing added
      </Typography>
    );

  const uniqueTags = getUniqueTags(tags);

  return (
    <>
      <Box sx={{ margin: "0 0 0 570px" }}>
        <Typography variant="h5">SELECT TAGS:</Typography>
        {uniqueTags.map((t) => (
          <Button
            onClick={() => setSelectedTags((prev) => [...prev, t])}
            key={t}
          >
            {t}
          </Button>
        ))}

        {!!selectedTags.length && (
          <Button
            sx={{ backgroundColor: "#ff8447", color: "black" }}
            onClick={() => setSelectedTags([])}
          >
            Remove selected tags
          </Button>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {notes.map((note: any) => (
            <Note key={note.id} value={note.value} id={note.id}></Note>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default List;
