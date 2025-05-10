import requests
from bs4 import BeautifulSoup
import re
import json
import csv
from datetime import datetime
import time
import os

def get_season_options(url):
    """Get all available seasons from the dropdown."""
    print(f"Fetching URL: {url}")
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers)
        print(f"Response status code: {response.status_code}")
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Try various selectors for the season dropdown
        season_select = None
        
        # Method 1: Look for select by name
        season_select = soup.find('select', {'name': 'season'})
        if season_select:
            print("Found season dropdown using name='season'")
        
        # Method 2: Look for any select element
        if not season_select:
            all_selects = soup.find_all('select')
            print(f"Found {len(all_selects)} select elements")
            if all_selects:
                season_select = all_selects[0]
                print("Using first select element found")
        
        # If dropdown found, extract options
        seasons = []
        for option in season_select.find_all('option'):
            season_id = option.get('value')
            season_name = option.text.strip()
            print(f"Found option: id={season_id}, name={season_name}")
            if season_id:
                seasons.append({
                    'id': season_id,
                    'name': season_name
                })
        
        return seasons
    except Exception as e:
        print(f"Error fetching seasons: {e}")
        return []

def get_fixtures_for_season(base_url, season_id):
    """Get all fixtures for a specific season."""
    url = f"{base_url}?season={season_id}"
    print(f"Fetching fixtures from: {url}")
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers)
        print(f"Response status code: {response.status_code}")
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Save the HTML for debugging
        with open(f"output/season_{season_id}_html.txt", "w", encoding="utf-8") as f:
            f.write(soup.prettify())
        
        fixtures = []
        
        # Based on your screenshots, looking for match entries
        # Trying multiple possible HTML structures
        
        # Option 1: Modern React app structure (as seen in screenshots)
        fixture_blocks = soup.find_all('div', class_=lambda c: c and any(x in str(c) for x in ['fixture', 'match', 'game']))
        
        if not fixture_blocks:
            # Option 2: Traditional table structure
            fixture_blocks = soup.find_all('tr', class_=lambda c: c and any(x in str(c) for x in ['fixture', 'match', 'game']))
        
        # If still not found, look for any div with date-like content
        if not fixture_blocks:
            date_pattern = re.compile(r'(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}', re.IGNORECASE)
            for div in soup.find_all('div'):
                if date_pattern.search(div.get_text()):
                    fixture_blocks.append(div)
        
        print(f"Found {len(fixture_blocks)} potential fixture blocks")
        
        # If no blocks found, try extracting data from the page JSON
        if not fixture_blocks:
            # Look for fixture data in JSON format in scripts
            script_tags = soup.find_all('script', {'type': 'application/json'})
            for script in script_tags:
                try:
                    script_content = script.string
                    if script_content and any(x in script_content for x in ['fixture', 'match', 'game']):
                        data = json.loads(script_content)
                        print(f"Found match data in JSON script: {len(data)}")
                        
                        # Extract fixture data from JSON
                        # This needs to be adapted based on the actual JSON structure
                        return extract_fixtures_from_json(data, season_id)
                except Exception as e:
                    print(f"Error parsing JSON: {e}")
        
        # Look for match information blocks
        match_blocks = []
        
        # Option 1: Based on your screenshots
        for div in soup.find_all('div'):
            # Check if this div contains match information
            date_text = ""
            try:
                date_div = div.find(string=re.compile(r'(SUN|MON|TUE|WED|THU|FRI|SAT|SUNDAY|MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY),?\s+\d{1,2}\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)', re.IGNORECASE))
                if date_div:
                    date_text = date_div.strip()
                    match_blocks.append(div.parent)
            except:
                continue
        
        # If we found match blocks, process them
        if match_blocks:
            print(f"Found {len(match_blocks)} match blocks with dates")
            
            for block in match_blocks:
                try:
                    fixture = {}
                    
                    # Extract date
                    date_match = re.search(r'(SUN|MON|TUE|WED|THU|FRI|SAT|SUNDAY|MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY),?\s+(\d{1,2})\s+(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)', block.get_text(), re.IGNORECASE)
                    if date_match:
                        day = date_match.group(2)
                        month = date_match.group(3)
                        year = season_id.split('-')[0]  # Assuming season_id format like "2023-24"
                        if int(month_to_number(month)) < 7:  # If month is before July, it's likely the next year
                            year = str(int(year) + 1)
                        fixture['date'] = f"{year}-{month_to_number(month)}-{day.zfill(2)}"
                    
                    # Find home team and away team
                    all_text = block.get_text()
                    
                    # Based on screenshots, teams are on either side of a score
                    teams_match = re.search(r'([A-Za-z\s\']+)\s+(\d+)\s*[-:]\s*(\d+)\s+([A-Za-z\s\']+)', all_text)
                    if teams_match:
                        fixture['home_team'] = teams_match.group(1).strip()
                        fixture['away_team'] = teams_match.group(4).strip()
                        fixture['home_score'] = int(teams_match.group(2))
                        fixture['away_score'] = int(teams_match.group(3))
                        fixture['status'] = 'completed'
                    else:
                        # Try without a score (upcoming match)
                        teams_match = re.search(r'([A-Za-z\s\']+)\s+(?:v|vs|versus)\s+([A-Za-z\s\']+)', all_text)
                        if teams_match:
                            fixture['home_team'] = teams_match.group(1).strip()
                            fixture['away_team'] = teams_match.group(2).strip()
                            fixture['status'] = 'upcoming'
                    
                    # Find competition name
                    competition_text = ""
                    for comp_text in ["Friendly", "Highland League", "Cup", "Scottish Cup", "League Cup"]:
                        if comp_text.lower() in all_text.lower():
                            competition_text = comp_text
                            break
                    
                    fixture['competition'] = competition_text or "Unknown"
                    
                    # Find venue if available
                    venue_match = re.search(r'Venue\s*[-:]\s*([A-Za-z\s,]+)', all_text)
                    if venue_match:
                        fixture['venue'] = venue_match.group(1).strip()
                    
                    # Set is_home based on team name
                    fixture['is_home'] = "Banks o' Dee" in fixture.get('home_team', '')
                    
                    # Set season
                    fixture['season'] = season_id
                    
                    # Add to fixtures if we have at least home and away teams
                    if fixture.get('home_team') and fixture.get('away_team'):
                        fixtures.append(fixture)
                        print(f"Extracted fixture: {fixture['home_team']} vs {fixture['away_team']}")
                    
                except Exception as e:
                    print(f"Error extracting fixture: {e}")
        
        # If we couldn't extract fixtures with the methods above, the HTML structure might be very different
        # Print some debugging info to help understand the structure
        if not fixtures and not match_blocks:
            print("Couldn't find fixture data with standard methods. Trying alternative approach...")
            
            # Try to find rows that look like fixtures based on text pattern
            all_divs = soup.find_all('div')
            for div in all_divs:
                text = div.get_text()
                # Look for patterns like "Team A vs Team B" or scores like "2-1"
                if re.search(r'\b(vs|v)\b', text) or re.search(r'\b\d+\s*[-:]\s*\d+\b', text):
                    print(f"Potential fixture div: {text[:100]}")
            
            # Create error fixture for debugging
            fixtures.append({
                'home_team': 'ERROR: No fixtures found',
                'away_team': f'Season ID: {season_id}',
                'date': None,
                'competition': 'Unknown',
                'status': 'upcoming',
                'is_home': False,
                'season': season_id
            })
        
        return fixtures
    except Exception as e:
        print(f"Error fetching fixtures: {e}")
        return []

def extract_fixtures_from_json(data, season_id):
    """Extract fixture data from JSON structure."""
    fixtures = []
    
    # This is a placeholder - we would need to adapt this based on the actual JSON structure
    # Try to identify match/fixture objects in the JSON
    try:
        # Recursively search for objects that might be fixtures
        matches_found = []
        find_match_objects(data, matches_found)
        
        print(f"Found {len(matches_found)} potential match objects in JSON")
        
        for match in matches_found:
            fixture = {}
            
            # Check if this looks like a match object
            if isinstance(match, dict) and any(key in match for key in ['date', 'homeTeam', 'awayTeam', 'competition']):
                # Direct mapping from JSON
                fixture['date'] = match.get('date')
                fixture['home_team'] = get_team_name(match.get('homeTeam'))
                fixture['away_team'] = get_team_name(match.get('awayTeam'))
                fixture['competition'] = get_competition_name(match.get('competition'))
                fixture['venue'] = match.get('venue')
                fixture['status'] = match.get('status', 'upcoming')
                
                # Handle scores if present
                result = match.get('result', {})
                if result:
                    fixture['home_score'] = result.get('homeScore')
                    fixture['away_score'] = result.get('awayScore')
                
                # Set is_home based on team name
                fixture['is_home'] = "Banks o' Dee" in fixture.get('home_team', '')
                
                # Set season
                fixture['season'] = season_id
                
                fixtures.append(fixture)
    except Exception as e:
        print(f"Error extracting fixtures from JSON: {e}")
    
    return fixtures

def find_match_objects(obj, results):
    """Recursively search for objects that look like match data."""
    if isinstance(obj, dict):
        # Check if this dict looks like a match object
        if any(key in obj for key in ['date', 'homeTeam', 'awayTeam', 'match', 'fixture']):
            results.append(obj)
        
        # Recurse into values
        for value in obj.values():
            find_match_objects(value, results)
    elif isinstance(obj, list):
        # Recurse into list items
        for item in obj:
            find_match_objects(item, results)

def get_team_name(team_obj):
    """Extract team name from various possible formats."""
    if isinstance(team_obj, str):
        return team_obj
    elif isinstance(team_obj, dict):
        return team_obj.get('name', str(team_obj))
    return str(team_obj)

def get_competition_name(comp_obj):
    """Extract competition name from various possible formats."""
    if isinstance(comp_obj, str):
        return comp_obj
    elif isinstance(comp_obj, dict):
        return comp_obj.get('name', str(comp_obj))
    return str(comp_obj)

def month_to_number(month_name):
    """Convert month name to number."""
    months = {
        'JAN': '01', 'FEB': '02', 'MAR': '03', 'APR': '04', 'MAY': '05', 'JUN': '06',
        'JUL': '07', 'AUG': '08', 'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12'
    }
    return months.get(month_name.upper()[:3], '01')

def parse_date(date_str):
    """Parse date string into standard format."""
    # Handle different date formats
    if not date_str or date_str == "TBC":
        return None
    
    # Try to parse common formats
    formats = [
        "%d/%m/%Y",  # 01/09/2023
        "%d/%m/%y",   # 01/09/23
        "%a %d %b %Y",  # Sat 01 Sep 2023
        "%d %b %Y"    # 01 Sep 2023
    ]
    
    for fmt in formats:
        try:
            return datetime.strptime(date_str, fmt).strftime("%Y-%m-%d")
        except ValueError:
            continue
    
    # If all formats fail
    return date_str

def parse_time(time_str):
    """Parse time string into standard format."""
    if not time_str or time_str == "TBC":
        return None
    
    # Extract time using regex - look for patterns like 15:00
    time_match = re.search(r'\b(\d{1,2})[:.:](\d{2})\b', time_str)
    if time_match:
        return f"{time_match.group(1)}:{time_match.group(2)}"
    
    return time_str

def extract_score(score_text):
    """Extract score from text like '2-1' or 'Won 2-1'."""
    if not score_text:
        return None, None
    
    # Look for pattern like 2-1 or 2:1
    score_match = re.search(r'(\d+)[-:](\d+)', score_text)
    if score_match:
        return int(score_match.group(1)), int(score_match.group(2))
    
    return None, None

def save_to_csv(fixtures, filename):
    """Save fixtures to CSV file."""
    if not fixtures:
        return
    
    fieldnames = set()
    for fixture in fixtures:
        fieldnames.update(fixture.keys())
    
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=list(fieldnames))
        writer.writeheader()
        writer.writerows(fixtures)

def generate_sql_insert(fixtures, table_name):
    """Generate SQL insert statements for the fixtures."""
    if not fixtures or len(fixtures) == 0:
        return ""
    
    sql = f"-- Insert statements for {table_name}\n\n"
    
    # Get all possible column names across all fixtures
    columns = set()
    for fixture in fixtures:
        columns.update(fixture.keys())
    
    columns_list = list(columns)
    columns_str = ", ".join([f'"{col}"' for col in columns_list])
    
    for fixture in fixtures:
        values = []
        for col in columns_list:
            value = fixture.get(col)
            if value is None:
                values.append("NULL")
            elif isinstance(value, str):
                # Escape single quotes
                escaped_value = value.replace("'", "''")
                values.append(f"'{escaped_value}'")
            elif isinstance(value, bool):
                values.append("TRUE" if value else "FALSE")
            else:
                values.append(str(value))
        
        values_str = ", ".join(values)
        sql += f"INSERT INTO {table_name} ({columns_str}) VALUES ({values_str});\n"
    
    return sql

def transform_to_supabase_schema(fixtures):
    """Transform scraped fixtures to match the Supabase schema."""
    transformed = []
    
    # First, build team and competition lookup tables
    teams = {}
    competitions = {}
    
    for fixture in fixtures:
        home_team = fixture.get('home_team')
        away_team = fixture.get('away_team')
        competition = fixture.get('competition')
        
        if home_team and home_team not in teams:
            teams[home_team] = {
                'id': f"team_{len(teams) + 1}",
                'name': home_team,
                'logo': None  # You would need to add logos separately
            }
        
        if away_team and away_team not in teams:
            teams[away_team] = {
                'id': f"team_{len(teams) + 1}",
                'name': away_team,
                'logo': None
            }
        
        if competition and competition not in competitions:
            competitions[competition] = {
                'id': f"comp_{len(competitions) + 1}",
                'name': competition,
                'logo': None
            }
    
    # Now transform each fixture
    for fixture in fixtures:
        if not fixture.get('home_team') or not fixture.get('away_team'):
            continue
            
        transformed_fixture = {
            'id': f"match_{len(transformed) + 1}",
            'homeTeam': teams.get(fixture.get('home_team', ''), {}).get('id'),
            'awayTeam': teams.get(fixture.get('away_team', ''), {}).get('id'),
            'competition': competitions.get(fixture.get('competition', ''), {}).get('id'),
            'date': fixture.get('date'),
            'time': fixture.get('time'),
            'venue': fixture.get('venue'),
            'isHome': fixture.get('is_home'),
            'status': fixture.get('status', 'upcoming'),
            'season': fixture.get('season')
        }
        
        # Add result if available
        if fixture.get('home_score') is not None and fixture.get('away_score') is not None:
            transformed_fixture['homeScore'] = fixture.get('home_score')
            transformed_fixture['awayScore'] = fixture.get('away_score')
        
        transformed.append(transformed_fixture)
    
    # Prepare teams and competitions for export
    teams_list = [{"id": team_data["id"], "name": team_data["name"], "logo": team_data["logo"]} for team_data in teams.values()]
    competitions_list = [{"id": comp_data["id"], "name": comp_data["name"], "logo": comp_data["logo"]} for comp_data in competitions.values()]
    
    return {
        'matches': transformed,
        'teams': teams_list,
        'competitions': competitions_list
    }

def generate_fixturesData_ts(fixtures, season_filter=None):
    """Generate TypeScript code for fixturesData.ts file."""
    # Filter fixtures for the specified season if provided
    if season_filter:
        filtered_fixtures = [f for f in fixtures if str(f.get('season')) == str(season_filter)]
    else:
        filtered_fixtures = fixtures
    
    # Start building the TS file content
    ts_content = """
// fixturesData.ts - Generated from Banks o' Dee FC website
// This file contains fixture data for the Banks o' Dee FC website

export const allFixtures = [
"""
    
    for idx, fixture in enumerate(filtered_fixtures):
        # Format the fixture as a TypeScript object
        fixture_obj = "  {\n"
        fixture_obj += f"    id: \"{idx + 1}\",\n"
        
        if fixture.get('competition'):
            fixture_obj += f"    competition: \"{fixture.get('competition')}\",\n"
        else:
            fixture_obj += f"    competition: \"Unknown\",\n"
        
        if fixture.get('date'):
            fixture_obj += f"    date: \"{fixture.get('date')}\",\n"
        
        if fixture.get('time'):
            fixture_obj += f"    time: \"{fixture.get('time')}\",\n"
        
        if fixture.get('home_team'):
            fixture_obj += f"    homeTeam: \"{fixture.get('home_team')}\",\n"
        
        if fixture.get('away_team'):
            fixture_obj += f"    awayTeam: \"{fixture.get('away_team')}\",\n"
        
        if fixture.get('venue'):
            fixture_obj += f"    venue: \"{fixture.get('venue')}\",\n"
        
        status = fixture.get('status', 'upcoming')
        fixture_obj += f"    status: \"{status}\",\n"
        fixture_obj += f"    isCompleted: {str(status == 'completed').lower()},\n"
        
        # Add result if it's a completed match
        if status == 'completed' and fixture.get('home_score') is not None and fixture.get('away_score') is not None:
            fixture_obj += "    result: {\n"
            fixture_obj += f"      homeScore: {fixture.get('home_score')},\n"
            fixture_obj += f"      awayScore: {fixture.get('away_score')}\n"
            fixture_obj += "    },\n"
        
        # Add ticket link placeholder
        fixture_obj += "    ticketLink: \"\""
        
        fixture_obj += "\n  }"
        if idx < len(filtered_fixtures) - 1:
            fixture_obj += ","
        
        ts_content += fixture_obj + "\n"
    
    ts_content += "];\n"
    
    return ts_content

def main():
    # Create output directory
    output_dir = 'output'
    os.makedirs(output_dir, exist_ok=True)
    
    base_url = "https://www.banksodeefc.com/teams/211103/fixtures-results"
    
    print("Getting available seasons...")
    seasons = get_season_options(base_url)
    print(f"Found {len(seasons)} seasons")
    
    all_fixtures = []
    
    for season in seasons:
        print(f"Processing season: {season['name']} (ID: {season['id']})...")
        fixtures = get_fixtures_for_season(base_url, season['id'])
        print(f"  Found {len(fixtures)} fixtures")
        all_fixtures.extend(fixtures)
        
        # Save fixtures for each season
        if fixtures:
            season_file = f"{output_dir}/season_{season['id']}_fixtures.csv"
            save_to_csv(fixtures, season_file)
            print(f"  Saved to {season_file}")
        
        # Be nice to the server
        time.sleep(2)
    
    # Save raw data
    print(f"Saving {len(all_fixtures)} fixtures to CSV...")
    save_to_csv(all_fixtures, f"{output_dir}/banks_o_dee_fixtures.csv")
    
    # Transform for Supabase
    print("Transforming data for Supabase...")
    supabase_data = transform_to_supabase_schema(all_fixtures)
    
    # Save transformed data
    save_to_csv(supabase_data['matches'], f"{output_dir}/supabase_matches.csv")
    save_to_csv(supabase_data['teams'], f"{output_dir}/supabase_teams.csv")
    save_to_csv(supabase_data['competitions'], f"{output_dir}/supabase_competitions.csv")
    
    # Generate SQL
    print("Generating SQL...")
    matches_sql = generate_sql_insert(supabase_data['matches'], "matches")
    teams_sql = generate_sql_insert(supabase_data['teams'], "teams")
    competitions_sql = generate_sql_insert(supabase_data['competitions'], "competitions")
    
    with open(f"{output_dir}/supabase_import.sql", "w", encoding='utf-8') as f:
        f.write("-- Teams\n")
        f.write(teams_sql)
        f.write("\n\n-- Competitions\n")
        f.write(competitions_sql)
        f.write("\n\n-- Matches\n")
        f.write(matches_sql)
    
    # Generate fixturesData.ts for the last season processed
    print(f"Generating fixturesData.ts for {seasons[0]['name']} season...")
    
    if seasons:
        ts_content = generate_fixturesData_ts(all_fixtures, seasons[0]['id'])
        with open(f"{output_dir}/fixturesData.ts", "w", encoding='utf-8') as f:
            f.write(ts_content)
        print(f"Generated fixturesData.ts for season {seasons[0]['name']}")
    
    print(f"Done! Files saved to {output_dir}/ directory.")

if __name__ == "__main__":
    main()