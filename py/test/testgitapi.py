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