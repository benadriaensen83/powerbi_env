import pandas as pd
import json

lines = pd.read_csv('lines.csv')
stationframe = pd.read_csv('stations.csv')

stationdetails = []
stations = []

master = {'stations': {}, 'lines': []}

for i in range(len(stationframe)):
    master['stations'][stationframe['stations'][i]] = {'label': stationframe['stationlabel'][i]}

distinct_lines = lines.drop_duplicates(['line']).reset_index()
for i in range(len(distinct_lines)):
    coordinates = []
    coordinates.append(int(distinct_lines['shiftCoordx'][i]))
    coordinates.append(int(distinct_lines['shiftCoordy'][i]))
    master['lines'].append(
        {'name': distinct_lines['line'][i], 'color': distinct_lines['color'][i], 'shiftCoords': coordinates,
         'nodes': []})
    current_line = master['lines'][i]['name']

    current_line_details = lines[lines['line'] == current_line].reset_index()
    nodes = []
    for j in current_line_details.index:
        nodes_coords = []

        name = current_line_details['nodes'][j]
        labelPos = current_line_details['labelPos'][j]
        stationlookup = stationframe[stationframe['stations'] == name].reset_index()
        if (len(stationlookup)) > 0:
            nodes_coords.append(int(stationlookup['stationx'][0]))
            nodes_coords.append(int(stationlookup['stationy'][0]))
        else:

            nodes_coords.append(int(current_line_details['coordsx'][j]))
            nodes_coords.append(int(current_line_details['coordsy'][j]))

        nodes.append({'coords': nodes_coords, 'name': name, 'labelPos': labelPos})

    master['lines'][i]['nodes'] = nodes

print(json.dumps(master, indent=4, sort_keys=True))
