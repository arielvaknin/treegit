
class BackEnd:

    def file_info(self, file_name: str) -> (dict, list):

        opt1 = file_name.find('coloredbar.m')

        if opt1 != -1:
            nodes = [
                {'id': 1, 'hash_key': '5dcf0b8a3b1', 'user_name': 'Ariel Vaknin', 'commit_date': '19/3/2018',
                 'commit_msg': 'Merge branch "dev/akhare156797/my66task" into pub/main_wf/main'},
                {'id': 2, 'hash_key': '9af61fa9fe4', 'user_name': 'Ariel Vaknin', 'commit_date': '11/1/2019',
                 'commit_msg': 'BUG fix'},
                {'id': 3, 'hash_key': '24a67c6f528', 'user_name': 'Michael Farjon', 'commit_date': '8/2/2019',
                 'commit_msg': 'Small ECR - fix frequency issue'},
                {'id': 4, 'hash_key': 'aa5c7a426fb', 'user_name': 'Ariel Vaknin', 'commit_date': '1/4/2019',
                 'commit_msg': ' update Assist scenarios to work with IP and CAD'}
            ]
            edges = [(1, 2), (2, 3), (3, 4), (2, 4)]
        else:
            nodes = [
                {'id': 1, 'hash_key': '5dcf0b8a3b1', 'user_name': 'Moshe Rabenu', 'commit_date': '19/3/2018',
                 'commit_msg': 'Boker Tiv'},
                {'id': 2, 'hash_key': '9af61fa9fe4', 'user_name': 'Ariel Sharon', 'commit_date': '11/1/2019',
                 'commit_msg': 'Lama lo?'},
                {'id': 3, 'hash_key': '24a67c6f528', 'user_name': 'Michael The Angel', 'commit_date': '8/2/2019',
                 'commit_msg': 'Very very rich'},
                {'id': 4, 'hash_key': 'aa5c7a426fb', 'user_name': '1st Adam', 'commit_date': '1/4/2019',
                 'commit_msg': 'Going to vacation'}
            ]
            edges = [(1, 2), (2, 3), (3, 4), (2, 4)]





        return nodes, edges

