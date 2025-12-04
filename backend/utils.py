# utils.py
def resp_ok(data=None, message=""):
    return {"success": True, "message": message, "data": data}

def resp_err(message="", code=400):
    return {"success": False, "message": message}
