import { useState } from 'react';
import { toast } from 'react-toastify';
import QueuePageLayout from '../features/layout/QueuePageLayout';
import QueueList from '../features/queue/QueueList';
import AnalystTools from '../features/queue/AnalystTools';
import useAnalystArticles from '../features/queue/useAnalystArticles';
import PageTitle from '../components/PageTitle';
import useAnalyseArticle from '../features/queue/useAnalyseArticle';
import usePractices from '../features/queue/usePractices';
import NewPracticeDialog from '../features/queue/NewPracticeDialog';
import RejectionDialog from '../features/queue/RejectionDialog';

const AnalystQueuePage = () => {
  const [practiceModalOpen, setPracticeModalOpen] = useState(false);
  const [reasonModalOpen, setReasonModalOpen] = useState(false);

  const { articles, error, loading, refetch } = useAnalystArticles();
  const { practices, addPractice } = usePractices();

  const onSuccess = () => {
    refetch();
  };

  const onError = (err) => {
    console.log(err);
  };

  const { analyse } = useAnalyseArticle({
    onSuccess,
    onError,
  });

  const onSubmit = (data) => {
    const promise = analyse(articles[0]._id, data);
    toast.promise(promise, {
      pending: {
        render() {
          return 'Submitting Analysis...';
        },
        isLoading: true,
        icon: null,
      },
      success: {
        render() {
          return 'Article Analysed!';
        },
        isLoading: false,
        icon: null,
      },
      error: {
        render() {
          return 'Error submitting article';
        },
        isLoading: false,
        icon: null,
      },
    });
  };

  const onReject = () => {
    setReasonModalOpen(true);
  };

  const onAddPractice = (data) => {
    const promise = addPractice(data.name);
    toast.promise(promise, {
      pending: {
        render() {
          return 'Adding Practice...';
        },
        isLoading: true,
        icon: null,
      },
      success: {
        render() {
          return 'Practice Added!';
        },
        isLoading: false,
        icon: null,
      },
      error: {
        render() {
          return 'Error adding practice';
        },
        isLoading: false,
        icon: null,
      },
    });
  };

  const onSubmitReason = (reason) => {
    if (reason === '') {
      toast.error('You must provide a reason for rejecting the article');
      return;
    }

    const promise = analyse(articles[0]._id, reason);
    toast.promise(promise, {
      pending: {
        render() {
          return 'Rejecting Article...';
        },
        isLoading: true,
        icon: null,
      },
      success: {
        render() {
          return 'Article Rejected!';
        },
        isLoading: false,
        icon: null,
      },
      error: {
        render() {
          return 'Error rejecting article';
        },
        isLoading: false,
        icon: null,
      },
    });
  };

  return (
    <>
      <PageTitle sx={{ mb: 2 }}>Analysis Queue</PageTitle>
      <QueuePageLayout
        error={error}
        loading={loading}
        left={<QueueList articles={articles} />}
        right={
          <AnalystTools
            onSubmit={onSubmit}
            onReject={onReject}
            onAddPractice={() => setPracticeModalOpen(true)}
            article={articles[0]}
            practices={practices}
          />
        }
      />
      <NewPracticeDialog
        open={practiceModalOpen}
        onClose={() => setPracticeModalOpen(false)}
        onSubmit={onAddPractice}
      />
      <RejectionDialog
        open={reasonModalOpen}
        onClose={() => setReasonModalOpen(false)}
        onSubmit={onSubmitReason}
      />
    </>
  );
};

export default AnalystQueuePage;
