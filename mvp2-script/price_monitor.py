#!/usr/bin/env python3
"""
MVP 2: Price Monitor Script
Scrapes local marketplaces for items and alerts on price differences.
Currently configured for: Pokemon cards, electronics, tools
"""

import json
import os
import time
from datetime import datetime
from urllib.parse import urljoin

# Simple in-memory store (replace with database in production)
DATA_FILE = "price_data.json"

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)

def add_item(name, local_price, market_value, url, source="manual"):
    """Add an item to track"""
    data = load_data()
    item_id = name.lower().replace(' ', '-')
    data[item_id] = {
        "name": name,
        "local_price": local_price,
        "market_value": market_value,
        "profit": market_value - local_price,
        "margin": round((market_value - local_price) / market_value * 100, 1),
        "url": url,
        "source": source,
        "added": datetime.now().isoformat(),
        "last_checked": datetime.now().isoformat()
    }
    save_data(data)
    print(f"✅ Added: {name} | Cost: €{local_price} | Value: €{market_value} | Profit: €{data[item_id]['profit']}")

def list_opportunities(min_margin=30):
    """List arbitrage opportunities above threshold"""
    data = load_data()
    opportunities = [v for k, v in data.items() if v['margin'] >= min_margin]
    opportunities.sort(key=lambda x: x['profit'], reverse=True)
    
    print(f"\n📊 ARBITRAGE OPPORTUNITIES (>{min_margin}% margin)")
    print("=" * 70)
    for item in opportunities:
        print(f"  {item['name']}")
        print(f"    Buy: €{item['local_price']} → Sell: €{item['market_value']} | Profit: €{item['profit']} ({item['margin']}%)")
        print(f"    Source: {item['source']}")
        print()

def check_alerts():
    """Check for high-value items"""
    data = load_data()
    high_value = [v for k, v in data.items() if v['profit'] > 50]
    
    if high_value:
        print("\n🚨 HIGH VALUE ALERTS (>€50 profit)")
        for item in high_value:
            print(f"  {item['name']}: €{item['profit']} profit")

if __name__ == "__main__":
    import sys
    
    # Demo data - add some sample opportunities
    if len(sys.argv) == 1:
        print("Price Monitor - MVP 2")
        print("Usage:")
        print("  python monitor.py add <name> <local_price> <market_value> <url>")
        print("  python monitor.py list")
        print("  python monitor.py alerts")
        
        # Add some demo items
        print("\n📝 Adding demo opportunities...")
        add_item("Leafeon VMAX HR", 13, 100, "https://andelemandele.lv", "andele")
        add_item("Charizard VMAX alt art", 25, 180, "https://ss.lv", "ss.lv")
        add_item("iPhone 13 Pro Max", 450, 650, "https://ss.lv", "ss.lv")
        add_item("MacBook Pro M1", 700, 950, "https://ss.lv", "ss.lv")
    
    elif sys.argv[1] == "list":
        list_opportunities()
    
    elif sys.argv[1] == "alerts":
        check_alerts()
    
    elif sys.argv[1] == "add" and len(sys.argv) >= 6:
        add_item(sys.argv[2], float(sys.argv[3]), float(sys.argv[4]), sys.argv[5])
    
    else:
        print("Invalid command")
