import { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useNotes } from "../store";

type TypeProps = {
  value: string;
  id: string;
};

const Note = ({ value, id }: TypeProps) => {
  const { removeNote, editNote, tags } = useNotes();
  const [text, setText] = useState<string>(value);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const getHighlightedText = (highlights: string[]) => {
    const parts: React.ReactNode[] = [];
    let remainingValue = value;

    highlights.forEach((highlight) => {
      const regex = new RegExp(`(${highlight})`, "gi");
      const splitParts = remainingValue.split(regex);
      const highlightIndex = splitParts.findIndex(
        (part) => part.toLowerCase() === highlight.toLowerCase()
      );

      if (highlightIndex !== -1) {
        const nonHighlightPart = splitParts.slice(0, highlightIndex).join("");
        if (nonHighlightPart) {
          parts.push(<span key={Math.random()}>{nonHighlightPart}</span>);
        }

        const highlightedPart = splitParts[highlightIndex];
        parts.push(
          <span
            key={Math.random()}
            style={{ fontWeight: "bold", textDecoration: "underline" }}
          >
            {highlightedPart}
          </span>
        );

        remainingValue = splitParts.slice(highlightIndex + 1).join("");
      }
    });

    if (remainingValue) {
      parts.push(<span key={highlights.length}>{remainingValue}</span>);
    }

    return <span>{parts}</span>;
  };

  return (
    <Card
      sx={{
        maxWidth: 875,
        marginBottom: 2,
        backgroundColor: "#ffceb4",
      }}
    >
      <CardContent>
        {isEdit ? (
          <TextField
            value={text}
            onChange={({ target }) => setText(target.value)}
          />
        ) : (
          <Typography>{getHighlightedText(tags)}</Typography>
        )}
      </CardContent>
      <CardActions>
        {isEdit ? (
          <>
            <Button
              size="small"
              onClick={() => {
                editNote(id, { value: text, id });
                setIsEdit(false);
              }}
            >
              Save
            </Button>
            <Button size="small" onClick={() => setIsEdit(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button size="small" onClick={() => setIsEdit(true)}>
              Edit
            </Button>
            <Button size="small" onClick={() => removeNote(id)}>
              Remove
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default Note;
