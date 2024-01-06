from bs4 import BeautifulSoup
import requests
import re
import math

class SoupMaker:

    def __init__(self, link) -> None:
        self.link = link
        self.title = 'Untitled'
        self.project_link = None
        self.image_link = None
        self.repo_link = None

    def get_projects(self):

        list_of_projects = []

        html_text = requests.get(self.link + '/project-gallery').text
        soup = BeautifulSoup(html_text, 'lxml')
        pagination_info = soup.find('div', class_="pagination-info")
        num_projects = str(pagination_info.find_all('b')[1])
        num_projects = int(re.findall(r'\d+', num_projects)[0])

        projects_in_page = str(pagination_info.find_all('b')[0])
        projects_in_page = int(re.findall(r'\d+', projects_in_page)[1])
        num_pages = math.ceil(num_projects / projects_in_page)

        for page in range(num_pages):
            html_text = requests.get(self.link + '/project-gallery' + "?page=" + str(page + 1)).text

            soup = BeautifulSoup(html_text, 'lxml')
            
            projects = soup.find_all('a', class_='block-wrapper-link fade link-to-software')

            for project in projects:

                proj_link = project['href'] if 'href' in project.attrs else None

                project_html_text = requests.get(proj_link).text
                project_soup = BeautifulSoup(project_html_text, 'lxml')
                app_links = project_soup.find('nav', class_="app-links section")
                if app_links:
                    repo_links = app_links.find_all("li")
                
                    for link in repo_links:
                        tag = link.find('a')
                        repo_link = tag.get("href")
                        match = re.search("https://github.com/", repo_link)
                        
                        if match:
                            break
                        else:
                            repo_link = None

                title_div = project.find('div', class_='software-entry-name entry-body')
                title_h5 = title_div.find('h5') if title_div else None
                title = title_h5.text.strip() if title_h5 else "Untitled"

                image = project.find('img', class_="software_thumbnail_image image-replacement")
                img_src = image['src'] if image and 'src' in image.attrs else None

                project_dict = {"project_title": title, "project_image": img_src, "project_link": proj_link, "project_repo_link": repo_link}
                list_of_projects.append(project_dict)

                # print('--------------------------------------------------------------------')
                # print(f'Title: {title}')
                # print(f'Image: {img_src}')
                # print(f'Project Link: {proj_link}')
                # print(f'Repo Link: {repo_link}')
                # print('--------------------------------------------------------------------')

        return list_of_projects

#link = 'https://developerweek-2023-hackathon.devpost.com'
link = 'https://olympihacks.devpost.com/'
soup_obj = SoupMaker(link)
projects_list = soup_obj.get_projects()
print(projects_list)

#title, project link, image link, repo link