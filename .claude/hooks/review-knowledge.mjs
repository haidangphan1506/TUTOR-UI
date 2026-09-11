#!/usr/bin/env node
// Stop hook: sau task có đổi source FE (app/ components/ lib/ hooks/ types/), nhắc model giữ
// tri thức dự án đồng bộ — rules (.claude/rules), skills (.claude/skills), tài liệu endpoint
// (API_ENDPOINTS.md) và memory chung.
//
// FE LÀ git repo → dùng `git status --porcelain` để biết có đổi source không. Loop-safe: lượt
// review chỉ sửa file rule/skill/doc/memory, không đổi trạng thái các thư mục code theo dõi →
// lần Stop kế tiếp fingerprint khớp cache và thoát.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

let input = '';
process.stdin.on('data', (c) => (input += c));
process.stdin.on('end', () => {
  try {
    JSON.parse(input || '{}');
  } catch {
    process.exit(0);
  }

  const git = spawnSync(
    'git',
    ['status', '--porcelain', '--', 'app', 'components', 'lib', 'hooks', 'types'],
    { encoding: 'utf8' },
  );
  if (git.status !== 0) process.exit(0);
  const changed = (git.stdout || '').trim();
  if (!changed) process.exit(0);

  const cacheDir = '.claude/.cache';
  const sentinel = join(cacheDir, 'review-knowledge-state');

  let prev = '';
  try {
    prev = existsSync(sentinel) ? readFileSync(sentinel, 'utf8') : '';
  } catch {
    prev = '';
  }
  if (prev === changed) process.exit(0);

  try {
    mkdirSync(cacheDir, { recursive: true });
    writeFileSync(sentinel, changed);
  } catch {
    process.exit(0);
  }

  const reason = [
    'Task này vừa đổi source FE. Trước khi kết thúc, giữ tri thức dự án đồng bộ — rà và CẬP NHẬT thứ',
    'nào đã cũ:',
    '',
    '1. Rules — `.claude/rules/*.md`: nếu một quy ước/ràng buộc đổi hoặc xuất hiện quy ước mới.',
    '2. Skills — `.claude/skills/*/SKILL.md`: nếu mẫu scaffold (page/query-hook) đổi, hoặc thêm skill',
    '   cho một workflow lặp lại mới.',
    '3. Endpoint — `API_ENDPOINTS.md`: nếu vừa thêm/đổi lời gọi API (giữ khớp hợp đồng với BE).',
    '4. Memory chung — MEMORY.md + memory files: nếu lộ ra quyết định/quy ước bền vững chưa được ghi.',
    '',
    'Chỉ sửa file rule/skill/doc/memory ở bước này — không chạm code khác. Nếu tất cả đã khớp, trả lời',
    'ngắn gọn "tri thức FE đã cập nhật" rồi dừng.',
  ].join('\n');

  process.stdout.write(JSON.stringify({ decision: 'block', reason }));
  process.exit(0);
});
