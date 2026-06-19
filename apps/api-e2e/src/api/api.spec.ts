import axios from 'axios';

describe('GET /api/health', () => {
  it('should report a healthy status', async () => {
    const res = await axios.get('/api/health');

    expect(res.status).toBe(200);
    expect(res.data.success).toBe(true);
    expect(res.data.data.status).toBe('ok');
  });
});
