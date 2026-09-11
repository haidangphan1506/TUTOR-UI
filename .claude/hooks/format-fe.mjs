#!/usr/bin/env node
// PostToolUse hook (Write|Edit): chạy eslint --fix (best-effort) trên file .ts/.tsx/.js/.jsx vừa
// sửa để tự sửa lỗi lint đơn giản. KHÔNG bao giờ chặn: luôn exit 0, nuốt lỗi (eslint fail cũng kệ).
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

let input = '';
process.stdin.on('data', (c) => (input += c));
process.stdin.on('end', () => {
  let data;
  try {
    data = JSON.parse(input || '{}');
  } catch {
    process.exit(0);
  }

  const file = data?.tool_input?.file_path || '';
  if (!/\.(ts|tsx|js|jsx)$/.test(file) || !existsSync(file)) process.exit(0);

  // Bun sẵn có trong repo này; dùng bunx eslint --fix trên đúng file. Best-effort, im lặng.
  try {
    spawnSync('bunx', ['eslint', '--fix', file], {
      encoding: 'utf8',
      timeout: 25000,
      shell: true,
    });
  } catch {
    /* nuốt lỗi — không chặn edit */
  }
  process.exit(0);
});
