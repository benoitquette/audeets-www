import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { Stack, Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import UrlList from './UrlList';
import { useGetProjectQuery, useUpdateProjectMutation } from '~/store/reducers/projects-api';

const ProjectUpdateForm = () => {
  const navigate = useNavigate();
  const projectId = useParams().projectId;
  const [name, setName] = useState({ title: '', error: false });
  const [urls, setUrls] = useState([]);
  const { data: project, isSuccess } = useGetProjectQuery(projectId);
  const [updateProject] = useUpdateProjectMutation();

  useEffect(() => {
    if (project) {
      setName({ title: project.title, error: false });
      setUrls(project.urls);
    }
  }, [project]);

  const handleChangeName = (e) => {
    const newTitle = e.target.value;
    setName({ title: newTitle, error: newTitle.length <= 0 });
  };

  const handleSubmit = () => {
    updateProject({ id: projectId, title: name.title, urls: urls, domain: project.domain });
    navigate('/');
  };

  const handleCancel = () => navigate('/');

  return (
    isSuccess && (
      <form>
        <Stack spacing={3} sx={{ m: 1, mb: 4 }}>
          <TextField name={'name'} label={'Name of the site'} required value={name.title} onChange={handleChangeName} error={name.error} />
          <TextField
            InputProps={{
              readOnly: true
            }}
            label={'Domain of the site (read only)'}
            value={project.domain}
          />
          <UrlList domain={project.domain} urls={urls} handleUrlsChange={setUrls} />
        </Stack>
        <Button onClick={handleCancel} autoFocus>
          Cancel
        </Button>
        <Button
          sx={{ ml: 1 }}
          type={'submit'}
          variant="contained"
          onClick={handleSubmit}
          disabled={urls.length == 0 || name.title.length == 0}
        >
          Submit
        </Button>
      </form>
    )
  );
};

export default ProjectUpdateForm;
