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


def scrape_slug_page(s, url):
    slugs = {}
    slugs_soup = BeautifulSoup(
        s.get(url).text, 'html.parser')

    nb_slugs = int(re.findall(r'\d+', slugs_soup.find(
        'span', attrs={"class": "displaying-num"}).get_text())[0])
    nb_pages = math.ceil(nb_slugs/20)
    for page in range(1, nb_pages + 1):
        slug_page = BeautifulSoup(
            s.get(url + "&paged=" + str(page)).text, 'html.parser')
        for row in slug_page.select('tr[id^=tag]'):
            key = row.find_all('a', attrs={
                "class": "row-title"})[0].get_text()
            value = row.find_all(
                'td', attrs={"class": "slug column-slug"})[0].get_text()
            slugs[key] = value
    return slugs


def scrape_slugs(s):
    print("Scraping slugs...")
    directory = os.path.join("data", "slugs")
    if not os.path.exists(directory):
        os.makedirs(directory)

    TOOLS_SLUGS_URL = ' http://medialab-dev.sciences-po.fr/wp-admin/edit-tags.php' + \
        '?taxonomy=tools&post_type=people'
    tools_slugs = scrape_slug_page(s, TOOLS_SLUGS_URL)

    PROJETS_SLUGS_URL = ' http://medialab-dev.sciences-po.fr/wp-admin/edit-tags.php' + \
        '?taxonomy=projets&post_type=people'
    projets_slugs = scrape_slug_page(s, PROJETS_SLUGS_URL)

    PEOPLE_SLUGS_URL = 'http://medialab-dev.sciences-po.fr/wp-admin/edit-tags.php?taxonomy=people&post_type=blog'
    people_slugs = scrape_slug_page(s, PEOPLE_SLUGS_URL)

    CATEGORIES_SLUGS_URL = 'http://medialab-dev.sciences-po.fr/wp-admin/edit-tags.php?taxonomy=category&post_type=blog'
    categories_slugs = scrape_slug_page(s, CATEGORIES_SLUGS_URL)

    PUBLICATIONS_SLUGS_URL = 'http://medialab-dev.sciences-po.fr/wp-admin/edit-tags.php?taxonomy=publications&post_type=blog'
    publications_slugs = scrape_slug_page(s, PUBLICATIONS_SLUGS_URL)

    with open(os.path.join(directory, 'tools_slugs.json'), 'w') as outfile:
        json.dump(tools_slugs, outfile, ensure_ascii=False, indent=2)
    with open(os.path.join(directory, 'projets_slugs.json'), 'w') as outfile:
        json.dump(projets_slugs, outfile, ensure_ascii=False, indent=2)
    with open(os.path.join(directory, 'people_slugs.json'), 'w') as outfile:
        json.dump(people_slugs, outfile, ensure_ascii=False, indent=2)
    with open(os.path.join(directory, 'categories_slugs.json'), 'w') as outfile:
        json.dump(categories_slugs, outfile, ensure_ascii=False, indent=2)
    with open(os.path.join(directory, 'publications_slugs.json'), 'w') as outfile:
        json.dump(publications_slugs, outfile,
                  ensure_ascii=False, indent=2)


def name_to_slug(s, name, type):
    directory = os.path.join("data", "slugs")
    if not name:
        return None
    elif type == 'tool':
        with open(os.path.join(directory, 'tools_slugs.json'), 'r') as dict_file:
            slug_dict = json.load(dict_file)
    elif type == 'projet':
        with open(os.path.join(directory, 'projets_slugs.json'), 'r') as dict_file:
            slug_dict = json.load(dict_file)
    elif type == 'people':
        # this guy doesn't have the same name in English & in French
        if name == 'François Gemenne' or name == 'François Gemmene':
            return 'francois-gemenne'
        name = name.replace("'",'’')
        with open(os.path.join(directory, 'people_slugs.json'), 'r') as dict_file:
            slug_dict = json.load(dict_file)
    elif type == 'category':
        with open(os.path.join(directory, 'categories_slugs.json'), 'r') as dict_file:
            slug_dict = json.load(dict_file)
    elif type == 'publication':
        with open(os.path.join(directory, 'publications_slugs.json'), 'r') as dict_file:
            slug_dict = json.load(dict_file)
    else:
        print("ERROR:", "'type' should be either 'tool', 'people', 'category', 'publication' or 'projet'")
    return slug_dict[name]


def scrape_tools(s):
    directory = os.path.join("data", "tools")
    if not os.path.exists(directory):
        os.makedirs(directory)
    TOOLS_URL = 'http://tools.medialab.sciences-po.fr/'
    with open(os.path.join("data", "slugs", "tools_slugs.json"), 'r') as f:
        tools_list = json.load(f)
    for key in tools_list:
        tool_url = TOOLS_URL + key + '/meta.json'
        r = requests.get(tool_url)
        with open(os.path.join(directory, key + '.json'), 'wb') as outfile:
            outfile.write(r.content)


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
    for field in custom_fields:
        key, value = next(iter(field.items()))
        json_result[key] = value
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
    if not people[0]:
        people = []
    publication_types = [p_type.strip() for p_type in publication_soup.select(
        "#publications_types textarea")[0].get_text().split(',')]
    if not publication_types[0]:
        publication_types = []
    tools = [tool.strip() for tool in publication_soup.select(
        "#tools textarea")[0].get_text().split(',')]
    if not tools[0]:
        tools = []
    projets = [projet.strip() for projet in publication_soup.select(
        "#projets textarea")[0].get_text().split(',')]
    if not projets[0]:
        projets = []

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
    for field in custom_fields:
        key, value = next(iter(field.items()))
        json_result[key] = value
    json_result["image"] = image
    json_result["people"] = [name_to_slug(s, x, 'people') for x in people]
    json_result["publication_types"] = publication_types
    json_result["tools"] = [name_to_slug(s, x, 'tool') for x in tools]
    json_result["projets"] = [name_to_slug(s, x, 'projet') for x in projets]

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
    if not people[0]:
        people = []
    publications = [p_type.strip() for p_type in blog_soup.select(
        "#publications textarea")[0].get_text().split(',')]
    if not publications[0]:
        publications = []
    tools = [tool.strip() for tool in blog_soup.select(
        "#tools textarea")[0].get_text().split(',')]
    if not tools[0]:
        tools = []
    projets = [projet.strip() for projet in blog_soup.select(
        "#projets textarea")[0].get_text().split(',')]
    if not projets[0]:
        projets = []

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
    for field in custom_fields:
        key, value = next(iter(field.items()))
        json_result[key] = value
    json_result["image"] = image
    json_result["categories"] = [name_to_slug(
        s, x, 'category') for x in categories]
    json_result["people"] = [name_to_slug(
        s, x, 'people') for x in people]
    json_result["publications"] = [
        name_to_slug(s, x, 'publication') for x in publications]
    json_result["tools"] = [name_to_slug(s, x, 'tool') for x in tools]
    json_result["projets"] = [name_to_slug(s, x, 'projet') for x in projets]

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

    tools = [tool.strip() for tool in people_soup.select(
        "#tools textarea")[0].get_text().split(',')]
    if tools[0]:
        tools_slugs = [name_to_slug(s, x, 'tool') for x in tools]
    else:
        tools_slugs = []
    projets = [projet.strip() for projet in people_soup.select(
        "#projets textarea")[0].get_text().split(',')]
    if projets[0]:
        projets_slugs = [name_to_slug(s, x, 'projet') for x in projets]
    else:
        projets_slugs = []
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
    for field in custom_fields:
        key, value = next(iter(field.items()))
        json_result[key] = value
    json_result["tools"] = tools_slugs
    json_result["projets"] = projets_slugs
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

        scrape_slugs(s)

        # SCRAPING TOOLS
        scrape_tools(s)

        # SCRAPING PROJETS
        nb_projets = int(projets_soup.find(
            'span', attrs={"class": "count"}).get_text()[1:-1])
        nb_pages = math.ceil(nb_projets/20)
        for page in range(1, nb_pages + 1):
            projets_soup = BeautifulSoup(
                s.get(PROJETS_URL + "&paged=" + str(page)).text, 'html.parser')
            for projet in projets_soup.find_all('a', attrs={"class": "row-title"}):
                print("Scraping projet", projet['href'])
                scrape_projet(s, projet)

        # SCRAPING PUBLICATIONS
        nb_publications = int(publications_soup.find(
            'span', attrs={"class": "count"}).get_text()[1:-1])
        nb_pages = math.ceil(nb_publications/20)
        for page in range(1, nb_pages + 1):
            publications_soup = BeautifulSoup(
                s.get(PUBLICATIONS_URL + "&paged=" + str(page)).text, 'html.parser')
            for publication in publications_soup.find_all('a', attrs={"class": "row-title"}):
                print("Scraping publication", publication['href'])
                scrape_publication(s, publication)

        # SCRAPING PEOPLE
        nb_people = int(people_soup.find(
            'span', attrs={"class": "count"}).get_text()[1:-1])
        nb_pages = math.ceil(nb_people/20)
        for page in range(1, nb_pages + 1):
            people_soup = BeautifulSoup(
                s.get(PEOPLE_URL + "&paged=" + str(page)).text, 'html.parser')
            for people in people_soup.find_all('a', attrs={"class": "row-title"}):
                print("Scraping people", people['href'])
                scrape_people(s, people)

        # SCRAPING BLOGS
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
