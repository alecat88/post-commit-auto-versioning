# post-commit-auto-versioning
node CLI replacement for git commit command with pre-commit linting, post-commit auto-versioning and pre-prush versioning.

This package has 3 tools:
- pre-commit linting
- post-commit auto-versioning 
- pre-prush versioning


## Install globally:   
```npm install post-commit-auto-versioning -g```  


## Pre-commit:
Use ```committing``` instead of ```git commit```  

ex: ```committing -m "message"```

**1: Usage with yours pre-commit lint script:**   
ex: ```committing -m "message" -l "npm run lintScript && npm run formatScript"```  

Otherwise pre-commit preset can be stored into package.json
```
{
	...
	"post-commit-auto-versioning": {
		"pre-commit": "npm run formatting"
	}
}
```

**2: Pre-commit versioning:**  
```committing -m "message" --patch```  
```committing -m "message" --minor```   
```committing -m "message" --major```     
Use it to upgrade your package.json version after each commit.  


## Pre-push versioning:
Install prepush file once with ```prepush-install```  
Use normal ```git push```. You will be asked a version update before every push.  


**Can also accept all other commit default parameters**  
```
	[--dry-run] [(-c | -C | --fixup | --squash) <commit>]
	[-a | --interactive | --patch] [-s] [-v] [-u<mode>] [--amend]
	[-F <file> | -m <msg>] [--reset-author] [--allow-empty]
	[--allow-empty-message] [--no-verify] [-e] [--author=<author>]
	[--date=<date>] [--cleanup=<mode>] [--[no-]status]
	[-i | -o] [-S[<keyid>]] [--] [<file>…​]
```