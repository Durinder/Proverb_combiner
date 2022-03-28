import json

def valid_proverb(line: str) -> int:
    trimmed = line.split(' (', 1)[0]
    if len(trimmed.split(',')) == 2 and len(trimmed.split(';')) == 1 and len(trimmed.split('.')) == 2 and len(trimmed.split(':')) == 1:
        return 1
    return 0

def get_proverbs() -> list:
    proverbs = []
    with open('raw_data.txt') as f:
        for line in f:
            if valid_proverb(line):
                proverb = line.split(' (', 1)[0].strip().split(',')
                proverb[1] = proverb[1].strip()
                location = line.split(') (')
                if len(location) == 2:
                    location = location[0].split('(')[1]
                else:
                    location = ""
                proverbs.append({'content': proverb, 'location': location})
    return proverbs

if __name__=='__main__':
    proverbs = get_proverbs()
    obj = {'proverbs': proverbs}
    json_object = json.dumps(obj, ensure_ascii=False, indent=2)
    with open("db.json", "w") as outfile:
        outfile.write(json_object)