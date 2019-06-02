from unittest import TestCase
from py.src.gitapi import GitApi


class TestGitApi(TestCase):
    def test_init(self):
        working_directory = "F:/Users/avaknin119870/Documents/Projects/treegit"

        git_api = GitApi(working_directory)

        self.assertFalse(git_api.is_bare())
        print(str(git_api._repo))

    def test_get_history(self):
        working_directory = "F:/Users/avaknin119870/Documents/Projects/treegit"

        git_api = GitApi(working_directory)
        git_api.get_history()

    def test_get_file_history(selfs):
        working_directory = "F:/Users/avaknin119870/Documents/Projects/treegit"
        file_path = "F:/Users/avaknin119870/Documents/Projects/treegit/py/src/gitapi.py"

        working_directory = "F:/views/g/mono_repo_1"
        file_path = "F:/views/g/mono_repo_1/Qmatlab_util/source/tool/Aviv/MDM_Calibration_Toolbox/Modules/DM_Open/DM_Open.m"

        git_api = GitApi(working_directory)
        git_api.get_file_history(file_path)

    def test_get_file_history2(selfs):
        working_directory = "F:/Users/avaknin119870/Documents/Projects/treegit"
        file_path = "F:/Users/avaknin119870/Documents/Projects/treegit/py/src/gitapi.py"

        working_directory = "F:/views/g/mono_repo_1"
        file_path = "F:/views/g/mono_repo_1/Qmatlab_util/source/tool/Aviv/MDM_Calibration_Toolbox/Modules/DM_Open/DM_Open.m"

        git_api = GitApi(working_directory)
        git_api.create_history_graph(file_path)