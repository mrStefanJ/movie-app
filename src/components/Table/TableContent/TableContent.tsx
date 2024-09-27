import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Genre } from "../../../type/genre";
import { ShowDetails } from "../../../type/show";
import "./style.scss";

interface ContentProps {
  content: ShowDetails | null;
}

const TableContent: React.FC<ContentProps> = ({ content }) => {
  console.log(content);
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Release date</TableCell>
            <TableCell>
              {content?.release_date || content?.first_air_date}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Genres</TableCell>
            <TableCell>
              <ul className="genre-list">
                {content?.genres.map((genre: Genre) => (
                  <li key={genre.id} className="genre-item">
                    {genre.name}
                  </li>
                ))}
              </ul>
            </TableCell>
          </TableRow>
          {content?.seasons && (
            <TableRow>
              <TableCell>Seasons</TableCell>
              <TableCell>{content?.seasons.length}</TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell>Language</TableCell>
            <TableCell>{content?.original_language}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>{content?.status}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableContent;
