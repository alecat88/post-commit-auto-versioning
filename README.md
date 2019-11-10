# post-commit-auto-versioning
node CLI replacement for git commit command with pre-commit linting and post-commit auto-versioning  

Use it to upgrade your package.json version after each commit.


## Usage:
committing will replace git commit command  
example: ```committing -m "message"```

Usage with pre-commit lint command  
example: ```committing -m "message" -l "npm run format"```  
example: ```committing -m "message" -l "npm run lint"```  
example: ```committing -m "message" -l "npm run lint && npm run format"```  

Usage with specific version
example: ```committing -m "message"```  Default behaviour upgrade "patch" number  
example: ```committing -m "message" --minor```  
example: ```committing -m "message" --major```  

Can also accept all other commit default parameters  
```git commit
	   [--dry-run] [(-c | -C | --fixup | --squash) <commit>]
       [-a | --interactive | --patch] [-s] [-v] [-u<mode>] [--amend]
	   [-F <file> | -m <msg>] [--reset-author] [--allow-empty]
	   [--allow-empty-message] [--no-verify] [-e] [--author=<author>]
	   [--date=<date>] [--cleanup=<mode>] [--[no-]status]
	   [-i | -o] [-S[<keyid>]] [--] [<file>…​]```