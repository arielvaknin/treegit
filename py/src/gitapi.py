"""
I will use this file to test the gitPython package
and try to understand how to work with it.
"""

import os
import time
from git import Repo, Commit


class GitApi:

    def __init__(self, repo_path):
        self._repo_path = repo_path
        self._repo = Repo(repo_path)
        self.nodes = list()
        self._map = {}
        self.edges = []

    def is_bare(self) ->bool:
        return self._repo.bare

    def get_history(self):
        heads = self._repo.heads
        master = heads.master
        log = master.log()
        print(log)

    def _fill_map(self, history):
        k = 1
        for commit in history:
            if commit.hexsha not in self._map:
                self._map[commit.hexsha] = k
                self.nodes.append(self._commit_2_dict(commit, k))
                k += 1

    def get_file_history(self, file_path):
        history_base = list(self._repo.iter_commits(paths=file_path))

        self._fill_map(history_base)
        for commit in history_base:
            self._find_parents(commit, file_path)

        print(self.edges)

    def _find_parents(self, child: Commit, file_path):
        history = list(child.iter_parents(paths=file_path))
        from_id = self._map[child.hexsha]

        if len(history) >= 1:
            parent_1 = history[0]
            to_id = self._map[parent_1.hexsha]
            self.edges.append( (from_id, to_id))

            if len(history) >= 2:
                parent_2 = history[1]

                hist_p_1 = list(parent_1.iter_parents( paths=file_path))
                if parent_2 not in hist_p_1:
                    to_id = self._map[parent_2.hexsha]
                    self.edges.append((from_id, to_id))







    def _commit_2_dict(self, commit: Commit, id):
        result = {}
        result['hash_key'] = commit.hexsha
        t = time.localtime(commit.committed_date)
        result['commit_date'] = "{}/{}/{}".format(t.tm_mday, t.tm_mon, t.tm_year)
        result['parents'] = [x.hexsha for x in commit.parents]
        result['commit_msg'] = commit.message
        result['user_name'] = str(commit.author)
        result['id'] = id
        return result





if __name__ == '__main__':

    working_directory = "F:/Users/avaknin119870/Documents/Projects/treegit"
    working_directory = "F:/views/g/mono_repo_1"
    file_path = "F:/views/g/mono_repo_1/Qmatlab_util/source/tool/Aviv/MDM_Calibration_Toolbox/Modules/DM_Open/DM_Open.m"
    git_api = GitApi(working_directory)
    # git_api.get_file_history(file_path)git_api.create_history_graph(file_path)
    git_api.get_file_history(file_path)
    print(git_api.nodes)
