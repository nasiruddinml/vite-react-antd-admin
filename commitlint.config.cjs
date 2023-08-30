/* eslint-disable @typescript-eslint/no-var-requires, no-undef */
// CommonJS
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const scopes = fs.readdirSync(path.resolve(__dirname, 'src')).map((i) => i.toLowerCase());

const gitStatus = execSync('git status --porcelain || true').toString().trim().split('\n');

const scopeComplete = gitStatus
  .find((r) => ~r.indexOf('M  src'))
  ?.replace(/(\/)/g, '%%')
  ?.match(/src%%((\w|-)*)/)?.[1];

const subjectComplete = gitStatus
  .find((r) => ~r.indexOf('M  src'))
  ?.replace(/\//g, '%%')
  ?.match(/src%%((\w|-)*)/)?.[1];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 100],
    /**
     * scope：scope of submission 
     * feat(scope): feat add .....
     *      ^^^^^
     */
    'scope-case': [2, 'always', ['lower-case', 'upper-case', 'start-case', 'pascal-case']],
    /**
     * subject：commit description
     * feat(scope): feat add .....
     *              ^^^^^^^^^^^^^^
     */
    'subject-case': [1, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    /**
     * type：commit type
     * feat(scope): feat add .....
     * ^^^^
     */
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'revert',
        'chore',
        'wip',
        'types',
      ],
    ],
  },
  prompt: {
    messages: {
      type: 'Choose the type of your commit :',
      scope: 'Select a submission scope (optional):',
      customScope: 'Select a custom submission scope :',
      subject: 'Fill in the description of the change of short refining :\n',
      body: 'Fill in a more detailed change description (optional) "|" change :\n',
      breaking: 'List the breaking changes (optional) "|" change :\n',
      footerPrefixsSelect: 'Choose associated issue prefix (optional) :',
      customFooterPrefixs: 'Choose custom associated issue prefix :',
      footer: 'List related issue (optional) for example: #31, #I3244 :\n',
      confirmCommit: 'Are you want to submit or modify the commit?',
    },
    types: [
      { value: 'feat', name: 'feat:     features', emoji: '✨' },
      { value: 'fix', name: 'fix:      fixing issue/bug', emoji: '🐛' },
      { value: 'docs', name: 'docs:     documenting', emoji: '📝' },
      { value: 'style', name: 'style:    styling', emoji: '💄' },
      { value: 'refactor', name: 'refactor: refactoring', emoji: '♻️' },
      { value: 'perf', name: 'perf:     performance/optimize', emoji: '⚡️' },
      { value: 'test', name: 'test:     writing/improve test', emoji: '✅' },
      {
        value: 'build',
        name: 'build:    build process, external dependency change (such as upgrading/modifying npm packages, configuration, etc.)',
        emoji: '📦️',
      },
      { value: 'ci', name: 'ci:       configure/modify CI script', emoji: '🛠' },
      { value: 'revert', name: 'revert:   rollback commit', emoji: '⏪️' },
      {
        value: 'chore',
        name: 'chore:    change the build process or additional tools and libraries (does not affect source files)',
        emoji: '🔨',
      },
      { value: 'wip', name: 'wip:      in progress/development', emoji: '🚀' },
      { value: 'types', name: 'types:    type definition change', emoji: '💡' },
    ],
    useEmoji: true,
    emojiAlign: 'center',

    allowEmptyIssuePrefixs: false,
    allowCustomIssuePrefixs: false,

    // scope setting
    scopes: [...scopes, 'mock'],
    enableMultipleScopes: true,
    scopeEnumSeparator: ',',
    customScopesAlign: !scopeComplete ? 'top' : 'bottom',
    defaultScope: scopeComplete,
    defaultSubject: subjectComplete && `[${subjectComplete}] `

  },
};