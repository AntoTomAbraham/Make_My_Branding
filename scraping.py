from selenium import webdriver
# from selenium.webdriver.edge.service import Service
# from webdriver_manager.microsoft import EdgeChromiumDriverManager
#from webdriver_manager.chrome import ChromeDriverManager
import chromedriver_autoinstaller
#from webdriver_manager.core.utils import ChromeType
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import csv

chromedriver_autoinstaller.install()
chrome_options = Options()
options = [
    "--headless",
    "--disable-gpu",
    "--window-size=1920,1200",
    "--ignore-certificate-errors",
    "--disable-extensions",
    "--no-sandbox",
    "--disable-dev-shm-usage"
]
for option in options:
    chrome_options.add_argument(option)

driver = webdriver.Chrome(options=chrome_options)

driver.get("https://www.merahoardings.com/product/60section-unipoles-delhi/")

value = driver.find_element(By.XPATH,'//*[@id="product-4701"]/div[2]/div/h1')
place = value.text

value = driver.find_element(By.XPATH,'//*[@id="product-4701"]/div[2]/div/div[1]')
details = value.text    

value = driver.find_element(By.XPATH,'//*[@id="osf-accordion-container"]/div[1]/div[2]/table/tbody/tr[2]/td[2]/a')
category = value.text

value = driver.find_element(By.XPATH,'//*[@id="osf-accordion-container"]/div[1]/div[2]/table/tbody/tr[7]/td[2]/span/strong')
landmark = value.text

value = driver.find_element(By.CLASS_NAME,'price')
price = value.text

print(place)
print(details)
print(category)
print(landmark)
print(price)

