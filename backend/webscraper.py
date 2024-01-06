from bs4 import BeautifulSoup
import requests
import re

class SoupMaker:

    def __init__(self, link) -> None:
        self.link = link
        self.title = 'Untitled'
        self.project_link = None
        self.image_link = None
        self.repo_link = None


    def get_projects(self):
        html_text = requests.get(self.link).text
        #print(html_text)
        soup = BeautifulSoup(html_text, 'lxml')
        projects = soup.find_all('a', class_='block-wrapper-link fade link-to-software')
        for project in projects:

            title_div = project.find('div', class_='software-entry-name entry-body')
            title_h5 = title_div.find('h5') if title_div else None
            title = title_h5.text.strip() if title_h5 else "Untitled"

            image_alt = project.find('img alt', class_="software_thumbnail_image image-replacement")


            print('--------------------------------------------------------------------')
            print(f'Title: {title}')
            print(f'Image_Alt: {image_alt}')
            print('--------------------------------------------------------------------')




link = 'https://developerweek-2023-hackathon.devpost.com/project-gallery'
soup_obj = SoupMaker(link)
soup_obj.get_projects()

#title, project link, image link, repo link