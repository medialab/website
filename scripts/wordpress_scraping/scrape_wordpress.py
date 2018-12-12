import re
import os
import math
import json
import requests
from bs4 import BeautifulSoup
from credentials import LOG, PWD
from pprint import pprint

LOGIN_URL = "http://medialab-dev.sciences-po.fr/wp-login.php"
ADMIN_URL = "http://medialab-dev.sciences-po.fr/wp-admin/edit.php"

PROJETS_URL = ADMIN_URL + "?post_type=projets"
PUBLICATIONS_URL = ADMIN_URL + "?post_type=publications"
BLOG_URL = ADMIN_URL + "?post_type=blog"
PEOPLE_URL = ADMIN_URL + "?post_type=people"


def scrape_projet(s, projet):
    projet_url = projet['href']
    projet_id = int(''.join(list(filter(str.isdigit, projet_url))))
    projet_name = "PROJET_" + str(projet_id)
    projet_soup = BeautifulSoup(s.get(projet_url).text, 'html.parser')

    # SCRAPING TEXT
    text = projet_soup.find(
        'div', attrs={"id": "wp-content-editor-container"}).get_text()
    if not "[:fr]" in text:
        text_en = re.findall(r"(?s)(?<=\[:en\])(.*)", text)[0]
        text_fr = ""
    elif not "[:en]" in text:
        text_en = ""
        text_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", text)[0]
    else:
        text_en = re.findall(r"(?s)(?<=\[:en\])(.*)(?=\[:fr\])", text)[0]
        text_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", text)[0]
    text_en = text_en.replace("[:]", "")
    text_fr = text_fr.replace("[:]", "")

    # SCRAPING TITLE
    title = projet_soup.find('input', attrs={"id": "title"}).get('value')
    if not "[:fr]" in title:
        if not "[:en]" in title:
            title_en = title
            title_fr = title
        else:
            title_en = re.findall(r"(?s)(?<=\[:en\])(.*)", title)[0]
            title_fr = ""
    elif not "[:en]" in title:
        title_en = ""
        title_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", title)[0]
    else:
        title_en = re.findall(r"(?s)(?<=\[:en\])(.*)(?=\[:fr\])", title)[0]
        title_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", title)[0]
    title_en = title_en.replace("[:]", "")
    title_fr = title_fr.replace("[:]", "")
    permalink = projet_soup.select(
        "#sample-permalink > a")[0].get('href')

    # SCRAPING EXCERPT
    excerpt = projet_soup.find(
        'textarea', attrs={"id": "excerpt"}).get_text()
    if excerpt is None:
        excerpt_en = None
        excerpt_fr = None
    else:
        if not "[:fr]" in excerpt:
            if not "[:en]" in excerpt:
                excerpt_en = excerpt
                excerpt_fr = excerpt
            else:
                excerpt_en = re.findall(r"(?s)(?<=\[:en\])(.*)", excerpt)[0]
                excerpt_fr = ""
        elif not "[:en]" in excerpt:
            excerpt_en = ""
            excerpt_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", excerpt)[0]
        else:
            excerpt_en = re.findall(
                r"(?s)(?<=\[:en\])(.*)(?=\[:fr\])", excerpt)[0]
            excerpt_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", excerpt)[0]
        excerpt_en = excerpt_en.replace("[:]", "")
        excerpt_fr = excerpt_fr.replace("[:]", "")

    # SCRAPING CUSTOM FIELDS
    custom_fields = []
    for field in projet_soup.select("td > input"):
        if "-key" in field.get('id'):
            result_field = {}
            key = field.get('value')
            value = projet_soup.find(
                "textarea", attrs={"id": field.get('id')[:-3] + "value"}).get_text()
            result_field[key] = value
            custom_fields.append(result_field)

    date = projet_soup.select(
        "#timestamp > b")[0].get_text()

    # for div in projet_soup.select(
    #         "#side-sortables > div"):
    #     print(div.get('id'))

    # for category in projet_soup.select("#categorychecklist > li"):
    #     print(category.get_text())
    try:
        image = projet_soup.select(".thickbox > img")[0].get('src')
    except:
        image = None

    json_result = {}
    json_result["_id"] = projet_id
    json_result["type"] = "projet"
    json_result["admin_link"] = projet_url
    json_result["title_en"] = title_en
    json_result["title_fr"] = title_fr
    json_result["date"] = date
    json_result["text_en"] = text_en
    json_result["text_fr"] = text_fr
    json_result["permalink"] = permalink
    json_result["excerpt_en"] = excerpt_en
    json_result["excerpt_fr"] = excerpt_fr
    json_result["custom_fields"] = custom_fields
    json_result["image"] = image

    directory = os.path.join("data", "projets")
    if not os.path.exists(directory):
        os.makedirs(directory)

    with open(os.path.join(directory, projet_name + '.json'), 'w') as outfile:
        json.dump(json_result, outfile, ensure_ascii=False, indent=2)


def scrape_publication(s, publication):
    publication_url = publication['href']
    publication_id = int(''.join(list(filter(str.isdigit, publication_url))))
    publication_name = "PUBLICATION_" + str(publication_id)
    publication_soup = BeautifulSoup(
        s.get(publication_url).text, 'html.parser')

    # SCRAPING TEXT
    text = publication_soup.find(
        'div', attrs={"id": "wp-content-editor-container"}).get_text()
    if not "[:fr]" in text:
        if not "[:en]" in text:
            text_en = text
            text_fr = text
        else:
            text_en = re.findall(r"(?s)(?<=\[:en\])(.*)", text)[0]
            text_fr = ""
    elif not "[:en]" in text:
        text_en = ""
        text_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", text)[0]
    else:
        text_en = re.findall(r"(?s)(?<=\[:en\])(.*)(?=\[:fr\])", text)[0]
        text_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", text)[0]
    text_en = text_en.replace("[:]", "")
    text_fr = text_fr.replace("[:]", "")

    # SCRAPING TITLE
    title = publication_soup.find('input', attrs={"id": "title"}).get('value')
    if not "[:fr]" in title:
        if not "[:en]" in title:
            title_en = title
            title_fr = title
        else:
            title_en = re.findall(r"(?s)(?<=\[:en\])(.*)", title)[0]
            title_fr = ""
    elif not "[:en]" in title:
        title_en = ""
        title_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", title)[0]
    else:
        title_en = re.findall(r"(?s)(?<=\[:en\])(.*)(?=\[:fr\])", title)[0]
        title_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", title)[0]
    title_en = title_en.replace("[:]", "")
    title_fr = title_fr.replace("[:]", "")
    permalink = publication_soup.select(
        "#sample-permalink > a")[0].get('href')

    # SCRAPING EXCERPT
    excerpt = publication_soup.find(
        'textarea', attrs={"id": "excerpt"}).get_text()
    if excerpt is None:
        excerpt_en = None
        excerpt_fr = None
    else:
        if not "[:fr]" in excerpt:
            if not "[:en]" in excerpt:
                excerpt_en = excerpt
                excerpt_fr = excerpt
            else:
                excerpt_en = re.findall(r"(?s)(?<=\[:en\])(.*)", excerpt)[0]
                excerpt_fr = ""
        elif not "[:en]" in excerpt:
            excerpt_en = ""
            excerpt_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", excerpt)[0]
        else:
            excerpt_en = re.findall(
                r"(?s)(?<=\[:en\])(.*)(?=\[:fr\])", excerpt)[0]
            excerpt_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", excerpt)[0]
        excerpt_en = excerpt_en.replace("[:]", "")
        excerpt_fr = excerpt_fr.replace("[:]", "")

    # SCRAPING CUSTOM FIELDS
    custom_fields = []
    for field in publication_soup.select("td > input"):
        if "-key" in field.get('id'):
            result_field = {}
            key = field.get('value')
            value = publication_soup.find(
                "textarea", attrs={"id": field.get('id')[:-3] + "value"}).get_text()
            result_field[key] = value
            custom_fields.append(result_field)

    date = publication_soup.select(
        "#timestamp > b")[0].get_text()

    people = [name.strip() for name in publication_soup.select(
        "#people textarea")[0].get_text().split(',')]

    publication_types = [p_type.strip() for p_type in publication_soup.select(
        "#publications_types textarea")[0].get_text().split(',')]

    tools = [tool.strip() for tool in publication_soup.select(
        "#tools textarea")[0].get_text().split(',')]

    projets = [projet.strip() for projet in publication_soup.select(
        "#projets textarea")[0].get_text().split(',')]

    try:
        image = publication_soup.select(".thickbox > img")[0].get('src')
    except:
        image = None

    json_result = {}
    json_result["_id"] = publication_id
    json_result["type"] = "publication"
    json_result["admin_link"] = publication_url
    json_result["title_en"] = title_en
    json_result["title_fr"] = title_fr
    json_result["date"] = date
    json_result["text_en"] = text_en
    json_result["text_fr"] = text_fr
    json_result["permalink"] = permalink
    json_result["excerpt_en"] = excerpt_en
    json_result["excerpt_fr"] = excerpt_fr
    json_result["custom_fields"] = custom_fields
    json_result["image"] = image
    json_result["people"] = people
    json_result["publication_types"] = publication_types
    json_result["tools"] = tools
    json_result["projets"] = projets

    directory = os.path.join("data", "publications")
    if not os.path.exists(directory):
        os.makedirs(directory)

    with open(os.path.join(directory, publication_name + '.json'), 'w') as outfile:
        json.dump(json_result, outfile, ensure_ascii=False, indent=2)


def scrape_blog(s, blog):
    blog_url = blog['href']
    blog_id = int(''.join(list(filter(str.isdigit, blog_url))))
    blog_name = "BLOG_" + str(blog_id)
    blog_soup = BeautifulSoup(s.get(blog_url).text, 'html.parser')

    # SCRAPING TEXT
    text = blog_soup.find(
        'div', attrs={"id": "wp-content-editor-container"}).get_text()
    if not "[:fr]" in text:
        if not "[:en]" in text:
            text_en = text
            text_fr = text
        else:
            text_en = re.findall(r"(?s)(?<=\[:en\])(.*)", text)[0]
            text_fr = ""
    elif not "[:en]" in text:
        text_en = ""
        text_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", text)[0]
    else:
        text_en = re.findall(r"(?s)(?<=\[:en\])(.*)(?=\[:fr\])", text)[0]
        text_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", text)[0]
    text_en = text_en.replace("[:]", "")
    text_fr = text_fr.replace("[:]", "")

    # SCRAPING TITLE
    title = blog_soup.find('input', attrs={"id": "title"}).get('value')
    if not "[:fr]" in title:
        if not "[:en]" in title:
            title_en = title
            title_fr = title
        else:
            title_en = re.findall(r"(?s)(?<=\[:en\])(.*)", title)[0]
            title_fr = ""
    elif not "[:en]" in title:
        title_en = ""
        title_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", title)[0]
    else:
        title_en = re.findall(r"(?s)(?<=\[:en\])(.*)(?=\[:fr\])", title)[0]
        title_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", title)[0]
    title_en = title_en.replace("[:]", "")
    title_fr = title_fr.replace("[:]", "")
    permalink = blog_soup.select(
        "#sample-permalink > a")[0].get('href')

    # SCRAPING EXCERPT
    excerpt = blog_soup.find(
        'textarea', attrs={"id": "excerpt"}).get_text()
    if excerpt is None:
        excerpt_en = None
        excerpt_fr = None
    else:
        if not "[:fr]" in excerpt:
            if not "[:en]" in excerpt:
                excerpt_en = excerpt
                excerpt_fr = excerpt
            else:
                excerpt_en = re.findall(r"(?s)(?<=\[:en\])(.*)", excerpt)[0]
                excerpt_fr = ""
        elif not "[:en]" in excerpt:
            excerpt_en = ""
            excerpt_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", excerpt)[0]
        else:
            excerpt_en = re.findall(
                r"(?s)(?<=\[:en\])(.*)(?=\[:fr\])", excerpt)[0]
            excerpt_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", excerpt)[0]
        excerpt_en = excerpt_en.replace("[:]", "")
        excerpt_fr = excerpt_fr.replace("[:]", "")

    # SCRAPING CUSTOM FIELDS
    custom_fields = []
    for field in blog_soup.select("td > input"):
        if "-key" in field.get('id'):
            result_field = {}
            key = field.get('value')
            value = blog_soup.find(
                "textarea", attrs={"id": field.get('id')[:-3] + "value"}).get_text()
            result_field[key] = value
            custom_fields.append(result_field)

    date = blog_soup.select(
        "#timestamp > b")[0].get_text()

    categories = []

    for category in blog_soup.select("#categorychecklist > li"):
        if "checked" in str(category):
            categories.append(category.get_text().strip())

    people = [name.strip() for name in blog_soup.select(
        "#people textarea")[0].get_text().split(',')]

    publications = [p_type.strip() for p_type in blog_soup.select(
        "#publications textarea")[0].get_text().split(',')]

    tools = [tool.strip() for tool in blog_soup.select(
        "#tools textarea")[0].get_text().split(',')]

    projets = [projet.strip() for projet in blog_soup.select(
        "#projets textarea")[0].get_text().split(',')]

    try:
        image = blog_soup.select(".thickbox > img")[0].get('src')
    except:
        image = None

    json_result = {}
    json_result["_id"] = blog_id
    json_result["type"] = "blog"
    json_result["admin_link"] = blog_url
    json_result["title_en"] = title_en
    json_result["title_fr"] = title_fr
    json_result["date"] = date
    json_result["text_en"] = text_en
    json_result["text_fr"] = text_fr
    json_result["permalink"] = permalink
    json_result["excerpt_en"] = excerpt_en
    json_result["excerpt_fr"] = excerpt_fr
    json_result["custom_fields"] = custom_fields
    json_result["image"] = image
    json_result["categories"] = categories
    json_result["people"] = people
    json_result["publications"] = publications
    json_result["tools"] = tools
    json_result["projets"] = projets

    directory = os.path.join("data", "blogs")
    if not os.path.exists(directory):
        os.makedirs(directory)

    with open(os.path.join(directory, blog_name + '.json'), 'w') as outfile:
        json.dump(json_result, outfile, ensure_ascii=False, indent=2)


def scrape_people(s, people):
    people_url = people['href']
    people_id = int(''.join(list(filter(str.isdigit, people_url))))
    people_name = "PEOPLE_" + str(people_id)
    people_soup = BeautifulSoup(s.get(people_url).text, 'html.parser')

    # SCRAPING TEXT
    text = people_soup.find(
        'div', attrs={"id": "wp-content-editor-container"}).get_text()
    if not "[:fr]" in text:
        if not "[:en]" in text:
            text_en = text
            text_fr = text
        else:
            text_en = re.findall(r"(?s)(?<=\[:en\])(.*)", text)[0]
            text_fr = ""
    elif not "[:en]" in text:
        text_en = ""
        text_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", text)[0]
    else:
        text_en = re.findall(r"(?s)(?<=\[:en\])(.*)(?=\[:fr\])", text)[0]
        text_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", text)[0]
    text_en = text_en.replace("[:]", "")
    text_fr = text_fr.replace("[:]", "")

    # SCRAPING TITLE
    title = people_soup.find('input', attrs={"id": "title"}).get('value')
    if not "[:fr]" in title:
        if not "[:en]" in title:
            title_en = title
            title_fr = title
        else:
            title_en = re.findall(r"(?s)(?<=\[:en\])(.*)", title)[0]
            title_fr = ""
    elif not "[:en]" in title:
        title_en = ""
        title_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", title)[0]
    else:
        title_en = re.findall(r"(?s)(?<=\[:en\])(.*)(?=\[:fr\])", title)[0]
        title_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", title)[0]
    title_en = title_en.replace("[:]", "")
    title_fr = title_fr.replace("[:]", "")
    permalink = people_soup.select(
        "#sample-permalink > a")[0].get('href')

    # SCRAPING EXCERPT
    excerpt = people_soup.find(
        'textarea', attrs={"id": "excerpt"}).get_text()
    if excerpt is None:
        excerpt_en = None
        excerpt_fr = None
    else:
        if not "[:fr]" in excerpt:
            if not "[:en]" in excerpt:
                excerpt_en = excerpt
                excerpt_fr = excerpt
            else:
                excerpt_en = re.findall(r"(?s)(?<=\[:en\])(.*)", excerpt)[0]
                excerpt_fr = ""
        elif not "[:en]" in excerpt:
            excerpt_en = ""
            excerpt_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", excerpt)[0]
        else:
            excerpt_en = re.findall(
                r"(?s)(?<=\[:en\])(.*)(?=\[:fr\])", excerpt)[0]
            excerpt_fr = re.findall(r"(?s)(?<=\[:fr\])(.*)", excerpt)[0]
        excerpt_en = excerpt_en.replace("[:]", "")
        excerpt_fr = excerpt_fr.replace("[:]", "")

    # SCRAPING CUSTOM FIELDS
    custom_fields = []
    for field in people_soup.select("td > input"):
        if "-key" in field.get('id'):
            result_field = {}
            key = field.get('value')
            value = people_soup.find(
                "textarea", attrs={"id": field.get('id')[:-3] + "value"}).get_text()
            result_field[key] = value
            custom_fields.append(result_field)

    date = people_soup.select(
        "#timestamp > b")[0].get_text()

    try:
        image = people_soup.select(".thickbox > img")[0].get('src')
    except:
        image = None

    json_result = {}
    json_result["_id"] = people_id
    json_result["type"] = "people"
    json_result["admin_link"] = people_url
    json_result["title_en"] = title_en
    json_result["title_fr"] = title_fr
    json_result["date"] = date
    json_result["text_en"] = text_en
    json_result["text_fr"] = text_fr
    json_result["permalink"] = permalink
    json_result["excerpt_en"] = excerpt_en
    json_result["excerpt_fr"] = excerpt_fr
    json_result["custom_fields"] = custom_fields
    json_result["image"] = image

    directory = os.path.join("data", "people")
    if not os.path.exists(directory):
        os.makedirs(directory)

    with open(os.path.join(directory, people_name + '.json'), 'w') as outfile:
        json.dump(json_result, outfile, ensure_ascii=False, indent=2)


def scrape_all():
    with requests.Session() as s:
        post = s.post(LOGIN_URL, data={'log': LOG, 'pwd': PWD})

        projets_soup = BeautifulSoup(s.get(PROJETS_URL).text, 'html.parser')
        publications_soup = BeautifulSoup(
            s.get(PUBLICATIONS_URL).text, 'html.parser')
        blog_soup = BeautifulSoup(s.get(BLOG_URL).text, 'html.parser')
        people_soup = BeautifulSoup(s.get(PEOPLE_URL).text, 'html.parser')

        # SCRAPE PROJETS
        nb_projets = int(projets_soup.find(
            'span', attrs={"class": "count"}).get_text()[1:-1])
        nb_pages = math.ceil(nb_projets/20)
        for page in range(1, nb_pages + 1):
            projets_soup = BeautifulSoup(
                s.get(PROJETS_URL + "&paged=" + str(page)).text, 'html.parser')
            for projet in projets_soup.find_all('a', attrs={"class": "row-title"}):
                print("Scraping projet", projet['href'])
                scrape_projet(s, projet)

        # SCRAPE PUBLICATIONS
        nb_publications = int(publications_soup.find(
            'span', attrs={"class": "count"}).get_text()[1:-1])
        nb_pages = math.ceil(nb_publications/20)
        for page in range(1, nb_pages + 1):
            publications_soup = BeautifulSoup(
                s.get(PUBLICATIONS_URL + "&paged=" + str(page)).text, 'html.parser')
            for publication in publications_soup.find_all('a', attrs={"class": "row-title"}):
                print("Scraping publication", publication['href'])
                scrape_publication(s, publication)

        # SCRAPE PEOPLE
        nb_people = int(people_soup.find(
            'span', attrs={"class": "count"}).get_text()[1:-1])
        nb_pages = math.ceil(nb_people/20)
        for page in range(1, nb_pages + 1):
            people_soup = BeautifulSoup(
                s.get(PEOPLE_URL + "&paged=" + str(page)).text, 'html.parser')
            for people in people_soup.find_all('a', attrs={"class": "row-title"}):
                print("Scraping people", people['href'])
                scrape_people(s, people)

        # SCRAPE BLOGS
        nb_blogs = int(blog_soup.find(
            'span', attrs={"class": "count"}).get_text()[1:-1])
        nb_pages = math.ceil(nb_blogs/20)
        for page in range(1, nb_pages + 1):
            blog_soup = BeautifulSoup(
                s.get(BLOG_URL + "&paged=" + str(page)).text, 'html.parser')
            for blog in blog_soup.find_all('a', attrs={"class": "row-title"}):
                print("Scraping blog", blog['href'])
                scrape_blog(s, blog)


if __name__ == '__main__':
    scrape_all()
