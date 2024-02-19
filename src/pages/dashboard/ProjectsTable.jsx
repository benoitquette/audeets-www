import PropTypes from 'prop-types';
import { Box, Table, TableBody, TableContainer } from '@mui/material';
import ProjectsTableRow from './ProjectsTableRow';

const ProjectsTable = ({ data }) => (
  <Box>
    <TableContainer
      sx={{
        width: '100%',
        overflowX: 'auto',
        position: 'relative',
        display: 'block',
        maxWidth: '100%',
        '& td, & th': { whiteSpace: 'nowrap' }
      }}
    >
      <Table
        aria-labelledby="tableTitle"
        sx={{
          '& .MuiTableCell-root:first-of-type': {
            pl: 3
          },
          '& .MuiTableCell-root:last-of-type': {
            pr: 2
          }
        }}
      >
        <TableBody>
          {data.map((row, index) => {
            return <ProjectsTableRow key={index} data={row} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

ProjectsTable.propTypes = {
  data: PropTypes.array.isRequired
};

export default ProjectsTable;
