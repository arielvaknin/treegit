"""
I will use this file to test the gitPython package
and try to understand how to work with it.
"""

import os
from git import Repo

class GitApi:

    def __init__(self, repo_path):
        self._repo_path = repo_path
        self._repo = Repo(repo_path)

    def is_bare(self) ->bool:
        return self._repo.bare

    def get_history(self):
        heads = self._repo.heads
        master = heads.master
        log = master.log()
        print(log)





if __name__ == '__main__':

    # loading git repo
    # working_directory = os.getcwd()
    # understand how to get the repo path automatically
    working_directory = "F:/Users/avaknin119870/Documents/Projects/treegit"
    repo = Repo(working_directory)
    print(repo)