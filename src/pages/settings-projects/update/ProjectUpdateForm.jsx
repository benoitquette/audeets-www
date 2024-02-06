import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import { Stack, Button } from '@mui/material';
import { useGetProjectQuery, useUpdateProjectMutation } from '~/store/reducers/projectsApi';

const ProjectUpdateForm = () => {
  const navigate = useNavigate();
  const projectId = useParams().projectId;
  const { data: project, isSuccess } = useGetProjectQuery(projectId);
  const [updateProject] = useUpdateProjectMutation();

  const handleSubmit = (data) => {
    updateProject({ id: projectId, title: data.name, url: data.url });
    navigate('/settings/projects');
  };

  const handleCancel = () => navigate('/settings/projects');

  return (
    isSuccess && (
      <FormContainer
        defaultValues={{
          name: project.title,
          url: project.url
        }}
        onSuccess={handleSubmit}
        onError={(data) => console.log(data)}
      >
        <Stack spacing={3} sx={{ m: 1, mb: 2 }}>
          <TextFieldElement name={'name'} label={'Name of the site'} required />
          <TextFieldElement name={'url'} label={'URL of the homepage'} required type={'url'} />
        </Stack>
        <Button onClick={handleCancel} autoFocus>
          Cancel
        </Button>
        <Button sx={{ ml: 1 }} type={'submit'} variant="contained">
          Submit
        </Button>
      </FormContainer>
    )
  );
};

export default ProjectUpdateForm;
