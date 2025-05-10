import requests
from bs4 import BeautifulSoup
import os

def main():
    # Create output directory
    output_dir = 'output'
    os.makedirs(output_dir, exist_ok=True)
    
    # Base URL
    base_url = "https://www.banksodeefc.com/teams/211103/fixtures-results"
    
    # Season IDs from the previous run
    seasons = [
        {"id": "91607", "name": "2024/25 season"},
        {"id": "87216", "name": "2023/24 season"},
        {"id": "83636", "name": "2022/23 season"},
        {"id": "78156", "name": "2021/22 season"},
        {"id": "74623", "name": "2020/21 season"},
        {"id": "67716", "name": "2019/20 season"},
        {"id": "54263", "name": "2018/2019 Season"},
        {"id": "58857", "name": "2017/2018 Season"},
        {"id": "58856", "name": "2016/2017 Season"},
        {"id": "58855", "name": "2015/2016 Season"},
        {"id": "58854", "name": "2014/2015 Season"},
        {"id": "58853", "name": "2013/2014 Season"},
        {"id": "58850", "name": "2012/2013 Season"},
        {"id": "58848", "name": "2011/2012 Season"},
        {"id": "58846", "name": "2010/2011 Season"},
        {"id": "58845", "name": "2009/2010 Season"}
    ]
    
    # Choose a recent season for analysis
    season = seasons[1]  # 2023/24 season
    
    print(f"Fetching HTML for {season['name']} (ID: {season['id']})...")
    
    # Fetch the HTML
    url = f"{base_url}?season={season['id']}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    response = requests.get(url, headers=headers)
    print(f"Response status code: {response.status_code}")
    
    # Save the complete HTML
    html_file = f"{output_dir}/season_{season['id']}_full.html"
    with open(html_file, "w", encoding="utf-8") as f:
        f.write(response.text)
    
    print(f"Saved HTML to {html_file}")
    
    # Parse with BeautifulSoup to look for a specific pattern
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Look for specific elements we saw in screenshots
    print("Analyzing HTML structure...")
    
    # Print the first div with a date-like pattern
    date_divs = soup.find_all(text=lambda text: text and re.search(r'(SUN|MON|TUE|WED|THU|FRI|SAT),?\s+\d{1,2}\s+(JUL|AUG|SEP|OCT|NOV|DEC|JAN|FEB|MAR|APR|MAY|JUN)', text, re.IGNORECASE))
    
    if date_divs:
        print(f"Found {len(date_divs)} elements with date patterns")
        for i, div in enumerate(date_divs[:3]):  # Show first 3 examples
            parent = div.parent
            parent_html = str(parent)
            print(f"\nDate Example {i+1}:")
            print(f"Text: {div.strip()}")
            print(f"Parent HTML snippet: {parent_html[:200]}...")
    else:
        print("No date elements found.")
    
    # Look for elements with team names and scores
    score_divs = soup.find_all(text=lambda text: text and re.search(r'\d+\s*[-:]\s*\d+', text))
    
    if score_divs:
        print(f"\nFound {len(score_divs)} elements with score patterns")
        for i, div in enumerate(score_divs[:3]):  # Show first 3 examples
            parent = div.parent
            parent_html = str(parent)
            print(f"\nScore Example {i+1}:")
            print(f"Text: {div.strip()}")
            print(f"Parent HTML snippet: {parent_html[:200]}...")
    else:
        print("\nNo score elements found.")

if __name__ == "__main__":
    import re  # Added import here for regex
    main()