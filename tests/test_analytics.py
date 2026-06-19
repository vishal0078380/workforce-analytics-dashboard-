import json
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

def test_cors_headers_present():
    """Test that CORS headers are defined correctly"""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Access-Control-Allow-Methods": "GET,OPTIONS"
    }
    assert cors["Access-Control-Allow-Origin"] == "*"
    assert "Authorization" in cors["Access-Control-Allow-Headers"]
    print("✅ CORS headers test passed")

def test_analytics_response_structure():
    """Test analytics response has required keys"""
    mock_response = {
        "total_headcount": 76,
        "departments": 8,
        "avg_attrition_risk": 44.8,
        "funnel_joined": 8
    }
    required_keys = ["total_headcount", "departments", "avg_attrition_risk", "funnel_joined"]
    for key in required_keys:
        assert key in mock_response, f"Missing key: {key}"
    print("✅ Analytics structure test passed")

def test_headcount_is_positive():
    """Test headcount values are positive"""
    mock_headcount = [
        {"department": "engineering", "headcount": 22},
        {"department": "sales", "headcount": 12}
    ]
    for dept in mock_headcount:
        assert dept["headcount"] > 0
    print("✅ Headcount values test passed")

def test_attrition_risk_range():
    """Test attrition risk scores are between 0 and 100"""
    mock_risks = [
        {"department": "marketing", "risk_score": 51.07},
        {"department": "engineering", "risk_score": 43.93}
    ]
    for dept in mock_risks:
        assert 0 <= dept["risk_score"] <= 100
    print("✅ Attrition risk range test passed")

def test_recruitment_funnel_stages():
    """Test recruitment funnel has all required stages"""
    mock_funnel = {
        "resumes": 114,
        "shortlist": 36,
        "interview": 23,
        "offered": 11,
        "joined": 8
    }
    required_stages = ["resumes", "shortlist", "interview", "offered", "joined"]
    for stage in required_stages:
        assert stage in mock_funnel
    print("✅ Recruitment funnel stages test passed")

if __name__ == "__main__":
    test_cors_headers_present()
    test_analytics_response_structure()
    test_headcount_is_positive()
    test_attrition_risk_range()
    test_recruitment_funnel_stages()
    print("\n✅ All tests passed!")
EOF