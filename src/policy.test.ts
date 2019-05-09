import Policy, { IAction } from './policy';

const actions: IAction[] = [
  { module: 'module1', name: 'action1' },
  { module: 'module1', name: 'action2' },
  { module: 'module1', name: 'action3' },
  { module: 'module2', name: 'action1' },
  { module: 'module2', name: 'action2' },
  { module: 'module3', name: 'action1' },
];

let policy = null;

describe('test policy', () => {

  beforeEach(() => {
    policy = new Policy(actions);
  });

  it('init', () => {
    expect(policy.moduleMap).toEqual({
      module1: ['module1/action1', 'module1/action2', 'module1/action3', ],
      module2: ['module2/action1', 'module2/action2' ],
      module3: ['module3/action1' ]
    });
  });

  it('add allow policy', () => {
    policy.addPolicy({
      version: 1,
      statement: [
        {
          effect: 'allow',
          action: [
            'module1/*'
          ]
        }
      ]
    });

    expect(policy.allowActions).toEqual(
      ['module1/action1', 'module1/action2', 'module1/action3']
    );
  });

  it('add deny policy', () => {
    policy.addPolicy({
      version: 1,
      statement: [
        {
          effect: 'deny',
          action: [
            'module1/action1',
            'module2/*',

          ]
        }
      ]
    });

    expect(policy.denyActions).toEqual(
      ['module1/action1', 'module2/action1', 'module2/action2']
    );
  });

  it('add allow policy and deny policy', () => {
    policy.addPolicy({
      version: 1,
      statement: [
        {
          effect: 'allow',
          action: [
            'module1/action1'
          ]
        },
        {
          effect: 'deny',
          action: [
            'module1/action1',
            'module2/*',
          ]
        }
      ]
    });

    expect(policy.allowActions).toEqual(
      ['module1/action1']
    );

    expect(policy.denyActions).toEqual(
      ['module1/action1', 'module2/action1', 'module2/action2']
    );
  });

  it('verify action', () => {
    policy.addPolicy({
      version: 1,
      statement: [
        {
          effect: 'allow',
          action: [
            'module1/action1',
            'module2/*',
          ]
        },
        {
          effect: 'deny',
          action: [
            'module1/action1'
          ]
        }
      ]
    });

    expect(policy.verifyAction('module1/action1')).toEqual(false);

    expect(policy.verifyAction(['module2/action1', 'module2/action2'])).toEqual(true);

    expect(policy.verifyAction(['module2/action1'])).toEqual(true);
  });

});
