def analyze_change(yearly_data):

    changes = []

    for i in range(1, len(yearly_data)):

        prev = yearly_data[i-1]["ndvi"]
        curr = yearly_data[i]["ndvi"]

        change = abs((curr - prev) / prev) * 100 if prev else 0

        if change > 20:
            level = "High"
        elif change > 10:
            level = "Moderate"
        else:
            level = "Low"

        changes.append({
            "from_year": yearly_data[i-1]["year"],
            "to_year": yearly_data[i]["year"],
            "change_percent": round(change,2),
            "level": level
        })

    return changes
