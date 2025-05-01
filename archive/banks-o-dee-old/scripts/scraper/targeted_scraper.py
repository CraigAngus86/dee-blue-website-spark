import requests
from bs4 import BeautifulSoup
import re
import json
import csv
import os
from datetime import datetime

def save_to_csv(data, filename):
    """Save data to CSV file."""
    if not data or len(data) == 0:
        print(f"No data to save to {filename}")
        return
    
    fieldnames = data[0].keys()
    
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)
    
    print(f"Saved {len(data)} records to {filename}")

def extract_fixtures_from_html(html_content, season_id, season_name):
    """Extract fixture data from HTML content."""
    soup = BeautifulSoup(html_content, 'html.parser')
    fixtures = []
    
    # First, find all date elements
    date_spans = soup.find_all('span', class_=lambda c: c and 'bBUbj' in c)
    
    print(f"Found {len(date_spans)} date elements")
    
    # For each date, try to find the associated fixtures
    for date_span in date_spans:
        date_text = date_span.text.strip()
        print(f"Processing date: {date_text}")
        
        # Try to extract a match date
        try:
            # Pattern like "Sun, 02 July"
            date_match = re.match(r'([a-z]+),?\s+(\d{1,2})\s+([a-z]+)', date_text, re.IGNORECASE)
            if date_match:
                day = date_match.group(2).zfill(2)  # Ensure two digits
                month_name = date_match.group(3)
                
                # Convert month name to number
                month_map = {
                    'january': '01', 'february': '02', 'march': '03', 'april': '04',
                    'may': '05', 'june': '06', 'july': '07', 'august': '08',
                    'september': '09', 'october': '10', 'november': '11', 'december': '12',
                    'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04', 'may': '05',
                    'jun': '06', 'jul': '07', 'aug': '08', 'sep': '09', 'oct': '10',
                    'nov': '11', 'dec': '12'
                }
                month = month_map.get(month_name.lower(), '01')
                
                # Determine year based on season and month
                # For months Aug-Dec, use first year in season (e.g., 2023 for 2023/24)
                # For months Jan-July, use second year in season (e.g., 2024 for 2023/24)
                if '/' in season_name:
                    season_years = season_name.split('/')
                    first_year = season_years[0]
                    if len(first_year) == 4:  # "2023/24" format
                        second_year = '20' + season_years[1]
                    else:  # "2023/2024" format
                        second_year = season_years[1]
                    
                    if int(month) >= 8:  # Aug-Dec
                        year = first_year
                    else:  # Jan-July
                        year = second_year
                else:
                    # If season format is unclear, use current year as fallback
                    year = datetime.now().year
                
                match_date = f"{year}-{month}-{day}"
                print(f"  Extracted date: {match_date}")
                
                # Now try to find the match details for this date
                # First look for a parent container that might contain all fixtures for this date
                parent_container = date_span.find_parent('div')
                
                # Walk up the DOM to find a container that might hold all fixtures for this date
                current_element = date_span
                for _ in range(5):  # Try up to 5 levels up
                    if current_element.parent:
                        current_element = current_element.parent
                    else:
                        break

                # Now look for team names and scores in this container
                # Based on the screenshots, we're looking for team names on either side of a score
                
                # Search nearby elements
                nearby_elements = []
                
                # Look at siblings
                if parent_container:
                    nearby_elements = parent_container.find_all(['div', 'span'])
                
                # Look for home and away team names
                home_team = None
                away_team = None
                home_score = None
                away_score = None
                venue = None
                competition = "Unknown"
                status = "unknown"
                
                # Print all text elements in this container for debugging
                all_text_elements = []
                if parent_container:
                    for elem in parent_container.find_all(text=True):
                        text = elem.strip()
                        if text:
                            all_text_elements.append(text)
                
                print(f"  Text elements found: {all_text_elements}")
                
                # Look for text that might be "Friendly" or "Highland League"
                for text in all_text_elements:
                    if "friendly" in text.lower():
                        competition = "Friendly"
                    elif "highland league" in text.lower():
                        competition = "Highland League"
                    elif "cup" in text.lower():
                        competition = text.strip()
                
                # Look for venue
                venue_elements = [e for e in all_text_elements if "venue" in e.lower() or "park" in e.lower()]
                if venue_elements:
                    venue_text = venue_elements[0]
                    venue_match = re.search(r'venue\s*[-:]\s*(.+)', venue_text, re.IGNORECASE)
                    if venue_match:
                        venue = venue_match.group(1).strip()
                    else:
                        venue = venue_text
                
                # Try to find team names and scores
                team_score_pattern = re.compile(r'(.*?)\s+(\d+)\s*[-:]\s*(\d+)\s+(.*)')
                score_found = False
                
                for text in all_text_elements:
                    match = team_score_pattern.search(text)
                    if match:
                        home_team = match.group(1).strip()
                        home_score = int(match.group(2))
                        away_score = int(match.group(3))
                        away_team = match.group(4).strip()
                        status = "completed"
                        score_found = True
                        break
                
                # If no score found, look for teams separated by "v" or "vs"
                if not score_found:
                    vs_pattern = re.compile(r'(.*?)\s+(?:v|vs|versus)\s+(.*)')
                    for text in all_text_elements:
                        match = vs_pattern.search(text)
                        if match:
                            home_team = match.group(1).strip()
                            away_team = match.group(2).strip()
                            status = "upcoming"
                            break
                
                # If we have home and away teams, create a fixture
                if home_team and away_team:
                    fixture = {
                        "date": match_date,
                        "home_team": home_team,
                        "away_team": away_team,
                        "competition": competition,
                        "venue": venue,
                        "season": season_id,
                        "status": status,
                        "is_home": "Banks o' Dee" in home_team
                    }
                    
                    if status == "completed" and home_score is not None and away_score is not None:
                        fixture["home_score"] = home_score
                        fixture["away_score"] = away_score
                    
                    fixtures.append(fixture)
                    print(f"  Added fixture: {home_team} vs {away_team}")
                else:
                    # If we couldn't find team names, try another approach
                    # Look for elements that might contain team names
                    for elem in nearby_elements:
                        text = elem.get_text().strip()
                        if "Banks o' Dee" in text:
                            print(f"  Found Banks o' Dee in: {text}")
                        if " v " in text or " vs " in text:
                            print(f"  Found vs in: {text}")
        except Exception as e:
            print(f"  Error processing date {date_text}: {e}")
    
    return fixtures

def main():
    # Create output directory
    output_dir = 'output'
    os.makedirs(output_dir, exist_ok=True)
    
    # Season IDs from your previous run
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
    
    all_fixtures = []
    
    # Process one season for testing
    season = seasons[1]  # 2023/24 season
    
    print(f"Processing season: {season['name']} (ID: {season['id']})...")
    
    # Check if we have the HTML file saved
    html_file = f"{output_dir}/season_{season['id']}_full.html"
    
    if os.path.exists(html_file):
        print(f"Reading HTML from file: {html_file}")
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
    else:
        print(f"Fetching HTML from website")
        base_url = "https://www.banksodeefc.com/teams/211103/fixtures-results"
        url = f"{base_url}?season={season['id']}"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers)
        html_content = response.text
        
        # Save the HTML for future use
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(html_content)
    
    # Extract fixtures from the HTML
    fixtures = extract_fixtures_from_html(html_content, season['id'], season['name'])
    
    print(f"Extracted {len(fixtures)} fixtures for {season['name']}")
    
    # Save fixtures to CSV
    if fixtures:
        # Save individual season
        csv_file = f"{output_dir}/season_{season['id']}_fixtures.csv"
        save_to_csv(fixtures, csv_file)
        
        # Add to all fixtures
        all_fixtures.extend(fixtures)
    
    # Save all fixtures to CSV
    if all_fixtures:
        all_csv_file = f"{output_dir}/all_fixtures.csv"
        save_to_csv(all_fixtures, all_csv_file)

if __name__ == "__main__":
    main()