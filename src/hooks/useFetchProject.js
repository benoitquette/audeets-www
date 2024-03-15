import { useParams } from 'react-router';
import { useGetProjectQuery } from '~/store/reducers/projects-api';

const useFetchProject = () => {
  const projectId = useParams().projectId;
  const { data: project } = useGetProjectQuery(projectId);
  return project;
};

export default useFetchProject;
