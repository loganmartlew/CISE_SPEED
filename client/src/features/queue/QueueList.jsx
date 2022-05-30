import { Stack } from '@mui/material';
import QueueArticle from './QueueArticle';

const QueueList = ({ articles }) => {
  return (
    <Stack spacing={2}>
      {articles.map((article, idx) => (
        <QueueArticle
          key={article._id}
          article={article}
          selected={idx === 0}
        />
      ))}
    </Stack>
  );
};

export default QueueList;
