import csv
import json

if __name__ == '__main__':
    with open('jlptn5.csv', encoding='utf-8') as csvFile:
        csvFileReader = csv.reader(csvFile)
        count = 1
        jsonArray = []
        for row in csvFileReader:
            jsonItem = {}
            jsonItem['id'] = count
            if row[0] == '':
                jsonItem['question'] = row[1]
            else:
                jsonItem['question'] = row[0]
                jsonItem['questionNotes'] = row[1]
            jsonItem['answer'] = row[2]

            jsonArray.append(jsonItem)

            count += 1

        with open('jlptn5.json', 'w', encoding='utf-8') as writtenFile:
            jsonData = {}
            jsonData['items'] = jsonArray
            json.dump(jsonData, writtenFile)
        