from flask import Flask, request, session
from py.src.gitapi import GitApi
import json
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)


def manipulate_nodes(nodes, category):
    new_nodes = []
    for node in nodes:
        new_nodes.append({'id': node['id'], 'user_name': node['user_name'], 'category': node[category]})
    return new_nodes


@app.route('/')
def index():
    return 'TreeView: use the next notation in URL: \n /file_info/filePath?<full file name>'


@app.route('/commit_info/<inner_id>', methods=['GET', 'SET'])
def commit_info(inner_id):
    if 'nodes' in session:
        nodes = session['nodes']
        if int(inner_id) == 0 or int(inner_id) > len(nodes):
            return 'invalid commit id number'
        return json.dumps(nodes[int(inner_id)-1])
    else:
        return 'Commit info does not exists because file info does not exits'


@app.route('/file_info')  # Query String to get fileInfo
def file_info():
    file_path = request.args.get('filePath', None)
    category = request.args.get('category',  'commit_date')

    if file_path is None:
        return 'filePath not supplied!'

    if category not in ['hash_key', 'commit_date', 'commit_msg']:
        return f'Error: Category "{category}" not supported!'

    # Strip file_path from PreFix till Qmatlab_util
    # file_path = file_path[file_path.find('Qmatlab_util'):]

    if 'file_path' not in session:
        session['file_path'] = file_path

        git_api = GitApi(file_path)        # git_api.get_file_history(file_path)git_api.create_history_graph(file_path)
        edges, nodes = git_api.get_file_history()
        # be = BackEnd()
        # nodes, edges = be.file_info(file_path)

        session['nodes'] = nodes
        session['edges'] = edges

    else:
        nodes = session['nodes']
        edges = session['edges']

    # Manipulate nodes to get only relevant fields by Category
    new_nodes = manipulate_nodes(nodes, category)

    nodes_json = json.dumps(new_nodes)
    edges_json = json.dumps(edges)
    all_user_names_json = json.dumps(list([i['user_name'] for i in nodes]))

    return  nodes_json, edges_json, all_user_names_json


@app.route('/commitsCompare')  # Query String to run File Compare
def file_info():
    if 'nodes' in session and 'file_path' in session:
        id1 = request.args.get('id1', None)
        id2 = request.args.get('id2', None)
        if id1 is None or id2 is None:
            return 'Must supply id for 2 files to compare!'

        nodes = session['nodes']

        id1_hash = [i['hash_key'] for i in nodes if i['id'] == id1]
        id2_hash = [i['hash_key'] for i in nodes if i['id'] == id2]

        git_api = GitApi(session['file_path'])
        # git_api._print_diff_bc(id1_hash[0], id2_hash[0])
    else:
        return 'Commit info does not exists because file info does not exits'


if __name__ == "__main__":
    app.run(debug=True)


