import os
import base64
import json

def get_files(path):
    files_list = []
    for root, dirs, files in os.walk(path):
        if 'node_modules' in root or '.git' in root or '.manus-logs' in root:
            continue
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, path)
            with open(full_path, 'rb') as f:
                content = f.read()
                try:
                    # Try utf-8 first
                    text_content = content.decode('utf-8')
                    files_list.append({
                        "file": rel_path,
                        "data": text_content,
                        "encoding": "utf-8"
                    })
                except:
                    # Fallback to base64 for binary
                    files_list.append({
                        "file": rel_path,
                        "data": base64.b64encode(content).decode('utf-8'),
                        "encoding": "base64"
                    })
    return files_list

project_path = os.getcwd()
files = get_files(project_path)

payload = {
    "name": "luko-memoryos",
    "teamId": "team_jBg1xrPwh4DtgSCEqpGyOpzy",
    "target": "production",
    "files": files,
    "projectSettings": {
        "framework": "vite",
        "buildCommand": "pnpm run build",
        "outputDirectory": "dist"
    }
}

with open('../deploy_payload_final.json', 'w') as f:
    json.dump(payload, f)
