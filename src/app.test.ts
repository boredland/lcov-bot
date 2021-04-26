import nock, { disableNetConnect } from 'nock';
disableNetConnect();
import { Probot, ProbotOctokit } from 'probot';
import app from './app';

let probot;

beforeEach(() => {
  probot = new Probot({
    githubToken: 'test',
    Octokit: ProbotOctokit.defaults({
      throttle: { enabled: false },
      retry: { enabled: false },
    }),
  });
  probot.load(app);
});

test('recieves issues.opened event', async function () {
  const mock = nock('https://api.github.com')
    // create new check run
    .post('/repos/probot/example-github-action/issues/1/comments', (requestBody) => {
      expect(requestBody).toEqual({ body: 'Hello, World!' });

      return true;
    })
    .reply(201, {});

  await probot.receive({
    name: 'issues',
    id: '1',
    payload: {
      action: 'opened',
      repository: {
        owner: {
          login: 'probot',
        },
        name: 'example-github-action',
      },
      issue: {
        number: 1,
      },
    },
  });

  expect(mock.activeMocks()).toHaveLength(0);
});
