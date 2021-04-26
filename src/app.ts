import { Probot } from 'probot';
import metadata from 'probot-metadata';

/**
 * @param {import('probot').Probot} app
 */
const app = (app: Probot): void => {
  app.log('Yay! The app was loaded!');

  app.on('issues.opened', async (context) => {
    return context.octokit.issues.createComment(context.issue({ body: 'Hello, World!' }));
  });

  app.on('push', async (context) => {
    app.log(context.payload);
    metadata(context).set('lcov-bot-result', `lcov-bot-result-${context.payload.after}`);

    return context.octokit.repos.createCommitComment({
      ...context.repo(),
      commit_sha: context.payload.after,
      body: 'huhu',
    });
  });
};

export default app;
