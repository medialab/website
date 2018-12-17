import os
import re
import json
import math
import requests
from bs4 import BeautifulSoup
from credentials import LOG, PWD

LOGIN_URL = "http://medialab-dev.sciences-po.fr/wp-login.php"
MEDIA_URL = "http://medialab-dev.sciences-po.fr/wp-admin/upload.php?item=4598&mode=list"

MEDIA_FILES = os.path.join("data", "media", "downloaded_files")
MEDIA_METADATA = os.path.join("data", "media", "metadata")


def fetch_media():
    if not os.path.exists(MEDIA_FILES):
        os.makedirs(MEDIA_FILES)
    if not os.path.exists(MEDIA_METADATA):
        os.makedirs(MEDIA_METADATA)

    with requests.Session() as s:

        # LOGGING IN
        post = s.post(LOGIN_URL, data={'log': LOG, 'pwd': PWD})

        media_list_soup = BeautifulSoup(s.get(MEDIA_URL).text, 'html.parser')

        nb_media_files = int(re.findall(r'\d+', media_list_soup.find(
            'span', attrs={"class": "displaying-num"}).get_text())[0])
        nb_pages = math.ceil(nb_media_files/20)

        i = 0

        for page_number in range(1, nb_pages + 1):
            media_page = BeautifulSoup(
                s.get(MEDIA_URL + "&paged=" + str(page_number)).text, 'html.parser')
            for row in media_page.select('.has-media-icon > a'):
                i += 1
                media_link = row.get('href')
                print("Fetching media %s (n°%s/%s)" %
                      (media_link, i, nb_media_files))
                media_soup = BeautifulSoup(
                    s.get(media_link).text, 'html.parser')
                try:
                    permalink = media_soup.select(
                        '#sample-permalink > a')[0].get('href')
                except:
                    permalink = media_soup.select(
                        'a#sample-permalink')[0].get('href')
                try:
                    caption = media_soup.select('textarea#attachment_caption')[
                        0].get_text().strip('[:en]').strip('[:]')
                except:
                    caption = ""
                try:
                    alternative_text = media_soup.select('textarea#attachment_alt')[
                        0].get_text()
                except:
                    alternative_text = ""
                try:
                    description = media_soup.select('textarea#attachment_content')[
                        0].get_text()
                except:
                    description = ""
                metadata = []
                metadata_list = media_soup.select(
                    '#misc-publishing-actions > div')
                for row in metadata_list:
                    if 'misc-pub-curtime' in row.get('class'):
                        metadata.append(
                            {"uploaded_on": row.select('b')[0].get_text()})
                    if 'misc-pub-attachment' in row.get('class'):
                        file_url = row.select('input')[0].get('value')
                        metadata.append(
                            {"file_url": file_url})
                    if 'misc-pub-filename' in row.get('class'):
                        filename = row.select('strong')[0].get_text()
                        metadata.append(
                            {"filename": filename})
                    if 'misc-pub-filetype' in row.get('class'):
                        metadata.append(
                            {"file_type": row.select('strong')[0].get_text()})
                    if 'misc-pub-filesize' in row.get('class'):
                        metadata.append(
                            {"file_size": row.select('strong')[0].get_text()})
                    if 'misc-pub-dimensions' in row.get('class'):
                        metadata.append(
                            {"dimensions": row.select('span')[0].get_text()})
                json_result = {}
                json_result['permalink'] = permalink
                json_result['caption'] = caption
                json_result['alternative_text'] = alternative_text
                json_result['description'] = description
                for field in metadata:
                    key, value = next(iter(field.items()))
                    json_result[key] = value

                # SAVING THE MEDIA
                r = requests.get(file_url)
                with open(os.path.join(MEDIA_FILES, filename), 'wb') as outfile:
                    outfile.write(r.content)
                with open(os.path.join(MEDIA_METADATA, filename + '.json'), 'w') as outfile:
                    json.dump(json_result, outfile,
                              ensure_ascii=False, indent=2)

    print(i, "files fetched.")


if __name__ == '__main__':
    fetch_media()
