import requests
from bs4 import BeautifulSoup

html = '''
<a class="table-row premiumProfile-intco-medical-technology active" style="" uri="intco-medical-technology" canexpand="" target="#_blank" rel="noopener noreferrer" 
href="https://www.forbes.com/companies/intco-medical-technology/?list=global2000" aria-label="Intco Medical Technology" searchfilter="intco medical technology" dropfilter="china">
<div class="rank first table-cell    rank">1954.</div>
<div class="organizationName second table-cell    name">Intco Medical Technology</div>
<div class="country  table-cell    country">China</div>
<div class="revenue  table-cell    sales ">$2.84 B</div>
<div class="profits  table-cell    profit ">$1.47 B</div>
<div class="assets  table-cell    assets ">$3.15 B</div>
<div class="marketValue  table-cell    market value ">$3.33 B</div></a>
'''

url = 'https://www.forbes.com/lists/global2000/?sh=51ab792b5ac0'
html = requests.get(url).content

soup = BeautifulSoup(html, 'html.parser')
rows = soup.find_all('a', class_='table-row')
print(len(rows))

def fixNum(snum):
	#split $, hyphen, v, M/B

	#remove dollar sign
	s = snum[1:]

	#remove hyphen, set sign
	if s[0:1] == '-':
		sign = '-'
		s = s[1:]
	else:
		sign = ''

	#set mag, remove M/B
	lens = len(s)
	mag = s[lens-1:lens]
	s = s[:lens-2]
	
	#remove period, add zeros
	list = s.split('.')
	if len(list) < 2:
		list.append('')	
	zeros = '000'[0:3-len(list[1])]
	if mag == 'M':
		s = list[0]                #remove period and after
	elif mag == 'B':
		s = f'{list[0]},{list[1]}{zeros}'  #replace period with comma, add two zeros
	else:
		s = 'error'

	nv = f'{sign}{s}'
	return nv

#def testnum(s): print(f'{s}\t{fixNum(s)}')
#testnum('$1.11 B')
#testnum('$-532.6 M')
#testnum('$160.2 M')
#testnum('$16.49 B')
#testnum('$4.2 B')
#testnum('$-48.9 M')
#testnum('$9.7 B')
#testnum('$13 B')
#quit()

#labels = [
#	'CEO', 
#	'Chairman and CEO', 
#	'President and CEO', 
#	'Chief Executive Officer'
#	'Chief Executive Officer'
#	'Executive Director', 
#	'Co-CEOs', 
#	'Chairman', 
#	'Founder, CEO and Chair', 
#	'CEO and Chair'
#]
labels = [
	'CEO', 
	'Chair', 
	'President', 
	'Chief',
	'Executive',
	'Officer',
	'Director', 
	'Founder' 
]

titles = {}

i = 0
for row in rows:
	i += 1
	if i <=1891: continue
	rank    = row.find('div', class_='rank').text
	name    = row.find('div', class_='organizationName').text
	country = row.find('div', class_='country').text
	revenue = row.find('div', class_='revenue').text
	profits = row.find('div', class_='profits').text
	assets  = row.find('div', class_='assets').text
	mvalue  = row.find('div', class_='marketValue').text

	revenue = fixNum(revenue)
	profits = fixNum(profits)
	assets  = fixNum(assets)
	mvalue  = fixNum(mvalue)

# 	urlco   = row.attrs.get('href')
# 	if not urlco:
# 		status = 'expand'
# 		uri = row.attrs.get('uri')
# 		urlco = f"https://www.forbes.com/companies/{uri}/?list=global2000"

	status = 'ok'
	uri = row.attrs.get('uri')
	urlco = f"https://www.forbes.com/companies/{uri}/?list=global2000"
	hyper = f'=hyperlink("https://www.forbes.com/companies/{uri}/?list=global2000", "{uri}")'

	page = requests.get(urlco).content
	co = BeautifulSoup(page, 'html.parser')

	# select: pass selector, returns list of what?
	# find_all: pass goofy parameters, returns list of tags
	# tags are good because they have the find methods defined

	facts = {}
	block = co.find('div', class_='person-stats')
	items = block.find_all('div', class_='listuser-block__item')
	for item in items:
		key = item.find('span', class_='profile-stats__title').text
		value = item.find('span', class_='profile-stats__text').find('span').text
		facts[key] = value
		titles[key] = 1

	industry = facts['Industry'] if 'Industry' in facts.keys() else 'na'
	found = facts['Founded'] if 'Founded' in facts.keys() else 'na'
	emp = facts['Employees'] if 'Employees' in facts.keys() else 'na'
	country = facts['Country'] if 'Country' in facts.keys() else 'na'
	hq = facts['Headquarters'] if 'Headquarters' in facts.keys() else 'na'

	ceo = 'na'
	keys = facts.keys()
	for key in keys:
		for label in labels:
			if label in key:
				ceo = facts[key]

	print(status, i, rank, name, industry, hq, country, ceo, found, emp, revenue, profits, assets, mvalue, hyper, sep='\t')

print(titles)

