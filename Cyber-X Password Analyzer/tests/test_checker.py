from checker import check_password

def test_weak_password():
    result = check_password("abc")
    assert result["strength"] == "Weak"

def test_medium_password():
    result = check_password("Hello123")
    assert result["strength"] == "Medium"

def test_strong_password():
    result = check_password("Hello@123")
    assert result["strength"] == "Strong"
    