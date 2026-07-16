from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch

def generate_report(data):

    filename = "terrasight_report.pdf"
    doc = SimpleDocTemplate(filename)
    elements = []
    styles = getSampleStyleSheet()

    elements.append(Paragraph("TerraSight Land Change Report", styles["Heading1"]))
    elements.append(Spacer(1, 0.5 * inch))

    for year in data["yearly"]:
        elements.append(Paragraph(f"Year: {year['year']} NDVI: {year['ndvi']}", styles["Normal"]))

    elements.append(Spacer(1, 0.5 * inch))

    for change in data["changes"]:
        elements.append(Paragraph(
            f"{change['from_year']} to {change['to_year']} Change: {change['change_percent']}% Level: {change['level']}",
            styles["Normal"]
        ))

    doc.build(elements)

    return filename
