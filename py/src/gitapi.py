"""
I will use this file to test the gitPython package
and try to understand how to work with it.
"""

import os
import time
from git import Repo, Commit
from py.src.commitnode import CommitList

class GitApi:

    def __init__(self, repo_path):
        self._repo_path = repo_path
        self._repo = Repo(repo_path)
        self.nodes = {}
        self._map = {}
        self.edges = []

    def is_bare(self) ->bool:
        return self._repo.bare

    def get_history(self):
        heads = self._repo.heads
        master = heads.master
        log = master.log()
        print(log)

    def get_file_history(self, file_path):
        history = list(self._repo.iter_commits(paths=file_path))
        for commit in history:
            print("\nAuthor: {} \n Commit date: {} \n Message: {} with sha: {} "
                  .format(commit.author,
                          time.strftime("%a, %d %b %Y %H:%M", time.localtime(commit.committed_date)),
                          commit.message,
                          commit.hexsha))

    def create_history_graph(self, file_path):
        history = list(self._repo.iter_commits(paths=file_path))

        # wrapping commit in Commit node object
        k = 1
        for commit in history:
            if commit.hexsha not in self._map:
                self._map[commit.hexsha] = k
                self.nodes[k] = self._commit_2_dict(commit)
                k += 1
        for commit in history:
            from_id = self._map[commit.hexsha]
            for parent in commit.parents:
                if parent.hexsha in self._map:
                    to_id = self._map[parent.hexsha]
                    self.edges.append((from_id, to_id))

        print(self._map)
        print(self.edges)



    def _commit_2_dict(self, commit: Commit):
        result = {}
        result.time = time.localtime(commit.committed_date)
        result.parents = commit.parents
        result.message = commit.message
        result.author = commit.author
        result.index = 0
        result.id = id
        return result





if __name__ == '__main__':

    # loading git repo
    # working_directory = os.getcwd()
    # understand how to get the repo path automatically
    working_directory = "F:/Users/avaknin119870/Documents/Projects/treegit"
    working_directory = "F:/views/g/mono_repo_1"
    file_path = "F:/views/g/mono_repo_1/Qmatlab_util/source/tool/Aviv/MDM_Calibration_Toolbox/Modules/DM_Open/DM_Open.m"
    repo = Repo(working_directory)
    print(repo)