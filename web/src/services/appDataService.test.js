import api from './api';
import { getBudgetPlans, getBudgets, upsertBudgetPlan } from './appDataService';

jest.mock('./api', () => ({
  get: jest.fn(),
  post: jest.fn()
}));

describe('appDataService budgets api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls get budgets with month query', async () => {
    api.get.mockResolvedValue({
      data: {
        summary: { budgeted: 5000 },
        categoryBudgets: [],
        uncategorized: []
      }
    });

    const result = await getBudgets('2026-04');

    expect(api.get).toHaveBeenCalledWith('/budgets?month=2026-04');
    expect(result.summary.budgeted).toBe(5000);
  });

  it('calls get budget plans endpoint', async () => {
    api.get.mockResolvedValue({ data: [{ month: '2026-04', amount: 7000 }] });

    const result = await getBudgetPlans();

    expect(api.get).toHaveBeenCalledWith('/budgets/plans');
    expect(result).toHaveLength(1);
    expect(result[0].month).toBe('2026-04');
  });

  it('posts upsert budget plan payload', async () => {
    api.post.mockResolvedValue({
      data: { id: 1, month: '2026-04', amount: 7000 }
    });

    const payload = { month: '2026-04', amount: 7000 };
    const result = await upsertBudgetPlan(payload);

    expect(api.post).toHaveBeenCalledWith('/budgets/plans', payload);
    expect(result.id).toBe(1);
  });
});
