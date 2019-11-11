# post-commit-auto-versioning
node CLI replacement for git commit command with pre-commit linting and post-commit auto-versioning  

Use it to upgrade your package.json version after each commit.

## Install globally:   
```npm install post-commit-auto-versioning -g```  

## Usage:
```committing``` will replace git commit command  
```committing -m "message"```

**Usage with pre-commit lint command**   
```committing -m "message" -l "npm run lintScript && npm run formatScript"```  

pre-commit preset can also be stored into package.json
```
{
	...
	"post-commit-auto-versioning": {
		"pre-commit": "npm run formatting"
	}
}
```

**Usage with specific version**  
```committing -m "message"```  Default behaviour upgrade "patch" number  
```committing -m "message" --minor```  
```committing -m "message" --major```  

**Can also accept all other commit default parameters**  
```
	[--dry-run] [(-c | -C | --fixup | --squash) <commit>]
	[-a | --interactive | --patch] [-s] [-v] [-u<mode>] [--amend]
	[-F <file> | -m <msg>] [--reset-author] [--allow-empty]
	[--allow-empty-message] [--no-verify] [-e] [--author=<autho r>]
	[--date=<date>] [--cleanup=<mode>] [--[no-]status]
	[-i | -o] [-S[<keyid>]] [--] [<file>…​]
```