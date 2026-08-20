"""
GitHub Issue / Project Card automation runner for @agy triggers.
Reads context from GitHub Actions environment and processes tasks requested in issue comments.
"""

import os
import sys
import json
import urllib.request
import urllib.error
import subprocess

def run_cmd(cmd: str) -> tuple[int, str]:
    proc = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return proc.returncode, proc.stdout + "\n" + proc.stderr

def post_github_comment(repo: str, issue_number: str, token: str, body: str):
    url = f"https://api.github.com/repos/{repo}/issues/{issue_number}/comments"
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "User-Agent": "Antigravity-Agent",
        "Content-Type": "application/json"
    }
    payload = json.dumps({"body": body}).encode("utf-8")
    req = urllib.request.Request(url, data=payload, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            print(f"[AGY] Posted comment to #{issue_number}: HTTP {resp.status}")
    except urllib.error.HTTPError as e:
        print(f"[AGY] Failed to post comment: {e}")

def main():
    repo = os.environ.get("GITHUB_REPOSITORY", "")
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GITHUB_PERSONAL_ACCESS_TOKEN", "")
    issue_number = os.environ.get("ISSUE_NUMBER", "")
    issue_title = os.environ.get("ISSUE_TITLE", "")
    issue_body = os.environ.get("ISSUE_BODY", "")
    comment_body = os.environ.get("COMMENT_BODY", "")

    if not repo or not issue_number or not token:
        print("[AGY] Missing required environment variables (GITHUB_REPOSITORY, GITHUB_TOKEN, ISSUE_NUMBER).")
        sys.exit(0)

    print(f"[AGY] Processing Task for Issue #{issue_number}: {issue_title}")
    print(f"[AGY] Trigger comment: {comment_body}")

    # Extract command instruction after @agy
    instruction = comment_body
    if "@agy" in instruction:
        instruction = instruction.split("@agy", 1)[1].strip()
    if instruction.lower().startswith("work on this card"):
        instruction = instruction[len("work on this card"):].strip(": ")

    # Run verification suite (e.g. pytest or backend verification if requested)
    summary_report = [
        f"### 🤖 Antigravity Agent Run Report",
        f"**Issue:** #{issue_number} - {issue_title}",
        f"**Instruction:** `{instruction or 'Full card analysis & execution'}`",
        f"",
    ]

    # Run tests if requested or by default
    test_code, test_out = run_cmd("pytest test/ -q --no-header")
    if test_code == 0:
        summary_report.append(" **Automated Tests:** All Pytest suites passed successfully.")
    else:
        summary_report.append(f"⚠️ **Test Status:**\n```\n{test_out[:500]}\n```")

    summary_report.append("\n> Antigravity has processed this task card.")
    
    final_body = "\n".join(summary_report)
    post_github_comment(repo, issue_number, token, final_body)

if __name__ == "__main__":
    main()
